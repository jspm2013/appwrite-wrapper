import fs from "fs";
import path from "path";
import { schemasPath } from "../appwriteConfig";
import { Attribute, Index, CreateRelationshipAttributeParams } from "./types";

interface CollectionSchema {
  permissions: string[];
  documentSecurity: boolean;
  enabled: boolean;
  attributes: Attribute[] | CreateRelationshipAttributeParams[];
  indexes: Index[];
}

const SCHEMAS_FOLDER = path.join(process.cwd(), schemasPath);
//const SCHEMAS_FOLDER = path.resolve(__dirname, "./CollectionSchemas");

export const getSchema = async (schema: string): Promise<CollectionSchema> => {
  const files = fs.readdirSync(SCHEMAS_FOLDER);

  const schemas: { [key: string]: CollectionSchema } = {};

  for (const file of files) {
    // Check for JavaScript or TypeScript files only
    if (!file.endsWith(".js") && !file.endsWith(".ts")) continue;

    const filePath = path.join(SCHEMAS_FOLDER, file);

    // Dynamically import the file
    const module = await import(filePath);

    // Iterate over the exports and filter valid schemas
    for (const [exportName, exportValue] of Object.entries(module)) {
      if (isCollectionSchema(exportValue)) {
        schemas[exportName] = exportValue;
      }
    }
  }

  // Find the schema matching the input
  if (schemas[schema]) {
    return schemas[schema];
  } else {
    throw new Error(`Unsupported attribute template: ${schema}`);
  }
};

// Type guard to validate the structure of the schema
const isCollectionSchema = (obj: any): obj is CollectionSchema => {
  return (
    obj &&
    Array.isArray(obj.permissions) &&
    typeof obj.documentSecurity === "boolean" &&
    typeof obj.enabled === "boolean" &&
    Array.isArray(obj.attributes) &&
    Array.isArray(obj.indexes)
  );
};
