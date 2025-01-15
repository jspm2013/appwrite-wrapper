import { OAuthProvider, Models } from "node-appwrite";
/**
 * Parameters for creating an account.
 */
export type CreateAccountParams = {
    email: string;
    password: string;
    name?: string;
};
/**
 * Parameters for deleting preferences.
 */
export type DeletePrefsParams = {
    key: string;
};
/**
 * Parameters for updating verification.
 */
export type UpdateVerificationParams = {
    userId: string;
    secret: string;
};
/**
 * Parameters for creating an OAuth2 token.
 */
export type CreateOAuth2TokenParams = {
    provider: keyof typeof OAuthProvider;
    successPath?: string;
    failurePath?: string;
};
/**
 * Parameters for setting preferences.
 */
export type SetPrefsParams = {
    newPrefs: Record<string, unknown>;
};
/**
 * Parameters for creating a session with email and password.
 */
export type CreateEmailPasswordSessionParams = {
    email: string;
    password: string;
};
/**
 * Parameters for creating a session with user ID and secret.
 */
export type CreateSessionParams = {
    userId: string;
    secret: string;
};
/**
 * Parameters for deleting a session.
 */
export type DeleteSessionParams = {
    sessionId?: string;
};
/**
 * Creates a new account.
 */
declare const createAccount: ({ email, password, name, }: CreateAccountParams) => Promise<Models.User<Models.Preferences>>;
/**
 * Creates a JWT token.
 */
declare const createJWT: () => Promise<Models.Jwt>;
/**
 * Creates an email verification token.
 */
declare const createVerification: ({ verificationUrl, }: {
    verificationUrl?: string | undefined;
}) => Promise<Models.Token>;
/**
 * Deletes a specific session or the current session.
 */
declare const deleteSession: (params?: DeleteSessionParams) => Promise<void>;
/**
 * Lists all sessions for the current user.
 */
declare const listSessions: () => Promise<Models.SessionList>;
/**
 * Deletes all sessions for the current user.
 */
declare const deleteSessions: () => Promise<void>;
/**
 * Retrieves the current user.
 */
declare const getUser: () => Promise<Models.User<Models.Preferences> | null>;
/**
 * Retrieves the current verified user.
 */
declare const getVerifiedUser: () => Promise<Models.User<Models.Preferences> | null>;
/**
 * Deletes a specific preference key for the current user.
 */
declare const deletePrefs: ({ key, }: DeletePrefsParams) => Promise<Models.Preferences>;
/**
 * Retrieves all preferences for the current user.
 */
declare const getPrefs: () => Promise<Models.Preferences>;
/**
 * Updates preferences for the current user.
 */
declare const setPrefs: ({ newPrefs }: SetPrefsParams) => Promise<void>;
/**
 * Updates the email verification for a specific user.
 */
declare const updateVerification: ({ userId, secret, }: UpdateVerificationParams) => Promise<Models.Token>;
/**
 * Creates a session for a user using email and password.
 */
declare const createEmailPasswordSession: ({ email, password, }: CreateEmailPasswordSessionParams) => Promise<Models.Session>;
/**
 * Creates an OAuth2 token for the user.
 */
declare const createOAuth2Token: ({ provider, successPath, failurePath, }: CreateOAuth2TokenParams) => Promise<string>;
/**
 * Creates a session for a user by their ID and secret.
 */
declare const createSession: ({ userId, secret, }: CreateSessionParams) => Promise<Models.Session>;
export type AccountFunctions = {
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
};
export { createAccount, createEmailPasswordSession, createJWT, createOAuth2Token, createSession, createVerification, deletePrefs, deleteSession, deleteSessions, getPrefs, getUser, getVerifiedUser, listSessions, setPrefs, updateVerification, };
//# sourceMappingURL=account.d.ts.map