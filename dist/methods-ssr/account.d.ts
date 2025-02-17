import { Models } from "node-appwrite";
import { OAuthProvider } from "../enums";
/**
 * Basic native appwrite user type.
 */
export type UserType = Models.User<Models.Preferences>;
/**
 * Basic appwrite-wrapper return object
 */
interface ErrorObject {
    message: string;
    description: string;
}
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
 * Retrieves the currently authenticated and verified user, dynamically typed based on the generated schema.
 *
 * @returns {Promise<any | null>} - The user object enriched with custom user attributes, or `null` if not verified.
 */
declare const getAppUser: () => Promise<any | null>;
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
 * Parameters for updating preferences.
 */
export type UpdatePrefsParams = {
    prefs: Models.Preferences;
};
/**
 * Updates preferences for the current user.
 */
declare const updatePrefs: ({ prefs, }: UpdatePrefsParams) => Promise<Models.Preferences>;
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
declare const useCreateOAuth2Token: <T = string>() => [state: ErrorObject | Awaited<T>, dispatch: (payload: CreateOAuth2TokenParams) => void, isPending: boolean];
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
/**
 * Parameters for updating the user's email.
 */
export type UpdateEmailParams = {
    email: string;
    password: string;
};
/**
 * Updates the email for the current user.
 */
declare const updateEmail: ({ email, password, }: UpdateEmailParams) => Promise<UserType>;
/**
 * Parameters for updating the user's phone number.
 */
export type UpdatePhoneParams = {
    phone: string;
    password: string;
};
/**
 * Updates the phone number for the current user.
 */
declare const updatePhone: ({ phone, password, }: UpdatePhoneParams) => Promise<UserType>;
/**
 * Parameters for updating the user's name.
 */
export type UpdateNameParams = {
    name: string;
};
/**
 * Updates the name for the current user.
 */
declare const updateName: ({ name }: UpdateNameParams) => Promise<UserType>;
/**
 * Updates the account status (block/unblock user).
 */
declare const updateStatus: () => Promise<UserType>;
/**
 * Parameters for updating the user's password.
 */
export type UpdatePasswordParams = {
    password: string;
    oldPassword?: string;
};
/**
 * Updates the password for the current user.
 */
declare const updatePassword: ({ password, oldPassword, }: UpdatePasswordParams) => Promise<UserType>;
/**
 * Parameters for creating a password recovery request.
 */
export type CreateRecoveryParams = {
    email: string;
    url: string;
};
/**
 * Creates a password recovery token.
 */
declare const createRecovery: ({ email, url, }: CreateRecoveryParams) => Promise<Models.Token>;
/**
 * Parameters for updating a password recovery.
 */
export type UpdateRecoveryParams = {
    userId: string;
    secret: string;
    password: string;
};
/**
 * Updates the password using a recovery token.
 */
declare const updateRecovery: ({ userId, secret, password, }: UpdateRecoveryParams) => Promise<Models.Token>;
/**
 * Creates an anonymous session for the user.
 */
declare const createAnonymousSession: () => Promise<Models.Session>;
/**
 * Parameters for creating a Magic URL session.
 */
export type CreateMagicURLSessionParams = {
    userId: string;
    email: string;
    url?: string;
    phrase?: boolean;
};
/**
 * Creates a Magic URL session for the user.
 */
declare const createMagicURLSession: ({ userId, email, url, phrase, }: CreateMagicURLSessionParams) => Promise<Models.Token>;
/**
 * Creates a phone verification token.
 */
declare const createPhoneVerification: () => Promise<Models.Token>;
/**
 * Parameters for updating phone verification.
 */
export type UpdatePhoneVerificationParams = {
    userId: string;
    secret: string;
};
/**
 * Confirms phone verification.
 */
declare const updatePhoneVerification: ({ userId, secret, }: UpdatePhoneVerificationParams) => Promise<Models.Token>;
/**
 * Export all functions
 */
export { createAccount, createEmailPasswordSession, createJWT, createOAuth2Token, useCreateOAuth2Token, createSession, createVerification, deletePrefs, deleteSession, deleteSessions, getAppUser, getPrefs, getSession, getUser, listSessions, updatePrefs, updateSession, updateVerification, updateEmail, updatePhone, updateName, updateStatus, updatePassword, createRecovery, updateRecovery, createAnonymousSession, createMagicURLSession, createPhoneVerification, updatePhoneVerification, };
//# sourceMappingURL=account.d.ts.map