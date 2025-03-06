/**
 * Retrieves the absolute file path of a TypeScript type definition file.
 *
 * @param {Object} options - Configuration options for fetching the type file.
 * @param {string} options.collName - The name of the collection (default: "users").
 * @returns {Promise<string | null>} - The absolute file path of the type file if found, otherwise `null`.
 */
export declare const getTypeFile: ({ collName }: {
    collName: string;
}) => Promise<string | null>;
/**
 * Dynamically imports a TypeScript type definition file and extracts the specified type.
 *
 * @param {Object} options - Configuration options for fetching the type.
 * @param {string} options.collName - The name of the collection.
 * @param {string} options.typeName - The specific type name to extract.
 * @returns {Promise<any | null>} - The extracted type definition or `null` if not found.
 */
export declare const getType: ({ collName, typeName, }: {
    collName: string;
    typeName: string;
}) => Promise<any>;
//# sourceMappingURL=typeReader.d.ts.map