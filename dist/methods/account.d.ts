import { Models } from "node-appwrite";
import { OAuthProvider } from "../enums";
/**
 * Basic/native appwrite user type + empty custom attributes type.
 */
export type UserType = Models.User<Models.Preferences>;
export type CustomUserAttributes = Record<string, any>;
export type VerifiedUserType = UserType & {
    customUser: CustomUserAttributes;
};
/**
 * Parameters for creating an account.
 */
export type CreateAccountParams = {
    email: string;
    password: string;
    name?: string;
};
/**
 * Creates a new account.
 */
declare const createAccount: ({ email, password, name, }: CreateAccountParams) => Promise<UserType>;
/**
 * Creates a JWT token.
 */
declare const createJWT: () => Promise<Models.Jwt>;
/**
 * Parameters for creating an account.
 */
export type CreateVerificationParams = {
    verificationUrl?: string;
};
/**
 * Creates an email verification token.
 */
declare const createVerification: ({ verificationUrl, }: CreateVerificationParams) => Promise<Models.Token>;
/**
 * Parameters for deleting a session.
 */
export type DeleteSessionParams = {
    sessionId?: string;
};
/**
 * Deletes a specific session or the current session.
 */
declare const deleteSession: (params?: DeleteSessionParams) => Promise<string>;
/**
 * Parameters for getting a session.
 */
export type GetSessionParams = {
    sessionId?: string;
};
/**
 * Getting a specific session or the current session.
 */
declare const getSession: (params?: GetSessionParams) => Promise<Models.Session>;
/**
 * Parameters for updating a session.
 */
export type UpdateSessionParams = {
    sessionId?: string;
};
/**
 * Updates a specific session or the current session.
 */
declare const updateSession: (params?: UpdateSessionParams) => Promise<Models.Session>;
/**
 * Lists all sessions for the current user.
 */
declare const listSessions: () => Promise<Models.SessionList>;
/**
 * Deletes all sessions for the current user.
 */
declare const deleteSessions: () => Promise<string>;
/**
 * Retrieves the current user.
 */
declare const getUser: () => Promise<UserType | null>;
/**
 * Retrieves the current verified user.
 */
declare const getVerifiedUser: () => Promise<VerifiedUserType | null>;
/**
 * Parameters for deleting preferences.
 */
export type DeletePrefsParams = {
    key: string;
};
/**
 * Deletes a specific preference key for the current user.
 */
declare const deletePrefs: ({ key, }: DeletePrefsParams) => Promise<Models.Preferences>;
/**
 * Retrieves all preferences for the current user.
 */
declare const getPrefs: () => Promise<Models.Preferences>;
/**
 * Parameters for setting preferences.
 */
export type SetPrefsParams = {
    newPrefs: Record<string, unknown>;
};
/**
 * Updates preferences for the current user.
 */
declare const setPrefs: ({ newPrefs }: SetPrefsParams) => Promise<void>;
/**
 * Parameters for updating verification.
 */
export type UpdateVerificationParams = {
    userId: string;
    secret: string;
};
/**
 * Updates the email verification for a specific user.
 */
declare const updateVerification: ({ userId, secret, }: UpdateVerificationParams) => Promise<Models.Token>;
/**
 * Parameters for creating a session with email and password.
 */
export type CreateEmailPasswordSessionParams = {
    email: string;
    password: string;
};
/**
 * Creates a session for a user using email and password.
 */
declare const createEmailPasswordSession: ({ email, password, }: CreateEmailPasswordSessionParams) => Promise<Models.Session>;
/**
 * Parameters for creating an OAuth2 token.
 */
export type CreateOAuth2TokenParams = {
    provider: keyof typeof OAuthProvider;
    successPath?: string;
    failurePath?: string;
};
/**
 * Creates an OAuth2 token for the user.
 */
declare const createOAuth2Token: ({ provider, successPath, failurePath, }: CreateOAuth2TokenParams) => Promise<string>;
/**
 * Parameters for creating a session with user ID and secret.
 */
export type CreateSessionParams = {
    userId: string;
    secret: string;
};
/**
 * Creates a session for a user by their ID and secret.
 */
declare const createSession: ({ userId, secret, }: CreateSessionParams) => Promise<Models.Session>;
export type AccountFunctionTypes = {
    createAccount: typeof createAccount;
    createEmailPasswordSession: typeof createEmailPasswordSession;
    createJWT: typeof createJWT;
    createOAuth2Token: typeof createOAuth2Token;
    createSession: typeof createSession;
    createVerification: typeof createVerification;
    deletePrefs: typeof deletePrefs;
    deleteSession: typeof deleteSession;
    deleteSessions: typeof deleteSessions;
    getPrefs: typeof getPrefs;
    getUser: typeof getUser;
    getVerifiedUser: typeof getVerifiedUser;
    listSessions: typeof listSessions;
    setPrefs: typeof setPrefs;
    updateVerification: typeof updateVerification;
    updateSession: typeof updateSession;
    getSession: typeof getSession;
};
export { createAccount, createEmailPasswordSession, createJWT, createOAuth2Token, createSession, createVerification, deletePrefs, deleteSession, deleteSessions, getPrefs, getSession, getUser, getVerifiedUser, listSessions, setPrefs, updateSession, updateVerification, };
//# sourceMappingURL=account.d.ts.map