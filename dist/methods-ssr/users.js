"use server";
import { Query } from "node-appwrite";
import { handleApwError } from "../exceptions";
import { getType } from "../collections/typeReader";
import { createAdminClient } from "../appwriteClients";
import { databaseId, userCollectionId } from "../appwriteConfig";
const createSessionForUserId = async ({ userId, }) => {
    try {
        if (!userId)
            throw new Error("Invalid param 'userId'");
        const { users } = await createAdminClient();
        const data = await users.createSession(userId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createToken = async ({ userId, length = 32, expire = 60 * 3, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.createToken(userId, length, expire);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
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
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const deleteSessionForUserId = async ({ userId, sessionId, }) => {
    try {
        const { users } = await createAdminClient();
        await users.deleteSession(userId, sessionId);
        return { data: undefined, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const deleteSessionsForUserId = async ({ userId, }) => {
    try {
        const { users } = await createAdminClient();
        await users.deleteSessions(userId);
        return { data: undefined, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const deleteUserId = async ({ userId, }) => {
    try {
        const { users } = await createAdminClient();
        await users.delete(userId);
        return { data: userId, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
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
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
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
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const getPrefsForUserId = async ({ userId, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.getPrefs(userId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
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
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const getUsers = async ({ queries = [], search = undefined, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.list(queries, search);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const listIdentities = async ({ queries, search, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.listIdentities(queries, search);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
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
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updatePrefsForUserId = async ({ userId, prefsObj, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.updatePrefs(userId, prefsObj);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
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
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateStatus = async ({ userId, status, }) => {
    try {
        if (typeof status !== "boolean") {
            throw new Error("Invalid param 'status'");
        }
        const { users } = await createAdminClient();
        const data = await users.updateStatus(userId, status);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
export { createSessionForUserId, createToken, deletePrefsForUserId, deleteSessionForUserId, deleteSessionsForUserId, deleteUserId, getAppUserForUserId, getCustomUsers, getPrefsForUserId, getUserForUserId, getUsers, listIdentities, listUsers, updateEmailVerificationForUserId, updatePrefsForUserId, updateStatus, };
