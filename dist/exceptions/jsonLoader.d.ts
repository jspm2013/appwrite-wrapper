/**
 * Loads localized messages for the specified locale.
 *
 * This function dynamically reads the JSON file from the "messages" directory
 * in the project's root based on the provided locale. It ensures that the file
 * exists and parses its content into a JavaScript object.
 *
 * @param {string} locale - The locale (e.g., "en", "de") to load messages for.
 * @returns {Promise<Record<string, string>>} - A promise that resolves to the parsed messages.
 * @throws {Error} - If the messages file does not exist or cannot be read.
 */
export declare function messagesLoader(locale: string): Promise<Record<string, string>>;
/**
 * Loads the library's exceptions file.
 *
 * This function reads the "exceptions.json" file located in the library's
 * "exceptions" directory. It ensures that the file exists and parses its
 * content into a JavaScript object.
 *
 * @returns {Promise<Record<string, { description: string }>>} - A promise that resolves to the parsed exceptions.
 * @throws {Error} - If the exceptions file does not exist or cannot be read.
 */
export declare function exceptionsLoader(): Promise<Record<string, {
    description: string;
}>>;
//# sourceMappingURL=jsonLoader.d.ts.map