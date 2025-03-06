import path from "path";
import fs from "fs/promises";
import { schemasPath } from "../appwriteConfig";
const SCHEMAS_FOLDER = path.join(process.cwd(), schemasPath);
/**
 * Retrieves the absolute file path of a TypeScript type definition file.
 *
 * @param {Object} options - Configuration options for fetching the type file.
 * @param {string} options.collName - The name of the collection (default: "users").
 * @returns {Promise<string | null>} - The absolute file path of the type file if found, otherwise `null`.
 */
export const getTypeFile = async ({ collName }) => {
    try {
        const files = await fs.readdir(SCHEMAS_FOLDER);
        for (const file of files) {
            if (file.endsWith(".ts") && file.startsWith(collName)) {
                const filePath = path.join(SCHEMAS_FOLDER, file);
                await fs.access(filePath);
                return filePath;
            }
        }
        console.error(`ERROR: No TypeScript file found for collection '${collName}'.`);
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
 * @param {string} options.collName - The name of the collection.
 * @param {string} options.typeName - The specific type name to extract.
 * @returns {Promise<any | null>} - The extracted type definition or `null` if not found.
 */
export const getType = async ({ collName, typeName, }) => {
    try {
        const typeFile = await getTypeFile({ collName });
        if (!typeFile) {
            console.error(`Type file not found for collection: ${collName}`);
            return null;
        }
        // Import the TypeScript module dynamically
        const userTypesModule = await import(typeFile);
        if (!userTypesModule[typeName]) {
            throw new Error(`Type '${typeName}' not found in ${typeFile}`);
        }
        return userTypesModule[typeName]; // Return the actual type
    }
    catch (err) {
        console.error(`APW-WRAPPER - Error (collections/typeReader): Failed to extract type - ${err.message}`);
        return null;
    }
};
