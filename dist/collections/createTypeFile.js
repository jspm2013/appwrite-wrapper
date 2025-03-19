import fs from "fs/promises";
import path from "path";
// Map Appwrite attribute types to TypeScript types
const mapAttributeToType = (attribute) => {
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
                ? attribute.elements.map((el) => `"${el}"`).join(" | ")
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
export const createTypeFile = async (schema, schemaFilePath) => {
    const { tsFileName, attributes, tsFileFormat } = schema;
    if (!tsFileFormat) {
        throw new Error(`Schema for '${tsFileName}' is missing 'tsFileFormat' key.`);
    }
    const typeName = `${tsFileName.charAt(0).toUpperCase() + tsFileName.slice(1)}Type`;
    // Ensure every generated type extends `Models.Document`
    const fields = attributes.map((attr) => {
        const type = mapAttributeToType(attr);
        const isOptional = !attr.required ? "?" : "";
        return `  ${attr.key}${isOptional}: ${type};`;
    });
    fields.unshift(`  $id: string;`);
    const formattedFields = fields.join("\n");
    // Replace placeholders in tsFileFormat
    const typeDefinition = tsFileFormat
        .replaceAll(/\$\{fields\}/g, formattedFields) // Replace fields placeholder
        .replaceAll(/\$\{typeName\}/g, typeName); // Replace typeName placeholder
    // Define TypeScript file path
    const typeFilePath = path.join(path.dirname(schemaFilePath), `${tsFileName}.ts`);
    // Write the type definition to a file in the same folder as the schema
    await fs.writeFile(typeFilePath, typeDefinition, "utf-8");
};
