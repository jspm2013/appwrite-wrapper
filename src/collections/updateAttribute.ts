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

const updateAttributeHandlers: Record<string, AttributeHandler> = {
  boolean: async (
    databaseId,
    collectionId,
    attr: UpdateBooleanAttributeArgs
  ) => {
    await updateBooleanAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      newKey: attr.newKey,
    } as UpdateBooleanAttributeArgs);
  },

  datetime: async (
    databaseId,
    collectionId,
    attr: UpdateDatetimeAttributeArgs
  ) => {
    await updateDatetimeAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      newKey: attr.newKey,
    } as UpdateDatetimeAttributeArgs);
  },

  email: async (databaseId, collectionId, attr: UpdateEmailAttributeArgs) => {
    await updateEmailAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      newKey: attr.newKey,
    } as UpdateEmailAttributeArgs);
  },

  enum: async (databaseId, collectionId, attr: UpdateEnumAttributeArgs) => {
    await updateEnumAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      elements: attr.elements,
      required: attr.required,
      xdefault: attr.xdefault,
      newKey: attr.newKey,
    } as UpdateEnumAttributeArgs);
  },

  float: async (databaseId, collectionId, attr: UpdateFloatAttributeArgs) => {
    await updateFloatAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      min: attr.min,
      max: attr.max,
      xdefault: attr.xdefault,
      newKey: attr.newKey,
    } as UpdateFloatAttributeArgs);
  },

  integer: async (
    databaseId,
    collectionId,
    attr: UpdateIntegerAttributeArgs
  ) => {
    await updateIntegerAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      min: attr.min,
      max: attr.max,
      xdefault: attr.xdefault,
      newKey: attr.newKey,
    } as UpdateIntegerAttributeArgs);
  },

  ip: async (databaseId, collectionId, attr: UpdateIpAttributeArgs) => {
    await updateIpAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      newKey: attr.newKey,
    } as UpdateIpAttributeArgs);
  },

  relationship: async (
    databaseId,
    collectionId,
    attr: UpdateRelationshipAttributeArgs
  ) => {
    await updateRelationshipAttribute({
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
    } as UpdateRelationshipAttributeArgs);
  },

  string: async (databaseId, collectionId, attr: UpdateStringAttributeArgs) => {
    await updateStringAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      size: attr.size,
      newKey: attr.newKey,
    } as UpdateStringAttributeArgs);
  },

  url: async (databaseId, collectionId, attr: UpdateUrlAttributeArgs) => {
    await updateUrlAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      newKey: attr.newKey,
    } as UpdateUrlAttributeArgs);
  },
};

export const updateAttribute = async (
  databaseId: string,
  collectionId: string,
  attr: Attribute
): Promise<void> => {
  const handler = updateAttributeHandlers[attr.type];
  if (!handler) {
    throw new Error(`Unsupported attribute type: '${attr.type}'`);
  }
  await handler(databaseId, collectionId, attr);
};
