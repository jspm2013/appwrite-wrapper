import { Models, IndexType } from "node-appwrite";
import { ReturnObject } from "src";

/*
 *
 *
 * COLLECTION / DOCUMENT / ATTRIBUTES - LOGIC & TYPES
 *
 *
 */
export { Models, IndexType };

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

export type CollectionSchema = {
  tsFileName: string;
  tsFileFormat: string;
  collectionName: string;
  permissions: string[];
  documentSecurity: boolean;
  enabled: boolean;
  attributes: Attribute[];
  indexes: Index[];
};

export type AttributeHandler = (
  databaseId: string,
  collectionId: string,
  attr: any,
  relatedCollectionId?: string
) => Promise<ReturnObject<any>>;
