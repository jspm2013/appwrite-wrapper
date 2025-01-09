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
 * Creates a new account.
 */
declare const createAccount: ({ email, password, name, }: CreateAccountParams) => Promise<Models.User<Models.Preferences> | Error>;
/**
 * Creates a JWT token.
 */
declare const createJWT: () => Promise<Models.Jwt | Error>;
/**
 * Creates an email verification token.
 */
declare const createVerification: ({ verificationUrl, }: {
    verificationUrl?: string | undefined;
}) => Promise<Models.Token | Error>;
/**
 * Deletes a specific session or the current session.
 */
declare const deleteSession: ({ sessionId, }: {
    sessionId?: string | undefined;
}) => Promise<void | Error>;
/**
 * Lists all sessions for the current user.
 */
declare const listSessions: () => Promise<Models.SessionList | Error>;
/**
 * Deletes all sessions for the current user.
 */
declare const deleteSessions: () => Promise<void | Error>;
/**
 * Retrieves the current user.
 */
declare const getUser: () => Promise<Models.User<Models.Preferences> | Error | null>;
/**
 * Deletes a specific preference key for the current user.
 */
declare const deletePrefs: ({ key, }: DeletePrefsParams) => Promise<Models.Preferences | Error>;
/**
 * Retrieves all preferences for the current user.
 */
declare const getPrefs: () => Promise<Models.Preferences | Error>;
/**
 * Updates preferences for the current user.
 */
declare const setPrefs: ({ newPrefs, }: SetPrefsParams) => Promise<void | Error>;
/**
 * Updates the email verification for a specific user.
 */
declare const updateVerification: ({ userId, secret, }: UpdateVerificationParams) => Promise<Models.Token | Error>;
/**
 * Creates a session for a user using email and password.
 */
declare const createEmailPasswordSession: ({ email, password, }: CreateEmailPasswordSessionParams) => Promise<Models.Session | Error>;
/**
 * Creates an OAuth2 token for the user.
 */
declare const createOAuth2Token: ({ provider, successPath, failurePath, }: CreateOAuth2TokenParams) => Promise<string | Error>;
/**
 * Creates a session for a user by their ID and secret.
 */
declare const createSession: ({ userId, secret, }: CreateSessionParams) => Promise<Models.Session | Error>;
export type AccountFunctions = {
    createAccount: typeof createAccount;
    createJWT: typeof createJWT;
    createVerification: typeof createVerification;
    deleteSession: typeof deleteSession;
    listSessions: typeof listSessions;
    deleteSessions: typeof deleteSessions;
    getUser: typeof getUser;
    deletePrefs: typeof deletePrefs;
    getPrefs: typeof getPrefs;
    setPrefs: typeof setPrefs;
    updateVerification: typeof updateVerification;
    createEmailPasswordSession: typeof createEmailPasswordSession;
    createOAuth2Token: typeof createOAuth2Token;
    createSession: typeof createSession;
};
export { createAccount, createJWT, createVerification, deleteSession, listSessions, deleteSessions, getUser, deletePrefs, getPrefs, setPrefs, updateVerification, createEmailPasswordSession, createOAuth2Token, createSession, };
//# sourceMappingURL=account.d.ts.map