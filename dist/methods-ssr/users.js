"use server";
import { Query } from "node-appwrite";
import { live } from "../host";
import { getType } from "../collections/typeReader";
import { createAdminClient } from "../appwriteClients";
import { databaseId, userCollectionId } from "../appwriteConfig";
const admin = !live;
const errMsg = (fn) => admin ? `ApwWrapper Error (methods/users): ${fn}()` : "User Error";
const createSessionForUserId = async ({ userId, }) => {
    try {
        if (!userId)
            throw new Error("Invalid param 'userId'");
        const { users } = await createAdminClient();
        const data = await users.createSession(userId);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("createSessionForUserId"),
                description: JSON.stringify(err),
            },
        };
    }
};
const createToken = async ({ userId, length = 32, expire = 60 * 3, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.createToken(userId, length, expire);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("createToken"),
                description: JSON.stringify(err),
            },
        };
    }
};
const deletePrefsForUserId = async ({ userId, key, }) => {
    try {
        const { users } = await createAdminClient();
        const prefs = await users.getPrefs(userId);
        if (Object.prototype.hasOwnProperty.call(prefs, key)) {
            const { [key]: _, ...newPrefs } = prefs;
            const user = await users.updatePrefs(userId, newPrefs);
            return { data: user.prefs, error: null };
        }
        return { data: prefs, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("deletePrefsForUserId"),
                description: JSON.stringify(err),
            },
        };
    }
};
const deleteSessionForUserId = async ({ userId, sessionId, }) => {
    try {
        const { users } = await createAdminClient();
        await users.deleteSession(userId, sessionId);
        return { data: undefined, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("deleteSessionForUserId"),
                description: JSON.stringify(err),
            },
        };
    }
};
const deleteSessionsForUserId = async ({ userId, }) => {
    try {
        const { users } = await createAdminClient();
        await users.deleteSessions(userId);
        return { data: undefined, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("deleteSessionsForUserId"),
                description: JSON.stringify(err),
            },
        };
    }
};
const deleteUserId = async ({ userId, }) => {
    try {
        const { users } = await createAdminClient();
        await users.delete(userId);
        return { data: userId, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("deleteUserId"),
                description: JSON.stringify(err),
            },
        };
    }
};
const getAppUserForUserId = async ({ userId, }) => {
    try {
        const { users } = await createAdminClient();
        const { databases } = await createAdminClient();
        const user = await users.get(userId);
        const AppUserType = await getType({
            collName: userCollectionId,
            typeName: "AppUserType",
        });
        if (!AppUserType) {
            throw new Error("No AppUserType found. Returning null");
        }
        if (user.emailVerification || user.phoneVerification) {
            const { total, documents } = await databases.listDocuments(databaseId, userCollectionId, [
                Query.and([
                    Query.equal("user_id", user.$id),
                    Query.equal("deleted", false),
                ]),
            ]);
            if (total > 0) {
                return {
                    data: { ...user, customUser: documents[0] },
                    error: null,
                };
            }
        }
        return { data: null, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getAppUserForUserId"),
                description: JSON.stringify(err),
            },
        };
    }
};
const getCustomUsers = async ({ queries = [], includingDeleted = false, }) => {
    try {
        const { databases } = await createAdminClient();
        const combinedQueries = [
            ...queries,
            Query.equal("deleted", includingDeleted),
        ];
        const { total, documents } = await databases.listDocuments(databaseId, userCollectionId, combinedQueries);
        return {
            data: {
                total: total ?? 0,
                documents: documents ?? [],
            },
            error: null,
        };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getCustomUsers"),
                description: JSON.stringify(err),
            },
        };
    }
};
const getPrefsForUserId = async ({ userId, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.getPrefs(userId);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getPrefsForUserId"),
                description: JSON.stringify(err),
            },
        };
    }
};
/**
 * Retrieves a user by their ID.
 */
const getUserForUserId = async ({ userId, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.get(userId);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getUserForUserId"),
                description: JSON.stringify(err),
            },
        };
    }
};
const getUsers = async ({ queries = [], search = undefined, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.list(queries, search);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getUsers"),
                description: JSON.stringify(err),
            },
        };
    }
};
const listIdentities = async ({ queries, search, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.listIdentities(queries, search);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("listIdentities"),
                description: JSON.stringify(err),
            },
        };
    }
};
/**
 * Lists users with optional filters and search parameters.
 */
const listUsers = async ({ queries, search, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.list(queries, search);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("listUsers"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updatePrefsForUserId = async ({ userId, prefsObj, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.updatePrefs(userId, prefsObj);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updatePrefsForUserId"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateEmailVerificationForUserId = async ({ userId, status, }) => {
    try {
        if (typeof status !== "boolean") {
            throw new Error("Invalid param 'status'");
        }
        const { users } = await createAdminClient();
        const data = await users.updateEmailVerification(userId, status);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateEmailVerificationForUserId"),
                description: JSON.stringify(err),
            },
        };
    }
};
export { createSessionForUserId, createToken, deletePrefsForUserId, deleteSessionForUserId, deleteSessionsForUserId, deleteUserId, getAppUserForUserId, getCustomUsers, getPrefsForUserId, getUserForUserId, getUsers, listIdentities, listUsers, updatePrefsForUserId, updateEmailVerificationForUserId, };
