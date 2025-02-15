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
export const getTypeFile = async ({
  collName = "users",
}: {
  collName: string;
}): Promise<string | null> => {
  try {
    const filePath = path.join(SCHEMAS_FOLDER, `${collName}.ts`);

    // Check if the type file exists
    await fs.access(filePath);
    return filePath;
  } catch (err: any) {
    console.error(`❌ ERROR: Type file not found - ${err.message}`);
    return null;
  }
};

/**
 * Dynamically imports a TypeScript type definition from a generated type file.
 *
 * @param {Object} options - Configuration options for fetching the type.
 * @param {string} options.collName - The name of the collection (default: "users").
 * @param {string} options.typeName - The specific type name to import from the type file.
 * @returns {Promise<any | null>} - The imported TypeScript type object if found, otherwise `null`.
 */
export const getType = async ({
  collName = "users",
  typeName,
}: {
  collName: string;
  typeName: string;
}): Promise<any | null> => {
  try {
    const typeFile = await getTypeFile({ collName });

    if (!typeFile) return null;

    // Get the relative module path and import dynamically
    const modulePath = path.relative(__dirname, typeFile);
    const importedModule = await import(modulePath);

    return importedModule[typeName] || null;
  } catch (error: any) {
    console.error(`ERROR: Failed to import type - ${error.message}`);
    return null;
  }
};
