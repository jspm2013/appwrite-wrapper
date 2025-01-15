import { Models } from "node-appwrite";
/**
 * Parameters for creating a session for a user.
 */
export type CreateSessionForUserIdParams = {
    /**
     * The unique user ID. Defaults to `ID.unique()`.
     */
    userId?: string;
};
/**
 * Parameters for creating a token for a user.
 */
export type CreateTokenParams = {
    /**
     * The user ID.
     */
    userId: string;
    /**
     * The token length. Defaults to `32`.
     */
    length?: number;
    /**
     * The token expiration time in seconds. Defaults to `180` (3 minutes).
     */
    expire?: number;
};
/**
 * Parameters for deleting a specific session for a user.
 */
export type DeleteSessionForUserIdParams = {
    /**
     * The user ID.
     */
    userId: string;
    /**
     * The session ID to delete.
     */
    sessionId: string;
};
/**
 * Parameters for deleting all sessions for a user.
 */
export type DeleteSessionsForUserIdParams = {
    /**
     * The user ID.
     */
    userId: string;
};
/**
 * Parameters for retrieving a user by their ID.
 */
export type GetUserForUserIdParams = {
    /**
     * The user ID.
     */
    userId: string;
};
/**
 * Parameters for listing users.
 */
export type ListParams = {
    /**
     * Queries for filtering the user list.
     */
    queries?: string[];
    /**
     * Search term to filter users.
     */
    search?: string;
};
/**
 * Parameters for updating email verification for a user.
 */
export type UpdateEmailVerificationForUserIdParams = {
    /**
     * The user ID.
     */
    userId: string;
    /**
     * The email verification status (true or false).
     */
    status: boolean;
};
/**
 * Creates a session for a user by their ID.
 */
declare const createSessionForUserId: ({ userId, }: CreateSessionForUserIdParams) => Promise<Models.Session>;
/**
 * Creates a token for a user.
 */
declare const createToken: ({ userId, length, expire, }: CreateTokenParams) => Promise<Models.Token>;
/**
 * Deletes a specific session for a user by their ID.
 */
declare const deleteSessionForUserId: ({ userId, sessionId, }: DeleteSessionForUserIdParams) => Promise<void>;
/**
 * Deletes all sessions for a user by their ID.
 */
declare const deleteSessionsForUserId: ({ userId, }: DeleteSessionsForUserIdParams) => Promise<void>;
/**
 * Retrieves a user by their ID.
 */
declare const getUserForUserId: ({ userId, }: GetUserForUserIdParams) => Promise<Models.User<Models.Preferences> | null>;
/**
 * Retrieves a verified user by their ID.
 */
declare const getVerifiedUserForUserId: ({ userId, }: GetUserForUserIdParams) => Promise<Models.User<Models.Preferences> | null>;
/**
 * Lists users with optional filters and search parameters.
 */
declare const listIdentities: ({ queries, search, }: ListParams) => Promise<Models.IdentityList>;
/**
 * Lists users with optional filters and search parameters.
 */
declare const listUsers: ({ queries, search, }: ListParams) => Promise<Models.UserList<Models.Preferences>>;
/**
 * Updates the email verification status for a user.
 */
declare const updateEmailVerificationForUserId: ({ userId, status, }: UpdateEmailVerificationForUserIdParams) => Promise<Models.User<Models.Preferences>>;
export type UserFunctions = {
    createSessionForUserId: typeof createSessionForUserId;
    createToken: typeof createToken;
    deleteSessionForUserId: typeof deleteSessionForUserId;
    deleteSessionsForUserId: typeof deleteSessionsForUserId;
    getUserForUserId: typeof getUserForUserId;
    getVerifiedUserForUserId: typeof getVerifiedUserForUserId;
    listIdentities: typeof listIdentities;
    listUsers: typeof listUsers;
    updateEmailVerificationForUserId: typeof updateEmailVerificationForUserId;
};
export { createSessionForUserId, createToken, deleteSessionForUserId, deleteSessionsForUserId, getUserForUserId, getVerifiedUserForUserId, listIdentities, listUsers, updateEmailVerificationForUserId, };
//# sourceMappingURL=users.d.ts.map