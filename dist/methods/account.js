"use server";
import { ID, Query } from "node-appwrite";
import { OAuthProvider } from "../enums";
import { createSessionClient, createAdminClient } from "../appwriteClients";
import { isValidJsonObject, isEmptyKeyValuePair } from "../utils";
import { cookieName, oauthSuccessPath, oauthFailurePath, verificationPath, signInPath, databaseId, userCollectionId, } from "../appwriteConfig";
import { cookies } from "next/headers";
import { host } from "../host";
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
const createVerification = async ({ verificationUrl = `${host}/${verificationPath}`, }) => {
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
        /*
         * Appwrite throws Error when the user is not logged in, so we have to return null for that case.
         */
        return null;
        //console.error("APW-WRAPPER - Error (methods/account): Error executing getUser():", err);
        //throw JSON.parse(JSON.stringify(err));
    }
};
/**
 * Retrieves the current verified user.
 */
const getVerifiedUser = async () => {
    try {
        const { account } = await createSessionClient();
        const { databases } = await createAdminClient();
        const user = await account.get();
        if (user.emailVerification || user.phoneVerification) {
            const { total, documents } = await databases.listDocuments(databaseId, userCollectionId, [Query.equal("user_id", user.$id)]);
            if (total) {
                return { ...user, ...documents[0] };
            }
        }
        return null;
    }
    catch (err) {
        /*
         * Appwrite throws Error when the user is not logged in, so we have to return null for that case.
         */
        return null;
        //console.error("APW-WRAPPER - Error (methods/account): Error executing getVerifiedUser():", err);
        //throw err;
    }
};
/**
 * Deletes a specific preference key for the current user.
 */
const deletePrefs = async ({ key, }) => {
    try {
        const { account } = await createSessionClient();
        const oldPrefs = await account.getPrefs();
        if (Object.prototype.hasOwnProperty.call(oldPrefs, key)) {
            const { [key]: _, ...newPrefs } = oldPrefs;
            await account.updatePrefs(newPrefs);
            return newPrefs;
        }
        return oldPrefs;
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
        return await account.getPrefs();
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing getPrefs():", err);
        throw err;
    }
};
/**
 * Updates preferences for the current user.
 */
const setPrefs = async ({ newPrefs }) => {
    try {
        if (isValidJsonObject(newPrefs)) {
            const { account } = await createSessionClient();
            const oldPrefs = await account.getPrefs();
            await account.updatePrefs(isEmptyKeyValuePair(oldPrefs) ? newPrefs : { ...oldPrefs, ...newPrefs });
        }
        else {
            throw new Error("Invalid JSON object");
        }
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/account): Error executing setPrefs():", err);
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
        const url = await account.createOAuth2Token(OAuthProvider[provider], `${host}/${successPath}`, `${host}/${failurePath}`);
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
export { createAccount, createEmailPasswordSession, createJWT, createOAuth2Token, createSession, createVerification, deletePrefs, deleteSession, deleteSessions, getPrefs, getSession, getUser, getVerifiedUser, listSessions, setPrefs, updateSession, updateVerification, };
