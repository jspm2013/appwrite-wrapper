"use server";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePhoneVerification = exports.createPhoneVerification = exports.createMagicURLSession = exports.createAnonymousSession = exports.updateRecovery = exports.createRecovery = exports.updatePassword = exports.updateStatus = exports.updateName = exports.updatePhone = exports.updateEmail = exports.updateVerification = exports.updateSession = exports.updatePrefs = exports.listSessions = exports.getUser = exports.getSession = exports.getPrefs = exports.getAppUser = exports.deleteSessions = exports.deleteSession = exports.deletePrefs = exports.createVerification = exports.createSession = exports.createOAuth2Token = exports.createJWT = exports.createEmailPasswordSession = exports.createAccount = void 0;
const node_appwrite_1 = require("node-appwrite");
const enums_1 = require("../enums");
const typeReader_1 = require("../collections/typeReader");
const appwriteClients_1 = require("../appwriteClients");
const utils_1 = require("../utils");
const appwriteConfig_1 = require("../appwriteConfig");
const headers_1 = require("next/headers");
const host_1 = require("../host");
/**
 * Creates a new account.
 */
const createAccount = async ({ email, password, name, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.create(node_appwrite_1.ID.unique(), email, password, name);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing createAccount():", err);
        throw err;
    }
};
exports.createAccount = createAccount;
/**
 * Creates a JWT token.
 */
const createJWT = async () => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.createJWT();
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing createJWT():", err);
        throw err;
    }
};
exports.createJWT = createJWT;
/**
 * Creates an email verification token.
 */
const createVerification = async ({ verificationUrl = `${host_1.hostExternal}/${appwriteConfig_1.verificationPath}`, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.createVerification(verificationUrl);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing createVerification():", err);
        throw err;
    }
};
exports.createVerification = createVerification;
/**
 * Deletes a specific session or the current session.
 */
const deleteSession = async (params = {}) => {
    const { sessionId = "current" } = params;
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        await account.deleteSession(sessionId);
        return appwriteConfig_1.signInPath;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing deleteSession():", err);
        throw err;
    }
};
exports.deleteSession = deleteSession;
/**
 * Getting a specific session or the current session.
 */
const getSession = async (params = {}) => {
    const { sessionId = "current" } = params;
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.getSession(sessionId);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing getSession():", err);
        throw err;
    }
};
exports.getSession = getSession;
/**
 * Updates a specific session or the current session.
 */
const updateSession = async (params = {}) => {
    const { sessionId = "current" } = params;
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.updateSession(sessionId);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing updateSession():", err);
        throw err;
    }
};
exports.updateSession = updateSession;
/**
 * Lists all sessions for the current user.
 */
const listSessions = async () => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.listSessions();
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing listSessions():", err);
        throw err;
    }
};
exports.listSessions = listSessions;
/**
 * Deletes all sessions for the current user.
 */
const deleteSessions = async () => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        await account.deleteSessions();
        return appwriteConfig_1.signInPath;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing deleteSessions():", err);
        throw err;
    }
};
exports.deleteSessions = deleteSessions;
/**
 * Retrieves the current user.
 */
const getUser = async () => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.get();
    }
    catch (err) {
        /*
         * Appwrite throws Error when the user has no valid (aka is not logged in), so we have to return null for that case (instead of returning the error).
         */
        return null;
    }
};
exports.getUser = getUser;
/**
 * Retrieves the currently authenticated and verified user, dynamically typed based on the generated schema.
 *
 * @returns {Promise<any | null>} - The user object enriched with custom user attributes, or `null` if not verified.
 */
const getAppUser = async () => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const user = await account.get();
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
                    node_appwrite_1.Query.equal("user_id", user.$id),
                    node_appwrite_1.Query.equal("deleted", false),
                ]),
            ]);
            if (total > 0) {
                return {
                    ...user,
                    customUser: documents[0],
                };
            }
        }
        return null;
    }
    catch (err) {
        /*
         * Appwrite throws Error when the user has no valid (aka is not logged in), so we have to return null for that case (instead of returning the error).
         */
        return null;
    }
};
exports.getAppUser = getAppUser;
/**
 * Deletes a specific preference key for the current user.
 */
const deletePrefs = async ({ key, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const prefs = await account.getPrefs();
        if (Object.prototype.hasOwnProperty.call(prefs, key)) {
            const { [key]: _, ...newPrefs } = prefs;
            const user = await account.updatePrefs(newPrefs);
            return user.prefs;
        }
        return prefs;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing deletePrefs():", err);
        throw err;
    }
};
exports.deletePrefs = deletePrefs;
/**
 * Retrieves all preferences for the current user.
 */
const getPrefs = async () => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        const prefs = await account.getPrefs();
        return prefs;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing getPrefs():", err);
        throw err;
    }
};
exports.getPrefs = getPrefs;
/**
 * Updates preferences for the current user.
 */
const updatePrefs = async ({ prefs, }) => {
    try {
        if ((0, utils_1.isValidJsonObject)(prefs)) {
            const { account } = await (0, appwriteClients_1.createSessionClient)();
            const oldPrefs = await account.getPrefs();
            const user = await account.updatePrefs((0, utils_1.isEmptyKeyValuePair)(oldPrefs) ? prefs : { ...oldPrefs, ...prefs });
            return user.prefs;
        }
        else {
            throw new Error("Invalid JSON object");
        }
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing updatePrefs():", err);
        throw err;
    }
};
exports.updatePrefs = updatePrefs;
/**
 * Updates the email verification for a specific user.
 */
const updateVerification = async ({ userId, secret, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.updateVerification(userId, secret);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing updateVerification():", err);
        throw err;
    }
};
exports.updateVerification = updateVerification;
/**
 * Creates a session for a user using email and password.
 */
const createEmailPasswordSession = async ({ email, password, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createAdminClient)();
        const session = await account.createEmailPasswordSession(email, password);
        (await (0, headers_1.cookies)()).set(appwriteConfig_1.cookieName, session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return session;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing createEmailPasswordSession():", err);
        throw err;
    }
};
exports.createEmailPasswordSession = createEmailPasswordSession;
/**
 * Creates an OAuth2 token for the user.
 */
const createOAuth2Token = async ({ provider, successPath = appwriteConfig_1.oauthSuccessPath, failurePath = appwriteConfig_1.oauthFailurePath, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createAdminClient)();
        const url = await account.createOAuth2Token(enums_1.OAuthProvider[provider], `${host_1.hostExternal}/${successPath}`, `${host_1.hostExternal}/${failurePath}`);
        return url;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing createOAuth2Token():", err);
        throw err;
    }
};
exports.createOAuth2Token = createOAuth2Token;
/**
 * Creates a session for a user by their ID and secret.
 */
const createSession = async ({ userId, secret, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createAdminClient)();
        const session = await account.createSession(userId, secret);
        (await (0, headers_1.cookies)()).set(appwriteConfig_1.cookieName, session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return session;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing createSession():", err);
        throw err;
    }
};
exports.createSession = createSession;
/**
 * Updates the email for the current user.
 */
const updateEmail = async ({ email, password, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.updateEmail(email, password);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing updateEmail():", err);
        throw err;
    }
};
exports.updateEmail = updateEmail;
/**
 * Updates the phone number for the current user.
 */
const updatePhone = async ({ phone, password, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.updatePhone(phone, password);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing updatePhone():", err);
        throw err;
    }
};
exports.updatePhone = updatePhone;
/**
 * Updates the name for the current user.
 */
const updateName = async ({ name }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.updateName(name);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing updateName():", err);
        throw err;
    }
};
exports.updateName = updateName;
/**
 * Updates the account status (block/unblock user).
 */
const updateStatus = async () => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.updateStatus();
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing updateStatus():", err);
        throw err;
    }
};
exports.updateStatus = updateStatus;
/**
 * Updates the password for the current user.
 */
const updatePassword = async ({ password, oldPassword, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.updatePassword(password, oldPassword);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing updatePassword():", err);
        throw err;
    }
};
exports.updatePassword = updatePassword;
/**
 * Creates a password recovery token.
 */
const createRecovery = async ({ email, url, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.createRecovery(email, url);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing createRecovery():", err);
        throw err;
    }
};
exports.createRecovery = createRecovery;
/**
 * Updates the password using a recovery token.
 */
const updateRecovery = async ({ userId, secret, password, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.updateRecovery(userId, secret, password);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing updateRecovery():", err);
        throw err;
    }
};
exports.updateRecovery = updateRecovery;
/**
 * Creates an anonymous session for the user.
 */
const createAnonymousSession = async () => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.createAnonymousSession();
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing createAnonymousSession():", err);
        throw err;
    }
};
exports.createAnonymousSession = createAnonymousSession;
/**
 * Creates a Magic URL session for the user.
 */
const createMagicURLSession = async ({ userId, email, url, phrase, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.createMagicURLToken(userId, email, url, phrase);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing createMagicURLSession():", err);
        throw err;
    }
};
exports.createMagicURLSession = createMagicURLSession;
/**
 * Creates a phone verification token.
 */
const createPhoneVerification = async () => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.createPhoneVerification();
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing createPhoneVerification():", err);
        throw err;
    }
};
exports.createPhoneVerification = createPhoneVerification;
/**
 * Confirms phone verification.
 */
const updatePhoneVerification = async ({ userId, secret, }) => {
    try {
        const { account } = await (0, appwriteClients_1.createSessionClient)();
        return await account.updatePhoneVerification(userId, secret);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing updatePhoneVerification():", err);
        throw err;
    }
};
exports.updatePhoneVerification = updatePhoneVerification;
