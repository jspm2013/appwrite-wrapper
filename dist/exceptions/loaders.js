"use server";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesLoader = messagesLoader;
exports.configLoader = configLoader;
exports.isAllowedLocale = isAllowedLocale;
exports.getDefaultLocale = getDefaultLocale;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const appwriteConfig_1 = require("../appwriteConfig");
/**
 * Asynchronously loads localized messages for the specified locale.
 *
 * @param {string} locale - The locale (e.g., "en", "de") to load messages for.
 * @returns {Promise<LocalizedMessages>} - A promise that resolves to the parsed messages.
 * @throws {Error} - If the messages file does not exist or cannot be read.
 */
async function messagesLoader(locale) {
    const msgsPath = path_1.default.join(process.cwd(), appwriteConfig_1.i18nPath, `${locale}.json`);
    try {
        const messagesContent = await promises_1.default.readFile(msgsPath, "utf-8");
        return JSON.parse(messagesContent);
    }
    catch {
        throw new Error(`APW-WRAPPER - Error: reading messages file in ${msgsPath}`);
    }
}
/**
 * Asynchronously loads a configuration file from the specified path.
 *
 * @returns {Promise<Config>} A promise that resolves to the parsed configuration object.
 * @throws {Error} If the configuration file cannot be read or parsed.
 */
async function configLoader() {
    const configPath = path_1.default.join(process.cwd(), appwriteConfig_1.i18nPath, "config.json");
    try {
        const config = await promises_1.default.readFile(configPath, "utf-8");
        return JSON.parse(config);
    }
    catch {
        throw new Error(`APW-WRAPPER - Error: Error reading config file ${configPath}`);
    }
}
/**
 * Asynchronously checks if the given locale is allowed based on the configuration.
 *
 * @param {string} locale - The locale to be checked.
 * @returns {Promise<boolean>} A promise that resolves to true if the locale is allowed, otherwise false.
 */
async function isAllowedLocale(locale) {
    try {
        const config = await configLoader();
        return config.allowedLocales.includes(locale);
    }
    catch (error) {
        console.error("Error loading config or checking locale:", error);
        return false;
    }
}
/**
 * Asynchronously retrieves the default locale from the configuration.
 *
 * @returns {Promise<string>} A promise that resolves to the default locale.
 * @throws {Error} If the configuration file cannot be read or does not contain a defaultLocale.
 */
async function getDefaultLocale() {
    try {
        const config = await configLoader();
        return config.defaultLocale;
    }
    catch (error) {
        console.error("Error loading configuration or retrieving default locale:", error);
        return "en"; // Fallback default locale
    }
}
