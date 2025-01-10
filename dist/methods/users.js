"use server";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ID } from "node-appwrite";
import { createAdminClient } from "../appwriteClients";
/**
 * Creates a session for a user by their ID.
 */
const createSessionForUserId = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId = ID.unique(), }) {
    try {
        const { users } = yield createAdminClient();
        const session = yield users.createSession(userId);
        return session;
    }
    catch (err) {
        console.error("APW-LIB ERROR (users): Error executing createSessionForUserId():", err);
        throw JSON.parse(JSON.stringify(err));
    }
});
/**
 * Creates a token for a user.
 */
const createToken = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, length = 32, expire = 60 * 3, }) {
    try {
        const { users } = yield createAdminClient();
        const token = yield users.createToken(userId, length, expire);
        return token;
    }
    catch (err) {
        console.error("APW-LIB ERROR (users): Error executing createToken():", err);
        throw JSON.parse(JSON.stringify(err));
    }
});
/**
 * Deletes a specific session for a user by their ID.
 */
const deleteSessionForUserId = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, sessionId, }) {
    try {
        const { users } = yield createAdminClient();
        yield users.deleteSession(userId, sessionId);
    }
    catch (err) {
        console.error("APW-LIB ERROR (users): Error executing deleteSessionForUserId():", err);
        throw JSON.parse(JSON.stringify(err));
    }
});
/**
 * Deletes all sessions for a user by their ID.
 */
const deleteSessionsForUserId = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, }) {
    try {
        const { users } = yield createAdminClient();
        yield users.deleteSessions(userId);
    }
    catch (err) {
        console.error("APW-LIB ERROR (users): Error executing deleteSessionsForUserId():", err);
        throw JSON.parse(JSON.stringify(err));
    }
});
/**
 * Retrieves a user by their ID.
 */
const getUserForUserId = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, }) {
    try {
        const { users } = yield createAdminClient();
        const user = yield users.get(userId);
        return user;
    }
    catch (err) {
        console.error("APW-LIB ERROR (users): Error executing getUserForUserId():", err);
        throw JSON.parse(JSON.stringify(err));
    }
});
/**
 * Lists users with optional filters and search parameters.
 */
const listUsers = (_a) => __awaiter(void 0, [_a], void 0, function* ({ queries, search, }) {
    try {
        const { users } = yield createAdminClient();
        const userList = yield users.list(queries, search);
        return userList;
    }
    catch (err) {
        console.error("APW-LIB ERROR (users): Error executing listUsers():", err);
        throw JSON.parse(JSON.stringify(err));
    }
});
/**
 * Updates the email verification status for a user.
 */
const updateEmailVerificationForUserId = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, status, }) {
    try {
        if (typeof status !== "boolean") {
            throw new Error("Invalid param 'status'");
        }
        const { users } = yield createAdminClient();
        const user = yield users.updateEmailVerification(userId, status);
        return user;
    }
    catch (err) {
        console.error("APW-LIB ERROR (users): Error executing updateEmailVerificationForUserId():", err);
        throw JSON.parse(JSON.stringify(err));
    }
});
export { createSessionForUserId, createToken, deleteSessionForUserId, deleteSessionsForUserId, getUserForUserId, listUsers, updateEmailVerificationForUserId, };
