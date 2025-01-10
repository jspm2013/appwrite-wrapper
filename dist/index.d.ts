import { getFlag, getImageFromUrl, getUserInitials, getQrCodeFromString } from "./methods/avatars";
import { createAccount, createJWT, createVerification, deleteSession, listSessions, deleteSessions, getUser, deletePrefs, getPrefs, setPrefs, updateVerification, createEmailPasswordSession, createOAuth2Token, createSession } from "./methods/account";
import { OAuthProvider } from "./methods/account";
import { createDocument, deleteDocument, getDocument, listDocuments, updateDocument } from "./methods/databases";
import { createSessionForUserId, createToken, deleteSessionForUserId, deleteSessionsForUserId, getUserForUserId, listUsers, updateEmailVerificationForUserId } from "./methods/users";
export declare function getOAuthProvider(): Promise<typeof OAuthProvider>;
export { getFlag, getImageFromUrl, getUserInitials, getQrCodeFromString, createAccount, createJWT, createVerification, deleteSession, listSessions, deleteSessions, getUser, deletePrefs, getPrefs, setPrefs, updateVerification, createEmailPasswordSession, createOAuth2Token, createSession, createDocument, deleteDocument, getDocument, listDocuments, updateDocument, createSessionForUserId, createToken, deleteSessionForUserId, deleteSessionsForUserId, getUserForUserId, listUsers, updateEmailVerificationForUserId, };
//# sourceMappingURL=index.d.ts.map