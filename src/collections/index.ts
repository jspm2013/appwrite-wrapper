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
const getAttrDefault = (attr: any): any =>
  "xdefault" in attr
    ? attr.xdefault
    : "default" in attr
    ? attr.default
    : undefined;
export const attributesEqual = (
  existingAttr: Attribute,
  schemaAttr: Attribute
): boolean => {
  const existingDefault = getAttrDefault(existingAttr);
  const schemaDefault = getAttrDefault(schemaAttr);
  const hasDefinedSchemaDefault =
    "xdefault" in schemaAttr || "default" in schemaAttr;

  const defaultsEqual = hasDefinedSchemaDefault
    ? existingDefault === schemaDefault
    : true;

  const commonEqual =
    existingAttr.required === schemaAttr.required &&
    existingAttr.type === schemaAttr.type &&
    existingAttr.array === schemaAttr.array &&
    defaultsEqual;

  let typeSpecificEqual = true;

  switch (existingAttr.type) {
    case "string":
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
      typeSpecificEqual =
        (existingAttr as Models.AttributeEnum).format ===
          (schemaAttr as Models.AttributeEnum).format &&
        JSON.stringify((existingAttr as Models.AttributeEnum).elements) ===
          JSON.stringify((schemaAttr as Models.AttributeEnum).elements);
      break;
    case "relationship":
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
    default:
      break;
  }

  return commonEqual && typeSpecificEqual;
};
