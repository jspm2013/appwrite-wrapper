import { Account, Teams, Functions, Databases, Storage, Messaging, Locale, Users, Avatars } from "node-appwrite";
type CreateClientParams = {
    selfSigned?: boolean;
    locale?: string;
};
/**
 * Creates a session client for the current user.
 */
export declare const createSessionClient: ({ selfSigned, locale, }?: CreateClientParams) => Promise<{
    readonly account: Account;
    readonly teams: Teams;
    readonly databases: Databases;
    readonly storage: Storage;
    readonly functions: Functions;
    readonly messaging: Messaging;
    readonly locale: Locale;
    readonly avatars: Avatars;
    readonly users: Users;
}>;
/**
 * Creates an admin client with elevated privileges.
 */
export declare function createAdminClient({ selfSigned, locale, }?: CreateClientParams): Promise<{
    readonly account: Account;
    readonly teams: Teams;
    readonly databases: Databases;
    readonly storage: Storage;
    readonly functions: Functions;
    readonly messaging: Messaging;
    readonly locale: Locale;
    readonly avatars: Avatars;
    readonly users: Users;
}>;
export {};
//# sourceMappingURL=appwriteClients.d.ts.map