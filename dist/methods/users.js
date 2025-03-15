"use server";
import { Query } from "node-appwrite";
import { handleApwError } from "../exceptions";
import { getType } from "../collections/typeReader";
import { createAdminClient } from "../appwriteClients";
import { databaseId, userCollectionId } from "../appwriteConfig";
let AppUserType;
let UserType;
const init = async () => {
    AppUserType = await getType({
        typeFileName: "user", // without extension
        typeName: "AppUserType",
    });
    if (!AppUserType) {
        throw new Error("No Type 'AppUserType' found (service: account).");
    }
    UserType = await getType({
        typeFileName: "user", // without extension
        typeName: "UserType",
    });
    if (!UserType) {
        throw new Error("No Type 'UserType' found (service: account).");
    }
};
init();
const addPrefsForUserId = async ({ userId, prefs, }) => {
    try {
        const { users } = await createAdminClient();
        const currentPrefs = await users.getPrefs(userId);
        // Ensure prefs is a valid JSON string
        let newPrefs = {};
        newPrefs = JSON.parse(prefs);
        if (typeof newPrefs !== "object" || Array.isArray(newPrefs)) {
            throw new Error("Invalid prefs format. Must be a stringified JSON object.");
        }
        const updatedPrefs = { ...currentPrefs, ...newPrefs };
        const user = await users.updatePrefs(userId, updatedPrefs);
        return { data: user.prefs, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
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
const deletePrefsForUserId = async ({ userId, keys, }) => {
    try {
        const { users } = await createAdminClient();
        const prefs = await users.getPrefs(userId);
        // Convert keys to an array if it's a stringified JSON
        let keysToDelete = [];
        if (typeof keys === "string") {
            try {
                const parsedKeys = JSON.parse(keys);
                keysToDelete = Array.isArray(parsedKeys) ? parsedKeys : [parsedKeys];
            }
            catch {
                keysToDelete = [keys]; // Treat as a single key if parsing fails
            }
        }
        else {
            keysToDelete = keys;
        }
        // Filter out the keys that need to be removed
        const newPrefs = Object.fromEntries(Object.entries(prefs).filter(([key]) => !keysToDelete.includes(key)));
        // Update user preferences
        const user = await users.updatePrefs(userId, newPrefs);
        return { data: user.prefs, error: null };
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
        return { data: userId, error: null };
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
        return { data: userId, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const deleteUserForUserId = async ({ userId, }) => {
    try {
        const { users } = await createAdminClient();
        const user = await users.get(userId);
        if (user.status) {
            throw new Error("Cannot delete user with status active");
        }
        if (user.labels.includes("owner")) {
            throw new Error("Cannot delete high privilege user");
        }
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
const getAppUserForUserId = async ({ userId, queries = [], includingDeleted = undefined, }) => {
    try {
        const { users } = await createAdminClient();
        const { databases } = await createAdminClient();
        const user = await users.get(userId);
        if (!user) {
            throw new Error("No user found in database.");
        }
        const { total, documents } = await databases.listDocuments(databaseId, userCollectionId, [
            includingDeleted === undefined
                ? queries.length
                    ? Query.and([...queries, Query.equal("user_id", userId)])
                    : Query.equal("user_id", userId)
                : Query.and([
                    ...queries,
                    Query.equal("user_id", userId),
                    Query.equal("deleted", includingDeleted),
                ]),
        ]);
        if (total === 1) {
            return {
                data: {
                    ...user,
                    customUser: documents[0],
                },
                error: null,
            };
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
/*
 * Retrieves an App User (native appwrite user extended by custom user (key = customUser)) by their ID.
 */
const getCustomUserForUserId = async ({ userId, queries = [], includingDeleted = undefined, }) => {
    try {
        const { databases } = await createAdminClient();
        const { total, documents } = await databases.listDocuments(databaseId, userCollectionId, [
            includingDeleted === undefined
                ? queries.length
                    ? Query.and([...queries, Query.equal("user_id", userId)])
                    : Query.equal("user_id", userId)
                : Query.and([
                    ...queries,
                    Query.equal("user_id", userId),
                    Query.equal("deleted", includingDeleted),
                ]),
        ]);
        return {
            data: total === 1 ? documents[0] : null,
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
/*
 * Retrieves a user by their ID.
 *
 * NATIVE APPWRITE USER (BUT NOT NECESSARILY VERIFIED) extended by custom user (key = customUser)
 * ...user for lists/displaying all app users
 *
 */
const getUserForUserId = async ({ userId, queries = [], includingDeleted = undefined, }) => {
    try {
        const { users } = await createAdminClient();
        const { databases } = await createAdminClient();
        const user = await users.get(userId);
        if (!user) {
            throw new Error("No session user found in database.");
        }
        const { total, documents } = await databases.listDocuments(databaseId, userCollectionId, [
            includingDeleted === undefined
                ? queries.length
                    ? Query.and([...queries, Query.equal("user_id", userId)])
                    : Query.equal("user_id", userId)
                : Query.and([
                    ...queries,
                    Query.equal("user_id", userId),
                    Query.equal("deleted", includingDeleted),
                ]),
        ]);
        return {
            data: {
                ...user,
                customUser: total === 1 ? documents[0] : {},
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
const listAppUsers = async ({ queries = [], search, includingDeleted = undefined, }) => {
    try {
        // Run both queries in parallel for better performance
        const [usersResult, customUsersResult] = await Promise.all([
            listUsers({ queries, search }),
            listCustomUsers({ queries, includingDeleted }),
        ]);
        // Check for errors
        if (usersResult.error)
            return { data: null, error: usersResult.error };
        if (customUsersResult.error)
            return { data: null, error: customUsersResult.error };
        const usersList = usersResult.data?.users ?? [];
        const customUsersList = customUsersResult.data?.documents ?? [];
        // Convert customUsersList to a Map for O(1) lookups
        const customUsersMap = new Map(customUsersList.map((customUser) => [customUser.user_id, customUser]));
        // Merge users with customUser data
        const appUsers = usersList.map((user) => ({
            ...user,
            customUser: customUsersMap.get(user.$id) || {}, // Add customUser if found, otherwise {}
        }));
        return {
            data: { total: appUsers.length, documents: appUsers ?? [] },
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
const listCustomUsers = async ({ queries = [], includingDeleted = undefined, }) => {
    try {
        const { databases } = await createAdminClient();
        const query = queries.length
            ? includingDeleted === undefined
                ? queries
                : [Query.and([...queries, Query.equal("deleted", includingDeleted)])]
            : includingDeleted === undefined
                ? []
                : [Query.equal("deleted", includingDeleted)];
        const data = await databases.listDocuments(databaseId, userCollectionId, query);
        return {
            data,
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
const listIdentities = async ({ queries = [], search, }) => {
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
const listIdentitiesForUserId = async ({ userId, queries = [], search, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.listIdentities(queries.length
            ? [Query.and([...queries, Query.equal("userId", userId)])]
            : [Query.equal("userId", userId)], search);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const listSessionsForUserId = async ({ userId, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.listSessions(userId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateEmailForUserId = async ({ userId, email, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.updateEmail(userId, email);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateEmailVerificationForUserId = async ({ userId, emailVerification, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.updateEmailVerification(userId, emailVerification);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const addLabelsForUserId = async ({ userId, labels, }) => {
    try {
        const { users } = await createAdminClient();
        const existingUser = await users.get(userId);
        const existingLabels = existingUser?.labels || [];
        let labelsToAdd = [];
        if (typeof labels === "string" && /^[a-zA-Z0-9]{1,36}$/.test(labels)) {
            labelsToAdd = [labels];
        }
        else if (Array.isArray(labels)) {
            if (labels.some((label) => typeof label !== "string")) {
                throw new Error("Invalid param 'labels': Array items must be strings.");
            }
            if (labels.some((label) => !/^[a-zA-Z0-9]{1,36}$/.test(label))) {
                throw new Error("Invalid param 'labels': Labels must be 1-36 alphanumeric characters.");
            }
            labelsToAdd = labels;
        }
        else {
            throw new Error("Invalid param 'labels': Must be a string or string array.");
        }
        const newLabels = [...existingLabels];
        labelsToAdd.forEach((label) => {
            if (!newLabels.includes(label)) {
                newLabels.push(label);
            }
        });
        const data = await users.updateLabels(userId, newLabels);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
/*
 * Removes labels for a user by their ID.
 */
const deleteLabelsForUserId = async ({ userId, labels, }) => {
    try {
        const { users } = await createAdminClient();
        const existingUser = await users.get(userId);
        const existingLabels = existingUser?.labels || [];
        let labelsToRemove = [];
        if (typeof labels === "string" && /^[a-zA-Z0-9]{1,36}$/.test(labels)) {
            labelsToRemove = [labels];
        }
        else if (Array.isArray(labels)) {
            if (labels.some((label) => typeof label !== "string")) {
                throw new Error("Invalid param 'labels': Array items must be strings.");
            }
            if (labels.some((label) => !/^[a-zA-Z0-9]{1,36}$/.test(label))) {
                throw new Error("Invalid param 'labels': Labels must be 1-36 alphanumeric characters.");
            }
            labelsToRemove = labels;
        }
        else {
            throw new Error("Invalid param 'labels': Must be a string or string array.");
        }
        const newLabels = existingLabels.filter((label) => !labelsToRemove.includes(label));
        const data = await users.updateLabels(userId, newLabels);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateNameForUserId = async ({ userId, name, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.updateName(userId, name);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updatePasswordForUserId = async ({ userId, password, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.updatePassword(userId, password);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updatePhoneForUserId = async ({ userId, phone, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.updatePhone(userId, phone);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updatePhoneVerificationForUserId = async ({ userId, phoneVerification, }) => {
    try {
        const { users } = await createAdminClient();
        const data = await users.updatePhoneVerification(userId, phoneVerification);
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
        const user = await users.get(userId);
        if (user.labels.includes("owner")) {
            throw new Error("Cannot update status for high privilege user");
        }
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
export { addLabelsForUserId, addPrefsForUserId, createSessionForUserId, createToken, deleteLabelsForUserId, deletePrefsForUserId, deleteSessionForUserId, deleteSessionsForUserId, deleteUserForUserId, getAppUserForUserId, // INcl. deleted=false as default
getCustomUserForUserId, // INcl. deleted=false as default
getUserForUserId, // INcl. deleted=false as default
listAppUsers, // INcl. deleted=false as default
listCustomUsers, // INcl. deleted=false as default
listUsers, // INcl. deleted=false as default
listIdentities, listIdentitiesForUserId, listSessionsForUserId, updateEmailForUserId, updateEmailVerificationForUserId, updateNameForUserId, updatePasswordForUserId, updatePhoneForUserId, updatePhoneVerificationForUserId, updateStatusForUserId, };
