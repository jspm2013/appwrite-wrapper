import { AppwriteException } from "node-appwrite";
import { exceptionsLoader, messagesLoader } from "./jsonLoader";

/**
 * Handles Appwrite errors and maps them to a readable format.
 * @param error - The error to handle.
 * @param locale - The locale for error messages (e.g., "en", "de").
 * @returns {object} - Formatted error object.
 */
export const handleApwError = async (error: any, locale: string = "en") => {
  if (!(error instanceof AppwriteException)) {
    throw error;
  }

  const fs = require("fs");
  const path = require("path");

  const internalError = {
    appwrite: true,
    name: "INTERNAL_ERROR",
    type: "internal_error",
    code: 500,
    variant: "error",
    description: "",
  };

  try {
    const exceptionsPath = path.join(
      __dirname,
      "exceptions",
      "exceptions.json"
    );

    let localizedMessages;
    try {
      // Await the result of the async messagesLoader function
      localizedMessages = (await messagesLoader(locale)) as Record<
        string,
        string
      >;
    } catch {
      // Return the internal error object if an error occurs
      return {
        ...internalError,
        description:
          "DEV-MSG: Failed to read custom i18n files for localization (i.e. /messages/en.json).",
      };
    }

    let allExceptions;
    try {
      allExceptions = (await exceptionsLoader()) as Record<
        string,
        { description: string }
      >;
    } catch {
      return {
        ...internalError,
        description: "DEV-MSG: Failed to read the library exceptions file.",
      };
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
      "DEV-MSG: Unknown library error occurred";

    return {
      appwrite: true,
      name: type,
      type: typeLowerCase,
      code,
      variant,
      description,
    };
  } catch {
    return {
      ...internalError,
      description:
        "DEV-MSG: An unexpected library error occurred while handling the error.",
    };
  }
};
