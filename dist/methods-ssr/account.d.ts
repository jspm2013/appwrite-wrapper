import { OAuthProvider } from "../enums";
import { Models } from "node-appwrite";
interface ErrorObject {
    message: string;
    description: string;
}
interface ErrorObjectOld {
    appwrite: boolean;
    header: string;
    type: string;
    code: number;
    variant: string;
    description: string;
    error?: object;
}
interface ReturnObject<T> {
    error: ErrorObject | ErrorObjectOld | null;
    data: T | null;
}
/**
 * Creates an account.
 */
declare const createAccount: ({ email, password, name, }: {
    email: string;
    password: string;
    name?: string;
}) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
/**
 * Creates an anonymous session.
 */
declare const createAnonymousSession: () => Promise<ReturnObject<Models.Session>>;
/**
 * Creates an email-password session.
 */
declare const createEmailPasswordSession: ({ email, password, }: {
    email: string;
    password: string;
}) => Promise<ReturnObject<Models.Session>>;
/**
 * Creates a JWT token.
 */
declare const createJWT: () => Promise<ReturnObject<Models.Jwt>>;
/**
 * Creates a Magic URL session.
 */
declare const createMagicURLSession: ({ email, url, userId, phrase, }: {
    email: string;
    url?: string;
    userId?: string;
    phrase?: boolean;
}) => Promise<ReturnObject<Models.Token>>;
/**
 * Creates an OAuth2 token.
 */
declare const createOAuth2Token: ({ provider, successPath, failurePath, scopes, }: {
    provider: keyof typeof OAuthProvider;
    successPath?: string;
    failurePath?: string;
    scopes?: string[];
}) => Promise<ReturnObject<string>>;
/**
 * Creates a phone verification token.
 */
declare const createPhoneVerification: () => Promise<ReturnObject<Models.Token>>;
/**
 * Creates a password recovery token.
 */
declare const createRecovery: ({ email, url, }: {
    email: string;
    url: string;
}) => Promise<ReturnObject<Models.Token>>;
/**
 * Creates a session using user ID and secret.
 */
declare const createSession: ({ userId, secret, }: {
    userId: string;
    secret: string;
}) => Promise<ReturnObject<Models.Session>>;
/**
 * Creates an email verification token.
 */
declare const createVerification: ({ verificationUrl, }: {
    verificationUrl?: string;
}) => Promise<ReturnObject<Models.Token>>;
/**
 * Deletes preferences.
 */
declare const deletePrefs: ({ key, }: {
    key: string;
}) => Promise<ReturnObject<Models.Preferences>>;
/**
 * Deletes a session.
 */
declare const deleteSession: ({ sessionId, }?: {
    sessionId?: string;
}) => Promise<ReturnObject<string>>;
/**
 * Deletes all sessions for the current user.
 */
declare const deleteSessions: () => Promise<ReturnObject<string>>;
/**
 * Retrieves the authenticated and verified user.
 */
declare const getAppUser: () => Promise<ReturnObject<any>>;
/**
 * Retrieves preferences.
 */
declare const getPrefs: () => Promise<ReturnObject<Models.Preferences>>;
/**
 * Retrieves a specific session or the current session.
 */
declare const getSession: ({ sessionId, }?: {
    sessionId?: string;
}) => Promise<ReturnObject<Models.Session>>;
/**
 * Retrieves user details.
 */
declare const getUser: () => Promise<ReturnObject<Models.User<Models.Preferences>>>;
/**
 * Lists all sessions for the current user.
 */
declare const listSessions: () => Promise<ReturnObject<Models.SessionList>>;
/**
 * Updates user preferences.
 */
declare const updatePrefs: ({ prefs, }: {
    prefs: Models.Preferences;
}) => Promise<ReturnObject<Models.Preferences>>;
/**
 * Updates user email.
 */
declare const updateEmail: ({ email, password, }: {
    email: string;
    password: string;
}) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
/**
 * Updates user name.
 */
declare const updateName: ({ name, }: {
    name: string;
}) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
/**
 * Updates user password.
 */
declare const updatePassword: ({ password, oldPassword, }: {
    password: string;
    oldPassword?: string;
}) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
/**
 * Updates user phone number.
 */
declare const updatePhone: ({ phone, password, }: {
    phone: string;
    password: string;
}) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
/**
 * Confirms phone verification.
 */
declare const updatePhoneVerification: ({ userId, secret, }: {
    userId: string;
    secret: string;
}) => Promise<ReturnObject<Models.Token>>;
/**
 * Updates the password using a recovery token.
 */
declare const updateRecovery: ({ userId, secret, password, }: {
    userId: string;
    secret: string;
    password: string;
}) => Promise<ReturnObject<Models.Token>>;
/**
 * Updates a specific session or the current session.
 */
declare const updateSession: ({ sessionId, }: {
    sessionId?: string;
}) => Promise<ReturnObject<Models.Session>>;
/**
 * Updates user status.
 */
declare const updateStatus: () => Promise<ReturnObject<Models.User<Models.Preferences>>>;
/**
 * Updates email verification.
 */
declare const updateVerification: ({ userId, secret, }: {
    userId: string;
    secret: string;
}) => Promise<ReturnObject<Models.Token>>;
export { createAccount, createAnonymousSession, createEmailPasswordSession, createJWT, createMagicURLSession, createOAuth2Token, createPhoneVerification, createRecovery, createSession, createVerification, deletePrefs, deleteSession, deleteSessions, getAppUser, getPrefs, getSession, getUser, listSessions, updatePrefs, updateEmail, updateName, updatePassword, updatePhone, updatePhoneVerification, updateRecovery, updateSession, updateStatus, updateVerification, };
//# sourceMappingURL=account.d.ts.map