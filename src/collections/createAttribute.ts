import {
  Attribute,
  AttributeHandler,
  CreateRelationshipAttributeParams,
  Models,
} from "./types";
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
} from "../index";

const attributeHandlers: Record<string, AttributeHandler> = {
  string: async (dbId, collId, attr: Models.AttributeString, encrypt = false) =>
    await createStringAttribute({
      dbId,
      collId,
      key: attr.key,
      size: attr.size,
      required: attr.required,
      xdefault: attr.default,
      xarray: attr.array,
      encrypt: encrypt,
    }),
  integer: async (dbId, collId, attr: Models.AttributeInteger) =>
    await createIntegerAttribute({
      dbId,
      collId,
      key: attr.key,
      required: attr.required,
      min: attr.min,
      max: attr.max,
      xdefault: attr.default,
      xarray: attr.array,
    }),
  float: async (dbId, collId, attr: Models.AttributeFloat) =>
    await createFloatAttribute({
      dbId,
      collId,
      key: attr.key,
      required: attr.required,
      min: attr.min,
      max: attr.max,
      xdefault: attr.default,
      xarray: attr.array,
    }),
  boolean: async (dbId, collId, attr: Models.AttributeBoolean) =>
    await createBooleanAttribute({
      dbId,
      collId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.default,
      xarray: attr.array,
    }),
  email: async (dbId, collId, attr: Models.AttributeEmail) =>
    await createEmailAttribute({
      dbId,
      collId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.default,
      xarray: attr.array,
    }),
  enum: async (dbId, collId, attr: Models.AttributeEnum) =>
    await createEnumAttribute({
      dbId,
      collId,
      key: attr.key,
      elements: attr.elements,
      required: attr.required,
      xdefault: attr.default,
      xarray: attr.array,
    }),
  url: async (dbId, collId, attr: Models.AttributeUrl) =>
    await createUrlAttribute({
      dbId,
      collId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.default,
      xarray: attr.array,
    }),
  ip: async (dbId, collId, attr: Models.AttributeIp) =>
    await createIpAttribute({
      dbId,
      collId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.default,
      xarray: attr.array,
    }),
  datetime: async (dbId, collId, attr: Models.AttributeDatetime) =>
    await createDatetimeAttribute({
      dbId,
      collId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.default,
      xarray: attr.array,
    }),
  relationship: async (dbId, collId, attr: CreateRelationshipAttributeParams) =>
    await createRelationshipAttribute({
      dbId,
      collId,
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
