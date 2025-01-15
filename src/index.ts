"use server";

import { host, origin } from "./host";
import { cookieName } from "./appwriteConfig";

// Importing individual functions and objects from methods
import {
  createAccount,
  createJWT,
  createVerification,
  deleteSession,
  listSessions,
  deleteSessions,
  getUser,
  getVerifiedUser,
  deletePrefs,
  getPrefs,
  setPrefs,
  updateVerification,
  createEmailPasswordSession,
  createOAuth2Token,
  createSession,
} from "./methods/account";

import {
  getFlag,
  getImageFromUrl,
  getUserInitials,
  getQrCodeFromString,
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
  listUsers,
  updateEmailVerificationForUserId,
} from "./methods/users";

// Appwrite config
export const getHost = async (): Promise<string> => host;
export const getOrigin = async (): Promise<string> => origin;
export const getCookieName = async (): Promise<string> => cookieName;

export {
  // Account functions
  createAccount,
  createJWT,
  createVerification,
  deleteSession,
  listSessions,
  deleteSessions,
  getUser,
  getVerifiedUser,
  getVerifiedUserForUserId,
  deletePrefs,
  getPrefs,
  setPrefs,
  updateVerification,
  createEmailPasswordSession,
  createOAuth2Token,
  createSession,

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
  listUsers,
  updateEmailVerificationForUserId,
};
