/**
 * Creates a session client for the current user.
 */
export function createSessionClient(params?: {}): Promise<{
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
export function createAdminClient(params?: {}): Promise<{
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
import { Account } from "node-appwrite";
import { Teams } from "node-appwrite";
import { Databases } from "node-appwrite";
import { Storage } from "node-appwrite";
import { Functions } from "node-appwrite";
import { Messaging } from "node-appwrite";
import { Locale } from "node-appwrite";
import { Avatars } from "node-appwrite";
import { Users } from "node-appwrite";
//# sourceMappingURL=appwriteClients.d.ts.map