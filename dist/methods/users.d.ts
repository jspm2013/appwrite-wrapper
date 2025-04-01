import { Models } from "node-appwrite";
declare let ApwUserType: any;
declare let UserType: any;
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
type AddPrefsForUserIdParams = {
    userId: string;
    prefs: string;
};
declare const addPrefsForUserId: ({ userId, prefs, }: AddPrefsForUserIdParams) => Promise<ReturnObject<Models.Preferences>>;
type CreateSessionForUserIdParams = {
    userId: string;
};
declare const createSessionForUserId: ({ userId, }: CreateSessionForUserIdParams) => Promise<ReturnObject<Models.Session>>;
type CreateTokenParams = {
    userId: string;
    length?: number;
    expire?: number;
};
declare const createToken: ({ userId, length, expire, }: CreateTokenParams) => Promise<ReturnObject<Models.Token>>;
type DeletePrefsForUserIdParams = {
    userId: string;
    keys: string | string[];
};
declare const deletePrefsForUserId: ({ userId, keys, }: DeletePrefsForUserIdParams) => Promise<ReturnObject<Models.Preferences>>;
type DeleteSessionForUserIdParams = {
    userId: string;
    sessionId: string;
};
declare const deleteSessionForUserId: ({ userId, sessionId, }: DeleteSessionForUserIdParams) => Promise<ReturnObject<string>>;
type DeleteSessionsForUserIdParams = {
    userId: string;
};
declare const deleteSessionsForUserId: ({ userId, }: DeleteSessionsForUserIdParams) => Promise<ReturnObject<string>>;
type DeleteUserForUserIdParams = {
    userId: string;
};
declare const deleteUserForUserId: ({ userId, }: DeleteUserForUserIdParams) => Promise<ReturnObject<string>>;
type GetApwUserForUserIdParams = {
    userId: string;
};
declare const getApwUserForUserId: ({ userId, }: GetApwUserForUserIdParams) => Promise<ReturnObject<typeof ApwUserType>>;
type GetUserForUserIdParams = {
    userId: string;
    queries?: string[];
    deleted?: boolean;
};
declare const getUserForUserId: ({ userId, queries, deleted, }: GetUserForUserIdParams) => Promise<ReturnObject<typeof UserType>>;
type ListUsersParams = {
    queries?: string[];
    deleted?: boolean;
};
declare const listUsers: ({ queries, deleted, }: ListUsersParams) => Promise<ReturnObject<Models.DocumentList<Models.Document & typeof UserType>>>;
type ListApwUsersParams = {
    queries?: string[];
    search?: string;
    blocked?: boolean;
    verified?: boolean;
};
declare const listApwUsers: ({ queries, search, blocked, verified, }: ListApwUsersParams) => Promise<ReturnObject<Models.UserList<Models.Preferences & typeof ApwUserType>>>;
type ListIdentitiesParams = {
    queries?: string[];
    search?: string;
};
declare const listIdentities: ({ queries, search, }: ListIdentitiesParams) => Promise<ReturnObject<Models.IdentityList>>;
type ListIdentitiesForUserIdParams = {
    userId: string;
    queries?: string[];
    search?: string;
};
declare const listIdentitiesForUserId: ({ userId, queries, search, }: ListIdentitiesForUserIdParams) => Promise<ReturnObject<Models.IdentityList>>;
type ListSessionsForUserIdParams = {
    userId: string;
};
declare const listSessionsForUserId: ({ userId, }: ListSessionsForUserIdParams) => Promise<ReturnObject<Models.SessionList>>;
type UpdateEmailForUserIdParams = {
    userId: string;
    email: string;
};
declare const updateEmailForUserId: ({ userId, email, }: UpdateEmailForUserIdParams) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
type UpdateEmailVerificationForUserIdParams = {
    userId: string;
    emailVerification: boolean;
};
declare const updateEmailVerificationForUserId: ({ userId, emailVerification, }: UpdateEmailVerificationForUserIdParams) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
type LabelsForUserIdParams = {
    userId: string;
    labels: string | string[];
};
declare const updateLabelsForUserId: ({ userId, labels, }: LabelsForUserIdParams) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
declare const addLabelsForUserId: ({ userId, labels, }: LabelsForUserIdParams) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
declare const deleteLabelsForUserId: ({ userId, labels, }: LabelsForUserIdParams) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
type UpdateNameForUserIdParams = {
    userId: string;
    name: string;
};
declare const updateNameForUserId: ({ userId, name, }: UpdateNameForUserIdParams) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
type UpdatePasswordForUserIdParams = {
    userId: string;
    password: string;
};
declare const updatePasswordForUserId: ({ userId, password, }: UpdatePasswordForUserIdParams) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
type UpdatePhoneForUserIdParams = {
    userId: string;
    phone: string;
};
declare const updatePhoneForUserId: ({ userId, phone, }: UpdatePhoneForUserIdParams) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
type UpdatePhoneVerificationForUserIdParams = {
    userId: string;
    phoneVerification: boolean;
};
declare const updatePhoneVerificationForUserId: ({ userId, phoneVerification, }: UpdatePhoneVerificationForUserIdParams) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
type UpdateStatusForUserIdParams = {
    userId: string;
    status: boolean;
};
declare const updateStatusForUserId: ({ userId, status, }: UpdateStatusForUserIdParams) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
export { addLabelsForUserId, addPrefsForUserId, createSessionForUserId, createToken, deleteLabelsForUserId, deletePrefsForUserId, deleteSessionForUserId, deleteSessionsForUserId, deleteUserForUserId, getApwUserForUserId, getUserForUserId, // INcl. deleted=false as default
listApwUsers, listUsers, // INcl. deleted=false as default
listIdentities, listIdentitiesForUserId, listSessionsForUserId, updateEmailForUserId, updateEmailVerificationForUserId, updateLabelsForUserId, updateNameForUserId, updatePasswordForUserId, updatePhoneForUserId, updatePhoneVerificationForUserId, updateStatusForUserId, };
//# sourceMappingURL=users.d.ts.map