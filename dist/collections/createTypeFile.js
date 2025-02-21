"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeFile = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
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
const createTypeFile = async (schema, schemaFilePath) => {
    const { name, attributes } = schema;
    const typeName = `${name.charAt(0).toUpperCase() + name.slice(1)}Type`;
    // Ensure every generated type extends `Models.Document`
    const fields = attributes
        .map((attr) => {
        const type = mapAttributeToType(attr);
        const isOptional = !attr.required ? "?" : "";
        return `  ${attr.key}${isOptional}: ${type};`;
    })
        .join("\n");
    const typeDefinition = `import { Models } from "node-appwrite";\n\nexport interface ${typeName} extends Models.Document {\n${fields}\n}\n\nexport interface AppUserType extends Models.User<Models.Preferences> {\ncustomUser: UserType;\n}`;
    // Write the type definition to a file in the same folder as the schema
    const typeFilePath = path_1.default.join(path_1.default.dirname(schemaFilePath), `${name}.ts`);
    await promises_1.default.writeFile(typeFilePath, typeDefinition, "utf-8");
    console.log(`Type definition for schema '${name}' created at ${typeFilePath}`);
};
exports.createTypeFile = createTypeFile;
