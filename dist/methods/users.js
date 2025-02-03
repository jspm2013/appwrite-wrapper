"use server";
import { Query } from "node-appwrite";
import { createAdminClient } from "../appwriteClients";
import { databaseId, userCollectionId } from "../appwriteConfig";
/**
 * Creates a session for a user by their ID.
 */
const createSessionForUserId = async ({ userId, }) => {
    try {
        if (!userId) {
            throw new Error("Invalid param 'userId'");
        }
        const { users } = await createAdminClient();
        const session = await users.createSession(userId);
        return session;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing createSessionForUserId():", err);
        throw err;
    }
};
/**
 * Creates a token for a user.
 */
const createToken = async ({ userId, length = 32, expire = 60 * 3, }) => {
    try {
        const { users } = await createAdminClient();
        const token = await users.createToken(userId, length, expire);
        return token;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing createToken():", err);
        throw err;
    }
};
/**
 * Deletes a specific preference key for a user by their ID.
 */
const deletePrefsForUserId = async ({ userId, key, }) => {
    try {
        const { users } = await createAdminClient();
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
/**
 * Deletes a specific session for a user by their ID.
 */
const deleteSessionForUserId = async ({ userId, sessionId, }) => {
    try {
        const { users } = await createAdminClient();
        await users.deleteSession(userId, sessionId);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing deleteSessionForUserId():", err);
        throw err;
    }
};
/**
 * Deletes all sessions for a user by their ID.
 */
const deleteSessionsForUserId = async ({ userId, }) => {
    try {
        const { users } = await createAdminClient();
        await users.deleteSessions(userId);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing deleteSessionsForUserId():", err);
        throw err;
    }
};
/**
 * Gets prefs for a user by their ID.
 */
const getPrefsForUserId = async ({ userId, }) => {
    try {
        const { users } = await createAdminClient();
        const prefs = await users.getPrefs(userId);
        return prefs;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing getPrefsForUserId():", err);
        throw err;
    }
};
/**
 * Retrieves a user by their ID.
 */
const getUserForUserId = async ({ userId, }) => {
    try {
        const { users } = await createAdminClient();
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
/**
 * Retrieves a verified user by their ID.
 */
const getVerifiedUserForUserId = async ({ userId, }) => {
    try {
        const { users } = await createAdminClient();
        const { databases } = await createAdminClient();
        const user = await users.get(userId);
        if (user.emailVerification || user.phoneVerification) {
            const { attributes } = await databases.listAttributes(databaseId, userCollectionId);
            const { total, documents } = await databases.listDocuments(databaseId, userCollectionId, [
                Query.and([
                    Query.equal("user_id", user.$id),
                    Query.equal("deleted", [false]),
                ]),
            ]);
            if (total > 0) {
                // Dynamically build the custom attributes type
                let customUserAttributes = {};
                attributes.forEach((attr) => {
                    customUserAttributes[attr.key] = attr.default ?? null;
                });
                // Return verified user, enriched for the custom attributes
                return { ...user, customUser: documents[0] };
            }
        }
        return null;
    }
    catch (err) {
        /*
         * Appwrite throws Error when the user is not logged in, so we have to return null for that case.
         */
        return null;
        //console.error("APW-WRAPPER - Error (methods/users): Error executing getVerifiedUserForUserId():", err);
        //throw err;
    }
};
/**
 * Lists users with optional filters and search parameters.
 */
const listIdentities = async ({ queries, search, }) => {
    try {
        const { users } = await createAdminClient();
        const identitiesList = await users.listIdentities(queries, search);
        return identitiesList;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing listIdentities():", err);
        throw err;
    }
};
/**
 * Lists users with optional filters and search parameters.
 */
const listUsers = async ({ queries, search, }) => {
    try {
        const { users } = await createAdminClient();
        const userList = await users.list(queries, search);
        return userList;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing listUsers():", err);
        throw err;
    }
};
/**
 * Sets the prefs for a user by their ID.
 */
const setPrefsForUserId = async ({ userId, prefsObj, }) => {
    try {
        const { users } = await createAdminClient();
        const prefs = await users.updatePrefs(userId, prefsObj);
        return prefs;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing setPrefsForUserId():", err);
        throw err;
    }
};
/**
 * Updates the email verification status for a user by their ID.
 */
const updateEmailVerificationForUserId = async ({ userId, status, }) => {
    try {
        if (typeof status !== "boolean") {
            throw new Error("Invalid param 'status'");
        }
        const { users } = await createAdminClient();
        const user = await users.updateEmailVerification(userId, status);
        return user;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/users): Error executing updateEmailVerificationForUserId():", err);
        throw err;
    }
};
export { createSessionForUserId, createToken, deletePrefsForUserId, deleteSessionForUserId, deleteSessionsForUserId, getPrefsForUserId, getUserForUserId, getVerifiedUserForUserId, listIdentities, listUsers, setPrefsForUserId, updateEmailVerificationForUserId, };
