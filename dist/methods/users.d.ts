import { Models } from "node-appwrite";
/**
 * Parameters for creating a session for a user.
 */
export type CreateSessionForUserIdParams = {
    userId?: string;
};
/**
 * Creates a session for a user by their ID.
 */
declare const createSessionForUserId: ({ userId, }: CreateSessionForUserIdParams) => Promise<Models.Session>;
/**
 * Parameters for creating a token for a user.
 */
export type CreateTokenParams = {
    userId: string;
    length?: number;
    expire?: number;
};
/**
 * Creates a token for a user.
 */
declare const createToken: ({ userId, length, expire, }: CreateTokenParams) => Promise<Models.Token>;
/**
 * Parameters for deleting a specific session for a user.
 */
export type DeleteSessionForUserIdParams = {
    userId: string;
    sessionId: string;
};
/**
 * Deletes a specific session for a user by their ID.
 */
declare const deleteSessionForUserId: ({ userId, sessionId, }: DeleteSessionForUserIdParams) => Promise<void>;
/**
 * Parameters for deleting all sessions for a user.
 */
export type DeleteSessionsForUserIdParams = {
    userId: string;
};
/**
 * Deletes all sessions for a user by their ID.
 */
declare const deleteSessionsForUserId: ({ userId, }: DeleteSessionsForUserIdParams) => Promise<void>;
/**
 * Parameters for retrieving a user by their ID.
 */
export type GetUserForUserIdParams = {
    userId: string;
};
/**
 * Retrieves a user by their ID.
 */
declare const getUserForUserId: ({ userId, }: GetUserForUserIdParams) => Promise<Models.User<Models.Preferences> | null>;
/**
 * Retrieves a verified user by their ID.
 */
declare const getVerifiedUserForUserId: ({ userId, }: GetUserForUserIdParams) => Promise<Models.User<Models.Preferences> | null>;
/**
 * Parameters for listing users.
 */
export type ListParams = {
    queries?: string[];
    search?: string;
};
/**
 * Lists users with optional filters and search parameters.
 */
declare const listIdentities: ({ queries, search, }: ListParams) => Promise<Models.IdentityList>;
/**
 * Lists users with optional filters and search parameters.
 */
declare const listUsers: ({ queries, search, }: ListParams) => Promise<Models.UserList<Models.Preferences>>;
/**
 * Parameters for updating email verification for a user.
 */
export type UpdateEmailVerificationForUserIdParams = {
    userId: string;
    status: boolean;
};
/**
 * Updates the email verification status for a user.
 */
declare const updateEmailVerificationForUserId: ({ userId, status, }: UpdateEmailVerificationForUserIdParams) => Promise<Models.User<Models.Preferences>>;
export type UsersFunctionTypes = {
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