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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { ID, OAuthProvider } from "node-appwrite";
import { createSessionClient, createAdminClient } from "../appwriteClients";
import { isValidJsonObject, isEmptyKeyValuePair } from "../utils";
import { cookieName, oauthSuccessPath, oauthFailurePath, verificationPath, } from "../appwriteConfig";
import { cookies } from "next/headers";
import { host } from "../host";
/**
 * Creates a new account.
 */
const createAccount = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password, name, }) {
    try {
        const { account } = yield createSessionClient();
        return yield account.create(ID.unique(), email, password, name);
    }
    catch (err) {
        console.error("APW-LIB ERROR (account): Error executing createAccount():", err);
        return err;
    }
});
/**
 * Creates a JWT token.
 */
const createJWT = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { account } = yield createSessionClient();
        return yield account.createJWT();
    }
    catch (err) {
        console.error("APW-LIB ERROR (account): Error executing createJWT():", err);
        return err;
    }
});
/**
 * Creates an email verification token.
 */
const createVerification = (_a) => __awaiter(void 0, [_a], void 0, function* ({ verificationUrl = `${host}/${verificationPath}`, }) {
    try {
        const { account } = yield createSessionClient();
        return yield account.createVerification(verificationUrl);
    }
    catch (err) {
        console.error("APW-LIB ERROR (account): Error executing createVerification():", err);
        return err;
    }
});
/**
 * Deletes a specific session or the current session.
 */
const deleteSession = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (params = {}) {
    const { sessionId = "current" } = params;
    try {
        const { account } = yield createSessionClient();
        yield account.deleteSession(sessionId);
    }
    catch (err) {
        console.error("APW-LIB ERROR (account): Error executing deleteSession():", err);
        return err;
    }
});
/**
 * Lists all sessions for the current user.
 */
const listSessions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { account } = yield createSessionClient();
        return yield account.listSessions();
    }
    catch (err) {
        console.error("APW-LIB ERROR (account): Error executing listSessions():", err);
        return err;
    }
});
/**
 * Deletes all sessions for the current user.
 */
const deleteSessions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { account } = yield createSessionClient();
        yield account.deleteSessions();
    }
    catch (err) {
        console.error("APW-LIB ERROR (account): Error executing deleteSessions():", err);
        return err;
    }
});
/**
 * Retrieves the current user.
 */
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { account } = yield createSessionClient();
        return yield account.get();
    }
    catch (err) {
        /*
         * Appwrite throws Error when the user is not logged in, so we have to return null for that case.
         */
        return null;
        //console.error("APW-LIB ERROR (account): Error executing getUser():", err);
        //return err as Error;
    }
});
/**
 * Deletes a specific preference key for the current user.
 */
const deletePrefs = (_a) => __awaiter(void 0, [_a], void 0, function* ({ key, }) {
    try {
        const { account } = yield createSessionClient();
        const oldPrefs = yield account.getPrefs();
        if (Object.prototype.hasOwnProperty.call(oldPrefs, key)) {
            const _b = oldPrefs, _c = key, _ = _b[_c], newPrefs = __rest(_b, [typeof _c === "symbol" ? _c : _c + ""]);
            yield account.updatePrefs(newPrefs);
            return newPrefs;
        }
        return oldPrefs;
    }
    catch (err) {
        console.error("APW-LIB ERROR (account): Error executing deletePrefs():", err);
        return err;
    }
});
/**
 * Retrieves all preferences for the current user.
 */
const getPrefs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { account } = yield createSessionClient();
        return yield account.getPrefs();
    }
    catch (err) {
        console.error("APW-LIB ERROR (account): Error executing getPrefs():", err);
        return err;
    }
});
/**
 * Updates preferences for the current user.
 */
const setPrefs = (_a) => __awaiter(void 0, [_a], void 0, function* ({ newPrefs, }) {
    try {
        if (isValidJsonObject(newPrefs)) {
            const { account } = yield createSessionClient();
            const oldPrefs = yield account.getPrefs();
            yield account.updatePrefs(isEmptyKeyValuePair(oldPrefs) ? newPrefs : Object.assign(Object.assign({}, oldPrefs), newPrefs));
        }
        else {
            throw new Error("Invalid JSON object");
        }
    }
    catch (err) {
        console.error("APW-LIB ERROR (account): Error executing setPrefs():", err);
        return err;
    }
});
/**
 * Updates the email verification for a specific user.
 */
const updateVerification = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, secret, }) {
    try {
        const { account } = yield createSessionClient();
        return yield account.updateVerification(userId, secret);
    }
    catch (err) {
        console.error("APW-LIB ERROR (account): Error executing updateVerification():", err);
        return err;
    }
});
/**
 * Creates a session for a user using email and password.
 */
const createEmailPasswordSession = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password, }) {
    try {
        const { account } = yield createAdminClient();
        const session = yield account.createEmailPasswordSession(email, password);
        (yield cookies()).set(cookieName, session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return session;
    }
    catch (err) {
        console.error("APW-LIB ERROR (account): Error executing createEmailPasswordSession():", err);
        return err;
    }
});
/**
 * Creates an OAuth2 token for the user.
 */
const createOAuth2Token = (_a) => __awaiter(void 0, [_a], void 0, function* ({ provider, successPath = oauthSuccessPath, failurePath = oauthFailurePath, }) {
    try {
        const { account } = yield createAdminClient();
        return yield account.createOAuth2Token(OAuthProvider[provider], `${host}/${successPath}`, `${host}/${failurePath}`);
    }
    catch (err) {
        console.error("APW-LIB ERROR (account): Error executing createOAuth2Token():", err);
        return err;
    }
});
/**
 * Creates a session for a user by their ID and secret.
 */
const createSession = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, secret, }) {
    try {
        const { account } = yield createAdminClient();
        const session = yield account.createSession(userId, secret);
        (yield cookies()).set(cookieName, session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return session;
    }
    catch (err) {
        console.error("APW-LIB ERROR (account): Error executing createSession():", err);
        return err;
    }
});
/**
 * Exporting OAuthProvider for consumer usage
 */
export { OAuthProvider };
export { createAccount, createJWT, createVerification, deleteSession, listSessions, deleteSessions, getUser, deletePrefs, getPrefs, setPrefs, updateVerification, createEmailPasswordSession, createOAuth2Token, createSession, };
