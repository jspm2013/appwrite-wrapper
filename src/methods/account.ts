"use server";

import {
  cookieName,
  signInPath,
  databaseId,
  oauthSuccessPath,
  oauthFailurePath,
  verificationPath,
  usersCollectionId,
} from "../appwriteConfig";
import { cookies } from "next/headers";
import { hostExternal, live } from "../host";
import { OAuthProvider } from "../enums";
import { handleApwError } from "../exceptions";
import { ID, Models, Query } from "node-appwrite";
import { getType } from "../collections/typeReader";
import { createSessionClient, createAdminClient } from "../appwriteClients";

let ApwUserType: any;
let UserType: any;

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
 * Add preferences for a user.
 */
type AddPrefsParams = {
  prefs: string; // Must be a stringified JSON object
};
const addPrefs = async ({
  prefs,
}: AddPrefsParams): Promise<ReturnObject<Models.Preferences>> => {
  try {
    const { account } = await createSessionClient();
    const currentPrefs = await account.getPrefs();

    // Ensure prefs is a valid JSON string
    let newPrefs: Record<string, any> = {};
    newPrefs = JSON.parse(prefs);
    if (typeof newPrefs !== "object" || Array.isArray(newPrefs)) {
      throw new Error(
        "Invalid prefs format. Must be a stringified JSON object."
      );
    }

    const updatedPrefs = { ...currentPrefs, ...newPrefs };
    const user = await account.updatePrefs(updatedPrefs);
    return { data: user.prefs, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Creates an account.
 */
const createAccount = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name?: string;
}): Promise<ReturnObject<Models.User<Models.Preferences>>> => {
  try {
    const { account } = await createAdminClient();
    const data = await account.create(ID.unique(), email, password, name);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Creates an anonymous session.
 */
const createAnonymousSession = async (): Promise<
  ReturnObject<Models.Session>
> => {
  try {
    const { account } = await createAdminClient();
    const data = await account.createAnonymousSession();
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Creates an email-password session.
 */
const createEmailPasswordSession = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ReturnObject<Models.Session>> => {
  try {
    const { account } = await createAdminClient();
    const data = await account.createEmailPasswordSession(email, password);
    (await cookies()).set(cookieName, data.secret, {
      httpOnly: true,
      secure: live,
      sameSite: "strict",
      expires: new Date(data.expire),
      path: "/",
    });
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Creates a JWT token.
 */
const createJWT = async (): Promise<ReturnObject<Models.Jwt>> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.createJWT();
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Creates a Magic URL session.
 */
const createMagicURLSession = async ({
  email,
  url,
  userId,
  phrase,
}: {
  email: string;
  url?: string;
  userId?: string;
  phrase?: boolean;
}): Promise<ReturnObject<Models.Token>> => {
  try {
    const { account } = await createAdminClient();
    const data = await account.createMagicURLToken(
      userId || ID.unique(),
      email,
      url,
      phrase
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
 * Creates an OAuth2 token.
 */
const createOAuth2Token = async ({
  provider,
  successPath = oauthSuccessPath,
  failurePath = oauthFailurePath,
  scopes = [],
}: {
  provider: keyof typeof OAuthProvider;
  successPath?: string;
  failurePath?: string;
  scopes?: string[];
}): Promise<ReturnObject<string>> => {
  try {
    const { account } = await createAdminClient();
    const data = await account.createOAuth2Token(
      OAuthProvider[provider],
      `${hostExternal}/${successPath}`,
      `${hostExternal}/${failurePath}`,
      scopes
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
 * Creates a phone verification token.
 */
const createPhoneVerification = async (): Promise<
  ReturnObject<Models.Token>
> => {
  try {
    const { account } = await createAdminClient();
    const data = await account.createPhoneVerification();
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Sends a password recovery email.
 */
const createRecovery = async ({
  email,
  url,
}: {
  email: string;
  url: string;
}): Promise<ReturnObject<Models.Token>> => {
  try {
    const { account } = await createAdminClient();
    const data = await account.createRecovery(email, url);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Creates a session using user ID and secret.
 */
const createSession = async ({
  userId,
  secret,
}: {
  userId: string;
  secret: string;
}): Promise<ReturnObject<Models.Session>> => {
  try {
    const { account } = await createAdminClient();
    const data = await account.createSession(userId, secret);
    (await cookies()).set(cookieName, data.secret, {
      httpOnly: true,
      secure: live,
      sameSite: "strict",
      expires: new Date(data.expire),
      path: "/",
    });
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Creates an email verification token.
 */
const createVerification = async ({
  verificationUrl = `${hostExternal}/${verificationPath}`,
}: {
  verificationUrl?: string;
}): Promise<ReturnObject<Models.Token>> => {
  try {
    const { account } = await createAdminClient();
    const data = await account.createVerification(verificationUrl);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Deletes preferences.
 */
type DeletePrefsParams = {
  keys: string | string[]; // Accepts either a single key or an array of keys
};
const deletePrefs = async ({
  keys,
}: DeletePrefsParams): Promise<ReturnObject<Models.Preferences>> => {
  try {
    const { account } = await createSessionClient();
    const prefs = await account.getPrefs();

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
    const user = await account.updatePrefs(newPrefs);
    return { data: user.prefs, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Deletes a session.
 */
const deleteSession = async ({
  sessionId = "current",
}: {
  sessionId?: string;
} = {}): Promise<ReturnObject<string>> => {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession(sessionId);
    return { data: signInPath, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Deletes all sessions for the current user.
 */
const deleteSessions = async (): Promise<ReturnObject<string>> => {
  try {
    const { account } = await createSessionClient();
    await account.deleteSessions();
    return { data: signInPath, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Retrieves a authenticated and verified native appwrite user.
 */
const getApwUser = async (): Promise<ReturnObject<typeof ApwUserType>> => {
  try {
    const { account } = await createSessionClient();

    const data = await account.get();
    if (!data?.$id) {
      return { data: null, error: null };
    }

    if ((data.emailVerification || data.phoneVerification) && data.status) {
      return {
        data,
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
 * Retrieves a authenticated and verified a custom user (from users collection).
 */
const getUser = async (): Promise<ReturnObject<typeof UserType>> => {
  try {
    const { account } = await createSessionClient();
    const { databases } = await createAdminClient();

    const data = await account.get();
    if (!data?.$id) {
      return { data: null, error: null };
    }

    const { total, documents } = await databases.listDocuments(
      databaseId,
      usersCollectionId,
      [Query.equal("user_id", data.$id)]
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
 * Retrieves a specific session or the current session.
 */
const getSession = async ({
  sessionId = "current",
}: {
  sessionId?: string;
} = {}): Promise<ReturnObject<Models.Session>> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.getSession(sessionId);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Lists all sessions for the current user.
 */
const listSessions = async (): Promise<ReturnObject<Models.SessionList>> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.listSessions();
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Updates user email.
 */
const updateEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ReturnObject<Models.User<Models.Preferences>>> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.updateEmail(email, password);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Updates user name.
 */
const updateName = async ({
  name,
}: {
  name: string;
}): Promise<ReturnObject<Models.User<Models.Preferences>>> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.updateName(name);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Updates user password.
 */
const updatePassword = async ({
  password,
  oldPassword,
}: {
  password: string;
  oldPassword?: string;
}): Promise<ReturnObject<Models.User<Models.Preferences>>> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.updatePassword(password, oldPassword);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Updates user phone number.
 */
const updatePhone = async ({
  phone,
  password,
}: {
  phone: string;
  password: string;
}): Promise<ReturnObject<Models.User<Models.Preferences>>> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.updatePhone(phone, password);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Confirms phone verification.
 */
const updatePhoneVerification = async ({
  userId,
  secret,
}: {
  userId: string;
  secret: string;
}): Promise<ReturnObject<Models.Token>> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.updatePhoneVerification(userId, secret);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Updates the password using a recovery token.
 */
const updateRecovery = async ({
  userId,
  secret,
  password,
}: {
  userId: string;
  secret: string;
  password: string;
}): Promise<ReturnObject<Models.Token>> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.updateRecovery(userId, secret, password);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Updates a specific session or the current session.
 */
const updateSession = async ({
  sessionId = "current",
}: {
  sessionId?: string;
}): Promise<ReturnObject<Models.Session>> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.updateSession(sessionId);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Updates user status.
 */
const updateStatus = async (): Promise<
  ReturnObject<Models.User<Models.Preferences>>
> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.updateStatus();
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/*
 * Updates email verification.
 */
const updateVerification = async ({
  userId,
  secret,
}: {
  userId: string;
  secret: string;
}): Promise<ReturnObject<Models.Token>> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.updateVerification(userId, secret);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

export {
  addPrefs,
  createAccount,
  createAnonymousSession,
  createEmailPasswordSession,
  createJWT,
  createMagicURLSession,
  createOAuth2Token,
  createPhoneVerification,
  createRecovery,
  createSession,
  createVerification,
  deletePrefs,
  deleteSession,
  deleteSessions,
  getApwUser,
  getSession,
  getUser,
  listSessions,
  updateEmail,
  updateName,
  updatePassword,
  updatePhone,
  updatePhoneVerification,
  updateRecovery,
  updateSession,
  updateStatus,
  updateVerification,
};
