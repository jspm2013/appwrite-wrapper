"use server";
import path from "path";
import fs from "fs/promises";
import { schemasPath } from "../appwriteConfig";
const SCHEMAS_FOLDER = path.join(process.cwd(), schemasPath);
/**
 * Retrieves the absolute file path of a TypeScript type definition file.
 *
 * @param {Object} options - Configuration options for fetching the type file.
 * @param {string} options.typeFileName - The name of the file that holds the type definition.
 * @returns {Promise<string | null>} - The absolute file path of the type file if found, otherwise `null`.
 */
export const getTypeFile = async ({ typeFileName, }) => {
    try {
        const files = await fs.readdir(SCHEMAS_FOLDER);
        for (const file of files) {
            if (file.endsWith(".ts") && file.startsWith(typeFileName)) {
                const filePath = path.join(SCHEMAS_FOLDER, file);
                await fs.access(filePath);
                return filePath;
            }
        }
        console.error(`ERROR: No TypeScript file found for collection '${typeFileName}'.`);
        return null;
    }
    catch (err) {
        console.error(`ERROR: Unable to access type file - ${err.message}`);
        return null;
    }
};
/**
 * Dynamically imports a TypeScript type definition file and extracts the specified type.
 *
 * @param {Object} options - Configuration options for fetching the type.
 * @param {string} options.typeFileName - The name of the file that holds the type definition.
 * @param {string} options.typeName - The specific type name to extract.
 * @returns {Promise<any | null>} - The extracted type definition or `null` if not found.
 */
export const getType = async ({ typeFileName, typeName, }) => {
    try {
        const typeFile = await getTypeFile({ typeFileName });
        if (!typeFile) {
            console.error(`Type file not found for collection: ${typeFileName}`);
            return null;
        }
        const tsContent = await fs.readFile(typeFile, "utf-8");
        const typeRegex = new RegExp(`export\\s+(?:interface|type)\\s+${typeName}\\s+[^]+?\\n}`, "gs");
        const match = tsContent.match(typeRegex);
        if (!match) {
            throw new Error(`Type '${typeName}' not found in ${typeFile}`);
        }
        return match[0];
    }
    catch (err) {
        console.error(`APW-WRAPPER - Error (collections/typeReader): Failed to extract type - ${err.message}`);
        return null;
    }
};
