"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationPath = exports.userCollectionId = exports.signInPath = exports.schemasPath = exports.port = exports.projectId = exports.oauthFailurePath = exports.oauthSuccessPath = exports.liveEnvVarName = exports.i18nPath = exports.endpoint = exports.databaseId = exports.cookieName = exports.cookiePrefix = exports.appDomain = exports.apiKeySsr = exports.envCheck = void 0;
/*
 *
 * MANDATORY
 * User defined: using env vars
 *
 */
const appDomain = process.env.APP_DOMAIN;
exports.appDomain = appDomain;
const endpoint = process.env.APPWRITE_ENDPOINT;
exports.endpoint = endpoint;
const projectId = process.env.APPWRITE_PROJECT_ID;
exports.projectId = projectId;
const apiKeySsr = process.env.APPWRITE_API_KEY_SSR;
exports.apiKeySsr = apiKeySsr;
const databaseId = process.env.APPWRITE_DB_ID || "";
exports.databaseId = databaseId;
const userCollectionId = process.env.APPWRITE_USER_COLL_ID || "";
exports.userCollectionId = userCollectionId;
const liveEnvVarName = process.env.APPWRITE_LIVE_ENV_VAR_NAME;
exports.liveEnvVarName = liveEnvVarName;
/*
 *
 * OPTIONAL
 * Pre-defined: optionally customizable, using env vars
 *
 */
const port = process.env.PORT || 3000;
exports.port = port;
const schemasPath = process.env.APPWRITE_SCHEMAS_PATH || "lib/appwrite/schemas";
exports.schemasPath = schemasPath;
const i18nPath = process.env.APPWRITE_I18N_PATH || "messages/appwrite";
exports.i18nPath = i18nPath;
const signInPath = process.env.APPWRITE_SIGN_IN_PATH || "sign-in";
exports.signInPath = signInPath;
const oauthSuccessPath = process.env.APPWRITE_OAUTH_SUCCESS_PATH || "api/oauth";
exports.oauthSuccessPath = oauthSuccessPath;
const oauthFailurePath = process.env.APPWRITE_OAUTH_FAILURE_PATH || signInPath;
exports.oauthFailurePath = oauthFailurePath;
const verificationPath = process.env.APPWRITE_VERIFICATION_PATH || "verification";
exports.verificationPath = verificationPath;
const cookiePrefix = process.env.APPWRITE_SESSION_COOKIE_PREFIX || "_apw_";
exports.cookiePrefix = cookiePrefix;
const cookieName = process.env.APPWRITE_SESSION_COOKIE_NAME || cookiePrefix + "s";
exports.cookieName = cookieName;
/*
 *
 * Initial env check
 *
 */
const envCheck = () => {
    if (!process.env.APP_DOMAIN) {
        throw new Error("APW-WRAPPER - Error: Missing required environment variable: APP_DOMAIN");
    }
    if (!process.env.APPWRITE_ENDPOINT) {
        throw new Error("APW-WRAPPER - Error: Missing required environment variable: APPWRITE_ENDPOINT");
    }
    if (!process.env.APPWRITE_PROJECT_ID) {
        throw new Error("APW-WRAPPER - Error: Missing required environment variable: APPWRITE_PROJECT_ID");
    }
    if (!process.env.APPWRITE_API_KEY_SSR) {
        throw new Error("APW-WRAPPER - Error: Missing required environment variable: APPWRITE_API_KEY_SSR");
    }
    if (!process.env.APPWRITE_DB_ID) {
        throw new Error("APW-WRAPPER - Error: Missing required environment variable: APPWRITE_DB_ID");
    }
    if (!process.env.APPWRITE_USER_COLL_ID) {
        throw new Error("APW-WRAPPER - Error: Missing required environment variable: APPWRITE_USER_COLL_ID");
    }
    if (!process.env.APPWRITE_LIVE_ENV_VAR_NAME) {
        throw new Error("APW-WRAPPER - Error: Missing required environment variable: APPWRITE_LIVE_ENV_VAR_NAME");
    }
};
exports.envCheck = envCheck;
