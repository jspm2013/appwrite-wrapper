import { ID, OAuthProvider, Models } from "node-appwrite";
import { createSessionClient, createAdminClient } from "../appwriteClients";
import { isValidJsonObject, isEmptyKeyValuePair } from "../utils";
import {
  cookieName,
  oauthSuccessPath,
  oauthFailurePath,
  verificationPath,
} from "../appwriteConfig";
import { cookies } from "next/headers";
import { host } from "../host";

/**
 * Parameters for creating an account.
 */
export type CreateAccountParams = {
  email: string;
  password: string;
  name?: string;
};

/**
 * Parameters for deleting preferences.
 */
export type DeletePrefsParams = {
  key: string;
};

/**
 * Parameters for updating verification.
 */
export type UpdateVerificationParams = {
  userId: string;
  secret: string;
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
 * Parameters for setting preferences.
 */
export type SetPrefsParams = {
  newPrefs: Record<string, unknown>;
};

/**
 * Parameters for creating a session with email and password.
 */
export type CreateEmailPasswordSessionParams = {
  email: string;
  password: string;
};

/**
 * Parameters for creating a session with user ID and secret.
 */
export type CreateSessionParams = {
  userId: string;
  secret: string;
};

/**
 * Parameters for deleting a session.
 */
export type DeleteSessionParams = {
  sessionId?: string;
};

/**
 * Creates a new account.
 */
const createAccount = async ({
  email,
  password,
  name,
}: CreateAccountParams): Promise<Models.User<Models.Preferences> | Error> => {
  try {
    const { account } = await createSessionClient();
    return await account.create(ID.unique(), email, password, name);
  } catch (err) {
    console.error(
      "APW-LIB ERROR (account): Error executing createAccount():",
      err
    );
    return err as Error;
  }
};

/**
 * Creates a JWT token.
 */
const createJWT = async (): Promise<Models.Jwt | Error> => {
  try {
    const { account } = await createSessionClient();
    return await account.createJWT();
  } catch (err) {
    console.error("APW-LIB ERROR (account): Error executing createJWT():", err);
    return err as Error;
  }
};

/**
 * Creates an email verification token.
 */
const createVerification = async ({
  verificationUrl = `${host}/${verificationPath}`,
}): Promise<Models.Token | Error> => {
  try {
    const { account } = await createSessionClient();
    return await account.createVerification(verificationUrl);
  } catch (err) {
    console.error(
      "APW-LIB ERROR (account): Error executing createVerification():",
      err
    );
    return err as Error;
  }
};

/**
 * Deletes a specific session or the current session.
 */
const deleteSession = async (
  params: DeleteSessionParams = {}
): Promise<void | Error> => {
  const { sessionId = "current" } = params;
  try {
    const { account } = await createSessionClient();
    await account.deleteSession(sessionId);
  } catch (err) {
    console.error(
      "APW-LIB ERROR (account): Error executing deleteSession():",
      err
    );
    return err as Error;
  }
};

/**
 * Lists all sessions for the current user.
 */
const listSessions = async (): Promise<Models.SessionList | Error> => {
  try {
    const { account } = await createSessionClient();
    return await account.listSessions();
  } catch (err) {
    console.error(
      "APW-LIB ERROR (account): Error executing listSessions():",
      err
    );
    return err as Error;
  }
};

/**
 * Deletes all sessions for the current user.
 */
const deleteSessions = async (): Promise<void | Error> => {
  try {
    const { account } = await createSessionClient();
    await account.deleteSessions();
  } catch (err) {
    console.error(
      "APW-LIB ERROR (account): Error executing deleteSessions():",
      err
    );
    return err as Error;
  }
};

/**
 * Retrieves the current user.
 */
const getUser = async (): Promise<
  Models.User<Models.Preferences> | Error | null
> => {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (err) {
    /*
     * Appwrite throws Error when the user is not logged in, so we have to return null for that case.
     */
    return null;
    //console.error("APW-LIB ERROR (account): Error executing getUser():", err);
    //return err as Error;
  }
};

/**
 * Deletes a specific preference key for the current user.
 */
const deletePrefs = async ({
  key,
}: DeletePrefsParams): Promise<Models.Preferences | Error> => {
  try {
    const { account } = await createSessionClient();
    const oldPrefs = await account.getPrefs();
    if (Object.prototype.hasOwnProperty.call(oldPrefs, key)) {
      const { [key]: _, ...newPrefs } = oldPrefs;
      await account.updatePrefs(newPrefs);
      return newPrefs;
    }
    return oldPrefs;
  } catch (err) {
    console.error(
      "APW-LIB ERROR (account): Error executing deletePrefs():",
      err
    );
    return err as Error;
  }
};

/**
 * Retrieves all preferences for the current user.
 */
const getPrefs = async (): Promise<Models.Preferences | Error> => {
  try {
    const { account } = await createSessionClient();
    return await account.getPrefs();
  } catch (err) {
    console.error("APW-LIB ERROR (account): Error executing getPrefs():", err);
    return err as Error;
  }
};

/**
 * Updates preferences for the current user.
 */
const setPrefs = async ({
  newPrefs,
}: SetPrefsParams): Promise<void | Error> => {
  try {
    if (isValidJsonObject(newPrefs)) {
      const { account } = await createSessionClient();
      const oldPrefs = await account.getPrefs();
      await account.updatePrefs(
        isEmptyKeyValuePair(oldPrefs) ? newPrefs : { ...oldPrefs, ...newPrefs }
      );
    } else {
      throw new Error("Invalid JSON object");
    }
  } catch (err) {
    console.error("APW-LIB ERROR (account): Error executing setPrefs():", err);
    return err as Error;
  }
};

/**
 * Updates the email verification for a specific user.
 */
const updateVerification = async ({
  userId,
  secret,
}: UpdateVerificationParams): Promise<Models.Token | Error> => {
  try {
    const { account } = await createSessionClient();
    return await account.updateVerification(userId, secret);
  } catch (err) {
    console.error(
      "APW-LIB ERROR (account): Error executing updateVerification():",
      err
    );
    return err as Error;
  }
};

/**
 * Creates a session for a user using email and password.
 */
const createEmailPasswordSession = async ({
  email,
  password,
}: CreateEmailPasswordSessionParams): Promise<Models.Session | Error> => {
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
      "APW-LIB ERROR (account): Error executing createEmailPasswordSession():",
      err
    );
    return err as Error;
  }
};

/**
 * Creates an OAuth2 token for the user.
 */
const createOAuth2Token = async ({
  provider,
  successPath = oauthSuccessPath,
  failurePath = oauthFailurePath,
}: CreateOAuth2TokenParams): Promise<string | Error> => {
  try {
    const { account } = await createAdminClient();
    return await account.createOAuth2Token(
      OAuthProvider[provider],
      `${host}/${successPath}`,
      `${host}/${failurePath}`
    );
  } catch (err) {
    console.error(
      "APW-LIB ERROR (account): Error executing createOAuth2Token():",
      err
    );
    return err as Error;
  }
};

/**
 * Creates a session for a user by their ID and secret.
 */
const createSession = async ({
  userId,
  secret,
}: CreateSessionParams): Promise<Models.Session | Error> => {
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
      "APW-LIB ERROR (account): Error executing createSession():",
      err
    );
    return err as Error;
  }
};

export type AccountFunctions = {
  createAccount: typeof createAccount;
  createJWT: typeof createJWT;
  createVerification: typeof createVerification;
  deleteSession: typeof deleteSession;
  listSessions: typeof listSessions;
  deleteSessions: typeof deleteSessions;
  getUser: typeof getUser;
  deletePrefs: typeof deletePrefs;
  getPrefs: typeof getPrefs;
  setPrefs: typeof setPrefs;
  updateVerification: typeof updateVerification;
  createEmailPasswordSession: typeof createEmailPasswordSession;
  createOAuth2Token: typeof createOAuth2Token;
  createSession: typeof createSession;
};

/**
 * Exporting OAuthProvider for consumer usage
 */
export { OAuthProvider };

export {
  createAccount,
  createJWT,
  createVerification,
  deleteSession,
  listSessions,
  deleteSessions,
  getUser,
  deletePrefs,
  getPrefs,
  setPrefs,
  updateVerification,
  createEmailPasswordSession,
  createOAuth2Token,
  createSession,
};
