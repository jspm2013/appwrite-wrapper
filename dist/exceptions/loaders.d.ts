interface LocalizedMessages {
    [key: string]: {
        header: string;
        description: string;
    };
}
interface Config {
    allowedLocales: string[];
    defaultLocale: string;
}
/**
 * Asynchronously loads localized messages for the specified locale.
 *
 * @param {string} locale - The locale (e.g., "en", "de") to load messages for.
 * @returns {Promise<LocalizedMessages>} - A promise that resolves to the parsed messages.
 * @throws {Error} - If the messages file does not exist or cannot be read.
 */
export declare function messagesLoader(locale: string): Promise<LocalizedMessages>;
/**
 * Asynchronously loads a configuration file from the specified path.
 *
 * @returns {Promise<Config>} A promise that resolves to the parsed configuration object.
 * @throws {Error} If the configuration file cannot be read or parsed.
 */
export declare function configLoader(): Promise<Config>;
/**
 * Asynchronously checks if the given locale is allowed based on the configuration.
 *
 * @param {string} locale - The locale to be checked.
 * @returns {Promise<boolean>} A promise that resolves to true if the locale is allowed, otherwise false.
 */
export declare function isAllowedLocale(locale: string): Promise<boolean>;
/**
 * Asynchronously retrieves the default locale from the configuration.
 *
 * @returns {Promise<string>} A promise that resolves to the default locale.
 * @throws {Error} If the configuration file cannot be read or does not contain a defaultLocale.
 */
export declare function getDefaultLocale(): Promise<string>;
export {};
//# sourceMappingURL=loaders.d.ts.map