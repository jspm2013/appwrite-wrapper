import { Attribute, Index, CreateRelationshipAttributeParams } from "./types";
interface CollectionSchema {
    permissions: string[];
    documentSecurity: boolean;
    enabled: boolean;
    attributes: Attribute[] | CreateRelationshipAttributeParams[];
    indexes: Index[];
}
export declare const getSchema: (schema: string) => Promise<CollectionSchema>;
export {};
//# sourceMappingURL=getSchema.d.ts.map