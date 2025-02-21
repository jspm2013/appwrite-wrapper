"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getType = exports.getTypeFile = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const appwriteConfig_1 = require("../appwriteConfig");
const SCHEMAS_FOLDER = path_1.default.join(process.cwd(), appwriteConfig_1.schemasPath);
/**
 * Retrieves the file path of the dynamically created TypeScript definition file.
 *
 * @param {Object} options - Configuration options for fetching the type file.
 * @param {string} options.collName - The name of the collection (default: "users").
 * @returns {Promise<string | null>} - The absolute file path of the type file if found, otherwise `null`.
 */
const getTypeFile = async ({ collName = "users", }) => {
    try {
        const filePath = path_1.default.join(SCHEMAS_FOLDER, `${collName}.ts`);
        await promises_1.default.access(filePath);
        return filePath;
    }
    catch (err) {
        console.error(`ERROR: Type file not found - ${err.message}`);
        return null;
    }
};
exports.getTypeFile = getTypeFile;
/**
 * Reads a TypeScript file and extracts a specific interface or type.
 *
 * @param {Object} options - Configuration options for fetching the type.
 * @param {string} options.collName - The name of the collection (default: "users").
 * @param {string} options.typeName - The specific type name to extract.
 * @returns {Promise<string | null>} - The extracted type definition as a string, or `null` if not found.
 */
const getType = async ({ collName = "users", typeName, }) => {
    try {
        const typeFile = await (0, exports.getTypeFile)({ collName });
        if (!typeFile)
            return null;
        const tsContent = await promises_1.default.readFile(typeFile, "utf-8");
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
exports.getType = getType;
