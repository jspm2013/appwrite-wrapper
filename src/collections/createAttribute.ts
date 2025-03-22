import { Attribute, AttributeHandler } from "./types";
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

const createAttributeHandlers: Record<string, AttributeHandler> = {
  boolean: async (
    databaseId,
    collectionId,
    attr: CreateBooleanAttributeArgs
  ) => {
    await createBooleanAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      array: attr.array,
    } as CreateBooleanAttributeArgs);
  },

  datetime: async (
    databaseId,
    collectionId,
    attr: CreateDatetimeAttributeArgs
  ) => {
    await createDatetimeAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      array: attr.array,
    } as CreateDatetimeAttributeArgs);
  },

  email: async (databaseId, collectionId, attr: CreateEmailAttributeArgs) => {
    await createEmailAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      array: attr.array,
    } as CreateEmailAttributeArgs);
  },

  enum: async (databaseId, collectionId, attr: CreateEnumAttributeArgs) => {
    await createEnumAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      elements: attr.elements,
      required: attr.required,
      xdefault: attr.xdefault,
      array: attr.array,
    } as CreateEnumAttributeArgs);
  },

  float: async (databaseId, collectionId, attr: CreateFloatAttributeArgs) => {
    await createFloatAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      min: attr.min,
      max: attr.max,
      xdefault: attr.xdefault,
      array: attr.array,
    } as CreateFloatAttributeArgs);
  },

  integer: async (
    databaseId,
    collectionId,
    attr: CreateIntegerAttributeArgs
  ) => {
    await createIntegerAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      min: attr.min,
      max: attr.max,
      xdefault: attr.xdefault,
      array: attr.array,
    } as CreateIntegerAttributeArgs);
  },

  ip: async (databaseId, collectionId, attr: CreateIpAttributeArgs) => {
    await createIpAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      array: attr.array,
    } as CreateIpAttributeArgs);
  },

  relationship: async (
    databaseId,
    collectionId,
    attr: CreateRelationshipAttributeArgs
  ) => {
    await createRelationshipAttribute({
      databaseId,
      collectionId,
      relatedCollectionId: attr.relatedCollectionId,
      type:
        attr.type === "oneToOne"
          ? RelationshipType.OneToOne
          : attr.type === "oneToMany"
          ? RelationshipType.OneToMany
          : attr.type === "manyToOne"
          ? RelationshipType.ManyToOne
          : attr.type === "manyToMany"
          ? RelationshipType.ManyToMany
          : undefined,
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
    } as CreateRelationshipAttributeArgs);
  },

  string: async (databaseId, collectionId, attr: CreateStringAttributeArgs) => {
    await createStringAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      size: attr.size,
      required: attr.required,
      xdefault: attr.xdefault,
      array: attr.array,
      encrypt: attr.encrypt,
    } as CreateStringAttributeArgs);
  },

  url: async (databaseId, collectionId, attr: CreateUrlAttributeArgs) => {
    await createUrlAttribute({
      databaseId,
      collectionId,
      key: attr.key,
      required: attr.required,
      xdefault: attr.xdefault,
      array: attr.array,
    } as CreateUrlAttributeArgs);
  },
};

export const createAttribute = async (
  databaseId: string,
  collectionId: string,
  attr: Attribute
): Promise<void> => {
  const handler = createAttributeHandlers[attr.type];
  if (!handler) {
    throw new Error(`Unsupported attribute type: '${attr.type}'`);
  }
  await handler(databaseId, collectionId, attr);
};
