/*
 *
 * MANDATORY
 * User defined: using env vars
 *
 */
const appDomain = process.env.APP_DOMAIN || "";
const databaseId = process.env.APPWRITE_DB_ID || "";
const endpoint = process.env.APPWRITE_ENDPOINT || "";
const projectId = process.env.APPWRITE_PROJECT_ID || "";
const apiKeySsr = process.env.APPWRITE_API_KEY_SSR || "";
const logsBucketId = process.env.APPWRITE_LOGS_BUCKET_ID || "";
const userCollectionId = process.env.APPWRITE_USER_COLL_ID || "";
const liveEnvVarName = process.env.APPWRITE_LIVE_ENV_VAR_NAME || "";
const clientCollectionId = process.env.APPWRITE_CLIENT_COLL_ID || "";
const addressCollectionId = process.env.APPWRITE_ADDRESS_COLL_ID || "";
/*
 *
 * OPTIONAL
 * Pre-defined: optionally customizable, using env vars
 *
 */
const port = process.env.PORT || 3000;
const signInPath = process.env.APPWRITE_SIGN_IN_PATH || "sign-in";
const logsBucketName = process.env.APPWRITE_LOGS_BUCKET_NAME || "logs";
const cookiePrefix = process.env.APPWRITE_SESSION_COOKIE_PREFIX || "_apw_";
const oauthSuccessPath = process.env.APPWRITE_OAUTH_SUCCESS_PATH || "api/oauth";
const oauthFailurePath = process.env.APPWRITE_OAUTH_FAILURE_PATH || signInPath;
const verificationPath = process.env.APPWRITE_VERIFICATION_PATH || "verification";
const cookieName = process.env.APPWRITE_SESSION_COOKIE_NAME || cookiePrefix + "s";
// File/Folder paths
const i18nPath = process.env.APPWRITE_I18N_PATH || "messages/appwrite";
const logsPath = process.env.APPWRITE_LOGS_PATH || "lib/appwrite/logs";
const schemasPath = process.env.APPWRITE_SCHEMAS_PATH || "lib/appwrite/schemas";
const paths = [i18nPath, logsPath, schemasPath];
/*
 *
 * Initial env check
 *
 */
const envCheck = () => {
    if (process.env.NEXT_RUNTIME === "edge") {
        throw new Error("APW-WRAPPER - Error: 'appwrite-server-wrapper' is not supported in Edge runtime!");
    }
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
export { envCheck, apiKeySsr, appDomain, cookiePrefix, cookieName, databaseId, endpoint, i18nPath, liveEnvVarName, oauthSuccessPath, oauthFailurePath, projectId, port, paths, logsPath, schemasPath, signInPath, userCollectionId, verificationPath, logsBucketId, logsBucketName, clientCollectionId, addressCollectionId, };
