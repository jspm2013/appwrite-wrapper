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
export const getAttributeFromKey = (key, schemaAttributes) => {
    return schemaAttributes.find((attr) => attr.key === key);
};
/**
 * Compares two Appwrite attribute definitions to determine if they are equal.
 *
 * This comparison checks common properties like `type`, `required`, `array`, and `default`/`xdefault` values,
 * as well as type-specific properties such as `size` for strings, `min`/`max` for numbers, and enum/relationship details.
 * It properly handles falsy values (e.g. `false`, `0`, `""`) and distinguishes between `undefined` and explicit defaults.
 *
 * @param existingAttr - The existing attribute object retrieved from the Appwrite collection.
 * @param schemaAttr - The attribute definition as defined in your local schema JSON.
 * @returns `true` if both attributes are considered equal; otherwise, `false`.
 */
const getAttrDefault = (attr, isSchema) => {
    if (isSchema) {
        return "xdefault" in attr ? attr.xdefault : attr.default;
    }
    return attr.default;
};
export const attributesEqual = (existingAttr, schemaAttr) => {
    const existingDefault = getAttrDefault(existingAttr, false);
    const schemaDefault = getAttrDefault(schemaAttr, true);
    const hasDefinedSchemaDefault = "xdefault" in schemaAttr || "default" in schemaAttr;
    const defaultsEqual = hasDefinedSchemaDefault
        ? existingDefault === schemaDefault
        : true;
    const commonEqual = existingAttr.required === schemaAttr.required &&
        existingAttr.type === schemaAttr.type &&
        existingAttr.array === schemaAttr.array &&
        defaultsEqual;
    let typeSpecificEqual = true;
    switch (existingAttr.type) {
        case "string":
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
            typeSpecificEqual =
                existingAttr.format ===
                    schemaAttr.format &&
                    JSON.stringify(existingAttr.elements) ===
                        JSON.stringify(schemaAttr.elements);
            break;
        case "relationship":
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
        default:
            break;
    }
    return commonEqual && typeSpecificEqual;
};
