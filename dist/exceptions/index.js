"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleApwError = void 0;
const host_1 = require("../host");
const utils_1 = require("../utils");
const exceptions_json_1 = __importDefault(require("./exceptions.json"));
const node_appwrite_1 = require("node-appwrite");
const loaders_1 = require("./loaders");
const adminStatus = !host_1.live;
utils_1.apwManager.setAdmin(adminStatus);
/**
 * Load the exceptions.
 */
const exceptions = exceptions_json_1.default;
/**
 * Handles Appwrite errors and maps them to a readable format.
 * @param error - The error to handle.
 * @returns {object} - Formatted error object.
 */
const handleApwError = async ({ error, }) => {
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
     * Load the locales config.
     */
    const config = await (0, loaders_1.configLoader)();
    const locale = utils_1.apwManager.getLocale();
    const defaultLocale = config.defaultLocale;
    /**
     * Load the admin status.
     */
    const admin = utils_1.apwManager.getAdmin();
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
    if (!(error instanceof node_appwrite_1.AppwriteException)) {
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
        localizedMessages = await (0, loaders_1.messagesLoader)(locale ?? defaultLocale);
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
        const jsonError = JSON.parse(JSON.stringify(error));
        const jsonErrorReponse = jsonError.response; // since response is not a string, we need to stringify it for type satisfaction
        const { type, code } = jsonErrorReponse || jsonError;
        const typeLowerCase = type?.toLowerCase();
        const variant = code < 300 ? "success" : code < 400 ? "info" : "error";
        const header = admin
            ? "APW-WRAPPER - DEV-MSG"
            : localizedMessages[typeLowerCase]?.header || "APW-WRAPPER - Error";
        const description = admin
            ? jsonErrorReponse.message || `Exception code: ${code}`
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
exports.handleApwError = handleApwError;
