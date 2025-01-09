import { Account, Teams, Functions, Databases, Storage, Messaging, Locale, Users, Avatars } from "node-appwrite";
type CreateClientParams = {
    selfSigned?: boolean;
    locale?: string;
};
/**
 * Creates a session client for the current user.
 */
export declare const createSessionClient: (params?: CreateClientParams) => Promise<{
    account: Account;
    teams: Teams;
    databases: Databases;
    storage: Storage;
    functions: Functions;
    messaging: Messaging;
    locale: Locale;
    avatars: Avatars;
    users: Users;
}>;
/**
 * Creates an admin client with elevated privileges.
 */
export declare const createAdminClient: (params?: CreateClientParams) => Promise<{
    account: Account;
    teams: Teams;
    databases: Databases;
    storage: Storage;
    functions: Functions;
    messaging: Messaging;
    locale: Locale;
    avatars: Avatars;
    users: Users;
}>;
export {};
//# sourceMappingURL=appwriteClients.d.ts.map