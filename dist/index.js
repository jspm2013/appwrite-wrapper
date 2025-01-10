"use server";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Importing individual functions and objects from modules
import { getFlag, getImageFromUrl, getUserInitials, getQrCodeFromString, } from "./methods/avatars";
import { createAccount, createJWT, createVerification, deleteSession, listSessions, deleteSessions, getUser, deletePrefs, getPrefs, setPrefs, updateVerification, createEmailPasswordSession, createOAuth2Token, createSession, } from "./methods/account";
import { OAuthProvider } from "./methods/account";
import { createDocument, deleteDocument, getDocument, listDocuments, updateDocument, } from "./methods/databases";
import { createSessionForUserId, createToken, deleteSessionForUserId, deleteSessionsForUserId, getUserForUserId, listUsers, updateEmailVerificationForUserId, } from "./methods/users";
// Wrapping constants like OAuthProvider in async functions
export function getOAuthProvider() {
    return __awaiter(this, void 0, void 0, function* () {
        return OAuthProvider;
    });
}
// Exporting individual functions as async
export { 
// Avatars functions
getFlag, getImageFromUrl, getUserInitials, getQrCodeFromString, 
// Account functions
createAccount, createJWT, createVerification, deleteSession, listSessions, deleteSessions, getUser, deletePrefs, getPrefs, setPrefs, updateVerification, createEmailPasswordSession, createOAuth2Token, createSession, 
// Database functions
createDocument, deleteDocument, getDocument, listDocuments, updateDocument, 
// Users functions
createSessionForUserId, createToken, deleteSessionForUserId, deleteSessionsForUserId, getUserForUserId, listUsers, updateEmailVerificationForUserId, };
