export const runtime = "nodejs";

import { Attribute, Models } from "./types";
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
export const getAttributeFromKey = (
  key: string,
  schemaAttributes: Attribute[]
): Attribute | undefined => {
  return schemaAttributes.find((attr) => attr.key === key);
};

/**
 * Compares two attribute definitions to determine if they are equal.
 *
 * @param existingAttr - The existing attribute definition.
 * @param schemaAttr - The attribute definition from your schema.
 * @returns True if the attributes are equal, false otherwise.
 */
export const attributesEqual = (
  existingAttr: Attribute,
  schemaAttr: Attribute
): boolean => {
  // Compare the common properties.
  const commonEqual =
    existingAttr.required === schemaAttr.required &&
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
        (existingAttr as Models.AttributeString).size ===
        (schemaAttr as Models.AttributeString).size;
      break;
    case "integer":
      typeSpecificEqual =
        (existingAttr as Models.AttributeInteger).min ===
          (schemaAttr as Models.AttributeInteger).min &&
        (existingAttr as Models.AttributeInteger).max ===
          (schemaAttr as Models.AttributeInteger).max;
      break;
    case "float":
      typeSpecificEqual =
        (existingAttr as Models.AttributeFloat).min ===
          (schemaAttr as Models.AttributeFloat).min &&
        (existingAttr as Models.AttributeFloat).max ===
          (schemaAttr as Models.AttributeFloat).max;
      break;
    case "enum":
      // Compare format and elements. (For elements, we use JSON.stringify here as a simple deep-equality check.)
      typeSpecificEqual =
        (existingAttr as Models.AttributeEnum).format ===
          (schemaAttr as Models.AttributeEnum).format &&
        JSON.stringify((existingAttr as Models.AttributeEnum).elements) ===
          JSON.stringify((schemaAttr as Models.AttributeEnum).elements);
      break;
    case "relationship":
      // Relationship attributes don't have a default.
      typeSpecificEqual =
        (existingAttr as Models.AttributeRelationship).relatedCollection ===
          (schemaAttr as Models.AttributeRelationship).relatedCollection &&
        (existingAttr as Models.AttributeRelationship).relationType ===
          (schemaAttr as Models.AttributeRelationship).relationType &&
        (existingAttr as Models.AttributeRelationship).twoWay ===
          (schemaAttr as Models.AttributeRelationship).twoWay &&
        (existingAttr as Models.AttributeRelationship).twoWayKey ===
          (schemaAttr as Models.AttributeRelationship).twoWayKey &&
        (existingAttr as Models.AttributeRelationship).onDelete ===
          (schemaAttr as Models.AttributeRelationship).onDelete;
      break;
    // For other types (boolean, email, ip, url, datetime) you may compare additional keys as needed.
    default:
      break;
  }

  return commonEqual && typeSpecificEqual;
};
