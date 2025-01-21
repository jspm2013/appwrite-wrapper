import fs from "fs/promises";
import path from "path";
import { schemasPath } from "../appwriteConfig";
import { CollectionSchema } from "./types";

const SCHEMAS_FOLDER = path.join(process.cwd(), schemasPath);

export const getSchema = async (schema: string): Promise<CollectionSchema> => {
  const files = await fs.readdir(SCHEMAS_FOLDER);

  try {
    for (const file of files) {
      const fileName = path.parse(file).name;
      const fileExt = path.parse(file).ext;
      if (fileExt !== ".json" || fileName !== schema) continue;

      const filePath = path.join(SCHEMAS_FOLDER, file);
      const module = JSON.parse(await fs.readFile(filePath, "utf-8"));

      if (isCollectionSchema(module) && module.name === schema) {
        return module;
      }
    }
    throw new Error(
      `schema object not valid or schema file not found (${schema}.json)`
    );
  } catch (error: any) {
    throw new Error(`Error importing schema '${schema}': ${error.message}`);
  }
};

// Type guard to validate the structure of the schema
const isCollectionSchema = (obj: any): obj is CollectionSchema => {
  return (
    obj &&
    typeof obj.name === "string" &&
    obj.name.length > 0 &&
    Array.isArray(obj.permissions) &&
    typeof obj.documentSecurity === "boolean" &&
    typeof obj.enabled === "boolean" &&
    Array.isArray(obj.attributes) &&
    Array.isArray(obj.indexes)
  );
};
