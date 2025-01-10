import { Client, Account, Teams, Functions, Databases, Storage, Messaging, Locale, Users, Avatars, } from "node-appwrite";
import { cookies } from "next/headers";
import { projectId, endpoint, apiKeySsr, cookieName } from "./appwriteConfig";
/**
 * Creates a session client for the current user.
 */
export async function createSessionClient(params = {}) {
    const { selfSigned = false, locale = "" } = params;
    const client = new Client()
        .setEndpoint(endpoint)
        .setProject(projectId)
        .setSelfSigned(selfSigned)
        .setLocale(locale);
    const cookiesList = await cookies();
    const session = cookiesList.get(cookieName);
    /* if (!session || !session.value) {
      throw new Error(
        "APW-LIB ERROR: No session found in cookies while calling createSessionClient()"
      );
    } */
    client.setSession(session.value);
    return {
        get account() {
            return new Account(client);
        },
        get teams() {
            return new Teams(client);
        },
        get databases() {
            return new Databases(client);
        },
        get storage() {
            return new Storage(client);
        },
        get functions() {
            return new Functions(client);
        },
        get messaging() {
            return new Messaging(client);
        },
        get locale() {
            return new Locale(client);
        },
        get avatars() {
            return new Avatars(client);
        },
        get users() {
            return new Users(client);
        },
    };
}
/**
 * Creates an admin client with elevated privileges.
 */
export async function createAdminClient(params = {}) {
    const { selfSigned = false, locale = "" } = params;
    const client = new Client()
        .setEndpoint(endpoint)
        .setProject(projectId)
        .setSelfSigned(selfSigned)
        .setLocale(locale)
        .setKey(apiKeySsr);
    return {
        get account() {
            return new Account(client);
        },
        get teams() {
            return new Teams(client);
        },
        get databases() {
            return new Databases(client);
        },
        get storage() {
            return new Storage(client);
        },
        get functions() {
            return new Functions(client);
        },
        get messaging() {
            return new Messaging(client);
        },
        get locale() {
            return new Locale(client);
        },
        get avatars() {
            return new Avatars(client);
        },
        get users() {
            return new Users(client);
        },
    };
}
