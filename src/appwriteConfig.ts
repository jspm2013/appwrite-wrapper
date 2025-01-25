/*
 *
 * MANDATORY
 * User defined: using env vars
 *
 */
const appDomain = process.env.APP_DOMAIN;
const endpoint = process.env.APPWRITE_ENDPOINT;
const projectId = process.env.APPWRITE_PROJECT_ID;
const apiKeySsr = process.env.APPWRITE_API_KEY_SSR;
const liveEnvVarName = process.env.APPWRITE_LIVE_ENV_VAR_NAME;

/*
 *
 * OPTIONAL
 * Pre-defined: optionally customizable, using env vars
 *
 */
const port = process.env.PORT || 3000;
const schemasPath = process.env.APPWRITE_SCHEMAS_PATH || "lib/appwrite/schemas";
const i18nPath = process.env.APPWRITE_I18N_PATH || "messages/appwrite";
const signInPath = process.env.APPWRITE_SIGN_IN_PATH || "sign-in";
const oauthSuccessPath = process.env.APPWRITE_OAUTH_SUCCESS_PATH || "api/oauth";
const oauthFailurePath = process.env.APPWRITE_OAUTH_FAILURE_PATH || signInPath;
const verificationPath =
  process.env.APPWRITE_VERIFICATION_PATH || "verification";
const cookiePrefix = process.env.APPWRITE_SESSION_COOKIE_PREFIX || "_apw_";
const cookieName =
  process.env.APPWRITE_SESSION_COOKIE_NAME || cookiePrefix + "s";

/*
 *
 * Initial env check
 *
 */
const envCheck = () => {
  if (!process.env.APP_DOMAIN) {
    throw new Error(
      "APW-WRAPPER - Error: Missing required environment variable: APP_DOMAIN"
    );
  }
  if (!process.env.APPWRITE_ENDPOINT) {
    throw new Error(
      "APW-WRAPPER - Error: Missing required environment variable: APPWRITE_ENDPOINT"
    );
  }
  if (!process.env.APPWRITE_PROJECT_ID) {
    throw new Error(
      "APW-WRAPPER - Error: Missing required environment variable: APPWRITE_PROJECT_ID"
    );
  }
  if (!process.env.APPWRITE_API_KEY_SSR) {
    throw new Error(
      "APW-WRAPPER - Error: Missing required environment variable: APPWRITE_API_KEY_SSR"
    );
  }
  if (!process.env.APPWRITE_LIVE_ENV_VAR_NAME) {
    throw new Error(
      "APW-WRAPPER - Error: Missing required environment variable: APPWRITE_LIVE_ENV_VAR_NAME"
    );
  }
};

export {
  envCheck,
  appDomain,
  endpoint,
  projectId,
  apiKeySsr,
  liveEnvVarName,
  port,
  schemasPath,
  i18nPath,
  signInPath,
  oauthSuccessPath,
  oauthFailurePath,
  verificationPath,
  cookiePrefix,
  cookieName,
};
