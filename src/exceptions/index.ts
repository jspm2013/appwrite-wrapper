import { AppwriteException } from "node-appwrite";
import { configLoader, messagesLoader } from "./loaders";
import allExceptions from "./exceptions.json";

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
 * @param locale - The locale for error messages (e.g., "en", "de").
 * @param admin - Tells the function to show detailed error messages or not.
 * @returns {object} - Formatted error object.
 */
export const handleApwError = async ({
  error,
  locale,
  admin = false,
}: ErrorHandler): Promise<ReturnedError> => {
  /*
   * Define the internal error object.
   */
  const internalError = {
    appwrite: false,
    header: "INTERNAL_ERROR",
    type: "general_unknown",
    code: 500,
    variant: "error",
    description: "APW-WRAPPER - Error",
  };

  /**
   * Load the default locale.
   */
  const config = await configLoader();
  const defaultLocale = config.defaultLocale;

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
  if (!(error instanceof AppwriteException)) {
    return {
      ...internalError,
      error,
      appwrite: false,
      description:
        "APW-WRAPPER - Error: Invalid appwrite error format received",
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
    const errorJson = JSON.parse(JSON.stringify(error)).response; // since response is not a string, we need to stringify it for type satisfaction
    const { type, code, message } = errorJson;
    const typeLowerCase = type.toLowerCase();

    const variant =
      code < 300
        ? "success"
        : code < 400
        ? "info"
        : code < 500
        ? "warning"
        : "error";

    const header = admin
      ? `APW-WRAPPER - DEV-Error: ${type}`
      : localizedMessages[typeLowerCase]?.header ||
        "APW-WRAPPER - Error: No header found";

    const description = admin
      ? `APW-WRAPPER - DEV-Error: ${message}`
      : localizedMessages[typeLowerCase]?.description ||
        exceptions[type]?.description ||
        "APW-WRAPPER - Error: No description found";

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
