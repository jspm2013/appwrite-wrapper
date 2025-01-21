import fs from "fs/promises";
import path from "path";
import { schemasPath } from "../appwriteConfig";
const SCHEMAS_FOLDER = path.join(process.cwd(), schemasPath);
export const getSchema = async (schema) => {
    const files = await fs.readdir(SCHEMAS_FOLDER);
    try {
        for (const file of files) {
            const fileName = path.parse(file).name;
            const fileExt = path.parse(file).ext;
            if (fileExt !== ".json" || fileName !== schema)
                continue;
            const filePath = path.join(SCHEMAS_FOLDER, file);
            const module = JSON.parse(await fs.readFile(filePath, "utf-8"));
            if (isCollectionSchema(module) && module.name === schema) {
                return module;
            }
        }
        throw new Error("schema object not valid or schema file (.json) not found");
    }
    catch (error) {
        throw new Error(`Error importing schema '${schema}': ${JSON.stringify(error)}`);
    }
};
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
