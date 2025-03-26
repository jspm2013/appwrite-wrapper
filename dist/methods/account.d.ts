import { OAuthProvider } from "../enums";
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
type AddPrefsParams = {
    prefs: string;
};
declare const addPrefs: ({ prefs, }: AddPrefsParams) => Promise<ReturnObject<Models.Preferences>>;
declare const createAccount: ({ email, password, name, }: {
    email: string;
    password: string;
    name?: string;
}) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
declare const createAnonymousSession: () => Promise<ReturnObject<Models.Session>>;
declare const createEmailPasswordSession: ({ email, password, }: {
    email: string;
    password: string;
}) => Promise<ReturnObject<Models.Session>>;
declare const createJWT: () => Promise<ReturnObject<Models.Jwt>>;
declare const createMagicURLSession: ({ email, url, userId, phrase, }: {
    email: string;
    url?: string;
    userId?: string;
    phrase?: boolean;
}) => Promise<ReturnObject<Models.Token>>;
declare const createOAuth2Token: ({ provider, successPath, failurePath, scopes, }: {
    provider: keyof typeof OAuthProvider;
    successPath?: string;
    failurePath?: string;
    scopes?: string[];
}) => Promise<ReturnObject<string>>;
declare const createPhoneVerification: () => Promise<ReturnObject<Models.Token>>;
declare const createRecovery: ({ email, url, }: {
    email: string;
    url: string;
}) => Promise<ReturnObject<Models.Token>>;
declare const createSession: ({ userId, secret, }: {
    userId: string;
    secret: string;
}) => Promise<ReturnObject<Models.Session>>;
declare const createVerification: ({ verificationUrl, }: {
    verificationUrl?: string;
}) => Promise<ReturnObject<Models.Token>>;
type DeletePrefsParams = {
    keys: string | string[];
};
declare const deletePrefs: ({ keys, }: DeletePrefsParams) => Promise<ReturnObject<Models.Preferences>>;
declare const deleteSession: ({ sessionId, }?: {
    sessionId?: string;
}) => Promise<ReturnObject<string>>;
declare const deleteSessions: () => Promise<ReturnObject<string>>;
declare const getApwUser: () => Promise<ReturnObject<typeof ApwUserType>>;
declare const getUser: () => Promise<ReturnObject<typeof UserType>>;
declare const getSession: ({ sessionId, }?: {
    sessionId?: string;
}) => Promise<ReturnObject<Models.Session>>;
declare const listSessions: () => Promise<ReturnObject<Models.SessionList>>;
declare const updateEmail: ({ email, password, }: {
    email: string;
    password: string;
}) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
declare const updateName: ({ name, }: {
    name: string;
}) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
declare const updatePassword: ({ password, oldPassword, }: {
    password: string;
    oldPassword?: string;
}) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
declare const updatePhone: ({ phone, password, }: {
    phone: string;
    password: string;
}) => Promise<ReturnObject<Models.User<Models.Preferences>>>;
declare const updatePhoneVerification: ({ userId, secret, }: {
    userId: string;
    secret: string;
}) => Promise<ReturnObject<Models.Token>>;
declare const updateRecovery: ({ userId, secret, password, }: {
    userId: string;
    secret: string;
    password: string;
}) => Promise<ReturnObject<Models.Token>>;
declare const updateSession: ({ sessionId, }: {
    sessionId?: string;
}) => Promise<ReturnObject<Models.Session>>;
declare const updateStatus: () => Promise<ReturnObject<Models.User<Models.Preferences>>>;
declare const updateVerification: ({ userId, secret, }: {
    userId: string;
    secret: string;
}) => Promise<ReturnObject<Models.Token>>;
export { addPrefs, createAccount, createAnonymousSession, createEmailPasswordSession, createJWT, createMagicURLSession, createOAuth2Token, createPhoneVerification, createRecovery, createSession, createVerification, deletePrefs, deleteSession, deleteSessions, getApwUser, getSession, getUser, listSessions, updateEmail, updateName, updatePassword, updatePhone, updatePhoneVerification, updateRecovery, updateSession, updateStatus, updateVerification, };
//# sourceMappingURL=account.d.ts.map