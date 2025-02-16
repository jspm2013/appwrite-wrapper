"use server";
import { ID, Query } from "node-appwrite";
import { OAuthProvider } from "../enums";
import { getType } from "../collections/typeReader";
import { createSessionClient, createAdminClient } from "../appwriteClients";
import { isValidJsonObject, isEmptyKeyValuePair } from "../utils";
import { cookieName, oauthSuccessPath, oauthFailurePath, verificationPath, signInPath, databaseId, userCollectionId, } from "../appwriteConfig";
import { cookies } from "next/headers";
import { hostExternal } from "../host";
/**
 * Creates a new account.
 */
const createAccount = async ({ email, password, name, }) => {
    try {
        const { account } = await createSessionClient();
        return await account.create(ID.unique(), email, password, name);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing createAccount():", err);
        throw err;
    }
};
/**
 * Creates a JWT token.
 */
const createJWT = async () => {
    try {
        const { account } = await createSessionClient();
        return await account.createJWT();
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing createJWT():", err);
        throw err;
    }
};
/**
 * Creates an email verification token.
 */
const createVerification = async ({ verificationUrl = `${hostExternal}/${verificationPath}`, }) => {
    try {
        const { account } = await createSessionClient();
        return await account.createVerification(verificationUrl);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing createVerification():", err);
        throw err;
    }
};
/**
 * Deletes a specific session or the current session.
 */
const deleteSession = async (params = {}) => {
    const { sessionId = "current" } = params;
    try {
        const { account } = await createSessionClient();
        await account.deleteSession(sessionId);
        return signInPath;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing deleteSession():", err);
        throw err;
    }
};
/**
 * Getting a specific session or the current session.
 */
const getSession = async (params = {}) => {
    const { sessionId = "current" } = params;
    try {
        const { account } = await createSessionClient();
        return await account.getSession(sessionId);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing getSession():", err);
        throw err;
    }
};
/**
 * Updates a specific session or the current session.
 */
const updateSession = async (params = {}) => {
    const { sessionId = "current" } = params;
    try {
        const { account } = await createSessionClient();
        return await account.updateSession(sessionId);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing updateSession():", err);
        throw err;
    }
};
/**
 * Lists all sessions for the current user.
 */
const listSessions = async () => {
    try {
        const { account } = await createSessionClient();
        return await account.listSessions();
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing listSessions():", err);
        throw err;
    }
};
/**
 * Deletes all sessions for the current user.
 */
const deleteSessions = async () => {
    try {
        const { account } = await createSessionClient();
        await account.deleteSessions();
        return signInPath;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing deleteSessions():", err);
        throw err;
    }
};
/**
 * Retrieves the current user.
 */
const getUser = async () => {
    try {
        const { account } = await createSessionClient();
        return await account.get();
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing getUser():", err);
        /*
         * Appwrite throws Error when the user is not logged in, so we have to return null for that case (instead of returning the error).
         */
        return null;
    }
};
/**
 * Retrieves the currently authenticated and verified user, dynamically typed based on the generated schema.
 *
 * @returns {Promise<any | null>} - The user object enriched with custom user attributes, or `null` if not verified.
 */
const getAppUser = async () => {
    try {
        const { account } = await createSessionClient();
        const { databases } = await createAdminClient();
        const user = await account.get();
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
                    ...user,
                    customUser: documents[0],
                };
            }
        }
        return null;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing getAppUser():", err);
        /*
         * Appwrite throws Error when the user is not logged in, so we have to return null for that case (instead of returning the error).
         */
        return null;
    }
};
/**
 * Deletes a specific preference key for the current user.
 */
const deletePrefs = async ({ key, }) => {
    try {
        const { account } = await createSessionClient();
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
/**
 * Retrieves all preferences for the current user.
 */
const getPrefs = async () => {
    try {
        const { account } = await createSessionClient();
        const prefs = await account.getPrefs();
        return prefs;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing getPrefs():", err);
        throw err;
    }
};
/**
 * Updates preferences for the current user.
 */
const updatePrefs = async ({ prefs, }) => {
    try {
        if (isValidJsonObject(prefs)) {
            const { account } = await createSessionClient();
            const oldPrefs = await account.getPrefs();
            const { updatePrefs: setPrefs } = account;
            const user = await setPrefs(isEmptyKeyValuePair(oldPrefs) ? prefs : { ...oldPrefs, ...prefs });
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
/**
 * Updates the email verification for a specific user.
 */
const updateVerification = async ({ userId, secret, }) => {
    try {
        const { account } = await createSessionClient();
        return await account.updateVerification(userId, secret);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing updateVerification():", err);
        throw err;
    }
};
/**
 * Creates a session for a user using email and password.
 */
const createEmailPasswordSession = async ({ email, password, }) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(email, password);
        (await cookies()).set(cookieName, session.secret, {
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
/**
 * Creates an OAuth2 token for the user.
 */
const createOAuth2Token = async ({ provider, successPath = oauthSuccessPath, failurePath = oauthFailurePath, }) => {
    try {
        const { account } = await createAdminClient();
        const url = await account.createOAuth2Token(OAuthProvider[provider], `${hostExternal}/${successPath}`, `${hostExternal}/${failurePath}`);
        return url;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing createOAuth2Token():", err);
        throw err;
    }
};
/**
 * Creates a session for a user by their ID and secret.
 */
const createSession = async ({ userId, secret, }) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createSession(userId, secret);
        (await cookies()).set(cookieName, session.secret, {
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
/**
 * Updates the email for the current user.
 */
const updateEmail = async ({ email, password, }) => {
    try {
        const { account } = await createSessionClient();
        return await account.updateEmail(email, password);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing updateEmail():", err);
        throw err;
    }
};
/**
 * Updates the phone number for the current user.
 */
const updatePhone = async ({ phone, password, }) => {
    try {
        const { account } = await createSessionClient();
        return await account.updatePhone(phone, password);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing updatePhone():", err);
        throw err;
    }
};
/**
 * Updates the name for the current user.
 */
const updateName = async ({ name }) => {
    try {
        const { account } = await createSessionClient();
        return await account.updateName(name);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing updateName():", err);
        throw err;
    }
};
export { createAccount, createEmailPasswordSession, createJWT, createOAuth2Token, createSession, createVerification, deletePrefs, deleteSession, deleteSessions, getAppUser, getPrefs, getSession, getUser, listSessions, updatePrefs, updateSession, updateVerification, updateEmail, updatePhone, updateName, };
