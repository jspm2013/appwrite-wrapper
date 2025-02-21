"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionClient = createSessionClient;
exports.createAdminClient = createAdminClient;
const node_appwrite_1 = require("node-appwrite");
const utils_1 = require("./utils");
const headers_1 = require("next/headers");
const appwriteConfig_1 = require("./appwriteConfig");
/**
 * Creates a session client for the current user.
 */
async function createSessionClient(params = {}) {
    const { selfSigned = false } = params;
    const locale = utils_1.apwManager.getLocale();
    const client = new node_appwrite_1.Client()
        .setEndpoint(appwriteConfig_1.endpoint)
        .setProject(appwriteConfig_1.projectId)
        .setSelfSigned(selfSigned)
        .setLocale(locale);
    const cookiesList = await (0, headers_1.cookies)();
    const session = cookiesList.get(appwriteConfig_1.cookieName);
    /* if (!session || !session.value) {
      throw new Error(
        "APW-WRAPPER - Error: No session found in cookies while calling createSessionClient()"
      );
    } */
    client.setSession(session.value);
    return {
        get account() {
            return new node_appwrite_1.Account(client);
        },
        get teams() {
            return new node_appwrite_1.Teams(client);
        },
        get databases() {
            return new node_appwrite_1.Databases(client);
        },
        get storage() {
            return new node_appwrite_1.Storage(client);
        },
        get functions() {
            return new node_appwrite_1.Functions(client);
        },
        get messaging() {
            return new node_appwrite_1.Messaging(client);
        },
        get locale() {
            return new node_appwrite_1.Locale(client);
        },
        get avatars() {
            return new node_appwrite_1.Avatars(client);
        },
        get users() {
            return new node_appwrite_1.Users(client);
        },
    };
}
/**
 * Creates an admin client with elevated privileges.
 */
async function createAdminClient(params = {}) {
    const { selfSigned = false } = params;
    const locale = utils_1.apwManager.getLocale();
    const client = new node_appwrite_1.Client()
        .setEndpoint(appwriteConfig_1.endpoint)
        .setProject(appwriteConfig_1.projectId)
        .setSelfSigned(selfSigned)
        .setLocale(locale)
        .setKey(appwriteConfig_1.apiKeySsr);
    return {
        get account() {
            return new node_appwrite_1.Account(client);
        },
        get teams() {
            return new node_appwrite_1.Teams(client);
        },
        get databases() {
            return new node_appwrite_1.Databases(client);
        },
        get storage() {
            return new node_appwrite_1.Storage(client);
        },
        get functions() {
            return new node_appwrite_1.Functions(client);
        },
        get messaging() {
            return new node_appwrite_1.Messaging(client);
        },
        get locale() {
            return new node_appwrite_1.Locale(client);
        },
        get avatars() {
            return new node_appwrite_1.Avatars(client);
        },
        get users() {
            return new node_appwrite_1.Users(client);
        },
    };
}
