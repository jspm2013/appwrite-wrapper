import { Models } from "node-appwrite";
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
/**
 * Creates a session for a user by their ID.
 */
export type CreateSessionForUserIdParams = {
    userId: string;
};
declare const createSessionForUserId: ({ userId, }: CreateSessionForUserIdParams) => Promise<ReturnObject<Models.Session>>;
/**
 * Creates a token for a user.
 */
export type CreateTokenParams = {
    userId: string;
    length?: number;
    expire?: number;
};
declare const createToken: ({ userId, length, expire, }: CreateTokenParams) => Promise<ReturnObject<Models.Token>>;
/**
 * Deletes a specific preference key for a user by their ID.
 */
export type DeletePrefsForUserIdParams = {
    userId: string;
    key: string;
};
declare const deletePrefsForUserId: ({ userId, key, }: DeletePrefsForUserIdParams) => Promise<ReturnObject<Models.Preferences>>;
/**
 * Deletes a specific session for a user by their ID.
 */
export type DeleteSessionForUserIdParams = {
    userId: string;
    sessionId: string;
};
declare const deleteSessionForUserId: ({ userId, sessionId, }: DeleteSessionForUserIdParams) => Promise<ReturnObject<void>>;
/**
 * Deletes all sessions for a user by their ID.
 */
export type DeleteSessionsForUserIdParams = {
    userId: string;
};
declare const deleteSessionsForUserId: ({ userId, }: DeleteSessionsForUserIdParams) => Promise<ReturnObject<void>>;
/**
 * Deletes a user by their ID.
 */
export type DeleteUserByIdParams = {
    userId: string;
};
declare const deleteUserId: ({ userId, }: DeleteUserByIdParams) => Promise<ReturnObject<string>>;
/**
 * Retrieves a verified app user by their ID.
 */
export type GetUserForUserIdParams = {
    userId: string;
};
declare const getAppUserForUserId: ({ userId, }: GetUserForUserIdParams) => Promise<ReturnObject<any | null>>;
/**
 * Gets CUSTOM users list.
 */
export type GetCustomUsersParams = {
    queries?: string[];
    includingDeleted?: boolean;
};
declare const getCustomUsers: <TCustomUsers extends Models.DocumentList<Models.Document>>({ queries, includingDeleted, }: GetCustomUsersParams) => Promise<ReturnObject<TCustomUsers>>;
/**
 * Gets prefs for a user by their ID.
 */
export type GetPrefsForUserIdParams = {
    userId: string;
};
declare const getPrefsForUserId: ({ userId, }: GetPrefsForUserIdParams) => Promise<ReturnObject<Models.Preferences>>;
/**
 * Retrieves a user by their ID.
 */
declare const getUserForUserId: ({ userId, }: GetUserForUserIdParams) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
/**
 * Gets users list (NATIVE appwrite users).
 */
export type GetUsersParams = {
    queries?: string[];
    search?: string;
};
declare const getUsers: ({ queries, search, }: GetUsersParams) => Promise<ReturnObject<Models.UserList<Models.Preferences>>>;
/**
 * Lists user identities with optional filters and search parameters.
 */
export type ListParams = {
    queries?: string[];
    search?: string;
};
declare const listIdentities: ({ queries, search, }: ListParams) => Promise<ReturnObject<Models.IdentityList>>;
/**
 * Lists users with optional filters and search parameters.
 */
declare const listUsers: ({ queries, search, }: ListParams) => Promise<ReturnObject<Models.UserList<Models.Preferences>>>;
/**
 * Sets the prefs for a user by their ID.
 */
export type UpdatePrefsForUserIdParams = {
    userId: string;
    prefsObj: object;
};
declare const updatePrefsForUserId: ({ userId, prefsObj, }: UpdatePrefsForUserIdParams) => Promise<ReturnObject<Models.Preferences>>;
/**
 * Updates the email verification status for a user by their ID.
 */
export type UpdateEmailVerificationForUserIdParams = {
    userId: string;
    status: boolean;
};
declare const updateEmailVerificationForUserId: ({ userId, status, }: UpdateEmailVerificationForUserIdParams) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
export { createSessionForUserId, createToken, deletePrefsForUserId, deleteSessionForUserId, deleteSessionsForUserId, deleteUserId, getAppUserForUserId, getCustomUsers, getPrefsForUserId, getUserForUserId, getUsers, listIdentities, listUsers, updatePrefsForUserId, updateEmailVerificationForUserId, };
//# sourceMappingURL=users.d.ts.map