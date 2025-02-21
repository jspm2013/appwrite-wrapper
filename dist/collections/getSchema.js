"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const appwriteConfig_1 = require("../appwriteConfig");
const createTypeFile_1 = require("./createTypeFile");
const SCHEMAS_FOLDER = path_1.default.join(process.cwd(), appwriteConfig_1.schemasPath);
const getSchema = async (schema) => {
    const files = await promises_1.default.readdir(SCHEMAS_FOLDER);
    try {
        for (const file of files) {
            const fileName = path_1.default.parse(file).name;
            const fileExt = path_1.default.parse(file).ext;
            if (fileExt !== ".json" || fileName !== schema)
                continue;
            const filePath = path_1.default.join(SCHEMAS_FOLDER, file);
            const module = JSON.parse(await promises_1.default.readFile(filePath, "utf-8"));
            if (isCollectionSchema(module) && module.name === schema) {
                await (0, createTypeFile_1.createTypeFile)(module, filePath);
                return module;
            }
        }
        throw new Error(`schema object not valid or schema file not found (${schema}.json)`);
    }
    catch (error) {
        throw new Error(`Error importing schema '${schema}': ${error.message}`);
    }
};
exports.getSchema = getSchema;
// Type guard to validate the structure of the schema
const isCollectionSchema = (obj) => {
    return (obj &&
        typeof obj.name === "string" &&
        obj.name.length > 0 &&
        Array.isArray(obj.permissions) &&
        typeof obj.documentSecurity === "boolean" &&
        typeof obj.enabled === "boolean" &&
        Array.isArray(obj.attributes) &&
        Array.isArray(obj.indexes));
};
