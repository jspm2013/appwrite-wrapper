import { Attribute, AttributeHandler } from "./types";
import {
  createBooleanAttribute,
  CreateBooleanAttributeAwaited,
  createDatetimeAttribute,
  createEmailAttribute,
  createEnumAttribute,
  createFloatAttribute,
  createIntegerAttribute,
  createIpAttribute,
  createRelationshipAttribute,
  createStringAttribute,
  createUrlAttribute,
} from "../methods/databases";

import {
  type CreateBooleanAttributeArgs,
  type CreateDatetimeAttributeArgs,
  type CreateEmailAttributeArgs,
  type CreateEnumAttributeArgs,
  type CreateFloatAttributeArgs,
  type CreateIntegerAttributeArgs,
  type CreateIpAttributeArgs,
  type CreateRelationshipAttributeArgs,
  type CreateStringAttributeArgs,
  type CreateUrlAttributeArgs,
} from "../methods/databases";

import { RelationshipType, RelationMutate } from "../enums";
import { ReturnObject, Models } from "src";

// --- UPDATE: use ReturnObject<T> as return type for each handler ---
const createAttributeHandlers: Record<string, AttributeHandler> = {
  boolean: async (
    databaseId,
    collectionId,
    attr: CreateBooleanAttributeArgs
  ): Promise<ReturnObject<Models.AttributeBoolean>> => {
    return await createBooleanAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      array: attr.array,
    });
  },

  datetime: async (
    databaseId,
    collectionId,
    attr: CreateDatetimeAttributeArgs
  ): Promise<ReturnObject<Models.AttributeDatetime>> => {
    return await createDatetimeAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      array: attr.array,
    });
  },

  email: async (
    databaseId,
    collectionId,
    attr: CreateEmailAttributeArgs
  ): Promise<ReturnObject<Models.AttributeEmail>> => {
    return await createEmailAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      array: attr.array,
    });
  },

  enum: async (
    databaseId,
    collectionId,
    attr: CreateEnumAttributeArgs
  ): Promise<ReturnObject<Models.AttributeEnum>> => {
    return await createEnumAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      elements: attr.elements,
      required: attr.required,
      xdefault: attr.xdefault,
      array: attr.array,
    });
  },

  float: async (
    databaseId,
    collectionId,
    attr: CreateFloatAttributeArgs
  ): Promise<ReturnObject<Models.AttributeFloat>> => {
    return await createFloatAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      min: attr.min,
      max: attr.max,
      xdefault: attr.xdefault,
      array: attr.array,
    });
  },

  integer: async (
    databaseId,
    collectionId,
    attr: CreateIntegerAttributeArgs
  ): Promise<ReturnObject<Models.AttributeInteger>> => {
    return await createIntegerAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      min: attr.min,
      max: attr.max,
      xdefault: attr.xdefault,
      array: attr.array,
    });
  },

  ip: async (
    databaseId,
    collectionId,
    attr: CreateIpAttributeArgs
  ): Promise<ReturnObject<Models.AttributeIp>> => {
    return await createIpAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      array: attr.array,
    });
  },

  relationship: async (
    databaseId,
    collectionId,
    attr: CreateRelationshipAttributeArgs
  ): Promise<ReturnObject<Models.AttributeRelationship>> => {
    return await createRelationshipAttribute({
      databaseId,
      collectionId,
      relatedCollectionId: attr.relatedCollectionId,
      type:
        attr.relationType === "oneToOne"
          ? RelationshipType.OneToOne
          : attr.relationType === "oneToMany"
          ? RelationshipType.OneToMany
          : attr.relationType === "manyToOne"
          ? RelationshipType.ManyToOne
          : attr.relationType === "manyToMany"
          ? RelationshipType.ManyToMany
          : RelationshipType.OneToOne,
      twoWay: attr.twoWay,
      key: attr.key,
      twoWayKey: attr.twoWayKey,
      onDelete:
        attr.onDelete === "setNull"
          ? RelationMutate.SetNull
          : attr.onDelete === "restrict"
          ? RelationMutate.Restrict
          : attr.onDelete === "cascade"
          ? RelationMutate.Cascade
          : undefined,
    });
  },

  string: async (
    databaseId,
    collectionId,
    attr: CreateStringAttributeArgs
  ): Promise<ReturnObject<Models.AttributeString>> => {
    return await createStringAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      size: attr.size,
      required: attr.required,
      xdefault: attr.xdefault,
      array: attr.array,
      encrypt: attr.encrypt,
    });
  },

  url: async (
    databaseId,
    collectionId,
    attr: CreateUrlAttributeArgs
  ): Promise<ReturnObject<Models.AttributeUrl>> => {
    return await createUrlAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      array: attr.array,
    });
  },
};

// --- Main function ---
export const createAttribute = async (
  databaseId: string,
  collectionId: string,
  attr: Attribute
): Promise<ReturnObject<any>> => {
  const handler = createAttributeHandlers[attr.type];
  if (!handler) {
    throw new Error(`Unsupported attribute type: '${attr.type}'`);
  }

  return await handler(databaseId, collectionId, attr);
};
