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
//# sourceMappingURL=utils.d.ts.map