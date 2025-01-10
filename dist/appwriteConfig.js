if (!process.env.APPWRITE_ENDPOINT) {
    throw new Error("APW-LIB ERROR: Missing required environment variable: APPWRITE_ENDPOINT");
}
if (!process.env.APPWRITE_PROJECT_ID) {
    throw new Error("APW-LIB ERROR: Missing required environment variable: APPWRITE_PROJECT_ID");
}
if (!process.env.APPWRITE_API_KEY_SSR) {
    throw new Error("APW-LIB ERROR: Missing required environment variable: APPWRITE_API_KEY_SSR");
}
export const messagesPath = process.env.APPWRITE_MESSAGES_PATH || "messages/appwrite";
export const projectId = process.env.APPWRITE_PROJECT_ID;
export const endpoint = process.env.APPWRITE_ENDPOINT;
export const apiKeySsr = process.env.APPWRITE_API_KEY_SSR;
export const oauthSuccessPath = process.env.APPWRITE_OAUTH_SUCCESS_PATH || "api/oauth";
export const oauthFailurePath = process.env.APPWRITE_OAUTH_FAILURE_PATH || "sign-in";
export const verificationPath = process.env.APPWRITE_VERIFICATION_PATH || "verification";
export const cookiePrefix = process.env.APPWRITE_SESSION_COOKIE_PREFIX || "_apw_";
export const cookieName = process.env.APPWRITE_SESSION_COOKIE_NAME || cookiePrefix + "s";
