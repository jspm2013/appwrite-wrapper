import { Models, IndexType } from "node-appwrite";

/*
 *
 *
 * COLLECTION / DOCUMENT / ATTRIBUTES - LOGIC & TYPES
 *
 *
 */
export { type CreateRelationshipAttributeParams } from "src/methods/databases";

export type Attribute =
  | Models.AttributeString
  | Models.AttributeInteger
  | Models.AttributeFloat
  | Models.AttributeBoolean
  | Models.AttributeEmail
  | Models.AttributeEnum
  | Models.AttributeUrl
  | Models.AttributeIp
  | Models.AttributeDatetime
  | Models.AttributeRelationship;

export type Index = {
  key: string;
  type: IndexType;
  attributes: string[];
  orders?: ("ASC" | "DESC")[];
};
