"use server";
import { ID } from "node-appwrite";
import { createAdminClient } from "../appwriteClients";
/**
 * Creates a session for a user by their ID.
 */
const createSessionForUserId = async ({ userId = ID.unique(), }) => {
    try {
        const { users } = await createAdminClient();
        const session = await users.createSession(userId);
        return session;
    }
    catch (err) {
        console.error("APW-LIB ERROR (users): Error executing createSessionForUserId():", err);
        throw JSON.parse(JSON.stringify(err));
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
        console.error("APW-LIB ERROR (users): Error executing createToken():", err);
        throw JSON.parse(JSON.stringify(err));
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
        console.error("APW-LIB ERROR (users): Error executing deleteSessionForUserId():", err);
        throw JSON.parse(JSON.stringify(err));
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
        console.error("APW-LIB ERROR (users): Error executing deleteSessionsForUserId():", err);
        throw JSON.parse(JSON.stringify(err));
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
        console.error("APW-LIB ERROR (users): Error executing getUserForUserId():", err);
        throw JSON.parse(JSON.stringify(err));
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
        console.error("APW-LIB ERROR (users): Error executing listUsers():", err);
        throw JSON.parse(JSON.stringify(err));
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
        console.error("APW-LIB ERROR (users): Error executing updateEmailVerificationForUserId():", err);
        throw JSON.parse(JSON.stringify(err));
    }
};
export { createSessionForUserId, createToken, deleteSessionForUserId, deleteSessionsForUserId, getUserForUserId, listUsers, updateEmailVerificationForUserId, };
