"use server";

import { ID, Models, Query } from "node-appwrite";
import { OAuthProvider } from "../enums";
import { createSessionClient, createAdminClient } from "../appwriteClients";
import { isValidJsonObject, isEmptyKeyValuePair } from "../utils";
import {
  cookieName,
  oauthSuccessPath,
  oauthFailurePath,
  verificationPath,
  signInPath,
  databaseId,
  userCollectionId,
} from "../appwriteConfig";
import { cookies } from "next/headers";
import { host } from "../host";

/**
 * Basic/native appwrite user type + empty custom attributes type.
 */
export type UserType = Models.User<Models.Preferences>;
export type CustomUserAttributes = Record<string, any>;
export type VerifiedUserType = UserType & {
  customUser: CustomUserAttributes;
};

/**
 * Parameters for creating an account.
 */
export type CreateAccountParams = {
  email: string;
  password: string;
  name?: string;
};
/**
 * Creates a new account.
 */
const createAccount = async ({
  email,
  password,
  name,
}: CreateAccountParams): Promise<UserType> => {
  try {
    const { account } = await createSessionClient();
    return await account.create(ID.unique(), email, password, name);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing createAccount():",
      err
    );
    throw err;
  }
};

/**
 * Creates a JWT token.
 */
const createJWT = async (): Promise<Models.Jwt> => {
  try {
    const { account } = await createSessionClient();
    return await account.createJWT();
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing createJWT():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for creating an account.
 */
export type CreateVerificationParams = {
  verificationUrl?: string;
};
/**
 * Creates an email verification token.
 */
const createVerification = async ({
  verificationUrl = `${host}/${verificationPath}`,
}: CreateVerificationParams): Promise<Models.Token> => {
  try {
    const { account } = await createSessionClient();
    return await account.createVerification(verificationUrl);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing createVerification():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for deleting a session.
 */
export type DeleteSessionParams = {
  sessionId?: string;
};
/**
 * Deletes a specific session or the current session.
 */
const deleteSession = async (
  params: DeleteSessionParams = {}
): Promise<string> => {
  const { sessionId = "current" } = params;
  try {
    const { account } = await createSessionClient();
    await account.deleteSession(sessionId);
    return signInPath;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing deleteSession():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for getting a session.
 */
export type GetSessionParams = {
  sessionId?: string;
};
/**
 * Getting a specific session or the current session.
 */
const getSession = async (
  params: GetSessionParams = {}
): Promise<Models.Session> => {
  const { sessionId = "current" } = params;
  try {
    const { account } = await createSessionClient();
    return await account.getSession(sessionId);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing getSession():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for updating a session.
 */
export type UpdateSessionParams = {
  sessionId?: string;
};
/**
 * Updates a specific session or the current session.
 */
const updateSession = async (
  params: UpdateSessionParams = {}
): Promise<Models.Session> => {
  const { sessionId = "current" } = params;
  try {
    const { account } = await createSessionClient();
    return await account.updateSession(sessionId);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing updateSession():",
      err
    );
    throw err;
  }
};

/**
 * Lists all sessions for the current user.
 */
const listSessions = async (): Promise<Models.SessionList> => {
  try {
    const { account } = await createSessionClient();
    return await account.listSessions();
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing listSessions():",
      err
    );
    throw err;
  }
};

/**
 * Deletes all sessions for the current user.
 */
const deleteSessions = async (): Promise<string> => {
  try {
    const { account } = await createSessionClient();
    await account.deleteSessions();
    return signInPath;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing deleteSessions():",
      err
    );
    throw err;
  }
};

/**
 * Retrieves the current user.
 */
const getUser = async (): Promise<UserType | null> => {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (err) {
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
const getVerifiedUser = async (): Promise<VerifiedUserType | null> => {
  try {
    const { account } = await createSessionClient();
    const { databases } = await createAdminClient();

    const user = await account.get();

    if (user.emailVerification || user.phoneVerification) {
      const { attributes } = await databases.listAttributes(
        databaseId,
        userCollectionId
      );

      const { total, documents } = await databases.listDocuments(
        databaseId,
        userCollectionId,
        [Query.equal("user_id", user.$id)]
      );

      if (total) {
        // Dynamically build the custom attributes type
        let customUserAttributes: CustomUserAttributes = {};
        attributes.forEach((attr: any) => {
          customUserAttributes[attr.key] = attr.default ?? null;
        });

        // Return verified user, enriched for the custom attributes
        return { ...user, customUser: documents[0] } as VerifiedUserType;
      }
    }
    return null;
  } catch (err) {
    /*
     * Appwrite throws Error when the user is not logged in, so we have to return null for that case.
     */
    return null;
    //console.error("APW-WRAPPER - Error (methods/account): Error executing getVerifiedUser():", err);
    //throw err;
  }
};

/**
 * Parameters for deleting preferences.
 */
export type DeletePrefsParams = {
  key: string;
};
/**
 * Deletes a specific preference key for the current user.
 */
const deletePrefs = async ({
  key,
}: DeletePrefsParams): Promise<Models.Preferences> => {
  try {
    const { account } = await createSessionClient();
    const prefs = await account.getPrefs();
    if (Object.prototype.hasOwnProperty.call(prefs, key)) {
      const { [key]: _, ...newPrefs } = prefs;
      const user = await account.updatePrefs(newPrefs);
      return user.prefs;
    }
    return prefs;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing deletePrefs():",
      err
    );
    throw err;
  }
};

/**
 * Retrieves all preferences for the current user.
 */
const getPrefs = async (): Promise<Models.Preferences> => {
  try {
    const { account } = await createSessionClient();
    const prefs = await account.getPrefs();
    return prefs;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing getPrefs():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for setting preferences.
 */
export type SetPrefsParams = {
  newPrefs: Models.Preferences;
};
/**
 * Updates preferences for the current user.
 */
const setPrefs = async ({
  newPrefs,
}: SetPrefsParams): Promise<Models.Preferences> => {
  try {
    if (isValidJsonObject(newPrefs)) {
      const { account } = await createSessionClient();
      const prefs = await account.getPrefs();
      const user = await account.updatePrefs(
        isEmptyKeyValuePair(prefs) ? newPrefs : { ...prefs, ...newPrefs }
      );
      return user.prefs;
    } else {
      throw new Error("Invalid JSON object");
    }
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing setPrefs():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for updating verification.
 */
export type UpdateVerificationParams = {
  userId: string;
  secret: string;
};
/**
 * Updates the email verification for a specific user.
 */
const updateVerification = async ({
  userId,
  secret,
}: UpdateVerificationParams): Promise<Models.Token> => {
  try {
    const { account } = await createSessionClient();
    return await account.updateVerification(userId, secret);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing updateVerification():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for creating a session with email and password.
 */
export type CreateEmailPasswordSessionParams = {
  email: string;
  password: string;
};
/**
 * Creates a session for a user using email and password.
 */
const createEmailPasswordSession = async ({
  email,
  password,
}: CreateEmailPasswordSessionParams): Promise<Models.Session> => {
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
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing createEmailPasswordSession():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for creating an OAuth2 token.
 */
export type CreateOAuth2TokenParams = {
  provider: keyof typeof OAuthProvider;
  successPath?: string;
  failurePath?: string;
};
/**
 * Creates an OAuth2 token for the user.
 */
const createOAuth2Token = async ({
  provider,
  successPath = oauthSuccessPath,
  failurePath = oauthFailurePath,
}: CreateOAuth2TokenParams): Promise<string> => {
  try {
    const { account } = await createAdminClient();
    const url = await account.createOAuth2Token(
      OAuthProvider[provider],
      `${host}/${successPath}`,
      `${host}/${failurePath}`
    );
    return url;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing createOAuth2Token():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for creating a session with user ID and secret.
 */
export type CreateSessionParams = {
  userId: string;
  secret: string;
};
/**
 * Creates a session for a user by their ID and secret.
 */
const createSession = async ({
  userId,
  secret,
}: CreateSessionParams): Promise<Models.Session> => {
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
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing createSession():",
      err
    );
    throw err;
  }
};

export type AccountFunctionTypes = {
  createAccount: typeof createAccount;
  createEmailPasswordSession: typeof createEmailPasswordSession;
  createJWT: typeof createJWT;
  createOAuth2Token: typeof createOAuth2Token;
  createSession: typeof createSession;
  createVerification: typeof createVerification;
  deletePrefs: typeof deletePrefs;
  deleteSession: typeof deleteSession;
  deleteSessions: typeof deleteSessions;
  getPrefs: typeof getPrefs;
  getUser: typeof getUser;
  getVerifiedUser: typeof getVerifiedUser;
  listSessions: typeof listSessions;
  setPrefs: typeof setPrefs;
  updateVerification: typeof updateVerification;
  updateSession: typeof updateSession;
  getSession: typeof getSession;
};

export {
  createAccount,
  createEmailPasswordSession,
  createJWT,
  createOAuth2Token,
  createSession,
  createVerification,
  deletePrefs,
  deleteSession,
  deleteSessions,
  getPrefs,
  getSession,
  getUser,
  getVerifiedUser,
  listSessions,
  setPrefs,
  updateSession,
  updateVerification,
};
