import { createAccount, createJWT, createVerification, deleteSession, listSessions, deleteSessions, getUser, deletePrefs, getPrefs, setPrefs, updateVerification, createEmailPasswordSession, createOAuth2Token, createSession } from "./methods/account";
import { getFlag, getImageFromUrl, getUserInitials, getQrCodeFromString } from "./methods/avatars";
import { createDocument, deleteDocument, getDocument, listDocuments, updateDocument } from "./methods/databases";
import { createSessionForUserId, createToken, deleteSessionForUserId, deleteSessionsForUserId, getUserForUserId, listUsers, updateEmailVerificationForUserId } from "./methods/users";
export declare const getHost: () => Promise<string>;
export declare const getOrigin: () => Promise<string>;
export declare const getCookieName: () => Promise<string>;
export { createAccount, createJWT, createVerification, deleteSession, listSessions, deleteSessions, getUser, deletePrefs, getPrefs, setPrefs, updateVerification, createEmailPasswordSession, createOAuth2Token, createSession, getFlag, getImageFromUrl, getUserInitials, getQrCodeFromString, createDocument, deleteDocument, getDocument, listDocuments, updateDocument, createSessionForUserId, createToken, deleteSessionForUserId, deleteSessionsForUserId, getUserForUserId, listUsers, updateEmailVerificationForUserId, };
//# sourceMappingURL=index.d.ts.map