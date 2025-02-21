"use server";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusForUserId = exports.updatePhoneVerificationForUserId = exports.updatePhoneForUserId = exports.updatePasswordForUserId = exports.updateNameForUserId = exports.updateEmailVerificationForUserId = exports.updateEmailForUserId = exports.listUsers = exports.listSessionsForUserId = exports.listIdentitiesForUserId = exports.listIdentities = exports.listCustomUsers = exports.getUserForUserId = exports.getCustomUserForUserId = exports.getAppUserForUserId = exports.deleteUserForUserId = exports.deleteSessionsForUserId = exports.deleteSessionForUserId = exports.deletePrefsForUserId = exports.deleteLabelsForUserId = exports.createToken = exports.createSessionForUserId = exports.addPrefsForUserId = exports.addLabelsForUserId = void 0;
const node_appwrite_1 = require("node-appwrite");
const exceptions_1 = require("../exceptions");
const typeReader_1 = require("../collections/typeReader");
const appwriteClients_1 = require("../appwriteClients");
const appwriteConfig_1 = require("../appwriteConfig");
const addPrefsForUserId = async ({ userId, prefs, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
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
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.addPrefsForUserId = addPrefsForUserId;
const createSessionForUserId = async ({ userId, }) => {
    try {
        if (!userId)
            throw new Error("Invalid param 'userId'");
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const data = await users.createSession(userId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createSessionForUserId = createSessionForUserId;
const createToken = async ({ userId, length = 32, expire = 60 * 3, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const data = await users.createToken(userId, length, expire);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createToken = createToken;
const deletePrefsForUserId = async ({ userId, keys, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
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
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.deletePrefsForUserId = deletePrefsForUserId;
const deleteSessionForUserId = async ({ userId, sessionId, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        await users.deleteSession(userId, sessionId);
        return { data: userId, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.deleteSessionForUserId = deleteSessionForUserId;
const deleteSessionsForUserId = async ({ userId, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        await users.deleteSessions(userId);
        return { data: userId, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.deleteSessionsForUserId = deleteSessionsForUserId;
const deleteUserForUserId = async ({ userId, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        await users.delete(userId);
        return { data: userId, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.deleteUserForUserId = deleteUserForUserId;
const getAppUserForUserId = async ({ userId, includingDeleted = false, }) => {
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
                    node_appwrite_1.Query.equal("user_id", userId),
                    node_appwrite_1.Query.equal("deleted", includingDeleted),
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
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.getAppUserForUserId = getAppUserForUserId;
/*
 * Retrieves an App User (native appwrite user extended by custom user (key = customUser)) by their ID.
 */
const getCustomUserForUserId = async ({ userId, queries = [], includingDeleted = false, }) => {
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
                    ...queries,
                    node_appwrite_1.Query.equal("user_id", userId),
                    node_appwrite_1.Query.equal("deleted", includingDeleted),
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
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.getCustomUserForUserId = getCustomUserForUserId;
const listCustomUsers = async ({ queries = [], includingDeleted = false, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const combinedQueries = [
            ...queries,
            node_appwrite_1.Query.equal("deleted", includingDeleted),
        ];
        const { total, documents } = await databases.listDocuments(appwriteConfig_1.databaseId, appwriteConfig_1.userCollectionId, combinedQueries);
        return {
            data: {
                total: total,
                documents: documents,
            },
            error: null,
        };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.listCustomUsers = listCustomUsers;
/*
 * Retrieves a user by their ID.
 */
const getUserForUserId = async ({ userId, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const data = await users.get(userId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.getUserForUserId = getUserForUserId;
const listIdentities = async ({ queries = [], search, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const data = await users.listIdentities(queries, search);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.listIdentities = listIdentities;
const listIdentitiesForUserId = async ({ userId, queries = [], search, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const userQueries = [
            node_appwrite_1.Query.and([...queries, node_appwrite_1.Query.equal("userId", userId)]),
        ];
        const data = await users.listIdentities(userQueries, search);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.listIdentitiesForUserId = listIdentitiesForUserId;
const listSessionsForUserId = async ({ userId, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const data = await users.listSessions(userId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.listSessionsForUserId = listSessionsForUserId;
const listUsers = async ({ queries, search, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const data = await users.list(queries, search);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.listUsers = listUsers;
const updateEmailForUserId = async ({ userId, email, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const data = await users.updateEmail(userId, email);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateEmailForUserId = updateEmailForUserId;
const updateEmailVerificationForUserId = async ({ userId, status, }) => {
    try {
        if (typeof status !== "boolean") {
            throw new Error("Invalid param 'status'");
        }
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const data = await users.updateEmailVerification(userId, status);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateEmailVerificationForUserId = updateEmailVerificationForUserId;
const addLabelsForUserId = async ({ userId, labels, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
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
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.addLabelsForUserId = addLabelsForUserId;
/*
 * Removes labels for a user by their ID.
 */
const deleteLabelsForUserId = async ({ userId, labels, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
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
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.deleteLabelsForUserId = deleteLabelsForUserId;
const updateNameForUserId = async ({ userId, name, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const data = await users.updateName(userId, name);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateNameForUserId = updateNameForUserId;
const updatePasswordForUserId = async ({ userId, password, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const data = await users.updatePassword(userId, password);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updatePasswordForUserId = updatePasswordForUserId;
const updatePhoneForUserId = async ({ userId, phone, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const data = await users.updatePhone(userId, phone);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updatePhoneForUserId = updatePhoneForUserId;
const updatePhoneVerificationForUserId = async ({ userId, name, }) => {
    try {
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const data = await users.updateName(userId, name);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updatePhoneVerificationForUserId = updatePhoneVerificationForUserId;
const updateStatusForUserId = async ({ userId, status, }) => {
    try {
        if (typeof status !== "boolean") {
            throw new Error("Invalid param 'status'");
        }
        const { users } = await (0, appwriteClients_1.createAdminClient)();
        const data = await users.updateStatus(userId, status);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateStatusForUserId = updateStatusForUserId;
