/**
 * Client that handles requests to Appwrite
 */
class Client {
    static CHUNK_SIZE = 1024 * 1024 * 5;
    /**
     * Holds configuration such as project.
     */
    config = {
        endpoint: "https://cloud.appwrite.io/v1",
        endpointRealtime: "",
        project: "",
        jwt: "",
        locale: "",
        session: "",
    };
    /**
     * Custom headers for API requests.
     */
    headers = {
        "x-sdk-name": "Web",
        "x-sdk-platform": "client",
        "x-sdk-language": "web",
        "x-sdk-version": "17.0.1",
        "X-Appwrite-Response-Format": "1.6.0",
    };
    /**
     * Set Endpoint
     *
     * Your project endpoint
     *
     * @param {string} endpoint
     *
     * @returns {this}
     */
    setEndpoint(endpoint) {
        this.config.endpoint = endpoint;
        this.config.endpointRealtime =
            this.config.endpointRealtime ||
                this.config.endpoint
                    .replace("https://", "wss://")
                    .replace("http://", "ws://");
        return this;
    }
    /**
     * Set Realtime Endpoint
     *
     * @param {string} endpointRealtime
     *
     * @returns {this}
     */
    setEndpointRealtime(endpointRealtime) {
        this.config.endpointRealtime = endpointRealtime;
        return this;
    }
    /**
     * Set Project
     *
     * Your project ID
     *
     * @param value string
     *
     * @return {this}
     */
    setProject(value) {
        this.headers["X-Appwrite-Project"] = value;
        this.config.project = value;
        return this;
    }
    /**
     * Set JWT
     *
     * Your secret JSON Web Token
     *
     * @param value string
     *
     * @return {this}
     */
    setJWT(value) {
        this.headers["X-Appwrite-JWT"] = value;
        this.config.jwt = value;
        return this;
    }
    /**
     * Set Locale
     *
     * @param value string
     *
     * @return {this}
     */
    setLocale(value) {
        this.headers["X-Appwrite-Locale"] = value;
        this.config.locale = value;
        return this;
    }
    /**
     * Set Session
     *
     * The user session to authenticate with
     *
     * @param value string
     *
     * @return {this}
     */
    setSession(value) {
        this.headers["X-Appwrite-Session"] = value;
        this.config.session = value;
        return this;
    }
    realtime = {
        socket: undefined,
        timeout: undefined,
        heartbeat: undefined,
        url: "",
        channels: new Set(),
        subscriptions: new Map(),
        subscriptionsCounter: 0,
        reconnect: true,
        reconnectAttempts: 0,
        lastMessage: undefined,
        lastPingTime: 0,
        pongTimeout: undefined,
        status: undefined,
        connect: () => {
            clearTimeout(this.realtime.timeout);
            this.realtime.timeout = window?.setTimeout(() => {
                this.realtime.createSocket();
            }, 50);
        },
        getTimeout: () => {
            switch (true) {
                case this.realtime.reconnectAttempts < 5:
                    return 1000;
                case this.realtime.reconnectAttempts < 15:
                    return 5000;
                case this.realtime.reconnectAttempts < 100:
                    return 10_000;
                default:
                    return 60_000;
            }
        },
        createHeartbeat: () => {
            if (this.realtime.heartbeat) {
                clearTimeout(this.realtime.heartbeat);
            }
            this.realtime.heartbeat = setInterval(() => {
                if (this.realtime.pongTimeout) {
                    clearTimeout(this.realtime.pongTimeout);
                }
                this.realtime.socket?.send(JSON.stringify({
                    type: "ping",
                }));
                this.realtime.lastPingTime = Date.now();
                if (this.realtime.status !== "disconnected") {
                    this.realtime.pongTimeout = setTimeout(() => {
                        this.realtime.updateStatus("hanging");
                    }, 5_000);
                }
            }, 20_000);
        },
        createSocket: () => {
            if (this.realtime.channels.size < 1) {
                this.realtime.reconnect = false;
                this.realtime.socket?.close();
                return;
            }
            const channels = new URLSearchParams();
            channels.set("project", this.config.project);
            this.realtime.channels.forEach((channel) => {
                channels.append("channels[]", channel);
            });
            const url = this.config.endpointRealtime + "/realtime?" + channels.toString();
            if (url !== this.realtime.url || // Check if URL is present
                !this.realtime.socket || // Check if WebSocket has not been created
                this.realtime.socket?.readyState > WebSocket.OPEN // Check if WebSocket is CLOSING (3) or CLOSED (4)
            ) {
                if (this.realtime.socket &&
                    this.realtime.socket?.readyState < WebSocket.CLOSING // Close WebSocket if it is CONNECTING (0) or OPEN (1)
                ) {
                    this.realtime.reconnect = false;
                    this.realtime.socket.close();
                }
                this.realtime.url = url;
                this.realtime.socket = new WebSocket(url);
                this.realtime.socket.addEventListener("message", this.realtime.onMessage);
                this.realtime.socket.addEventListener("open", (_event) => {
                    this.realtime.reconnectAttempts = 0;
                    this.realtime.createHeartbeat();
                });
                this.realtime.socket.addEventListener("close", (event) => {
                    this.realtime.updateStatus("disconnected");
                    if (!this.realtime.reconnect ||
                        (this.realtime?.lastMessage?.type === "error" && // Check if last message was of type error
                            (this.realtime?.lastMessage.data).code ===
                                1008) // Check for policy violation 1008
                    ) {
                        this.realtime.reconnect = true;
                        return;
                    }
                    const timeout = this.realtime.getTimeout();
                    console.error(`Realtime got disconnected. Reconnect will be attempted in ${timeout / 1000} seconds.`, event.reason);
                    setTimeout(() => {
                        this.realtime.reconnectAttempts++;
                        this.realtime.createSocket();
                    }, timeout);
                });
            }
        },
        onMessage: (event) => {
            try {
                const message = JSON.parse(event.data);
                this.realtime.lastMessage = message;
                switch (message.type) {
                    case "connected":
                        let session = this.config.session;
                        if (!session.trim()) {
                            // Fetch cookieFallback from localStorage if session is not set
                            const cookie = JSON.parse(window.localStorage.getItem("cookieFallback") ?? "{}");
                            session = cookie?.[`a_session_${this.config.project}`];
                        }
                        const messageData = message.data;
                        if (session && !messageData.user) {
                            this.realtime.socket?.send(JSON.stringify({
                                type: "authentication",
                                data: {
                                    session,
                                },
                            }));
                        }
                        break;
                    case "event":
                        let data = message.data;
                        if (data?.channels) {
                            const isSubscribed = data.channels.some((channel) => this.realtime.channels.has(channel));
                            if (!isSubscribed)
                                return;
                            this.realtime.subscriptions.forEach((subscription) => {
                                if (data.channels.some((channel) => subscription.channels.includes(channel))) {
                                    setTimeout(() => subscription.callback(data));
                                }
                            });
                        }
                        break;
                    case "pong":
                        if (this.realtime.pongTimeout) {
                            clearTimeout(this.realtime.pongTimeout);
                            this.realtime.pongTimeout = undefined;
                        }
                        this.realtime.updateStatus("connected");
                        break;
                    case "error":
                        throw message.data;
                    default:
                        break;
                }
            }
            catch (e) {
                console.error(e);
            }
        },
        cleanUp: (channels) => {
            this.realtime.channels.forEach((channel) => {
                if (channels.includes(channel)) {
                    let found = Array.from(this.realtime.subscriptions).some(([_key, subscription]) => {
                        return subscription.channels.includes(channel);
                    });
                    if (!found) {
                        this.realtime.channels.delete(channel);
                    }
                }
            });
        },
        updateStatus: (status) => {
            if (this.realtime.status === status)
                return;
            this.realtime.subscriptions.forEach((subscription) => {
                setTimeout(() => subscription.statusChange?.(status));
            });
            this.realtime.status = status;
        },
    };
    /**
     * Subscribes to Appwrite events and passes you the payload in realtime.
     *
     * @param {string|string[]} channels
     * Channel to subscribe - pass a single channel as a string or multiple with an array of strings.
     *
     * Possible channels are:
     * - account
     * - collections
     * - collections.[ID]
     * - collections.[ID].documents
     * - documents
     * - documents.[ID]
     * - files
     * - files.[ID]
     * - executions
     * - executions.[ID]
     * - functions.[ID]
     * - teams
     * - teams.[ID]
     * - memberships
     * - memberships.[ID]
     * @param {(payload: RealtimeMessage) => void} callback Is called on every realtime update.
     * @param {(connected: boolean) => void} statusChange Is called on connection status change.
     * @returns {() => void} Unsubscribes from events.
     */
    subscribe(channels, callback, statusChange) {
        let channelArray = typeof channels === "string" ? [channels] : channels;
        channelArray.forEach((channel) => this.realtime.channels.add(channel));
        const counter = this.realtime.subscriptionsCounter++;
        this.realtime.subscriptions.set(counter, {
            channels: channelArray,
            callback,
            statusChange,
        });
        this.realtime.connect();
        return () => {
            this.realtime.subscriptions.delete(counter);
            this.realtime.cleanUp(channelArray);
            this.realtime.connect();
        };
    }
}
export { Client };
