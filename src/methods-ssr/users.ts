"use server";

import { Models, Query } from "node-appwrite";
import { live } from "../host";
import { getType } from "../collections/typeReader";
import { createAdminClient } from "../appwriteClients";
import { databaseId, userCollectionId } from "../appwriteConfig";

const admin: boolean = !live;
const errMsg = (fn: string) =>
  admin ? `ApwWrapper Error (methods/users): ${fn}()` : "User Error";

interface ErrorObject {
  message: string;
  description: string;
}
interface ReturnObject<T> {
  error: ErrorObject | null;
  data: T | null;
}

/**
 * Creates a session for a user by their ID.
 */
export type CreateSessionForUserIdParams = {
  userId: string;
};
const createSessionForUserId = async ({
  userId,
}: CreateSessionForUserIdParams): Promise<ReturnObject<Models.Session>> => {
  try {
    if (!userId) throw new Error("Invalid param 'userId'");

    const { users } = await createAdminClient();
    const data = await users.createSession(userId);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createSessionForUserId"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Creates a token for a user.
 */
export type CreateTokenParams = {
  userId: string;
  length?: number;
  expire?: number;
};
const createToken = async ({
  userId,
  length = 32,
  expire = 60 * 3,
}: CreateTokenParams): Promise<ReturnObject<Models.Token>> => {
  try {
    const { users } = await createAdminClient();
    const data = await users.createToken(userId, length, expire);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createToken"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Deletes a specific preference key for a user by their ID.
 */
export type DeletePrefsForUserIdParams = {
  userId: string;
  key: string;
};
const deletePrefsForUserId = async ({
  userId,
  key,
}: DeletePrefsForUserIdParams): Promise<ReturnObject<Models.Preferences>> => {
  try {
    const { users } = await createAdminClient();
    const prefs = await users.getPrefs(userId);
    if (Object.prototype.hasOwnProperty.call(prefs, key)) {
      const { [key]: _, ...newPrefs } = prefs;
      const user = await users.updatePrefs(userId, newPrefs);
      return { data: user.prefs, error: null };
    }
    return { data: prefs, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("deletePrefsForUserId"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Deletes a specific session for a user by their ID.
 */
export type DeleteSessionForUserIdParams = {
  userId: string;
  sessionId: string;
};
const deleteSessionForUserId = async ({
  userId,
  sessionId,
}: DeleteSessionForUserIdParams): Promise<ReturnObject<void>> => {
  try {
    const { users } = await createAdminClient();
    await users.deleteSession(userId, sessionId);
    return { data: undefined, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("deleteSessionForUserId"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Deletes all sessions for a user by their ID.
 */
export type DeleteSessionsForUserIdParams = {
  userId: string;
};
const deleteSessionsForUserId = async ({
  userId,
}: DeleteSessionsForUserIdParams): Promise<ReturnObject<void>> => {
  try {
    const { users } = await createAdminClient();
    await users.deleteSessions(userId);
    return { data: undefined, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("deleteSessionsForUserId"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Deletes a user by their ID.
 */
export type DeleteUserByIdParams = {
  userId: string;
};
const deleteUserId = async ({
  userId,
}: DeleteUserByIdParams): Promise<ReturnObject<string>> => {
  try {
    const { users } = await createAdminClient();
    await users.delete(userId);
    return { data: userId, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("deleteUserId"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Retrieves a verified app user by their ID.
 */
export type GetUserForUserIdParams = {
  userId: string;
};
const getAppUserForUserId = async ({
  userId,
}: GetUserForUserIdParams): Promise<ReturnObject<any | null>> => {
  try {
    const { users } = await createAdminClient();
    const { databases } = await createAdminClient();

    const user = await users.get(userId);
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
          data: { ...user, customUser: documents[0] },
          error: null,
        };
      }
    }

    return { data: null, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getAppUserForUserId"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Gets CUSTOM users list.
 */
export type GetCustomUsersParams = {
  queries?: string[];
  includingDeleted?: boolean;
};
const getCustomUsers = async <
  TCustomUsers extends Models.DocumentList<Models.Document>
>({
  queries = [],
  includingDeleted = false,
}: GetCustomUsersParams): Promise<ReturnObject<TCustomUsers>> => {
  try {
    const { databases } = await createAdminClient();

    const combinedQueries = [
      ...queries,
      Query.equal("deleted", includingDeleted),
    ];

    const { total, documents } = await databases.listDocuments(
      databaseId,
      userCollectionId,
      combinedQueries
    );

    return {
      data: {
        total: total ?? 0,
        documents: documents ?? [],
      } as unknown as TCustomUsers,
      error: null,
    };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getCustomUsers"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Gets prefs for a user by their ID.
 */
export type GetPrefsForUserIdParams = {
  userId: string;
};
const getPrefsForUserId = async ({
  userId,
}: GetPrefsForUserIdParams): Promise<ReturnObject<Models.Preferences>> => {
  try {
    const { users } = await createAdminClient();
    const data = await users.getPrefs(userId);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getPrefsForUserId"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Retrieves a user by their ID.
 */
const getUserForUserId = async ({
  userId,
}: GetUserForUserIdParams): Promise<
  ReturnObject<Models.User<Models.Preferences>>
> => {
  try {
    const { users } = await createAdminClient();
    const data = await users.get(userId);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getUserForUserId"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Gets users list (NATIVE appwrite users).
 */
export type GetUsersParams = {
  queries?: string[];
  search?: string;
};
const getUsers = async ({
  queries = [],
  search = undefined,
}: GetUsersParams): Promise<
  ReturnObject<Models.UserList<Models.Preferences>>
> => {
  try {
    const { users } = await createAdminClient();
    const data = await users.list(queries, search);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getUsers"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Lists user identities with optional filters and search parameters.
 */
export type ListParams = {
  queries?: string[];
  search?: string;
};
const listIdentities = async ({
  queries,
  search,
}: ListParams): Promise<ReturnObject<Models.IdentityList>> => {
  try {
    const { users } = await createAdminClient();
    const data = await users.listIdentities(queries, search);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("listIdentities"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Lists users with optional filters and search parameters.
 */
const listUsers = async ({
  queries,
  search,
}: ListParams): Promise<ReturnObject<Models.UserList<Models.Preferences>>> => {
  try {
    const { users } = await createAdminClient();
    const data = await users.list(queries, search);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("listUsers"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Sets the prefs for a user by their ID.
 */
export type UpdatePrefsForUserIdParams = {
  userId: string;
  prefsObj: object;
};
const updatePrefsForUserId = async ({
  userId,
  prefsObj,
}: UpdatePrefsForUserIdParams): Promise<ReturnObject<Models.Preferences>> => {
  try {
    const { users } = await createAdminClient();
    const data = await users.updatePrefs(userId, prefsObj);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updatePrefsForUserId"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Updates the email verification status for a user by their ID.
 */
export type UpdateEmailVerificationForUserIdParams = {
  userId: string;
  status: boolean;
};
const updateEmailVerificationForUserId = async ({
  userId,
  status,
}: UpdateEmailVerificationForUserIdParams): Promise<
  ReturnObject<Models.User<Models.Preferences>>
> => {
  try {
    if (typeof status !== "boolean") {
      throw new Error("Invalid param 'status'");
    }
    const { users } = await createAdminClient();
    const data = await users.updateEmailVerification(userId, status);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateEmailVerificationForUserId"),
        description: JSON.stringify(err),
      },
    };
  }
};

export {
  createSessionForUserId,
  createToken,
  deletePrefsForUserId,
  deleteSessionForUserId,
  deleteSessionsForUserId,
  deleteUserId,
  getAppUserForUserId,
  getCustomUsers,
  getPrefsForUserId,
  getUserForUserId,
  getUsers,
  listIdentities,
  listUsers,
  updatePrefsForUserId,
  updateEmailVerificationForUserId,
};
