"use server";

import { ID, OAuthProvider } from "node-appwrite";
import {
  createSessionClient,
  createAdminClient,
} from "../../src/appwriteClients";
import { isValidJsonObject, isEmptyKeyValuePair } from "../../src/utils";
import {
  cookieName,
  oauthSuccessPath,
  oauthFailurePath,
  verificationPath,
} from "../../src/appwriteConfig";
import { cookies } from "next/headers";
import { host } from "../../src/host";

/*
 *
 * Functions based on
 *
 * > > > createSessionClient < < <
 *
 */
const createAccount = async ({ email, password, name }) => {
  try {
    const { account } = await createSessionClient();
    const user = await account.create(ID.unique(), email, password, name);
    return user;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing createAccount():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const createJWT = async () => {
  try {
    const { account } = await createSessionClient();
    const jwt = await account.createJWT();
    return jwt;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing createJWT():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const createVerification = async ({
  verificationUrl = `${host}/${verificationPath}`,
}) => {
  try {
    const { account } = await createSessionClient();
    const token = await account.createVerification(verificationUrl);
    return token;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing createVerification():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const deleteSession = async ({ sessionId = "current" }) => {
  // Logout the user. Use "current" as the session ID to logout on this device,
  // use a session ID to logout the currenty logged in user on another device. If you're looking to logout the user on all devices,
  // use deleteSessions() (https://appwrite.io/docs/references/cloud/client-web/account#deleteSessions) instead.
  try {
    const { account } = await createSessionClient();
    await account.deleteSession(sessionId);
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing deleteSession():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const listSessions = async () => {
  // List all sessions from the currently logged in user.
  try {
    const { account } = await createSessionClient();
    const sessions = await account.listSessions();
    return sessions;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing listSessions():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const deleteSessions = async () => {
  // Delete all sessions from the currently logged in user and from all clients.
  try {
    const { account } = await createSessionClient();
    await account.deleteSessions();
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing deleteSessions():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const getUser = async () => {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return user;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing getUser():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const deletePrefs = async ({ key }) => {
  try {
    const { account } = await createSessionClient();
    const oldPrefs = await account.getPrefs();
    if (oldPrefs.hasOwnProperty(key)) {
      const { [key]: _, ...newPrefs } = oldPrefs;
      await account.updatePrefs(newPrefs);
      return newPrefs;
    }
    return oldPrefs;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing deletePrefs():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const getPrefs = async () => {
  try {
    const { account } = await createSessionClient();
    const prefs = await account.getPrefs();
    return prefs;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing getPrefs():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const setPrefs = async ({ newPrefs }) => {
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
    console.log("APW-LIB ERROR: Error executing setPrefs():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const updateVerification = async ({ userId, secret }) => {
  try {
    const { account } = await createSessionClient();
    const token = await account.updateVerification(userId, secret);
    return token;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing updateVerification():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

/*
 *
 * Functions based on
 *
 * > > > createAdminClient < < <
 *
 */
const createEmailPasswordSession = async ({ email, password }) => {
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
    console.log("APW-LIB ERROR: Error executing createEmailPasswordSession():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const createOAuth2Token = async ({
  provider,
  successPath = oauthSuccessPath,
  failurePath = oauthFailurePath,
}) => {
  try {
    const { account } = await createAdminClient();
    const oAuthUrl = await account.createOAuth2Token(
      OAuthProvider[provider],
      `${host}/${successPath}`,
      `${host}/${failurePath}`
    );

    return oAuthUrl;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing createOAuth2Token():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const createSession = async ({ userId, secret }) => {
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
    console.log("APW-LIB ERROR: Error executing createSession():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
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
  getUser,
  listSessions,
  setPrefs,
  updateVerification,
};
