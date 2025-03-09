import { hostInternal, hostExternal, live, originInternal, originExternal } from "./host";
import { apwManager, imgToWebP, temporaryPassword, isValidJsonString, isEmptyKeyValuePair, isEmptyObject, isValidJsonObject } from "./utils";
export { Models, ID, Query } from "node-appwrite";
interface ErrorObject {
    appwrite: boolean;
    header: string;
    type: string;
    code: number;
    variant: string;
    description: string;
    error?: object;
}
export { type ErrorObject };
export { addPrefs, createAccount, createAnonymousSession, createEmailPasswordSession, createJWT, createMagicURLSession, createOAuth2Token, createPhoneVerification, createRecovery, createSession, createVerification, deletePrefs, deleteSession, deleteSessions, getAppUser, getCustomUser, getSession, getUser, listSessions, updateEmail, updateName, updatePassword, updatePhone, updatePhoneVerification, updateRecovery, updateSession, updateStatus, updateVerification, } from "./methods/account";
export { getBrowserIcon, getCreditCardIcon, getFavicon, getFlag, getImage, getInitials, getQr, } from "./methods/avatars";
export { createBooleanAttribute, createCollection, createCollectionWithSchema, createDatabase, createDatetimeAttribute, createDocument, createEmailAttribute, createEnumAttribute, createFloatAttribute, createIndex, createIntegerAttribute, createIpAttribute, createRelationshipAttribute, createStringAttribute, createUrlAttribute, deleteAttribute, deleteCollection, deleteDatabase, deleteDocument, deleteIndex, getAttribute, getCollection, getDatabase, getDocument, getIndex, listAttributes, listCollections, listDatabases, listDocuments, listIndexes, updateBooleanAttribute, updateCollection, updateDatabase, updateDatetimeAttribute, updateDocument, updateEmailAttribute, updateEnumAttribute, updateFloatAttribute, updateIntegerAttribute, updateIpAttribute, updateRelationshipAttribute, updateStringAttribute, updateUrlAttribute, } from "./methods/databases";
export { createBucket, deleteBucket, getBucket, getFile, getFileDownload, getFilePreview, getFileView, deleteFile, listBuckets, listFiles, updateBucket, updateFile, uploadFile, } from "./methods/storage";
export { createTeam, createTeamMembership, deleteTeam, deleteTeamMembership, getTeam, getTeamMembership, getTeamPreferences, listTeamMemberships, listTeams, updateTeamMembership, updateTeamMembershipStatus, updateTeamName, updateTeamPreferences, } from "./methods/teams";
export { addLabelsForUserId, addPrefsForUserId, createSessionForUserId, createToken, deleteLabelsForUserId, deletePrefsForUserId, deleteSessionForUserId, deleteSessionsForUserId, deleteUserForUserId, getAppUserForUserId, getCustomUserForUserId, getUserForUserId, listCustomUsers, listIdentities, listIdentitiesForUserId, listSessionsForUserId, listUsers, updateEmailForUserId, updateEmailVerificationForUserId, updateNameForUserId, updatePasswordForUserId, updatePhoneForUserId, updatePhoneVerificationForUserId, updateStatusForUserId, } from "./methods/users";
export { envCheck, apiKeySsr, appDomain, cookiePrefix, cookieName, databaseId, endpoint, i18nPath, liveEnvVarName, oauthSuccessPath, oauthFailurePath, projectId, port, schemasPath, signInPath, userCollectionId, verificationPath, } from "./appwriteConfig";
export { apwManager, temporaryPassword, imgToWebP, hostInternal, hostExternal, live, originInternal, originExternal, isValidJsonString, isEmptyKeyValuePair, isEmptyObject, isValidJsonObject, };
//# sourceMappingURL=index.d.ts.map