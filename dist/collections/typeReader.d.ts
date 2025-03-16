export declare const runtime = "nodejs";
/**
 * Retrieves the absolute file path of a TypeScript type definition file.
 *
 * @param {Object} options - Configuration options for fetching the type file.
 * @param {string} options.typeFileName - The name of the file that holds the type definition.
 * @returns {Promise<string | null>} - The absolute file path of the type file if found, otherwise `null`.
 */
export declare const getTypeFile: ({ typeFileName, }: {
    typeFileName: string;
}) => Promise<string | null>;
/**
 * Dynamically imports a TypeScript type definition file and extracts the specified type.
 *
 * @param {Object} options - Configuration options for fetching the type.
 * @param {string} options.typeFileName - The name of the file that holds the type definition.
 * @param {string} options.typeName - The specific type name to extract.
 * @returns {Promise<any | null>} - The extracted type definition or `null` if not found.
 */
export declare const getType: ({ typeFileName, typeName, }: {
    typeFileName: string;
    typeName: string;
}) => Promise<string | null>;
//# sourceMappingURL=typeReader.d.ts.map