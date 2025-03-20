import { apwManager } from "../utils";
import allExceptions from "./exceptions.json";
import { AppwriteException } from "node-appwrite";
import { configLoader, messagesLoader } from "./loaders";

/*
 * APPWRITE ERROR EXAMPLE, see https://appwrite.io/docs/advanced/platform/response-codes as per 12.01.2024
 *  {
 *      name: 'AppwriteException',
 *      code: 400,
 *      type: 'general_argument_invalid',
 *      response: {
 *          message: 'Invalid `password` param: Password must be between 8 and 256 characters long.',
 *          code: 400,
 *          type: 'general_argument_invalid',
 *          version: '1.6.0'
 *      }
 *  }
 */

interface LocalizedMessage {
  header: string;
  description: string;
}
type MessagesMap = Record<string, LocalizedMessage>;

interface ExceptionViaUrl {
  code: number;
  type: string;
  message: string;
}

interface Exception {
  name: string;
  description: string;
  code: number;
}
type ExceptionMap = Record<string, Exception>;

interface ErrorHandler {
  error: any;
  locale?: string;
  admin?: boolean;
}

interface ReturnedError {
  appwrite: boolean;
  header: string;
  type: string;
  code: number;
  variant: string;
  description: string;
  error?: object;
}

/**
 * Load the exceptions.
 */
const exceptions: ExceptionMap = allExceptions;

/**
 * Handles Appwrite errors and maps them to a readable format.
 * @param error - The error to handle.
 * @returns {object} - Formatted error object.
 */
export const handleApwError = async ({
  error,
}: ErrorHandler): Promise<ReturnedError> => {
  /*
   * Define the internal error object.
   */
  const internalError = {
    appwrite: false,
    header: "Internal Error",
    type: "general_unknown",
    code: 500,
    variant: "error",
    description: "APW-WRAPPER - Error",
  };

  /**
   * Load the locales config.
   */
  const config = await configLoader();
  const locale = apwManager.getLocale();
  const defaultLocale = config.defaultLocale;

  /**
   * Load the admin status.
   */
  const admin = apwManager.getAdmin();

  /*
   * Check if the provided locale is allowed.
   */
  if (!config.allowedLocales.includes(locale ?? defaultLocale)) {
    return {
      ...internalError,
      error: {
        passedLocale: locale,
        defaultLocale: defaultLocale,
        allowedLocales: JSON.stringify(config.allowedLocales),
      },
      appwrite: false,
      description: "APW-WRAPPER - Error: Invalid locale provided",
    };
  }

  /*
   * If the error is not an instance of AppwriteException, throw it.
   */
  if (!(error instanceof AppwriteException || isExceptionViaUrl(error))) {
    return isExceptionViaUrl(error)
      ? {
          ...internalError,
          error,
          appwrite: false,
          description:
            "APW-WRAPPER - Error: Invalid appwrite error format received",
        }
      : {
          ...internalError,
          error,
          appwrite: true,
          description: error.message,
        };
  }

  /*
   * Load the localized messages and exceptions.
   */
  let localizedMessages: MessagesMap;
  try {
    localizedMessages = await messagesLoader(locale ?? defaultLocale);
  } catch (err: any) {
    return {
      ...internalError,
      error: err,
      appwrite: false,
      description:
        "APW-WRAPPER - Error: Failed to read locale i18n files (i.e. root/messages/<locale>.json  ... where <locale> could be for example: en, de, ...)",
    };
  }

  try {
    /*
     * Define error properties.
     */
    const jsonError = JSON.parse(JSON.stringify(error));
    const jsonErrorReponse = JSON.parse(jsonError.response);
    const { type, code } = jsonError;
    const typeLowerCase = type?.toLowerCase();

    const variant = code < 300 ? "success" : code < 400 ? "info" : "error";

    const header = admin
      ? "APW-WRAPPER - DEV-MSG"
      : localizedMessages[typeLowerCase]?.header || "APW-WRAPPER - Error";

    const description = admin
      ? jsonErrorReponse?.message || `Exception code: ${code}`
      : localizedMessages[typeLowerCase]?.description ||
        exceptions[type]?.description ||
        "No description found";

    /*
     * Update the error object.
     */
    const apwWrapperError = {
      appwrite: true,
      header: header.charAt(0).toUpperCase() + header.slice(1),
      type: typeLowerCase,
      code,
      variant,
      description,
    };

    return apwWrapperError;
  } catch (err: any) {
    /*
     * Handle unexpected errors.
     */
    return {
      ...internalError,
      error: err,
      appwrite: false,
      description: "APW-WRAPPER - Error: An unexpected library error occurred",
    };
  }
};

const isExceptionViaUrl = (error: any): error is ExceptionViaUrl => {
  return (
    error &&
    typeof error === "object" &&
    typeof error.code === "number" &&
    typeof error.type === "string" &&
    typeof error.message === "string"
  );
};
