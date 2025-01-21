import { host, origin } from "./host";
import { cookieName } from "./appwriteConfig";
export { Models, ID, Query } from "node-appwrite";

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
  getSession,
  getUser,
  getVerifiedUser,
  listSessions,
  setPrefs,
  updateSession,
  updateVerification,
} from "./methods/account";

export {
  // Avatars functions
  getFlag,
  getImageFromUrl,
  getQrCodeFromString,
  getUserInitials,
} from "./methods/avatars";

export {
  // Databases functions
  createBooleanAttribute,
  createCollection,
  createCollectionWithSchema,
  createDatabase,
  createDatetimeAttribute,
  createDocument,
  createEmailAttribute,
  createEnumAttribute,
  createFloatAttribute,
  createIndex,
  createIntegerAttribute,
  createIpAttribute,
  createRelationshipAttribute,
  createStringAttribute,
  createUrlAttribute,
  deleteAttribute,
  deleteCollection,
  deleteDatabase,
  deleteDocument,
  deleteIndex,
  getAttribute,
  getCollection,
  getDatabase,
  getDocument,
  getIndex,
  listAttributes,
  listCollections,
  listDatabases,
  listDocuments,
  listIndexes,
  updateBooleanAttribute,
  updateCollection,
  updateDatabase,
  updateDatetimeAttribute,
  updateDocument,
  updateEmailAttribute,
  updateEnumAttribute,
  updateFloatAttribute,
  updateIntegerAttribute,
  updateIpAttribute,
  updateRelationshipAttribute,
  updateStringAttribute,
  updateUrlAttribute,
} from "./methods/databases";

export {
  // Storage functions
  createBucket,
  deleteBucket,
  getBucket,
  getFileDetails,
  getFileDownload,
  getFilePreview,
  deleteFile,
  listBuckets,
  listFiles,
  updateBucket,
  updateFile,
  uploadFile,
  uploadFileFromPath,
} from "./methods/storage";

export {
  // Teams functions
  createTeam,
  createTeamMembership,
  deleteTeam,
  deleteTeamMembership,
  getTeam,
  getTeamMembership,
  getTeamPreferences,
  listTeamMemberships,
  listTeams,
  updateTeamMembership,
  updateTeamMembershipStatus,
  updateTeamName,
  updateTeamPreferences,
} from "./methods/teams";

export {
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
} from "./methods/users";

// Function Types
export type { AccountFunctionTypes } from "./methods/account";
export type { AvatarsFunctionTypes } from "./methods/avatars";
export type { DatabasesFunctionTypes } from "./methods/databases";
export type { StorageFunctionTypes } from "./methods/storage";
export type { TeamsFunctionTypes } from "./methods/teams";
export type { UsersFunctionTypes } from "./methods/users";

export {
  // ApwWrapper Config
  host,
  origin,
  cookieName,
};
