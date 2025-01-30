"use server";

import { Models } from "node-appwrite";
import { createAdminClient } from "../appwriteClients";

/**
 * Parameters for creating a session for a user.
 */
export type CreateSessionForUserIdParams = {
  userId?: string;
};
/**
 * Creates a session for a user by their ID.
 */
const createSessionForUserId = async ({
  userId,
}: CreateSessionForUserIdParams): Promise<Models.Session> => {
  try {
    if (!userId) {
      throw new Error("Invalid param 'userId'");
    }
    const { users } = await createAdminClient();
    const session = await users.createSession(userId);
    return session;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/users): Error executing createSessionForUserId():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for creating a token for a user.
 */
export type CreateTokenParams = {
  userId: string;
  length?: number;
  expire?: number;
};
/**
 * Creates a token for a user.
 */
const createToken = async ({
  userId,
  length = 32,
  expire = 60 * 3,
}: CreateTokenParams): Promise<Models.Token> => {
  try {
    const { users } = await createAdminClient();
    const token = await users.createToken(userId, length, expire);
    return token;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/users): Error executing createToken():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for deleting a specific session for a user.
 */
export type DeleteSessionForUserIdParams = {
  userId: string;
  sessionId: string;
};
/**
 * Deletes a specific session for a user by their ID.
 */
const deleteSessionForUserId = async ({
  userId,
  sessionId,
}: DeleteSessionForUserIdParams): Promise<void> => {
  try {
    const { users } = await createAdminClient();
    await users.deleteSession(userId, sessionId);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/users): Error executing deleteSessionForUserId():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for deleting all sessions for a user.
 */
export type DeleteSessionsForUserIdParams = {
  userId: string;
};
/**
 * Deletes all sessions for a user by their ID.
 */
const deleteSessionsForUserId = async ({
  userId,
}: DeleteSessionsForUserIdParams): Promise<void> => {
  try {
    const { users } = await createAdminClient();
    await users.deleteSessions(userId);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/users): Error executing deleteSessionsForUserId():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for getting prefs for a user.
 */
export type GetPrefsForUserIdParams = {
  userId: string;
};
/**
 * Gets prefs for a user by their ID.
 */
const getPrefsForUserId = async ({
  userId,
}: GetPrefsForUserIdParams): Promise<Models.Preferences> => {
  try {
    const { users } = await createAdminClient();
    const prefs = await users.getPrefs(userId);
    return prefs;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/users): Error executing getPrefsForUserId():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for retrieving a user by their ID.
 */
export type GetUserForUserIdParams = {
  userId: string;
};
/**
 * Retrieves a user by their ID.
 */
const getUserForUserId = async ({
  userId,
}: GetUserForUserIdParams): Promise<Models.User<Models.Preferences> | null> => {
  try {
    const { users } = await createAdminClient();
    const user = await users.get(userId);
    return user;
  } catch (err) {
    /*
     * Appwrite throws Error when the user is not logged in, so we have to return null for that case.
     */
    return null;
    //console.error("APW-WRAPPER - Error (methods/users): Error executing getUserForUserId():", err);
    //throw err;
  }
};

/**
 * Retrieves a verified user by their ID.
 */
const getVerifiedUserForUserId = async ({
  userId,
}: GetUserForUserIdParams): Promise<Models.User<Models.Preferences> | null> => {
  try {
    const { users } = await createAdminClient();
    const user = await users.get(userId);
    if (user.emailVerification) {
      return user;
    }
    return null;
  } catch (err) {
    /*
     * Appwrite throws Error when the user is not logged in, so we have to return null for that case.
     */
    return null;
    //console.error("APW-WRAPPER - Error (methods/users): Error executing getVerifiedUserForUserId():", err);
    //throw err;
  }
};

/**
 * Parameters for listing users.
 */
export type ListParams = {
  queries?: string[];
  search?: string;
};
/**
 * Lists users with optional filters and search parameters.
 */
const listIdentities = async ({
  queries,
  search,
}: ListParams): Promise<Models.IdentityList> => {
  try {
    const { users } = await createAdminClient();
    const identitiesList = await users.listIdentities(queries, search);
    return identitiesList;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/users): Error executing listIdentities():",
      err
    );
    throw err;
  }
};

/**
 * Lists users with optional filters and search parameters.
 */
const listUsers = async ({
  queries,
  search,
}: ListParams): Promise<Models.UserList<Models.Preferences>> => {
  try {
    const { users } = await createAdminClient();
    const userList = await users.list(queries, search);
    return userList;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/users): Error executing listUsers():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for setting prefs for a user.
 */
export type SetPrefsForUserIdParams = {
  userId: string;
  prefsObj: object;
};
/**
 * Sets the prefs for a user by their ID.
 */
const setPrefsForUserId = async ({
  userId,
  prefsObj,
}: SetPrefsForUserIdParams): Promise<Models.Preferences> => {
  try {
    const { users } = await createAdminClient();
    const prefs = await users.updatePrefs(userId, prefsObj);
    return prefs;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/users): Error executing setPrefsForUserId():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for updating email verification for a user.
 */
export type UpdateEmailVerificationForUserIdParams = {
  userId: string;
  status: boolean;
};
/**
 * Updates the email verification status for a user by their ID.
 */
const updateEmailVerificationForUserId = async ({
  userId,
  status,
}: UpdateEmailVerificationForUserIdParams): Promise<
  Models.User<Models.Preferences>
> => {
  try {
    if (typeof status !== "boolean") {
      throw new Error("Invalid param 'status'");
    }
    const { users } = await createAdminClient();
    const user = await users.updateEmailVerification(userId, status);
    return user;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/users): Error executing updateEmailVerificationForUserId():",
      err
    );
    throw err;
  }
};

export type UsersFunctionTypes = {
  createSessionForUserId: typeof createSessionForUserId;
  createToken: typeof createToken;
  deleteSessionForUserId: typeof deleteSessionForUserId;
  deleteSessionsForUserId: typeof deleteSessionsForUserId;
  getPrefsForUserId: typeof getPrefsForUserId;
  getUserForUserId: typeof getUserForUserId;
  getVerifiedUserForUserId: typeof getVerifiedUserForUserId;
  listIdentities: typeof listIdentities;
  listUsers: typeof listUsers;
  setPrefsForUserId: typeof setPrefsForUserId;
  updateEmailVerificationForUserId: typeof updateEmailVerificationForUserId;
};

export {
  createSessionForUserId,
  createToken,
  deleteSessionForUserId,
  deleteSessionsForUserId,
  getPrefsForUserId,
  getUserForUserId,
  getVerifiedUserForUserId,
  listIdentities,
  listUsers,
  setPrefsForUserId,
  updateEmailVerificationForUserId,
};
