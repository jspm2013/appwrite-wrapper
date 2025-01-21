import { Models, IndexType } from "node-appwrite";
import { type CreateRelationshipAttributeParams } from "src/methods/databases";
export { Models, IndexType, type CreateRelationshipAttributeParams };
export type Attribute = Models.AttributeString | Models.AttributeInteger | Models.AttributeFloat | Models.AttributeBoolean | Models.AttributeEmail | Models.AttributeEnum | Models.AttributeUrl | Models.AttributeIp | Models.AttributeDatetime | Models.AttributeRelationship;
export type Index = {
    key: string;
    type: IndexType;
    attributes: string[];
    orders?: ("ASC" | "DESC")[];
};
export type CollectionSchema = {
    permissions: string[];
    documentSecurity: boolean;
    enabled: boolean;
    attributes: Attribute[] | CreateRelationshipAttributeParams[];
    indexes: Index[];
};
export type AttributeHandler = (dbId: string, collId: string, attr: any) => Promise<void>;
//# sourceMappingURL=types.d.ts.map