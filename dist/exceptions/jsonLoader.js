"use server";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
export function messagesLoader(locale) {
    return __awaiter(this, void 0, void 0, function* () {
        const msgsPath = path.join(process.cwd(), messagesPath, `${locale}.json`);
        try {
            yield fs.access(msgsPath); // Check if the file exists
            const messagesContent = yield fs.readFile(msgsPath, "utf-8");
            return JSON.parse(messagesContent);
        }
        catch (error) {
            // Type the error
            if (error.code === "ENOENT") {
                throw new Error(`DEV-MSG: Messages file not found: ${msgsPath}`);
            }
            else {
                throw new Error(`DEV-MSG: Error reading messages file ${msgsPath}: ${error.message}`);
            }
        }
    });
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
export function exceptionsLoader() {
    return __awaiter(this, void 0, void 0, function* () {
        const exceptionsPath = path.join(__dirname, "exceptions", "exceptions.json");
        try {
            yield fs.access(exceptionsPath);
            const exceptionsContent = yield fs.readFile(exceptionsPath, "utf-8");
            return JSON.parse(exceptionsContent);
        }
        catch (error) {
            if (error.code === "ENOENT") {
                throw new Error(`DEV-MSG: Exceptions file not found: ${exceptionsPath}`);
            }
            else {
                throw new Error(`DEV-MSG: Error reading exceptions file ${exceptionsPath}: ${error.message}`);
            }
        }
    });
}
