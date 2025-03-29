/**
 * Headers type representing a key-value pair with string keys and string values.
 */
type Headers = {
    [key: string]: string;
};
type RealtimeStatus = "connected" | "disconnected" | "hanging";
/**
 * Realtime event response structure with generic payload type.
 */
type RealtimeResponseEvent<T extends unknown> = {
    /**
     * List of event names associated with the response.
     */
    events: string[];
    /**
     * List of channel names associated with the response.
     */
    channels: string[];
    /**
     * Timestamp indicating the time of the event.
     */
    timestamp: number;
    /**
     * Payload containing event-specific data.
     */
    payload: T;
};
/**
 * Client that handles requests to Appwrite
 */
declare class Client {
    static CHUNK_SIZE: number;
    /**
     * Holds configuration such as project.
     */
    config: {
        endpoint: string;
        endpointRealtime: string;
        project: string;
        jwt: string;
        locale: string;
        session: string;
    };
    /**
     * Custom headers for API requests.
     */
    headers: Headers;
    /**
     * Set Endpoint
     *
     * Your project endpoint
     *
     * @param {string} endpoint
     *
     * @returns {this}
     */
    setEndpoint(endpoint: string): this;
    /**
     * Set Realtime Endpoint
     *
     * @param {string} endpointRealtime
     *
     * @returns {this}
     */
    setEndpointRealtime(endpointRealtime: string): this;
    /**
     * Set Project
     *
     * Your project ID
     *
     * @param value string
     *
     * @return {this}
     */
    setProject(value: string): this;
    /**
     * Set JWT
     *
     * Your secret JSON Web Token
     *
     * @param value string
     *
     * @return {this}
     */
    setJWT(value: string): this;
    /**
     * Set Locale
     *
     * @param value string
     *
     * @return {this}
     */
    setLocale(value: string): this;
    /**
     * Set Session
     *
     * The user session to authenticate with
     *
     * @param value string
     *
     * @return {this}
     */
    setSession(value: string): this;
    private realtime;
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
    subscribe<T extends unknown>(channels: string | string[], callback: (payload: RealtimeResponseEvent<T>) => void, statusChange?: (status: RealtimeStatus) => void): () => void;
}
export { Client };
//# sourceMappingURL=appwriteRealtimeClient.d.ts.map