"use server";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVerification = exports.updateStatus = exports.updateSession = exports.updateRecovery = exports.updatePhoneVerification = exports.updatePhone = exports.updatePassword = exports.updateName = exports.updateEmail = exports.listSessions = exports.getUser = exports.getSession = exports.getCustomUser = exports.getAppUser = exports.deleteSessions = exports.deleteSession = exports.deletePrefs = exports.createVerification = exports.createSession = exports.createRecovery = exports.createPhoneVerification = exports.createOAuth2Token = exports.createMagicURLSession = exports.createJWT = exports.createEmailPasswordSession = exports.createAnonymousSession = exports.createAccount = exports.addPrefs = void 0;
const appwriteConfig_1 = require("../appwriteConfig");
const headers_1 = require("next/headers");
const host_1 = require("../host");
const enums_1 = require("../enums");
const exceptions_1 = require("../exceptions");
const node_appwrite_1 = require("node-appwrite");
const typeReader_1 = require("../collections/typeReader");
const appwriteClients_1 = require("../appwriteClients");
const addPrefs = async ({ prefs, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const currentPrefs = await account.getPrefs();
        // Ensure prefs is a valid JSON string
        let newPrefs = {};
        newPrefs = JSON.parse(prefs);
        if (typeof newPrefs !== "object" || Array.isArray(newPrefs)) {
            throw new Error("Invalid prefs format. Must be a stringified JSON object.");
        }
        const updatedPrefs = { ...currentPrefs, ...newPrefs };
        const user = await account.updatePrefs(updatedPrefs);
        return { data: user.prefs, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.addPrefs = addPrefs;
/*
 * Creates an account.
 */
const createAccount = async ({ email, password, name, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createAdminClient)();
        const data = await account.create(node_appwrite_1.ID.unique(), email, password, name);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createAccount = createAccount;
/*
 * Creates an anonymous session.
 */
const createAnonymousSession = async () => {
    try {
        const { account } = await (0, appwriteClients_1.createAdminClient)();
        const data = await account.createAnonymousSession();
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createAnonymousSession = createAnonymousSession;
/*
 * Creates an email-password session.
 */
const createEmailPasswordSession = async ({ email, password, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createAdminClient)();
        const data = await account.createEmailPasswordSession(email, password);
        (await (0, headers_1.cookies)()).set(appwriteConfig_1.cookieName, data.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createEmailPasswordSession = createEmailPasswordSession;
/*
 * Creates a JWT token.
 */
const createJWT = async () => {
    try {
        const { account } = await (0, appwriteClients_1.createAdminClient)();
        const data = await account.createJWT();
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createJWT = createJWT;
/*
 * Creates a Magic URL session.
 */
const createMagicURLSession = async ({ email, url, userId, phrase, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createAdminClient)();
        const data = await account.createMagicURLToken(userId || node_appwrite_1.ID.unique(), email, url, phrase);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createMagicURLSession = createMagicURLSession;
/*
 * Creates an OAuth2 token.
 */
const createOAuth2Token = async ({ provider, successPath = appwriteConfig_1.oauthSuccessPath, failurePath = appwriteConfig_1.oauthFailurePath, scopes = [], }) => {
    try {
        const { account } = await (0, appwriteClients_1.createAdminClient)();
        const data = await account.createOAuth2Token(enums_1.OAuthProvider[provider], `${host_1.hostExternal}/${successPath}`, `${host_1.hostExternal}/${failurePath}`, scopes);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createOAuth2Token = createOAuth2Token;
/*
 * Creates a phone verification token.
 */
const createPhoneVerification = async () => {
    try {
        const { account } = await (0, appwriteClients_1.createAdminClient)();
        const data = await account.createPhoneVerification();
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createPhoneVerification = createPhoneVerification;
/*
 * Sends a password recovery email.
 */
const createRecovery = async ({ email, url, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createAdminClient)();
        const data = await account.createRecovery(email, url);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createRecovery = createRecovery;
/*
 * Creates a session using user ID and secret.
 */
const createSession = async ({ userId, secret, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createAdminClient)();
        const data = await account.createSession(userId, secret);
        (await (0, headers_1.cookies)()).set(appwriteConfig_1.cookieName, data.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createSession = createSession;
/*
 * Creates an email verification token.
 */
const createVerification = async ({ verificationUrl = `${host_1.hostExternal}/${appwriteConfig_1.verificationPath}`, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createAdminClient)();
        const data = await account.createVerification(verificationUrl);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createVerification = createVerification;
const deletePrefs = async ({ keys, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const prefs = await account.getPrefs();
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
        const user = await account.updatePrefs(newPrefs);
        return { data: user.prefs, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.deletePrefs = deletePrefs;
/*
 * Deletes a session.
 */
const deleteSession = async ({ sessionId = "current", } = {}) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        await account.deleteSession(sessionId);
        return { data: appwriteConfig_1.signInPath, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.deleteSession = deleteSession;
/*
 * Deletes all sessions for the current user.
 */
const deleteSessions = async () => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        await account.deleteSessions();
        return { data: appwriteConfig_1.signInPath, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.deleteSessions = deleteSessions;
/*
 * Retrieves the authenticated and verified user.
 */
const getAppUser = async () => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const user = await account.get();
        if (!user) {
            throw new Error("No user found in database.");
        }
        const AppUserType = await (0, typeReader_1.getType)({
            collName: appwriteConfig_1.userCollectionId,
            typeName: "AppUserType",
        });
        if (!AppUserType) {
            throw new Error("No AppUser Type found.");
        }
        if (user.emailVerification || user.phoneVerification) {
            const { total, documents } = await databases.listDocuments(appwriteConfig_1.databaseId, appwriteConfig_1.userCollectionId, [
                node_appwrite_1.Query.and([
                    node_appwrite_1.Query.equal("user_id", user.$id),
                    node_appwrite_1.Query.equal("deleted", false),
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
exports.getAppUser = getAppUser;
/*
 * Retrieves the authenticated and verified user.
 */
const getCustomUser = async () => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const user = await account.get();
        if (!user) {
            throw new Error("No user found in database.");
        }
        const { total, documents } = await databases.listDocuments(appwriteConfig_1.databaseId, appwriteConfig_1.userCollectionId, [
            node_appwrite_1.Query.and([
                node_appwrite_1.Query.equal("user_id", user.$id),
                node_appwrite_1.Query.equal("deleted", false),
            ]),
        ]);
        if (total === 1) {
            return {
                data: documents[0],
                error: null,
            };
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
exports.getCustomUser = getCustomUser;
/*
 * Retrieves a specific session or the current session.
 */
const getSession = async ({ sessionId = "current", } = {}) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const data = await account.getSession(sessionId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.getSession = getSession;
/*
 * Retrieves user details.
 */
const getUser = async () => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const data = await account.get();
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.getUser = getUser;
/*
 * Lists all sessions for the current user.
 */
const listSessions = async () => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const data = await account.listSessions();
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.listSessions = listSessions;
/*
 * Updates user email.
 */
const updateEmail = async ({ email, password, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const data = await account.updateEmail(email, password);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateEmail = updateEmail;
/*
 * Updates user name.
 */
const updateName = async ({ name, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const data = await account.updateName(name);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateName = updateName;
/*
 * Updates user password.
 */
const updatePassword = async ({ password, oldPassword, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const data = await account.updatePassword(password, oldPassword);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updatePassword = updatePassword;
/*
 * Updates user phone number.
 */
const updatePhone = async ({ phone, password, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const data = await account.updatePhone(phone, password);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updatePhone = updatePhone;
/*
 * Confirms phone verification.
 */
const updatePhoneVerification = async ({ userId, secret, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const data = await account.updatePhoneVerification(userId, secret);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updatePhoneVerification = updatePhoneVerification;
/*
 * Updates the password using a recovery token.
 */
const updateRecovery = async ({ userId, secret, password, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const data = await account.updateRecovery(userId, secret, password);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateRecovery = updateRecovery;
/*
 * Updates a specific session or the current session.
 */
const updateSession = async ({ sessionId = "current", }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const data = await account.updateSession(sessionId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateSession = updateSession;
/*
 * Updates user status.
 */
const updateStatus = async () => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const data = await account.updateStatus();
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateStatus = updateStatus;
/*
 * Updates email verification.
 */
const updateVerification = async ({ userId, secret, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const data = await account.updateVerification(userId, secret);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateVerification = updateVerification;
