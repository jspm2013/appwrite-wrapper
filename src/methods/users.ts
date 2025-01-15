"use server";

import { ID } from "node-appwrite";
import { createAdminClient } from "../appwriteClients";
import { Models } from "node-appwrite";

/**
 * Parameters for creating a session for a user.
 */
export type CreateSessionForUserIdParams = {
  /**
   * The unique user ID. Defaults to `ID.unique()`.
   */
  userId?: string;
};

/**
 * Parameters for creating a token for a user.
 */
export type CreateTokenParams = {
  /**
   * The user ID.
   */
  userId: string;
  /**
   * The token length. Defaults to `32`.
   */
  length?: number;
  /**
   * The token expiration time in seconds. Defaults to `180` (3 minutes).
   */
  expire?: number;
};

/**
 * Parameters for deleting a specific session for a user.
 */
export type DeleteSessionForUserIdParams = {
  /**
   * The user ID.
   */
  userId: string;
  /**
   * The session ID to delete.
   */
  sessionId: string;
};

/**
 * Parameters for deleting all sessions for a user.
 */
export type DeleteSessionsForUserIdParams = {
  /**
   * The user ID.
   */
  userId: string;
};

/**
 * Parameters for retrieving a user by their ID.
 */
export type GetUserForUserIdParams = {
  /**
   * The user ID.
   */
  userId: string;
};

/**
 * Parameters for listing users.
 */
export type ListUsersParams = {
  /**
   * Queries for filtering the user list.
   */
  queries?: string[];
  /**
   * Search term to filter users.
   */
  search?: string;
};

/**
 * Parameters for updating email verification for a user.
 */
export type UpdateEmailVerificationForUserIdParams = {
  /**
   * The user ID.
   */
  userId: string;
  /**
   * The email verification status (true or false).
   */
  status: boolean;
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
 * Lists users with optional filters and search parameters.
 */
const listUsers = async ({
  queries,
  search,
}: ListUsersParams): Promise<Models.UserList<Models.Preferences>> => {
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
 * Updates the email verification status for a user.
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

export type UserFunctions = {
  createSessionForUserId: typeof createSessionForUserId;
  createToken: typeof createToken;
  deleteSessionForUserId: typeof deleteSessionForUserId;
  deleteSessionsForUserId: typeof deleteSessionsForUserId;
  getUserForUserId: typeof getUserForUserId;
  listUsers: typeof listUsers;
  updateEmailVerificationForUserId: typeof updateEmailVerificationForUserId;
};

export {
  createSessionForUserId,
  createToken,
  deleteSessionForUserId,
  deleteSessionsForUserId,
  getUserForUserId,
  listUsers,
  updateEmailVerificationForUserId,
};
