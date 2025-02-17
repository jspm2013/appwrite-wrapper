"use server";

import { ID, Models, Query } from "node-appwrite";
import { OAuthProvider } from "../enums";
import { useActionState } from "react";
import { getType } from "../collections/typeReader";
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
import { hostExternal, live } from "../host";

const admin: boolean = !live;

/**
 * Basic native appwrite user type.
 */
export type UserType = Models.User<Models.Preferences>;

/**
 * Basic appwrite-wrapper error object
 */
export type ErrorObject = {
  message: string;
  description: string;
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
  verificationUrl = `${hostExternal}/${verificationPath}`,
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
     * Appwrite throws Error when the user has no valid (aka is not logged in), so we have to return null for that case (instead of returning the error).
     */
    return null;
  }
};

/**
 * Retrieves the currently authenticated and verified user, dynamically typed based on the generated schema.
 *
 * @returns {Promise<any | null>} - The user object enriched with custom user attributes, or `null` if not verified.
 */
const getAppUser = async (): Promise<any | null> => {
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
      const { total, documents } = await databases.listDocuments(
        databaseId,
        userCollectionId,
        [
          Query.and([
            Query.equal("user_id", user.$id),
            Query.equal("deleted", false),
          ]),
        ]
      );

      if (total > 0) {
        return {
          ...user,
          customUser: documents[0],
        } as unknown as typeof AppUserType;
      }
    }

    return null;
  } catch (err) {
    /*
     * Appwrite throws Error when the user has no valid (aka is not logged in), so we have to return null for that case (instead of returning the error).
     */
    return null;
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
 * Parameters for updating preferences.
 */
export type UpdatePrefsParams = {
  prefs: Models.Preferences;
};
/**
 * Updates preferences for the current user.
 */
const updatePrefs = async ({
  prefs,
}: UpdatePrefsParams): Promise<Models.Preferences> => {
  try {
    if (isValidJsonObject(prefs)) {
      const { account } = await createSessionClient();
      const oldPrefs = await account.getPrefs();
      const user = await account.updatePrefs(
        isEmptyKeyValuePair(oldPrefs) ? prefs : { ...oldPrefs, ...prefs }
      );
      return user.prefs;
    } else {
      throw new Error("Invalid JSON object");
    }
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing updatePrefs():",
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
      `${hostExternal}/${successPath}`,
      `${hostExternal}/${failurePath}`
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
const useCreateOAuth2Token = () => {
  return useActionState(
    async (_prevState: any, params: CreateOAuth2TokenParams): Promise<any> => {
      try {
        const { account } = await createAdminClient();
        const url = await account.createOAuth2Token(
          OAuthProvider[params.provider],
          `${hostExternal}/${params.successPath || oauthSuccessPath}`,
          `${hostExternal}/${params.failurePath || oauthFailurePath}`
        );
        return url;
      } catch (err: any) {
        const error = {
          message: admin
            ? "APW-Wrapper - Error (methods/account): createOAuth2Token()"
            : "Account Error",
          description: JSON.stringify(err),
        };
        return { error };
      }
    },
    {}
  );
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

/**
 * Parameters for updating the user's email.
 */
export type UpdateEmailParams = {
  email: string;
  password: string;
};
/**
 * Updates the email for the current user.
 */
const updateEmail = async ({
  email,
  password,
}: UpdateEmailParams): Promise<UserType> => {
  try {
    const { account } = await createSessionClient();
    return await account.updateEmail(email, password);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing updateEmail():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for updating the user's phone number.
 */
export type UpdatePhoneParams = {
  phone: string;
  password: string;
};
/**
 * Updates the phone number for the current user.
 */
const updatePhone = async ({
  phone,
  password,
}: UpdatePhoneParams): Promise<UserType> => {
  try {
    const { account } = await createSessionClient();
    return await account.updatePhone(phone, password);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing updatePhone():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for updating the user's name.
 */
export type UpdateNameParams = {
  name: string;
};
/**
 * Updates the name for the current user.
 */
const updateName = async ({ name }: UpdateNameParams): Promise<UserType> => {
  try {
    const { account } = await createSessionClient();
    return await account.updateName(name);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing updateName():",
      err
    );
    throw err;
  }
};

/**
 * Updates the account status (block/unblock user).
 */
const updateStatus = async (): Promise<UserType> => {
  try {
    const { account } = await createSessionClient();
    return await account.updateStatus();
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing updateStatus():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for updating the user's password.
 */
export type UpdatePasswordParams = {
  password: string;
  oldPassword?: string;
};
/**
 * Updates the password for the current user.
 */
const updatePassword = async ({
  password,
  oldPassword,
}: UpdatePasswordParams): Promise<UserType> => {
  try {
    const { account } = await createSessionClient();
    return await account.updatePassword(password, oldPassword);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing updatePassword():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for creating a password recovery request.
 */
export type CreateRecoveryParams = {
  email: string;
  url: string;
};
/**
 * Creates a password recovery token.
 */
const createRecovery = async ({
  email,
  url,
}: CreateRecoveryParams): Promise<Models.Token> => {
  try {
    const { account } = await createSessionClient();
    return await account.createRecovery(email, url);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing createRecovery():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for updating a password recovery.
 */
export type UpdateRecoveryParams = {
  userId: string;
  secret: string;
  password: string;
};
/**
 * Updates the password using a recovery token.
 */
const updateRecovery = async ({
  userId,
  secret,
  password,
}: UpdateRecoveryParams): Promise<Models.Token> => {
  try {
    const { account } = await createSessionClient();
    return await account.updateRecovery(userId, secret, password);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing updateRecovery():",
      err
    );
    throw err;
  }
};

/**
 * Creates an anonymous session for the user.
 */
const createAnonymousSession = async (): Promise<Models.Session> => {
  try {
    const { account } = await createSessionClient();
    return await account.createAnonymousSession();
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing createAnonymousSession():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for creating a Magic URL session.
 */
export type CreateMagicURLSessionParams = {
  userId: string;
  email: string;
  url?: string;
  phrase?: boolean;
};
/**
 * Creates a Magic URL session for the user.
 */
const createMagicURLSession = async ({
  userId,
  email,
  url,
  phrase,
}: CreateMagicURLSessionParams): Promise<Models.Token> => {
  try {
    const { account } = await createSessionClient();
    return await account.createMagicURLToken(userId, email, url, phrase);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing createMagicURLSession():",
      err
    );
    throw err;
  }
};

/**
 * Creates a phone verification token.
 */
const createPhoneVerification = async (): Promise<Models.Token> => {
  try {
    const { account } = await createSessionClient();
    return await account.createPhoneVerification();
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing createPhoneVerification():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for updating phone verification.
 */
export type UpdatePhoneVerificationParams = {
  userId: string;
  secret: string;
};
/**
 * Confirms phone verification.
 */
const updatePhoneVerification = async ({
  userId,
  secret,
}: UpdatePhoneVerificationParams): Promise<Models.Token> => {
  try {
    const { account } = await createSessionClient();
    return await account.updatePhoneVerification(userId, secret);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/account): Error executing updatePhoneVerification():",
      err
    );
    throw err;
  }
};

/**
 * Export all functions
 */
export {
  createAccount,
  createEmailPasswordSession,
  createJWT,
  createOAuth2Token,
  useCreateOAuth2Token,
  createSession,
  createVerification,
  deletePrefs,
  deleteSession,
  deleteSessions,
  getAppUser,
  getPrefs,
  getSession,
  getUser,
  listSessions,
  updatePrefs,
  updateSession,
  updateVerification,
  updateEmail,
  updatePhone,
  updateName,
  updateStatus,
  updatePassword,
  createRecovery,
  updateRecovery,
  createAnonymousSession,
  createMagicURLSession,
  createPhoneVerification,
  updatePhoneVerification,
};
