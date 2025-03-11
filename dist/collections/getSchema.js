import path from "path";
import fs from "fs/promises";
import { schemasPath } from "../appwriteConfig";
import { createTypeFile } from "./createTypeFile";
const SCHEMAS_FOLDER = path.join(process.cwd(), schemasPath);
export const getSchema = async (schema, log) => {
    const files = await fs.readdir(SCHEMAS_FOLDER);
    try {
        for (const file of files) {
            const fileName = path.parse(file).name;
            const fileExt = path.parse(file).ext;
            if (fileExt !== ".json" || fileName !== schema)
                continue;
            const filePath = path.join(SCHEMAS_FOLDER, file);
            const module = JSON.parse(await fs.readFile(filePath, "utf-8"));
            try {
                if (isCollectionSchema(module) && module.collectionName === schema) {
                    await createTypeFile(module, filePath);
                    return module;
                }
                return null;
            }
            catch (error) {
                throw new Error(`Schema object not valid or schema file not found (${schema}.json)`);
            }
        }
        return null;
    }
    catch (error) {
        const errStr = `Error importing schema '${schema}': ${error.message}`;
        if (log) {
            log.lastError = errStr;
            log.changes.push({
                action: "getSchema",
                information: errStr,
            });
            return log;
        }
        console.error(errStr);
        throw new Error(errStr);
    }
};
// Type guard for CollectionSchema
export const isCollectionSchema = (obj) => {
    return (obj &&
        typeof obj.tsFileFormat === "string" &&
        obj.tsFileFormat.length > 0 &&
        typeof obj.tsFileName === "string" &&
        obj.tsFileName.length > 0 &&
        typeof obj.collectionName === "string" &&
        obj.collectionName.length > 0 &&
        Array.isArray(obj.permissions) &&
        typeof obj.documentSecurity === "boolean" &&
        typeof obj.enabled === "boolean" &&
        Array.isArray(obj.attributes) &&
        Array.isArray(obj.indexes));
};
