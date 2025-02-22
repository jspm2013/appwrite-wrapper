/**
 * Retrieves the file path of the dynamically created TypeScript definition file.
 *
 * @param {Object} options - Configuration options for fetching the type file.
 * @param {string} options.collName - The name of the collection (default: "users").
 * @returns {Promise<string | null>} - The absolute file path of the type file if found, otherwise `null`.
 */
export declare const getTypeFile: ({ collName, }: {
    collName: string;
}) => Promise<string | null>;
/**
 * Reads a TypeScript file and extracts a specific interface or type.
 *
 * @param {Object} options - Configuration options for fetching the type.
 * @param {string} options.collName - The name of the collection (default: "users").
 * @param {string} options.typeName - The specific type name to extract.
 * @returns {Promise<string | null>} - The extracted type definition as a string, or `null` if not found.
 */
export declare const getType: ({ collName, typeName, }: {
    collName: string;
    typeName: string;
}) => Promise<string | null>;
//# sourceMappingURL=typeReader.d.ts.map