"use server";

import { Models, Query } from "node-appwrite";
import { handleApwError } from "../exceptions";
import { getType } from "../collections/typeReader";
import { createAdminClient } from "../appwriteClients";
import { databaseId, userCollectionId } from "../appwriteConfig";

let AppUserType: any;
let UserType: any;

const init = async () => {
  AppUserType = await getType({
    typeFileName: "user", // without extension
    typeName: "AppUserType",
  });

  if (!AppUserType) {
    throw new Error("No Type 'AppUserType' found (service: account).");
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

/*
 * Add preferences for a user by their ID.
 */
type AddPrefsForUserIdParams = {
  userId: string;
  prefs: string; // Must be a stringified JSON object
};
const addPrefsForUserId = async ({
  userId,
  prefs,
}: AddPrefsForUserIdParams): Promise<ReturnObject<Models.Preferences>> => {
  try {
    const { users } = await createAdminClient();
    const currentPrefs = await users.getPrefs(userId);

    // Ensure prefs is a valid JSON string
    let newPrefs: Record<string, any> = {};
    newPrefs = JSON.parse(prefs);
    if (typeof newPrefs !== "object" || Array.isArray(newPrefs)) {
      throw new Error(
        "Invalid prefs format. Must be a stringified JSON object."
      );
    }

    const updatedPrefs = { ...currentPrefs, ...newPrefs };
    const user = await users.updatePrefs(userId, updatedPrefs);
    return { data: user.prefs, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Creates a session for a user by their ID.
 */
type CreateSessionForUserIdParams = {
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

/*
 * Creates a token for a user.
 */
type CreateTokenParams = {
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

/*
 * Deletes preferences for a user by their ID.
 */
type DeletePrefsForUserIdParams = {
  userId: string;
  keys: string | string[]; // Accepts either a single key or an array of keys
};
const deletePrefsForUserId = async ({
  userId,
  keys,
}: DeletePrefsForUserIdParams): Promise<ReturnObject<Models.Preferences>> => {
  try {
    const { users } = await createAdminClient();
    const prefs = await users.getPrefs(userId);

    // Convert keys to an array if it's a stringified JSON
    let keysToDelete: string[] = [];

    if (typeof keys === "string") {
      try {
        const parsedKeys = JSON.parse(keys);
        keysToDelete = Array.isArray(parsedKeys) ? parsedKeys : [parsedKeys];
      } catch {
        keysToDelete = [keys]; // Treat as a single key if parsing fails
      }
    } else {
      keysToDelete = keys;
    }

    // Filter out the keys that need to be removed
    const newPrefs = Object.fromEntries(
      Object.entries(prefs).filter(([key]) => !keysToDelete.includes(key))
    );

    // Update user preferences
    const user = await users.updatePrefs(userId, newPrefs);
    return { data: user.prefs, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Deletes a specific session for a user by their ID and the session's ID.
 */
type DeleteSessionForUserIdParams = {
  userId: string;
  sessionId: string;
};
const deleteSessionForUserId = async ({
  userId,
  sessionId,
}: DeleteSessionForUserIdParams): Promise<ReturnObject<string>> => {
  try {
    const { users } = await createAdminClient();

    await users.deleteSession(userId, sessionId);
    return { data: userId, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Deletes all sessions for a user by their ID.
 */
type DeleteSessionsForUserIdParams = {
  userId: string;
};
const deleteSessionsForUserId = async ({
  userId,
}: DeleteSessionsForUserIdParams): Promise<ReturnObject<string>> => {
  try {
    const { users } = await createAdminClient();

    await users.deleteSessions(userId);
    return { data: userId, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Deletes a user by their ID.
 */
type DeleteUserForUserIdParams = {
  userId: string;
};
const deleteUserForUserId = async ({
  userId,
}: DeleteUserForUserIdParams): Promise<ReturnObject<string>> => {
  try {
    const { users } = await createAdminClient();
    const user = await users.get(userId);

    if (user.status) {
      throw new Error("Cannot delete user with status active");
    }

    if (user.labels.includes("owner")) {
      throw new Error("Cannot delete high privilege user");
    }

    await users.delete(userId);
    return { data: userId, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Retrieves an App User (native appwrite user extended by custom user (key = customUser)) by their ID.
 *
 * NATIVE APPWRITE USER (CONFIRMED VERIFIED) extended by custom user (key = customUser)
 * ...user for lists/displaying all VERIFIED app users
 *
 */
type GetUserForUserIdParams = {
  userId: string;
  queries?: string[];
  includingDeleted?: boolean;
};
const getAppUserForUserId = async ({
  userId,
  queries = [],
  includingDeleted = undefined,
}: GetUserForUserIdParams): Promise<ReturnObject<typeof AppUserType>> => {
  try {
    const { users } = await createAdminClient();
    const { databases } = await createAdminClient();

    const user = await users.get(userId);
    if (!user) {
      throw new Error("No user found in database.");
    }

    const { total, documents } = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [
        includingDeleted === undefined
          ? queries.length
            ? Query.and([...queries, Query.equal("user_id", userId)])
            : Query.equal("user_id", userId)
          : Query.and([
              ...queries,
              Query.equal("user_id", userId),
              Query.equal("deleted", includingDeleted),
            ]),
      ]
    );

    if (total === 1) {
      return {
        data: {
          ...user,
          customUser: documents[0],
        },
        error: null,
      };
    }

    return { data: null, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Retrieves an App User (native appwrite user extended by custom user (key = customUser)) by their ID.
 */
const getCustomUserForUserId = async ({
  userId,
  queries = [],
  includingDeleted = undefined,
}: GetUserForUserIdParams): Promise<ReturnObject<typeof UserType>> => {
  try {
    const { databases } = await createAdminClient();

    const { total, documents } = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [
        includingDeleted === undefined
          ? queries.length
            ? Query.and([...queries, Query.equal("user_id", userId)])
            : Query.equal("user_id", userId)
          : Query.and([
              ...queries,
              Query.equal("user_id", userId),
              Query.equal("deleted", includingDeleted),
            ]),
      ]
    );

    return {
      data: total === 1 ? documents[0] : null,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Retrieves a user by their ID.
 *
 * NATIVE APPWRITE USER (BUT NOT NECESSARILY VERIFIED) extended by custom user (key = customUser)
 * ...user for lists/displaying all app users
 *
 */
const getUserForUserId = async ({
  userId,
  queries = [],
  includingDeleted = undefined,
}: GetUserForUserIdParams): Promise<ReturnObject<typeof AppUserType>> => {
  try {
    const { users } = await createAdminClient();
    const { databases } = await createAdminClient();

    const user = await users.get(userId);
    if (!user) {
      throw new Error("No session user found in database.");
    }

    const { documents } = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [
        includingDeleted === undefined
          ? queries.length
            ? Query.and([...queries, Query.equal("user_id", userId)])
            : Query.equal("user_id", userId)
          : Query.and([
              ...queries,
              Query.equal("user_id", userId),
              Query.equal("deleted", includingDeleted),
            ]),
      ]
    );

    return {
      data: {
        ...user,
        customUser: documents[0],
      },
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Gets APP users list.
 */
type ListAppUsersParams = {
  queries?: string[];
  search?: string;
  includingDeleted?: boolean;
};

const listAppUsers = async ({
  queries = [],
  search,
  includingDeleted = undefined,
}: ListAppUsersParams): Promise<
  ReturnObject<Models.DocumentList<typeof AppUserType>>
> => {
  try {
    // Run both queries in parallel for better performance
    const [usersResult, customUsersResult] = await Promise.all([
      listUsers({ queries, search }),
      listCustomUsers({ queries, includingDeleted }),
    ]);

    // Check for errors
    if (usersResult.error) return { data: null, error: usersResult.error };
    if (customUsersResult.error)
      return { data: null, error: customUsersResult.error };

    const usersList = usersResult.data?.users ?? [];
    const customUsersList = customUsersResult.data?.documents ?? [];

    // Convert customUsersList to a Map for O(1) lookups
    const customUsersMap = new Map(
      customUsersList.map((customUser) => [customUser.user_id, customUser])
    );

    // Merge users with customUser data
    const appUsers: any[] = usersList.map((user) => ({
      ...user,
      customUser: customUsersMap.get(user.$id) || null, // Add customUser if found, otherwise null
    }));

    return {
      data: { total: appUsers.length, documents: appUsers ?? [] },
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Gets CUSTOM users list.
 */
type ListCustomUsersParams = {
  queries?: string[];
  includingDeleted?: boolean;
};
const listCustomUsers = async <
  TCustomUsers extends Models.DocumentList<typeof UserType>
>({
  queries = [],
  includingDeleted = undefined,
}: ListCustomUsersParams): Promise<ReturnObject<TCustomUsers>> => {
  try {
    const { databases } = await createAdminClient();

    const query = queries.length
      ? includingDeleted === undefined
        ? queries
        : [Query.and([...queries, Query.equal("deleted", includingDeleted)])]
      : [Query.equal("deleted", includingDeleted!)];

    const { total, documents } = await databases.listDocuments(
      databaseId,
      userCollectionId,
      query
    );

    return {
      data: {
        total: total,
        documents: documents ?? [],
      } as TCustomUsers,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Lists users with optional filters and search parameters.
 */
type ListUsersParams = {
  queries?: string[];
  search?: string;
};
const listUsers = async ({
  queries,
  search,
}: ListUsersParams): Promise<
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

/*
 * Lists user identities with optional filters and search parameters.
 */
type ListIdentitiesParams = {
  queries?: string[];
  search?: string;
};
const listIdentities = async ({
  queries = [],
  search,
}: ListIdentitiesParams): Promise<ReturnObject<Models.IdentityList>> => {
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

/*
 * Lists user identities for a specific user ID with optional filters and search parameters.
 */
type ListIdentitiesForUserIdParams = {
  userId: string; // The user's $id
  queries?: string[];
  search?: string;
};
const listIdentitiesForUserId = async ({
  userId,
  queries = [],
  search,
}: ListIdentitiesForUserIdParams): Promise<
  ReturnObject<Models.IdentityList>
> => {
  try {
    const { users } = await createAdminClient();

    const data = await users.listIdentities(
      queries.length
        ? [Query.and([...queries, Query.equal("userId", userId)])]
        : [Query.equal("userId", userId)],
      search
    );

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Lists user sessions for a specific user ID.
 */
type ListSessionsForUserIdParams = {
  userId: string;
};
const listSessionsForUserId = async ({
  userId,
}: ListSessionsForUserIdParams): Promise<ReturnObject<Models.SessionList>> => {
  try {
    const { users } = await createAdminClient();

    const data = await users.listSessions(userId);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Updates the email for a user by their ID.
 */
type UpdateEmailForUserIdParams = {
  userId: string;
  email: string;
};
const updateEmailForUserId = async ({
  userId,
  email,
}: UpdateEmailForUserIdParams): Promise<
  ReturnObject<Models.User<Models.Preferences>>
> => {
  try {
    const { users } = await createAdminClient();

    const data = await users.updateEmail(userId, email);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Updates the email verification status for a user by their ID.
 */
type UpdateEmailVerificationForUserIdParams = {
  userId: string;
  emailVerification: boolean;
};
const updateEmailVerificationForUserId = async ({
  userId,
  emailVerification,
}: UpdateEmailVerificationForUserIdParams): Promise<
  ReturnObject<Models.User<Models.Preferences>>
> => {
  try {
    const { users } = await createAdminClient();

    const data = await users.updateEmailVerification(userId, emailVerification);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Adds labels for a user by their ID.
 */
type LabelsForUserIdParams = {
  userId: string;
  labels: string | string[];
};
const addLabelsForUserId = async ({
  userId,
  labels,
}: LabelsForUserIdParams): Promise<
  ReturnObject<Models.User<Models.Preferences>>
> => {
  try {
    const { users } = await createAdminClient();
    const existingUser = await users.get(userId);
    const existingLabels = existingUser?.labels || [];
    let labelsToAdd: string[] = [];

    if (typeof labels === "string" && /^[a-zA-Z0-9]{1,36}$/.test(labels)) {
      labelsToAdd = [labels];
    } else if (Array.isArray(labels)) {
      if (labels.some((label) => typeof label !== "string")) {
        throw new Error("Invalid param 'labels': Array items must be strings.");
      }
      if (labels.some((label) => !/^[a-zA-Z0-9]{1,36}$/.test(label))) {
        throw new Error(
          "Invalid param 'labels': Labels must be 1-36 alphanumeric characters."
        );
      }
      labelsToAdd = labels;
    } else {
      throw new Error(
        "Invalid param 'labels': Must be a string or string array."
      );
    }

    const newLabels = [...existingLabels];
    labelsToAdd.forEach((label) => {
      if (!newLabels.includes(label)) {
        newLabels.push(label);
      }
    });

    const data = await users.updateLabels(userId, newLabels);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Removes labels for a user by their ID.
 */
const deleteLabelsForUserId = async ({
  userId,
  labels,
}: LabelsForUserIdParams): Promise<
  ReturnObject<Models.User<Models.Preferences>>
> => {
  try {
    const { users } = await createAdminClient();
    const existingUser = await users.get(userId);
    const existingLabels = existingUser?.labels || [];
    let labelsToRemove: string[] = [];

    if (typeof labels === "string" && /^[a-zA-Z0-9]{1,36}$/.test(labels)) {
      labelsToRemove = [labels];
    } else if (Array.isArray(labels)) {
      if (labels.some((label) => typeof label !== "string")) {
        throw new Error("Invalid param 'labels': Array items must be strings.");
      }
      if (labels.some((label) => !/^[a-zA-Z0-9]{1,36}$/.test(label))) {
        throw new Error(
          "Invalid param 'labels': Labels must be 1-36 alphanumeric characters."
        );
      }
      labelsToRemove = labels;
    } else {
      throw new Error(
        "Invalid param 'labels': Must be a string or string array."
      );
    }

    const newLabels = existingLabels.filter(
      (label) => !labelsToRemove.includes(label)
    );

    const data = await users.updateLabels(userId, newLabels);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Updates the name for a user by their ID.
 */
type UpdateNameForUserIdParams = {
  userId: string;
  name: string;
};
const updateNameForUserId = async ({
  userId,
  name,
}: UpdateNameForUserIdParams): Promise<
  ReturnObject<Models.User<Models.Preferences>>
> => {
  try {
    const { users } = await createAdminClient();

    const data = await users.updateName(userId, name);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Updates the password for a user by their ID.
 */
type UpdatePasswordForUserIdParams = {
  userId: string;
  password: string;
};
const updatePasswordForUserId = async ({
  userId,
  password,
}: UpdatePasswordForUserIdParams): Promise<
  ReturnObject<Models.User<Models.Preferences>>
> => {
  try {
    const { users } = await createAdminClient();

    const data = await users.updatePassword(userId, password);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Updates the password for a user by their ID.
 */
type UpdatePhoneForUserIdParams = {
  userId: string;
  phone: string;
};
const updatePhoneForUserId = async ({
  userId,
  phone,
}: UpdatePhoneForUserIdParams): Promise<
  ReturnObject<Models.User<Models.Preferences>>
> => {
  try {
    const { users } = await createAdminClient();

    const data = await users.updatePhone(userId, phone);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Updates the password for a user by their ID.
 */
type UpdatePhoneVerificationForUserIdParams = {
  userId: string;
  phoneVerification: boolean;
};
const updatePhoneVerificationForUserId = async ({
  userId,
  phoneVerification,
}: UpdatePhoneVerificationForUserIdParams): Promise<
  ReturnObject<Models.User<Models.Preferences>>
> => {
  try {
    const { users } = await createAdminClient();

    const data = await users.updatePhoneVerification(userId, phoneVerification);
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
type UpdateStatusForUserIdParams = {
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
    const user = await users.get(userId);

    if (user.labels.includes("owner")) {
      throw new Error("Cannot update status for high privilege user");
    }

    const data = await users.updateStatus(userId, status);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

export {
  addLabelsForUserId,
  addPrefsForUserId,
  createSessionForUserId,
  createToken,
  deleteLabelsForUserId,
  deletePrefsForUserId,
  deleteSessionForUserId,
  deleteSessionsForUserId,
  deleteUserForUserId,
  getAppUserForUserId, // INcl. deleted=false as default
  getCustomUserForUserId, // INcl. deleted=false as default
  getUserForUserId, // INcl. deleted=false as default
  listAppUsers, // INcl. deleted=false as default
  listCustomUsers, // INcl. deleted=false as default
  listUsers, // INcl. deleted=false as default
  listIdentities,
  listIdentitiesForUserId,
  listSessionsForUserId,
  updateEmailForUserId,
  updateEmailVerificationForUserId,
  updateNameForUserId,
  updatePasswordForUserId,
  updatePhoneForUserId,
  updatePhoneVerificationForUserId,
  updateStatusForUserId,
};

/*
 To use for manipulation/rendering within a ADMIN user-form component:
  addLabelsForUserId,
  addPrefsForUserId,
  deleteLabelsForUserId,
  deletePrefsForUserId,
  deleteSessionForUserId, --> ToDo in Form
  deleteSessionsForUserId, --> ToDo in Form
  deleteUserForUserId, --> ToDo in Form
  getAppUserForUserId,
  getCustomUserForUserId,
  getUserForUserId,
  listCustomUsers,
  listIdentities, --> ToDo in Form
  listIdentitiesForUserId, --> ToDo in Form
  listSessionsForUserId, --> ToDo in Form
  listUsers,
  updateNameForUserId,
  updateEmailForUserId,
  updatePhoneForUserId,
  updateStatusForUserId,
  updatePasswordForUserId,
  updateEmailVerificationForUserId,
  updatePhoneVerificationForUserId,
 */
