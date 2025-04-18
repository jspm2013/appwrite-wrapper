import path from "path";
import fs from "fs/promises";
import { humanTimeStamp } from "../utils";
import { pathSchemas } from "../appwriteConfig";
import { createTypeFile } from "./createTypeFile";
const SCHEMAS_FOLDER = path.join(process.cwd(), pathSchemas);
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
/**
 * Helper function to filter out unwanted keys from an object.
 */
const filterObjectKeys = (obj, keysToRemove) => {
    const result = {};
    for (const key in obj) {
        if (!keysToRemove.includes(key)) {
            result[key] = obj[key];
        }
    }
    return result;
};
/**
 * Transforms a native Appwrite collection object by removing the keys
 * "$createdAt", "$updatedAt", "error", and "status" from each item in its
 * "attributes" and "indexes" arrays. Then writes the resulting schema object
 * to a JSON file for documentation purposes.
 *
 * The generated file is saved in the schemas folder with the name:
 *    <collectionName>_deprecated_<timestamp>.json
 *
 * @param collectionObj The native Appwrite collection object.
 */
export const schemaToFile = async (collectionObj) => {
    const keysToRemove = ["$createdAt", "$updatedAt", "error", "status"];
    // Process attributes if available.
    const transformedAttributes = Array.isArray(collectionObj.attributes)
        ? collectionObj.attributes.map((attr) => filterObjectKeys(attr, keysToRemove))
        : [];
    // Process indexes similarly.
    const transformedIndexes = Array.isArray(collectionObj.indexes)
        ? collectionObj.indexes.map((index) => filterObjectKeys(index, keysToRemove))
        : [];
    // Create a new schema object without tsFileName/tsFileFormat.
    const newSchema = {
        collectionName: collectionObj.name,
        permissions: collectionObj.permissions,
        documentSecurity: collectionObj.documentSecurity,
        enabled: collectionObj.enabled,
        attributes: transformedAttributes,
        indexes: transformedIndexes,
    };
    // Generate a human-readable timestamp.
    const timestamp = humanTimeStamp();
    const fileName = `${collectionObj.name}_deprecated_${timestamp}.json`;
    const filePath = path.join(SCHEMAS_FOLDER, fileName);
    const schemaJson = JSON.stringify(newSchema, null, 2);
    await fs.writeFile(filePath, schemaJson, "utf-8");
};
