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
interface ReturnObject<T> {
    error: ErrorObject | null;
    data: T | null;
}
export { type ErrorObject, type ReturnObject };
export { addPrefs, createAccount, createAnonymousSession, createEmailPasswordSession, createJWT, createMagicURLSession, createOAuth2Token, createPhoneVerification, createRecovery, createSession, createVerification, deletePrefs, deleteSession, deleteSessions, getApwUser, getSession, getUser, listSessions, updateEmail, updateName, updatePassword, updatePhone, updatePhoneVerification, updateRecovery, updateSession, updateStatus, updateVerification, } from "./methods/account";
export { getBrowserIcon, getCreditCardIcon, getFavicon, getFlag, getImage, getInitials, getQr, } from "./methods/avatars";
export { createBucket, deleteBucket, getBucket, getFile, getFileDownload, getFilePreview, getFileView, deleteFile, listBuckets, listFiles, updateBucket, updateFile, uploadFile, } from "./methods/storage";
export { createTeam, createTeamMembership, deleteTeam, deleteTeamMembership, getTeam, getTeamMembership, getTeamPreferences, listTeamMemberships, listTeams, updateTeamMembership, updateTeamMembershipStatus, updateTeamName, updateTeamPreferences, } from "./methods/teams";
export { addLabelsForUserId, addPrefsForUserId, createSessionForUserId, createToken, deleteLabelsForUserId, deletePrefsForUserId, deleteSessionForUserId, deleteSessionsForUserId, deleteUserForUserId, getApwUserForUserId, getUserForUserId, // INcl. deleted=false as default
listApwUsers, listUsers, // INcl. deleted=false as default
listIdentities, listIdentitiesForUserId, listSessionsForUserId, updateEmailForUserId, updateEmailVerificationForUserId, updateNameForUserId, updatePasswordForUserId, updatePhoneForUserId, updatePhoneVerificationForUserId, updateStatusForUserId, } from "./methods/users";
export { envCheck, apiKeySsr, appDomain, cookiePrefix, cookieName, databaseId, endpoint, i18nPath, liveEnvVarName, oauthSuccessPath, oauthFailurePath, projectId, port, paths, logsPath, schemasPath, signInPath, usersCollectionId, verificationPath, logsBucketId, logsBucketName, } from "./appwriteConfig";
export { apwManager, temporaryPassword, imgToWebP, hostInternal, hostExternal, live, originInternal, originExternal, isValidJsonString, isEmptyKeyValuePair, isEmptyObject, isValidJsonObject, };
//# sourceMappingURL=index.d.ts.map