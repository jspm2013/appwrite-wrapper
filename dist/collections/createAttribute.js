import { createBooleanAttribute, createDatetimeAttribute, createEmailAttribute, createEnumAttribute, createFloatAttribute, createIntegerAttribute, createIpAttribute, createRelationshipAttribute, createStringAttribute, createUrlAttribute, } from "../methods/databases";
import { RelationshipType, RelationMutate } from "../enums";
const createAttributeHandlers = {
    boolean: async (databaseId, collectionId, attr) => {
        await createBooleanAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            required: attr.required,
            xdefault: attr.xdefault,
            array: attr.array,
        });
    },
    datetime: async (databaseId, collectionId, attr) => {
        await createDatetimeAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            required: attr.required,
            xdefault: attr.xdefault,
            array: attr.array,
        });
    },
    email: async (databaseId, collectionId, attr) => {
        await createEmailAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            required: attr.required,
            xdefault: attr.xdefault,
            array: attr.array,
        });
    },
    enum: async (databaseId, collectionId, attr) => {
        await createEnumAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            elements: attr.elements,
            required: attr.required,
            xdefault: attr.xdefault,
            array: attr.array,
        });
    },
    float: async (databaseId, collectionId, attr) => {
        await createFloatAttribute({
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
    integer: async (databaseId, collectionId, attr) => {
        await createIntegerAttribute({
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
    ip: async (databaseId, collectionId, attr) => {
        await createIpAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            required: attr.required,
            xdefault: attr.xdefault,
            array: attr.array,
        });
    },
    relationship: async (databaseId, collectionId, attr) => {
        await createRelationshipAttribute({
            databaseId,
            collectionId,
            relatedCollectionId: attr.relatedCollectionId,
            type: attr.type === "oneToOne"
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
            onDelete: attr.onDelete === "setNull"
                ? RelationMutate.SetNull
                : attr.onDelete === "restrict"
                    ? RelationMutate.Restrict
                    : attr.onDelete === "cascade"
                        ? RelationMutate.Cascade
                        : undefined,
        });
    },
    string: async (databaseId, collectionId, attr) => {
        await createStringAttribute({
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
    url: async (databaseId, collectionId, attr) => {
        await createUrlAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            required: attr.required,
            xdefault: attr.xdefault,
            array: attr.array,
        });
    },
};
export const createAttribute = async (databaseId, collectionId, attr) => {
    const handler = createAttributeHandlers[attr.type];
    if (!handler) {
        throw new Error(`Unsupported attribute type: '${attr.type}'`);
    }
    await handler(databaseId, collectionId, attr);
};
