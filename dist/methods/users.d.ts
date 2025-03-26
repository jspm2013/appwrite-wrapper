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
type GetUserForUserIdParams = {
    userId: string;
    queries?: string[];
    includingDeleted?: boolean;
};
declare const getApwUserForUserId: ({ userId, queries, includingDeleted, }: GetUserForUserIdParams) => Promise<ReturnObject<typeof ApwUserType>>;
declare const getCustomUserForUserId: ({ userId, queries, includingDeleted, }: GetUserForUserIdParams) => Promise<ReturnObject<typeof UserType>>;
declare const getUserForUserId: ({ userId, queries, includingDeleted, }: GetUserForUserIdParams) => Promise<ReturnObject<typeof ApwUserType>>;
type ListApwUsersParams = {
    queries?: string[];
    search?: string;
    includingDeleted?: boolean;
};
declare const listApwUsers: ({ queries, search, includingDeleted, }: ListApwUsersParams) => Promise<ReturnObject<Models.DocumentList<typeof ApwUserType>>>;
type ListCustomUsersParams = {
    queries?: string[];
    includingDeleted?: boolean;
};
declare const listCustomUsers: ({ queries, includingDeleted, }: ListCustomUsersParams) => Promise<ReturnObject<Models.DocumentList<Models.Document>>>;
type ListUsersParams = {
    queries?: string[];
    search?: string;
};
declare const listUsers: ({ queries, search, }: ListUsersParams) => Promise<ReturnObject<Models.UserList<Models.Preferences>>>;
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
export { addLabelsForUserId, addPrefsForUserId, createSessionForUserId, createToken, deleteLabelsForUserId, deletePrefsForUserId, deleteSessionForUserId, deleteSessionsForUserId, deleteUserForUserId, getApwUserForUserId, // INcl. deleted=false as default
getCustomUserForUserId, // INcl. deleted=false as default
getUserForUserId, // INcl. deleted=false as default
listApwUsers, // INcl. deleted=false as default
listCustomUsers, // INcl. deleted=false as default
listUsers, // INcl. deleted=false as default
listIdentities, listIdentitiesForUserId, listSessionsForUserId, updateEmailForUserId, updateEmailVerificationForUserId, updateNameForUserId, updatePasswordForUserId, updatePhoneForUserId, updatePhoneVerificationForUserId, updateStatusForUserId, };
//# sourceMappingURL=users.d.ts.map