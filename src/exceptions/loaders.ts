"use server";

import fs from "fs/promises";
import path from "path";
import { i18nPath } from "../appwriteConfig";

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
export async function messagesLoader(
  locale: string
): Promise<LocalizedMessages> {
  const msgsPath = path.join(process.cwd(), i18nPath, `${locale}.json`);

  try {
    const messagesContent = await fs.readFile(msgsPath, "utf-8");
    return JSON.parse(messagesContent);
  } catch {
    throw new Error(
      `APW-WRAPPER - Error: reading messages file in ${msgsPath}`
    );
  }
}

/**
 * Asynchronously loads a configuration file from the specified path.
 *
 * @returns {Promise<Config>} A promise that resolves to the parsed configuration object.
 * @throws {Error} If the configuration file cannot be read or parsed.
 */
export async function configLoader(): Promise<Config> {
  const configPath = path.join(process.cwd(), i18nPath, "config.json");

  try {
    const config = await fs.readFile(configPath, "utf-8");
    return JSON.parse(config);
  } catch {
    throw new Error(
      `APW-WRAPPER - Error: Error reading config file ${configPath}`
    );
  }
}

/**
 * Asynchronously checks if the given locale is allowed based on the configuration.
 *
 * @param {string} locale - The locale to be checked.
 * @returns {Promise<boolean>} A promise that resolves to true if the locale is allowed, otherwise false.
 */
export async function isAllowedLocale(locale: string): Promise<boolean> {
  try {
    const config = await configLoader();
    return config.allowedLocales.includes(locale);
  } catch (error) {
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
export async function getDefaultLocale(): Promise<string> {
  try {
    const config = await configLoader();
    return config.defaultLocale;
  } catch (error) {
    console.error(
      "Error loading configuration or retrieving default locale:",
      error
    );
    return "en"; // Fallback default locale
  }
}
