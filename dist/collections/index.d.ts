export declare const runtime = "nodejs";
import { Attribute } from "./types";
export { Attribute, AttributeHandler, CollectionSchema, Index } from "./types";
export { createAttribute } from "./createAttribute";
export { updateAttribute } from "./updateAttribute";
export { getSchema } from "./schema";
/**
 * Finds the attribute definition in the provided schema attributes for the given key.
 *
 * @param key - The attribute key to look up.
 * @param schemaAttributes - The array of attribute definitions from your schema.
 * @returns The matching attribute definition, or undefined if not found.
 */
export declare const getAttributeFromKey: (key: string, schemaAttributes: Attribute[]) => Attribute | undefined;
/**
 * Compares two attribute definitions to determine if they are equal.
 *
 * @param existingAttr - The existing attribute definition.
 * @param schemaAttr - The attribute definition from your schema.
 * @returns True if the attributes are equal, false otherwise.
 */
export declare const attributesEqual: (existingAttr: Attribute, schemaAttr: Attribute) => boolean;
//# sourceMappingURL=index.d.ts.map