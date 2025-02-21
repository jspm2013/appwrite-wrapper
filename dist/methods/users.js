"use server";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmailVerificationForUserId = exports.setPrefsForUserId = exports.listUsers = exports.listIdentities = exports.getUsers = exports.getUserForUserId = exports.getPrefsForUserId = exports.getCustomUsers = exports.getAppUserForUserId = exports.deleteUserId = exports.deleteSessionsForUserId = exports.deleteSessionForUserId = exports.deletePrefsForUserId = exports.createToken = exports.createSessionForUserId = void 0;
const node_appwrite_1 = require("node-appwrite");
const typeReader_1 = require("../collections/typeReader");
const appwriteClients_1 = require("../appwriteClients");
const appwriteConfig_1 = require("../appwriteConfig");
/**
 * Creates a session for a user by their ID.
 */
const createSessionForUserId = async ({ userId, }) => {
    try {
        if (!userId) {
            throw new Error("Invalid param 'userId'");
        }
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const session = await users.createSession(userId);
        return session;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing createSessionForUserId():", err);
        throw err;
    }
};
exports.createSessionForUserId = createSessionForUserId;
/**
 * Creates a token for a user.
 */
const createToken = async ({ userId, length = 32, expire = 60 * 3, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const token = await users.createToken(userId, length, expire);
        return token;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing createToken():", err);
        throw err;
    }
};
exports.createToken = createToken;
/**
 * Deletes a specific preference key for a user by their ID.
 */
const deletePrefsForUserId = async ({ userId, key, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const prefs = await users.getPrefs(userId);
        if (Object.prototype.hasOwnProperty.call(prefs, key)) {
            const { [key]: _, ...newPrefs } = prefs;
            const user = await users.updatePrefs(userId, newPrefs);
            return user.prefs;
        }
        return prefs;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing deletePrefsForUserId():", err);
        throw err;
    }
};
exports.deletePrefsForUserId = deletePrefsForUserId;
/**
 * Deletes a specific session for a user by their ID.
 */
const deleteSessionForUserId = async ({ userId, sessionId, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        await users.deleteSession(userId, sessionId);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing deleteSessionForUserId():", err);
        throw err;
    }
};
exports.deleteSessionForUserId = deleteSessionForUserId;
/**
 * Deletes all sessions for a user by their ID.
 */
const deleteSessionsForUserId = async ({ userId, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        await users.deleteSessions(userId);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing deleteSessionsForUserId():", err);
        throw err;
    }
};
exports.deleteSessionsForUserId = deleteSessionsForUserId;
/**
 * Gets prefs for a user by their ID.
 */
const getPrefsForUserId = async ({ userId, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const prefs = await users.getPrefs(userId);
        return prefs;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing getPrefsForUserId():", err);
        throw err;
    }
};
exports.getPrefsForUserId = getPrefsForUserId;
/**
 * Retrieves a user by their ID.
 */
const getUserForUserId = async ({ userId, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const user = await users.get(userId);
        return user;
    }
    catch (err) {
        /*
         * Appwrite throws Error when the user is not logged in, so we have to return null for that case.
         */
        return null;
        //console.error("APW-WRAPPER - Error (methods/users): Error executing getUserForUserId():", err);
        //throw err;
    }
};
exports.getUserForUserId = getUserForUserId;
/**
 * Retrieves a verified app user by their ID.
 */
const getAppUserForUserId = async ({ userId, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const user = await users.get(userId);
        const AppUserType = await (0, typeReader_1.getType)({
            collName: appwriteConfig_1.userCollectionId,
            typeName: "AppUserType",
        });
        if (!AppUserType) {
            throw new Error("No AppUserType found. Returning null");
        }
        if (user.emailVerification || user.phoneVerification) {
            const { total, documents } = await databases.listDocuments(appwriteConfig_1.databaseId, appwriteConfig_1.userCollectionId, [
                node_appwrite_1.Query.and([
                    node_appwrite_1.Query.equal("user_id", user.$id),
                    node_appwrite_1.Query.equal("deleted", false),
                ]),
            ]);
            if (total > 0) {
                return {
                    ...user,
                    customUser: documents[0],
                };
            }
        }
        return null;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing getAppUserForUserId():", err);
        /*
         * Appwrite throws Error when the user has no valid (aka is not logged in), so we have to return null for that case (instead of returning the error).
         */
        return null;
    }
};
exports.getAppUserForUserId = getAppUserForUserId;
/**
 * Lists users with optional filters and search parameters.
 */
const listIdentities = async ({ queries, search, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const identitiesList = await users.listIdentities(queries, search);
        return identitiesList;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing listIdentities():", err);
        throw err;
    }
};
exports.listIdentities = listIdentities;
/**
 * Lists users with optional filters and search parameters.
 */
const listUsers = async ({ queries, search, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const userList = await users.list(queries, search);
        return userList;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing listUsers():", err);
        throw err;
    }
};
exports.listUsers = listUsers;
/**
 * Sets the prefs for a user by their ID.
 */
const setPrefsForUserId = async ({ userId, prefsObj, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const prefs = await users.updatePrefs(userId, prefsObj);
        return prefs;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing setPrefsForUserId():", err);
        throw err;
    }
};
exports.setPrefsForUserId = setPrefsForUserId;
/**
 * Updates the email verification status for a user by their ID.
 */
const updateEmailVerificationForUserId = async ({ userId, status, }) => {
    try {
        if (typeof status !== "boolean") {
            throw new Error("Invalid param 'status'");
        }
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const user = await users.updateEmailVerification(userId, status);
        return user;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing updateEmailVerificationForUserId():", err);
        throw err;
    }
};
exports.updateEmailVerificationForUserId = updateEmailVerificationForUserId;
/**
 * Deletes a user by their ID.
 */
const deleteUserId = async ({ userId, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        await users.delete(userId);
        return userId;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing deleteUserId():", err);
        throw err;
    }
};
exports.deleteUserId = deleteUserId;
/**
 * Gets users list (NATIVE appwrite users)
 */
const getUsers = async ({ queries = [], search = undefined, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const response = await users.list(queries, search);
        return response;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing getUsers():", err);
        throw err;
    }
};
exports.getUsers = getUsers;
/**
 * Gets CUSTOM users list
 */
const getCustomUsers = async ({ queries = [], includingDeleted = false, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const combinedQueries = [
            ...queries,
            node_appwrite_1.Query.equal("deleted", includingDeleted),
        ];
        const { total, documents } = await databases.listDocuments(appwriteConfig_1.databaseId, appwriteConfig_1.userCollectionId, combinedQueries);
        return {
            total: total ?? 0,
            documents: documents ?? [],
        };
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing getCustomUsers():", err);
        throw err;
    }
};
exports.getCustomUsers = getCustomUsers;
