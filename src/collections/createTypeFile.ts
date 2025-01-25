import fs from "fs/promises";
import path from "path";
import { CollectionSchema } from "./types";

// Map Appwrite attribute types to TypeScript types
const mapAttributeToType = (attribute: any): string => {
  switch (attribute.type) {
    case "string":
      return attribute.array ? "string[]" : "string";
    case "integer":
      return attribute.array ? "number[]" : "number";
    case "float":
      return attribute.array ? "number[]" : "number";
    case "boolean":
      return attribute.array ? "boolean[]" : "boolean";
    case "email":
      return attribute.array ? "string[]" : "string";
    case "enum":
      return attribute.elements
        ? attribute.elements.map((el: string) => `"${el}"`).join(" | ")
        : "string";
    case "url":
      return attribute.array ? "string[]" : "string";
    case "ip":
      return attribute.array ? "string[]" : "string";
    case "datetime":
      return attribute.array ? "string[]" : "string"; // ISO 8601 datetime strings
    case "relationship":
      return "string"; // Relationships typically return an ID reference
    default:
      return "any"; // Fallback for unsupported types
  }
};

export const createTypeFile = async (
  schema: CollectionSchema,
  schemaFilePath: string
) => {
  const { name, attributes } = schema;

  const typeName = `${name.charAt(0).toUpperCase() + name.slice(1)}Collection`;

  const fields = attributes
    .map((attr) => {
      const type = mapAttributeToType(attr);
      const isOptional = !attr.required ? "?" : "";
      return `  ${attr.key}${isOptional}: ${type};`;
    })
    .join("\n");

  const typeDefinition = `export interface ${typeName} {\n${fields}\n}`;

  // Write the type definition to a file in the same folder as the schema
  const typeFilePath = path.join(path.dirname(schemaFilePath), `${name}.ts`);
  await fs.writeFile(typeFilePath, typeDefinition, "utf-8");
  console.log(
    `Type definition for schema '${name}' created at ${typeFilePath}`
  );
};
