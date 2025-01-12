import { AppwriteException } from "node-appwrite";
import { configLoader, messagesLoader } from "./loaders";
import allExceptions from "./exceptions.json";
/**
 * Load the default locale.
 */
const config = await configLoader();
/**
 * Load the exceptions.
 */
const exceptions = allExceptions;
/**
 * Handles Appwrite errors and maps them to a readable format.
 * @param error - The error to handle.
 * @param locale - The locale for error messages (e.g., "en", "de").
 * @param admin - Tells the function to show detailed error messages or not.
 * @returns {object} - Formatted error object.
 */
export const handleApwError = async ({ error, locale = config.defaultLocale, admin = false, }) => {
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
    /*
     * Check if the provided locale is allowed.
     */
    if (!config.allowedLocales.includes(locale)) {
        return {
            ...internalError,
            error: {
                passedLocale: locale,
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
            description: "APW-WRAPPER - Error: Invalid appwrite error format received",
        };
    }
    /*
     * Load the localized messages and exceptions.
     */
    let localizedMessages;
    try {
        localizedMessages = await messagesLoader(locale);
    }
    catch (err) {
        return {
            ...internalError,
            error: err,
            appwrite: false,
            description: "APW-WRAPPER - Error: Failed to read locale i18n files (i.e. root/messages/<locale>.json  ... where <locale> could be for example: en, de, ...)",
        };
    }
    try {
        /*
         * Define error properties.
         */
        const errorJson = JSON.parse(JSON.stringify(error)).response; // since response is not a string, we need to stringify it for type satisfaction
        const { type, code, message } = errorJson;
        const typeLowerCase = type.toLowerCase();
        const variant = code < 300
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
    }
    catch (err) {
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
