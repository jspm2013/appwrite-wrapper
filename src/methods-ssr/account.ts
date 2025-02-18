"use server";

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
import { OAuthProvider } from "../enums";
import { hostExternal, live } from "../host";
import { handleApwError } from "../exceptions";
import { isEmptyKeyValuePair } from "../utils";
import { ID, Models, Query } from "node-appwrite";
import { getType } from "../collections/typeReader";
import { createSessionClient, createAdminClient } from "../appwriteClients";

const admin: boolean = !live;

const errMsg = (fn: string) =>
  admin ? `ApwWrapper Error (methods/account): ${fn}()` : "Account Error";
const errDescr = (err: any) =>
  admin
    ? err?.response?.message ??
      "There was an account error processing your request"
    : "There was an account error processing your request";

interface ErrorObject {
  message: string;
  description: string;
}
interface ErrorObjectOld {
  appwrite: boolean;
  header: string;
  type: string;
  code: number;
  variant: string;
  description: string;
  error?: object;
}
interface ReturnObject<T> {
  error: ErrorObject | ErrorObjectOld | null;
  data: T | null;
}

/**
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
    const { account } = await createSessionClient();
    const data = await account.create(ID.unique(), email, password, name);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createAccount"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Creates an anonymous session.
 */
const createAnonymousSession = async (): Promise<
  ReturnObject<Models.Session>
> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.createAnonymousSession();
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createAnonymousSession"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
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
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createEmailPasswordSession"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Creates a JWT token.
 */
const createJWT = async (): Promise<ReturnObject<Models.Jwt>> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.createJWT();
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createJWT"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
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
    const { account } = await createSessionClient();
    const data = await account.createMagicURLToken(
      userId || ID.unique(),
      email,
      url,
      phrase
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createMagicURLSession"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createOAuth2Token"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Creates a phone verification token.
 */
const createPhoneVerification = async (): Promise<
  ReturnObject<Models.Token>
> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.createPhoneVerification();
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createPhoneVerification"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Creates a password recovery token.
 */
const createRecovery = async ({
  email,
  url,
}: {
  email: string;
  url: string;
}): Promise<ReturnObject<Models.Token>> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.createRecovery(email, url);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createRecovery"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
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
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createSession"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Creates an email verification token.
 */
const createVerification = async ({
  verificationUrl = `${hostExternal}/${verificationPath}`,
}: {
  verificationUrl?: string;
}): Promise<ReturnObject<Models.Token>> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.createVerification(verificationUrl);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createVerification"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Deletes preferences.
 */
const deletePrefs = async ({
  key,
}: {
  key: string;
}): Promise<ReturnObject<Models.Preferences>> => {
  try {
    const { account } = await createSessionClient();
    const prefs = await account.getPrefs();
    if (Object.prototype.hasOwnProperty.call(prefs, key)) {
      const { [key]: _, ...newPrefs } = prefs;
      const user = await account.updatePrefs(newPrefs);
      return { data: user.prefs, error: null };
    }
    return { data: prefs, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("deletePrefs"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("deleteSession"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Deletes all sessions for the current user.
 */
const deleteSessions = async (): Promise<ReturnObject<string>> => {
  try {
    const { account } = await createSessionClient();
    await account.deleteSessions();
    return { data: signInPath, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("deleteSessions"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Retrieves the authenticated and verified user.
 */
const getAppUser = async (): Promise<ReturnObject<any>> => {
  try {
    const { account } = await createSessionClient();
    const { databases } = await createAdminClient();

    const user = await account.get();
    const AppUserType = await getType({
      collName: userCollectionId,
      typeName: "AppUserType",
    });

    if (!AppUserType) {
      throw new Error("No AppUser Type found. Returning null");
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

      if (total === 1) {
        return {
          data: {
            ...user,
            customUser: documents[0],
          } as unknown as typeof AppUserType,
          error: null,
        };
      }
    }

    return { data: null, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getAppUser"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Retrieves preferences.
 */
const getPrefs = async (): Promise<ReturnObject<Models.Preferences>> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.getPrefs();
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getPrefs"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getSession"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Retrieves user details.
 */
const getUser = async (): Promise<
  ReturnObject<Models.User<Models.Preferences>>
> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.get();
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getUser"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Lists all sessions for the current user.
 */
const listSessions = async (): Promise<ReturnObject<Models.SessionList>> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.listSessions();
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("listSessions"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Updates user preferences.
 */
const updatePrefs = async ({
  prefs,
}: {
  prefs: Models.Preferences;
}): Promise<ReturnObject<Models.Preferences>> => {
  try {
    const { account } = await createSessionClient();
    const oldPrefs = await account.getPrefs();
    const data = await account.updatePrefs(
      isEmptyKeyValuePair(oldPrefs) ? prefs : { ...oldPrefs, ...prefs }
    );
    return { data: data.prefs, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updatePrefs"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateEmail"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateName"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updatePassword"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updatePhone"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updatePhoneVerification"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateRecovery"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateSession"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Updates user status.
 */
const updateStatus = async (): Promise<
  ReturnObject<Models.User<Models.Preferences>>
> => {
  try {
    const { account } = await createSessionClient();
    const data = await account.updateStatus();
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateStatus"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
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
  } catch (err: any) {
    return {
      data: null,
      error: await handleApwError({ error: err, locale: "de", admin }),
      /* error: {
        message: errMsg("updateVerification"),
        description: JSON.stringify(err),
      }, */
    };
  }
};

export {
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
  getAppUser,
  getPrefs,
  getSession,
  getUser,
  listSessions,
  updatePrefs,
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
