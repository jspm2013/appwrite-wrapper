/*
 *
 * MANDATORY
 * User defined: using env vars
 *
 */
const appDomain = process.env.APP_DOMAIN || "";
const databaseId = process.env.APPWRITE_DB || "";
const endpoint = process.env.APPWRITE_ENDPOINT || "";
const projectId = process.env.APPWRITE_PROJECT || "";
const apiKeySsr = process.env.APPWRITE_KEY_SSR || "";
const logsBucketId = process.env.APPWRITE_BUCKET_LOGS || "";
const usersCollectionId = process.env.APPWRITE_COLL_USERS || "";
const liveEnvVarName = process.env.APPWRITE_LIVE_ENV_VAR_NAME || ""; // ENV VAR name of the env var that refers to the publicly accessible URL of your hosting instance (which is only existent when running the app on the production server/system)
/*
 *
 * OPTIONAL
 * Pre-defined: optionally customizable, using env vars
 *
 */
const port = process.env.PORT || 3000;
const signInPath = process.env.APPWRITE_SIGN_IN_PATH || "sign-in";
const logsBucketName = process.env.APPWRITE_BUCKET_LOGS_NAME || "logs";
const cookiePrefix = process.env.APPWRITE_SESSION_COOKIE_PREFIX || "a_session_";
const oauthSuccessPath = process.env.APPWRITE_OAUTH_SUCCESS_PATH || "api/oauth";
const oauthFailurePath = process.env.APPWRITE_OAUTH_FAILURE_PATH || signInPath;
const verificationPath = process.env.APPWRITE_VERIFICATION_PATH || "verification";
const cookieName = process.env.APPWRITE_SESSION_COOKIE_NAME || cookiePrefix.concat(projectId);
/*
 *
 * FILE FOLDER PATHS
 * Pre-defined: optionally customizable, using env vars
 *
 */
const pathI18n = process.env.APPWRITE_PATH_I18N || "messages/appwrite";
const pathLogs = process.env.APPWRITE_PATH_LOGS || "lib/appwrite/logs";
const pathSchemas = process.env.APPWRITE_PATH_SCHEMAS || "lib/appwrite/schemas";
const paths = [pathI18n, pathLogs, pathSchemas];
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
    if (!process.env.APPWRITE_PROJECT) {
        throw new Error("APW-WRAPPER - Error: Missing required environment variable: APPWRITE_PROJECT");
    }
    if (!process.env.APPWRITE_KEY_SSR) {
        throw new Error("APW-WRAPPER - Error: Missing required environment variable: APPWRITE_KEY_SSR");
    }
    if (!process.env.APPWRITE_DB) {
        throw new Error("APW-WRAPPER - Error: Missing required environment variable: APPWRITE_DB");
    }
    if (!process.env.APPWRITE_COLL_USERS) {
        throw new Error("APW-WRAPPER - Error: Missing required environment variable: APPWRITE_COLL_USERS");
    }
    if (!process.env.APPWRITE_LIVE_ENV_VAR_NAME) {
        throw new Error("APW-WRAPPER - Error: Missing required environment variable: APPWRITE_LIVE_ENV_VAR_NAME");
    }
    if (!process.env.APPWRITE_BUCKET_LOGS) {
        throw new Error("APW-WRAPPER - Error: Missing required environment variable: APPWRITE_BUCKET_LOGS");
    }
};
export { envCheck, apiKeySsr, appDomain, cookiePrefix, cookieName, databaseId, endpoint, pathI18n, liveEnvVarName, oauthSuccessPath, oauthFailurePath, projectId, port, paths, pathLogs, pathSchemas, signInPath, usersCollectionId, verificationPath, logsBucketId, logsBucketName, };
