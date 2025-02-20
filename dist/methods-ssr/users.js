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
const updateStatusForUserId = async ({ userId, status, }) => {
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
const updateLabels = async ({ userId, labels, }) => {
    try {
        const { users } = await createAdminClient();
        let updatedLabels = [];
        // Check if labels is an array, string, or JSON object
        if (Array.isArray(labels)) {
            if (labels.some((label) => typeof label !== "string")) {
                throw new Error("Invalid param 'labels': Array items must be strings.");
            }
            if (labels.some((label) => !/^[a-zA-Z0-9]{1,36}$/.test(label))) {
                throw new Error("Invalid param 'labels': Labels must be 1-36 alphanumeric characters.");
            }
            updatedLabels = labels; // Replace existing labels with the provided array
        }
        else if (typeof labels === "string" &&
            /^[a-zA-Z0-9]{1,36}$/.test(labels)) {
            // Single string label
            const existingUser = await users.get(userId);
            const existingLabels = existingUser?.labels || [];
            if (!existingLabels.includes(labels)) {
                updatedLabels = [...existingLabels, labels]; // Add if not exists
            }
            else {
                updatedLabels = existingLabels;
            }
        }
        else if (typeof labels === "object" && labels !== null) {
            // JSON object for add/remove
            const key = Object.keys(labels)[0];
            const value = labels[key];
            if (typeof value !== "string" || !/^[a-zA-Z0-9]{1,36}$/.test(value)) {
                throw new Error("Invalid param 'labels': JSON value must be 1-36 alphanumeric characters.");
            }
            const existingUser = await users.get(userId);
            const existingLabels = existingUser?.labels || [];
            if (key === "add") {
                if (!existingLabels.includes(value)) {
                    updatedLabels = [...existingLabels, value];
                }
                else {
                    updatedLabels = existingLabels;
                }
            }
            else if (key === "remove") {
                updatedLabels = existingLabels.filter((label) => label !== value);
            }
            else {
                throw new Error("Invalid param 'labels': JSON key must be 'add' or 'remove'.");
            }
        }
        else {
            throw new Error("Invalid param 'labels': Must be an array, string, or JSON object.");
        }
        const data = await users.updateLabels(userId, updatedLabels);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
export { createSessionForUserId, createToken, deletePrefsForUserId, deleteSessionForUserId, deleteSessionsForUserId, deleteUserId, getAppUserForUserId, getCustomUsers, getPrefsForUserId, getUserForUserId, getUsers, listIdentities, listUsers, updateEmailVerificationForUserId, updateLabels, updatePrefsForUserId, updateStatusForUserId, };
