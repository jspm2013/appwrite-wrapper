import { Attribute, AttributeHandler } from "./types";
import {
  updateBooleanAttribute,
  updateDatetimeAttribute,
  updateEmailAttribute,
  updateEnumAttribute,
  updateFloatAttribute,
  updateIntegerAttribute,
  updateIpAttribute,
  updateRelationshipAttribute,
  updateStringAttribute,
  updateUrlAttribute,
} from "../methods/databases";

import {
  type UpdateBooleanAttributeArgs,
  type UpdateDatetimeAttributeArgs,
  type UpdateEmailAttributeArgs,
  type UpdateEnumAttributeArgs,
  type UpdateFloatAttributeArgs,
  type UpdateIntegerAttributeArgs,
  type UpdateIpAttributeArgs,
  type UpdateRelationshipAttributeArgs,
  type UpdateStringAttributeArgs,
  type UpdateUrlAttributeArgs,
} from "../methods/databases";

import { RelationMutate } from "../enums";
import { ReturnObject, Models } from "src";

const updateAttributeHandlers: Record<string, AttributeHandler> = {
  boolean: async (
    databaseId,
    collectionId,
    attr: UpdateBooleanAttributeArgs
  ): Promise<ReturnObject<Models.AttributeBoolean>> => {
    return await updateBooleanAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      newKey: attr.newKey,
    });
  },

  datetime: async (
    databaseId,
    collectionId,
    attr: UpdateDatetimeAttributeArgs
  ): Promise<ReturnObject<Models.AttributeDatetime>> => {
    return await updateDatetimeAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      newKey: attr.newKey,
    });
  },

  email: async (
    databaseId,
    collectionId,
    attr: UpdateEmailAttributeArgs
  ): Promise<ReturnObject<Models.AttributeEmail>> => {
    return await updateEmailAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      newKey: attr.newKey,
    });
  },

  enum: async (
    databaseId,
    collectionId,
    attr: UpdateEnumAttributeArgs
  ): Promise<ReturnObject<Models.AttributeEnum>> => {
    return await updateEnumAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      elements: attr.elements,
      required: attr.required,
      xdefault: attr.xdefault,
      newKey: attr.newKey,
    });
  },

  float: async (
    databaseId,
    collectionId,
    attr: UpdateFloatAttributeArgs
  ): Promise<ReturnObject<Models.AttributeFloat>> => {
    return await updateFloatAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      min: attr.min,
      max: attr.max,
      xdefault: attr.xdefault,
      newKey: attr.newKey,
    });
  },

  integer: async (
    databaseId,
    collectionId,
    attr: UpdateIntegerAttributeArgs
  ): Promise<ReturnObject<Models.AttributeInteger>> => {
    return await updateIntegerAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      min: attr.min,
      max: attr.max,
      xdefault: attr.xdefault,
      newKey: attr.newKey,
    });
  },

  ip: async (
    databaseId,
    collectionId,
    attr: UpdateIpAttributeArgs
  ): Promise<ReturnObject<Models.AttributeIp>> => {
    return await updateIpAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      newKey: attr.newKey,
    });
  },

  relationship: async (
    databaseId,
    collectionId,
    attr: UpdateRelationshipAttributeArgs
  ): Promise<ReturnObject<Models.AttributeRelationship>> => {
    return await updateRelationshipAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      onDelete:
        attr.onDelete === "setNull"
          ? RelationMutate.SetNull
          : attr.onDelete === "restrict"
          ? RelationMutate.Restrict
          : attr.onDelete === "cascade"
          ? RelationMutate.Cascade
          : undefined,
      newKey: attr.newKey,
    });
  },

  string: async (
    databaseId,
    collectionId,
    attr: UpdateStringAttributeArgs
  ): Promise<ReturnObject<Models.AttributeString>> => {
    return await updateStringAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      size: attr.size,
      newKey: attr.newKey,
    });
  },

  url: async (
    databaseId,
    collectionId,
    attr: UpdateUrlAttributeArgs
  ): Promise<ReturnObject<Models.AttributeUrl>> => {
    return await updateUrlAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      newKey: attr.newKey,
    });
  },
};

export const updateAttribute = async (
  databaseId: string,
  collectionId: string,
  attr: Attribute
): Promise<ReturnObject<any>> => {
  const handler = updateAttributeHandlers[attr.type];
  if (!handler) {
    throw new Error(`Unsupported attribute type: '${attr.type}'`);
  }

  return await handler(databaseId, collectionId, attr);
};
