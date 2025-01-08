export function createAdminClient({ selfSigned, locale }: {
    selfSigned: any;
    locale: any;
}): Promise<{
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
export function createSessionClient({ selfSigned, locale }: {
    selfSigned: any;
    locale: any;
}): Promise<{
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