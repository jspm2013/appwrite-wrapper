"use server";

import fs from "fs/promises";
import path from "path";
import { messagesPath } from "../appwriteConfig";

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
export async function messagesLoader(
  locale: string
): Promise<Record<string, string>> {
  const msgsPath = path.join(process.cwd(), messagesPath, `${locale}.json`);

  try {
    // Read the file asynchronously and parse its content
    const messagesContent = await fs.readFile(msgsPath, "utf-8");
    return JSON.parse(messagesContent);
  } catch (error) {
    // Throw an error if the file cannot be read or does not exist
    throw new Error(`DEV-MSG: Error reading file: "${messagesPath}"`);
  }
}

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
export async function exceptionsLoader(): Promise<
  Record<string, { description: string }>
> {
  const exceptionsPath = path.join(__dirname, "exceptions", "exceptions.json");

  try {
    // Read the file asynchronously and parse its content
    const exceptionsContent = await fs.readFile(exceptionsPath, "utf-8");
    return JSON.parse(exceptionsContent);
  } catch (error) {
    // Throw an error if the file cannot be read or does not exist
    throw new Error(`DEV-MSG: Error reading library's exceptions file`);
  }
}
