"use server";

import { host, origin } from "./host";
import { cookieName } from "./appwriteConfig";
import { Models, ID } from "node-appwrite";

// Importing individual functions and objects from methods
import {
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
  getVerifiedUser,
  listSessions,
  setPrefs,
  updateVerification,
} from "./methods/account";

import {
  getFlag,
  getImageFromUrl,
  getQrCodeFromString,
  getUserInitials,
} from "./methods/avatars";

import {
  createDocument,
  deleteDocument,
  getDocument,
  listDocuments,
  updateDocument,
} from "./methods/databases";

import {
  createSessionForUserId,
  createToken,
  deleteSessionForUserId,
  deleteSessionsForUserId,
  getUserForUserId,
  getVerifiedUserForUserId,
  listIdentities,
  listUsers,
  updateEmailVerificationForUserId,
} from "./methods/users";

// Appwrite config
export const getHost = async (): Promise<string> => host;
export const getOrigin = async (): Promise<string> => origin;
export const getCookieName = async (): Promise<string> => cookieName;

export { Models, ID };

export {
  // Account functions
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
  getVerifiedUser,
  listSessions,
  setPrefs,
  updateVerification,

  // Avatars functions
  getFlag,
  getImageFromUrl,
  getUserInitials,
  getQrCodeFromString,

  // Database functions
  createDocument,
  deleteDocument,
  getDocument,
  listDocuments,
  updateDocument,

  // Users functions
  createSessionForUserId,
  createToken,
  deleteSessionForUserId,
  deleteSessionsForUserId,
  getUserForUserId,
  getVerifiedUserForUserId,
  listIdentities,
  listUsers,
  updateEmailVerificationForUserId,
};
