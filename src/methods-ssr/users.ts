"use server";

import { Models, Query } from "node-appwrite";
import { handleApwError } from "../exceptions";
import { getType } from "../collections/typeReader";
import { createAdminClient } from "../appwriteClients";
import { databaseId, userCollectionId } from "../appwriteConfig";

interface ErrorObject {
  appwrite: boolean;
  header: string;
  type: string;
  code: number;
  variant: string;
  description: string;
  error?: object;
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
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
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
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
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
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
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
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
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
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
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
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
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
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
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
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
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
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
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
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
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
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
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
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
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
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
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
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
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
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Updates the status for a user by their ID.
 */
export type UpdateStatusForUserIdParams = {
  userId: string;
  status: boolean;
};
const updateStatusForUserId = async ({
  userId,
  status,
}: UpdateStatusForUserIdParams): Promise<
  ReturnObject<Models.User<Models.Preferences>>
> => {
  try {
    if (typeof status !== "boolean") {
      throw new Error("Invalid param 'status'");
    }
    const { users } = await createAdminClient();
    const data = await users.updateStatus(userId, status);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

export type UpdateLabelsParams = {
  userId: string;
  labels: string[];
};
const updateLabels = async ({
  userId,
  labels,
}: UpdateLabelsParams): Promise<
  ReturnObject<Models.User<Models.Preferences>>
> => {
  try {
    const { users } = await createAdminClient();
    let updatedLabels: string[] = [];

    // Check if labels is an array, string, or JSON object
    if (Array.isArray(labels)) {
      if (labels.some((label) => typeof label !== "string")) {
        throw new Error("Invalid param 'labels': Array items must be strings.");
      }
      if (labels.some((label) => !/^[a-zA-Z0-9]{1,36}$/.test(label))) {
        throw new Error(
          "Invalid param 'labels': Labels must be 1-36 alphanumeric characters."
        );
      }
      updatedLabels = labels; // Replace existing labels with the provided array
    } else if (
      typeof labels === "string" &&
      /^[a-zA-Z0-9]{1,36}$/.test(labels)
    ) {
      // Single string label
      const existingUser = await users.get(userId);
      const existingLabels = existingUser?.labels || [];
      if (!existingLabels.includes(labels)) {
        updatedLabels = [...existingLabels, labels]; // Add if not exists
      } else {
        updatedLabels = existingLabels;
      }
    } else if (typeof labels === "object" && labels !== null) {
      // JSON object for add/remove
      const key = Object.keys(labels)[0];
      const value = labels[key];

      if (typeof value !== "string" || !/^[a-zA-Z0-9]{1,36}$/.test(value)) {
        throw new Error(
          "Invalid param 'labels': JSON value must be 1-36 alphanumeric characters."
        );
      }

      const existingUser = await users.get(userId);
      const existingLabels = existingUser?.labels || [];

      if (key === "add") {
        if (!existingLabels.includes(value)) {
          updatedLabels = [...existingLabels, value];
        } else {
          updatedLabels = existingLabels;
        }
      } else if (key === "remove") {
        updatedLabels = existingLabels.filter((label) => label !== value);
      } else {
        throw new Error(
          "Invalid param 'labels': JSON key must be 'add' or 'remove'."
        );
      }
    } else {
      throw new Error(
        "Invalid param 'labels': Must be an array, string, or JSON object."
      );
    }

    const data = await users.updateLabels(userId, updatedLabels);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
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
  updateEmailVerificationForUserId,
  updateLabels,
  updatePrefsForUserId,
  updateStatusForUserId,
};
