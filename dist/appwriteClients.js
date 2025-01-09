"use server";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Client, Account, Teams, Functions, Databases, Storage, Messaging, Locale, Users, Avatars, } from "node-appwrite";
import { cookies } from "next/headers";
import { projectId, endpoint, apiKeySsr, cookieName } from "./appwriteConfig";
/**
 * Creates a session client for the current user.
 */
export function createSessionClient() {
    return __awaiter(this, arguments, void 0, function* (params = {}) {
        const { selfSigned = false, locale = "" } = params;
        const client = new Client()
            .setEndpoint(endpoint)
            .setProject(projectId)
            .setSelfSigned(selfSigned)
            .setLocale(locale);
        const cookiesList = yield cookies();
        const session = cookiesList.get(cookieName);
        if (!session || !session.value) {
            throw new Error("APW-LIB ERROR: No session found in cookies while calling createSessionClient()");
        }
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
    });
}
/**
 * Creates an admin client with elevated privileges.
 */
export function createAdminClient() {
    return __awaiter(this, arguments, void 0, function* (params = {}) {
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
    });
}
