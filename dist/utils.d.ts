/**
 * Converts an ArrayBuffer to a Base64 string.
 * @param buffer - The ArrayBuffer to convert.
 * @returns {string} - The Base64 encoded string.
 */
export declare const arrayBufferToBase64: (buffer: ArrayBuffer) => string;
/**
 * Validates if a given string is a valid JSON string.
 * @param str - The string to validate.
 * @returns {boolean} - True if the string is a valid JSON string, false otherwise.
 */
export declare const isValidJsonString: (str: string) => boolean;
/**
 * Checks if the given object is a valid JSON object.
 * @param obj - The object to check.
 * @returns {boolean} - True if the object is a valid JSON object, false otherwise.
 */
export declare const isValidJsonObject: (obj: object) => boolean;
/**
 * Checks if the given object is an empty object.
 * @param obj - The object to check.
 * @returns {boolean} - True if the object is empty, false otherwise.
 */
export declare const isEmptyObject: (obj: object) => boolean;
/**
 * Checks if the given object has only one key-value pair with an empty key and an empty value.
 * @param obj - The object to check.
 * @returns {boolean} - True if the object matches the condition, false otherwise.
 */
export declare const isEmptyKeyValuePair: (obj: Record<string, any>) => boolean;
/**
 * Checks if the given error is an instance of AppwriteException.
 * @param error - The error to check.
 * @returns {boolean} - True if the error is an AppwriteException, false otherwise.
 */
export declare function isApwError(error: unknown): boolean;
/**
 * Wrapper for handling Appwrite exceptions in promises.
 * @param promise - The promise to handle.
 * @returns {Promise<any>} - Resolves or rejects with the promise result or error.
 */
export declare const apwExcWrapper: (promise: Promise<any>) => Promise<any>;
/**
 * Handles Appwrite errors and maps them to a readable format.
 * @param error - The error to handle.
 * @param locale - The locale for error messages (e.g., "en", "de").
 * @returns {object} - Formatted error object.
 */
export declare const handleApwError: (error: unknown, locale?: string) => {
    name: string;
    type: string;
    code: number;
    variant: string;
    description: any;
};
//# sourceMappingURL=utils.d.ts.map