"use server";
import { cookieName, signInPath, databaseId, oauthSuccessPath, oauthFailurePath, verificationPath, userCollectionId, } from "../appwriteConfig";
import { cookies } from "next/headers";
import { hostExternal } from "../host";
import { OAuthProvider } from "../enums";
import { handleApwError } from "../exceptions";
import { ID, Query } from "node-appwrite";
import { getType } from "../collections/typeReader";
import { createSessionClient, createAdminClient } from "../appwriteClients";
let ApwUserType;
let UserType;
const init = async () => {
    ApwUserType = await getType({
        typeFileName: "user", // without extension
        typeName: "ApwUserType",
    });
    if (!ApwUserType) {
        throw new Error("No Type 'ApwUserType' found (service: account).");
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
const addPrefs = async ({ prefs, }) => {
    try {
        const { account } = await createSessionClient();
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
            error: await handleApwError({ error }),
        };
    }
};
/*
 * Creates an account.
 */
const createAccount = async ({ email, password, name, }) => {
    try {
        const { account } = await createAdminClient();
        const data = await account.create(ID.unique(), email, password, name);
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
 * Creates an anonymous session.
 */
const createAnonymousSession = async () => {
    try {
        const { account } = await createAdminClient();
        const data = await account.createAnonymousSession();
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
 * Creates an email-password session.
 */
const createEmailPasswordSession = async ({ email, password, }) => {
    try {
        const { account } = await createAdminClient();
        const data = await account.createEmailPasswordSession(email, password);
        (await cookies()).set(cookieName, data.secret, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            expires: new Date(data.expire),
            path: "/",
        });
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
 * Creates a JWT token.
 */
const createJWT = async () => {
    try {
        const { account } = await createAdminClient();
        const data = await account.createJWT();
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
 * Creates a Magic URL session.
 */
const createMagicURLSession = async ({ email, url, userId, phrase, }) => {
    try {
        const { account } = await createAdminClient();
        const data = await account.createMagicURLToken(userId || ID.unique(), email, url, phrase);
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
 * Creates an OAuth2 token.
 */
const createOAuth2Token = async ({ provider, successPath = oauthSuccessPath, failurePath = oauthFailurePath, scopes = [], }) => {
    try {
        const { account } = await createAdminClient();
        const data = await account.createOAuth2Token(OAuthProvider[provider], `${hostExternal}/${successPath}`, `${hostExternal}/${failurePath}`, scopes);
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
 * Creates a phone verification token.
 */
const createPhoneVerification = async () => {
    try {
        const { account } = await createAdminClient();
        const data = await account.createPhoneVerification();
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
 * Sends a password recovery email.
 */
const createRecovery = async ({ email, url, }) => {
    try {
        const { account } = await createAdminClient();
        const data = await account.createRecovery(email, url);
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
 * Creates a session using user ID and secret.
 */
const createSession = async ({ userId, secret, }) => {
    try {
        const { account } = await createAdminClient();
        const data = await account.createSession(userId, secret);
        (await cookies()).set(cookieName, data.secret, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            expires: new Date(data.expire),
            path: "/",
        });
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
 * Creates an email verification token.
 */
const createVerification = async ({ verificationUrl = `${hostExternal}/${verificationPath}`, }) => {
    try {
        const { account } = await createAdminClient();
        const data = await account.createVerification(verificationUrl);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const deletePrefs = async ({ keys, }) => {
    try {
        const { account } = await createSessionClient();
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
            error: await handleApwError({ error }),
        };
    }
};
/*
 * Deletes a session.
 */
const deleteSession = async ({ sessionId = "current", } = {}) => {
    try {
        const { account } = await createSessionClient();
        await account.deleteSession(sessionId);
        return { data: signInPath, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
/*
 * Deletes all sessions for the current user.
 */
const deleteSessions = async () => {
    try {
        const { account } = await createSessionClient();
        await account.deleteSessions();
        return { data: signInPath, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
/*
 * Retrieves the authenticated and verified user.
 */
const getAppUser = async () => {
    try {
        const { account } = await createSessionClient();
        const { databases } = await createAdminClient();
        const user = await account.get();
        if (!user) {
            throw new Error("No session user found in database.");
        }
        if ((user.emailVerification || user.phoneVerification) && user.status) {
            const { total, documents } = await databases.listDocuments(databaseId, userCollectionId, [Query.equal("user_id", user.$id)]);
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
            error: await handleApwError({ error }),
        };
    }
};
/*
 * Retrieves the authenticated and verified user.
 */
const getCustomUser = async () => {
    try {
        const { account } = await createSessionClient();
        const { databases } = await createAdminClient();
        const user = await account.get();
        if (!user) {
            throw new Error("No session user found in database.");
        }
        if ((user.emailVerification || user.phoneVerification) && user.status) {
            const { total, documents } = await databases.listDocuments(databaseId, userCollectionId, [Query.equal("user_id", user.$id)]);
            if (total === 1) {
                return {
                    data: documents[0],
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
/*
 * Retrieves user details.
 */
const getUser = async () => {
    try {
        const { account } = await createSessionClient();
        const { databases } = await createAdminClient();
        const user = await account.get();
        if (!user) {
            throw new Error("No session user found in database.");
        }
        const { total, documents } = await databases.listDocuments(databaseId, userCollectionId, [Query.equal("user_id", user.$id)]);
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
/*
 * Retrieves a specific session or the current session.
 */
const getSession = async ({ sessionId = "current", } = {}) => {
    try {
        const { account } = await createSessionClient();
        const data = await account.getSession(sessionId);
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
 * Lists all sessions for the current user.
 */
const listSessions = async () => {
    try {
        const { account } = await createSessionClient();
        const data = await account.listSessions();
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
 * Updates user email.
 */
const updateEmail = async ({ email, password, }) => {
    try {
        const { account } = await createSessionClient();
        const data = await account.updateEmail(email, password);
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
 * Updates user name.
 */
const updateName = async ({ name, }) => {
    try {
        const { account } = await createSessionClient();
        const data = await account.updateName(name);
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
 * Updates user password.
 */
const updatePassword = async ({ password, oldPassword, }) => {
    try {
        const { account } = await createSessionClient();
        const data = await account.updatePassword(password, oldPassword);
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
 * Updates user phone number.
 */
const updatePhone = async ({ phone, password, }) => {
    try {
        const { account } = await createSessionClient();
        const data = await account.updatePhone(phone, password);
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
 * Confirms phone verification.
 */
const updatePhoneVerification = async ({ userId, secret, }) => {
    try {
        const { account } = await createSessionClient();
        const data = await account.updatePhoneVerification(userId, secret);
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
 * Updates the password using a recovery token.
 */
const updateRecovery = async ({ userId, secret, password, }) => {
    try {
        const { account } = await createSessionClient();
        const data = await account.updateRecovery(userId, secret, password);
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
 * Updates a specific session or the current session.
 */
const updateSession = async ({ sessionId = "current", }) => {
    try {
        const { account } = await createSessionClient();
        const data = await account.updateSession(sessionId);
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
 * Updates user status.
 */
const updateStatus = async () => {
    try {
        const { account } = await createSessionClient();
        const data = await account.updateStatus();
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
 * Updates email verification.
 */
const updateVerification = async ({ userId, secret, }) => {
    try {
        const { account } = await createSessionClient();
        const data = await account.updateVerification(userId, secret);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
export { addPrefs, createAccount, createAnonymousSession, createEmailPasswordSession, createJWT, createMagicURLSession, createOAuth2Token, createPhoneVerification, createRecovery, createSession, createVerification, deletePrefs, deleteSession, deleteSessions, getAppUser, getCustomUser, getSession, getUser, listSessions, updateEmail, updateName, updatePassword, updatePhone, updatePhoneVerification, updateRecovery, updateSession, updateStatus, updateVerification, };
