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
 * Dynamically imports a TypeScript type definition from a generated type file.
 *
 * @param {Object} options - Configuration options for fetching the type.
 * @param {string} options.collName - The name of the collection (default: "users").
 * @param {string} options.typeName - The specific type name to import from the type file.
 * @returns {Promise<any | null>} - The imported TypeScript type object if found, otherwise `null`.
 */
export declare const getType: ({ collName, typeName, }: {
    collName: string;
    typeName: string;
}) => Promise<any | null>;
//# sourceMappingURL=typeReader.d.ts.map