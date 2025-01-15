import { createAccount, createEmailPasswordSession, createJWT, createOAuth2Token, createSession, createVerification, deletePrefs, deleteSession, deleteSessions, getPrefs, getUser, getVerifiedUser, listSessions, setPrefs, updateVerification } from "./methods/account";
import { getFlag, getImageFromUrl, getQrCodeFromString, getUserInitials } from "./methods/avatars";
import { createDocument, deleteDocument, getDocument, listDocuments, updateDocument } from "./methods/databases";
import { createSessionForUserId, createToken, deleteSessionForUserId, deleteSessionsForUserId, getUserForUserId, getVerifiedUserForUserId, listIdentities, listUsers, updateEmailVerificationForUserId } from "./methods/users";
export declare const getHost: () => Promise<string>;
export declare const getOrigin: () => Promise<string>;
export declare const getCookieName: () => Promise<string>;
export { createAccount, createEmailPasswordSession, createJWT, createOAuth2Token, createSession, createVerification, deletePrefs, deleteSession, deleteSessions, getPrefs, getUser, getVerifiedUser, listSessions, setPrefs, updateVerification, getFlag, getImageFromUrl, getUserInitials, getQrCodeFromString, createDocument, deleteDocument, getDocument, listDocuments, updateDocument, createSessionForUserId, createToken, deleteSessionForUserId, deleteSessionsForUserId, getUserForUserId, getVerifiedUserForUserId, listIdentities, listUsers, updateEmailVerificationForUserId, };
//# sourceMappingURL=index.d.ts.map