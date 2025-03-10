export { createAttribute } from "./createAttribute";
export { updateAttribute } from "./updateAttribute";
export { getSchema } from "./getSchema";
/**
 * Finds the attribute definition in the provided schema attributes for the given key.
 *
 * @param key - The attribute key to look up.
 * @param schemaAttributes - The array of attribute definitions from your schema.
 * @returns The matching attribute definition, or undefined if not found.
 */
export const getAttributeFromKey = (key, schemaAttributes) => {
    return schemaAttributes.find((attr) => attr.key === key);
};
/**
 * Compares two attribute definitions to determine if they are equal.
 *
 * @param existingAttr - The existing attribute definition.
 * @param schemaAttr - The attribute definition from your schema.
 * @returns True if the attributes are equal, false otherwise.
 */
export const attributesEqual = (existingAttr, schemaAttr) => {
    // Compare the common properties.
    const commonEqual = existingAttr.required === schemaAttr.required &&
        existingAttr.type === schemaAttr.type &&
        existingAttr.array === schemaAttr.array &&
        // Only compare `default` if both objects have that property.
        ("default" in existingAttr && "default" in schemaAttr
            ? existingAttr.default === schemaAttr.default
            : true);
    // For type-specific comparisons, narrow based on the attribute type.
    let typeSpecificEqual = true;
    switch (existingAttr.type) {
        case "string":
            // For string attributes, compare size.
            typeSpecificEqual =
                existingAttr.size ===
                    schemaAttr.size;
            break;
        case "integer":
            typeSpecificEqual =
                existingAttr.min ===
                    schemaAttr.min &&
                    existingAttr.max ===
                        schemaAttr.max;
            break;
        case "float":
            typeSpecificEqual =
                existingAttr.min ===
                    schemaAttr.min &&
                    existingAttr.max ===
                        schemaAttr.max;
            break;
        case "enum":
            // Compare format and elements. (For elements, we use JSON.stringify here as a simple deep-equality check.)
            typeSpecificEqual =
                existingAttr.format ===
                    schemaAttr.format &&
                    JSON.stringify(existingAttr.elements) ===
                        JSON.stringify(schemaAttr.elements);
            break;
        case "relationship":
            // Relationship attributes don't have a default.
            typeSpecificEqual =
                existingAttr.relatedCollection ===
                    schemaAttr.relatedCollection &&
                    existingAttr.relationType ===
                        schemaAttr.relationType &&
                    existingAttr.twoWay ===
                        schemaAttr.twoWay &&
                    existingAttr.twoWayKey ===
                        schemaAttr.twoWayKey &&
                    existingAttr.onDelete ===
                        schemaAttr.onDelete;
            break;
        // For other types (boolean, email, ip, url, datetime) you may compare additional keys as needed.
        default:
            break;
    }
    return commonEqual && typeSpecificEqual;
};
