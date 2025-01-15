"use server";
import { createAdminClient } from "../appwriteClients";
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
        const user = await users.get(userId);
        if (user.emailVerification) {
            return user;
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
 * Updates the email verification status for a user.
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
export { createSessionForUserId, createToken, deleteSessionForUserId, deleteSessionsForUserId, getUserForUserId, getVerifiedUserForUserId, listUsers, updateEmailVerificationForUserId, };
