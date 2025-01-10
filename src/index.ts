"use server";

// Importing individual functions and objects from modules
import {
  getFlag,
  getImageFromUrl,
  getUserInitials,
  getQrCodeFromString,
} from "./methods/avatars";
import {
  createAccount,
  createJWT,
  createVerification,
  deleteSession,
  listSessions,
  deleteSessions,
  getUser,
  deletePrefs,
  getPrefs,
  setPrefs,
  updateVerification,
  createEmailPasswordSession,
  createOAuth2Token,
  createSession,
} from "./methods/account";
import { OAuthProvider } from "./methods/account";
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
  listUsers,
  updateEmailVerificationForUserId,
} from "./methods/users";

// Wrapping constants like OAuthProvider in async functions
export async function getOAuthProvider() {
  return OAuthProvider;
}

// Exporting individual functions as async
export {
  // Avatars functions
  getFlag,
  getImageFromUrl,
  getUserInitials,
  getQrCodeFromString,

  // Account functions
  createAccount,
  createJWT,
  createVerification,
  deleteSession,
  listSessions,
  deleteSessions,
  getUser,
  deletePrefs,
  getPrefs,
  setPrefs,
  updateVerification,
  createEmailPasswordSession,
  createOAuth2Token,
  createSession,

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
