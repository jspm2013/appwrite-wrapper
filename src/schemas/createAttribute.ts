import { Attribute, CreateRelationshipAttributeParams } from "./types";
import {
  createBooleanAttribute,
  createDatetimeAttribute,
  createEmailAttribute,
  createEnumAttribute,
  createFloatAttribute,
  createIntegerAttribute,
  createIpAttribute,
  createRelationshipAttribute,
  createStringAttribute,
  createUrlAttribute,
} from "src/methods/databases";
import { Models } from "node-appwrite";

type AttributeHandler = (
  dbId: string,
  collId: string,
  attr: any
) => Promise<void>;

const attributeHandlers: Record<string, AttributeHandler> = {
  string: async (dbId, collId, attr: Models.AttributeString, encrypt = false) =>
    await createStringAttribute({
      databaseId: dbId,
      collectionId: collId,
      key: attr.key,
      size: attr.size,
      required: attr.required,
      xdefault: attr.default,
      xarray: attr.array,
      encrypt: encrypt,
    }),
  integer: async (dbId, collId, attr: Models.AttributeInteger) =>
    await createIntegerAttribute({
      databaseId: dbId,
      collectionId: collId,
      key: attr.key,
      required: attr.required,
      min: attr.min,
      max: attr.max,
      xdefault: attr.default,
      xarray: attr.array,
    }),
  float: async (dbId, collId, attr: Models.AttributeFloat) =>
    await createFloatAttribute({
      databaseId: dbId,
      collectionId: collId,
      key: attr.key,
      required: attr.required,
      min: attr.min,
      max: attr.max,
      xdefault: attr.default,
      xarray: attr.array,
    }),
  boolean: async (dbId, collId, attr: Models.AttributeBoolean) =>
    await createBooleanAttribute({
      databaseId: dbId,
      collectionId: collId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.default,
      xarray: attr.array,
    }),
  email: async (dbId, collId, attr: Models.AttributeEmail) =>
    await createEmailAttribute({
      databaseId: dbId,
      collectionId: collId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.default,
      xarray: attr.array,
    }),
  enum: async (dbId, collId, attr: Models.AttributeEnum) =>
    await createEnumAttribute({
      databaseId: dbId,
      collectionId: collId,
      key: attr.key,
      elements: attr.elements,
      required: attr.required,
      xdefault: attr.default,
      xarray: attr.array,
    }),
  url: async (dbId, collId, attr: Models.AttributeUrl) =>
    await createUrlAttribute({
      databaseId: dbId,
      collectionId: collId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.default,
      xarray: attr.array,
    }),
  ip: async (dbId, collId, attr: Models.AttributeIp) =>
    await createIpAttribute({
      databaseId: dbId,
      collectionId: collId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.default,
      xarray: attr.array,
    }),
  datetime: async (dbId, collId, attr: Models.AttributeDatetime) =>
    await createDatetimeAttribute({
      databaseId: dbId,
      collectionId: collId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.default,
      xarray: attr.array,
    }),
  relationship: async (dbId, collId, attr: CreateRelationshipAttributeParams) =>
    await createRelationshipAttribute({
      databaseId: dbId,
      collectionId: collId,
      relatedCollectionId: attr.relatedCollectionId,
      type: attr.type,
      twoWay: attr.twoWay,
      key: attr.key,
      twoWayKey: attr.twoWayKey,
      onDelete: attr.onDelete,
    }),
};

export const createAttribute = async (
  dbId: string,
  collId: string,
  attr: Attribute | CreateRelationshipAttributeParams
): Promise<void> => {
  const handler = attributeHandlers[attr.type];
  if (!handler) {
    throw new Error(`Unsupported attribute type: ${attr.type}`);
  }
  await handler(dbId, collId, attr);
};
