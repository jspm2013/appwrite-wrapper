import { LogType } from "../ssr-utils";
import { CollectionSchema } from "./types";
export declare const getSchema: (schema: string, log?: LogType) => Promise<CollectionSchema | LogType | null>;
export declare const isCollectionSchema: (obj: any) => obj is CollectionSchema;
/**
 * Transforms a native Appwrite collection object by removing the keys
 * "$createdAt", "$updatedAt", "error", and "status" from each item in its
 * "attributes" and "indexes" arrays. Then writes the resulting schema object
 * to a JSON file for documentation purposes.
 *
 * The generated file is saved in the schemas folder with the name:
 *    <collectionName>_deprecated_<timestamp>.json
 *
 * @param collectionObj The native Appwrite collection object.
 */
export declare const schemaToFile: (collectionObj: any) => Promise<void>;
//# sourceMappingURL=getSchema.d.ts.map