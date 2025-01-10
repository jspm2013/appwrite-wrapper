import { AppwriteException } from "node-appwrite";

// Client-compatible utilities

/**
 * Converts an ArrayBuffer to a Base64 string.
 * @param buffer - The ArrayBuffer to convert.
 * @returns {string} - The Base64 encoded string.
 */
export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary); // Converts binary string to Base64
};

/**
 * Validates if a given string is a valid JSON string.
 * @param str - The string to validate.
 * @returns {boolean} - True if the string is a valid JSON string, false otherwise.
 */
export const isValidJsonString = (str: string): boolean => {
  try {
    JSON.parse(str); // Attempt to parse the string
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Checks if the given object is a valid JSON object.
 * @param obj - The object to check.
 * @returns {boolean} - True if the object is a valid JSON object, false otherwise.
 */
export const isValidJsonObject = (obj: object): boolean => {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
};

/**
 * Checks if the given object is an empty object.
 * @param obj - The object to check.
 * @returns {boolean} - True if the object is empty, false otherwise.
 */
export const isEmptyObject = (obj: object): boolean => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * Checks if the given object has only one key-value pair with an empty key and an empty value.
 * @param obj - The object to check.
 * @returns {boolean} - True if the object matches the condition, false otherwise.
 */
export const isEmptyKeyValuePair = (obj: Record<string, any>): boolean => {
  return Object.keys(obj).length === 1 && obj[""] === "";
};

/**
 * Checks if the given error is an instance of AppwriteException.
 * @param error - The error to check.
 * @returns {boolean} - True if the error is an AppwriteException, false otherwise.
 */
export function isApwError(error: unknown): boolean {
  return (
    error instanceof AppwriteException && // Check if the error is an instance of AppwriteException
    typeof error.code === "number" && // Verify that the error has a numeric code
    typeof error.response === "string" && // Verify that the error has a string response
    typeof error.type === "string" // Verify that the error has a string type
  );
}

// Server Actions

/**
 * Wrapper for handling Appwrite exceptions in promises.
 * @param promise - The promise to handle.
 * @returns {Promise<any>} - Resolves or rejects with the promise result or error.
 */
export const apwExcWrapper = async (promise: Promise<any>): Promise<any> => {
  "use server"; // Marks this function as server-only
  try {
    return await promise;
  } catch (error) {
    throw error;
  }
};

/**
 * Handles Appwrite errors and maps them to a readable format.
 * @param error - The error to handle.
 * @param locale - The locale for error messages (e.g., "en", "de").
 * @returns {object} - Formatted error object.
 */
export const handleApwError = (error: unknown, locale: string = "en") => {
  "use server"; // Marks this function as server-only

  // Dynamically import server-side modules
  const fs = require("fs");
  const path = require("path");

  try {
    const messagesPath = path.join(
      process.cwd(),
      "messages/appwrite",
      `${locale}.json`
    );
    const exceptionsPath = path.join(__dirname, "exceptions", "index.json");

    // Attempt to read and parse the i18n messages file
    let localizedMessages: Record<string, string>;
    try {
      const messagesData = fs.readFileSync(messagesPath, "utf-8");
      localizedMessages = JSON.parse(messagesData);
    } catch (e) {
      throw new Error("Error reading custom i18n files");
    }

    // Attempt to read and parse the exceptions file
    let allExceptions: Record<string, any>;
    try {
      const exceptionsData = fs.readFileSync(exceptionsPath, "utf-8");
      allExceptions = JSON.parse(exceptionsData);
    } catch (e) {
      throw new Error("Error reading exception file");
    }

    if (!(error instanceof AppwriteException)) {
      throw new Error("Unknown error format");
    }

    const { type, code } = error;
    const typeLowerCase = type.toLowerCase();

    const variant =
      code < 300
        ? "success"
        : code < 400
        ? "info"
        : code < 500
        ? "warning"
        : "error";

    const description =
      localizedMessages[typeLowerCase] ||
      allExceptions[type]?.description ||
      "Unknown error occurred";

    return {
      name: type,
      type: typeLowerCase,
      code,
      variant,
      description,
    };
  } catch (fsError: any) {
    // Differentiate between specific file reading errors and others
    if (fsError.message === "Error reading custom i18n files") {
      return {
        name: "INTERNAL_ERROR",
        type: "internal_error",
        code: 500,
        variant: "error",
        description: "Failed to read custom i18n files for localization.",
      };
    } else if (fsError.message === "Error reading exception file") {
      return {
        name: "INTERNAL_ERROR",
        type: "internal_error",
        code: 500,
        variant: "error",
        description: "Failed to read the exceptions file.",
      };
    } else {
      return {
        name: "INTERNAL_ERROR",
        type: "internal_error",
        code: 500,
        variant: "error",
        description: "An unexpected error occurred while handling the error.",
      };
    }
  }
};
