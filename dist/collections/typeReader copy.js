import path from "path";
import fs from "fs/promises";
import { schemasPath } from "../appwriteConfig";
const SCHEMAS_FOLDER = path.join(process.cwd(), schemasPath);
/**
 * Retrieves the file path of the dynamically created TypeScript definition file.
 *
 * @param {Object} options - Configuration options for fetching the type file.
 * @param {string} options.collName - The name of the collection (default: "users").
 * @returns {Promise<string | null>} - The absolute file path of the type file if found, otherwise `null`.
 */
export const getTypeFile = async ({ collName = "user", }) => {
    try {
        const filePath = path.join(SCHEMAS_FOLDER, `${collName}.ts`);
        await fs.access(filePath);
        return filePath;
    }
    catch (err) {
        console.error(`ERROR: Type file not found - ${err.message}`);
        return null;
    }
};
/**
 * Reads a TypeScript file and extracts a specific interface or type.
 *
 * @param {Object} options - Configuration options for fetching the type.
 * @param {string} options.collName - The name of the collection (default: "users").
 * @param {string} options.typeName - The specific type name to extract.
 * @returns {Promise<string | null>} - The extracted type definition as a string, or `null` if not found.
 */
export const getType = async ({ collName, typeName, }) => {
    try {
        const typeFile = await getTypeFile({ collName });
        if (!typeFile)
            return null;
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
