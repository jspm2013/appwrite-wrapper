import { createBooleanAttribute, createDatetimeAttribute, createEmailAttribute, createEnumAttribute, createFloatAttribute, createIntegerAttribute, createIpAttribute, createRelationshipAttribute, createStringAttribute, createUrlAttribute, } from "../methods/databases";
import { RelationshipType, RelationMutate } from "../enums";
// --- UPDATE: use ReturnObject<T> as return type for each handler ---
const createAttributeHandlers = {
    boolean: async (databaseId, collectionId, attr) => {
        return await createBooleanAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            required: attr.required,
            xdefault: "xdefault" in attr ? attr.xdefault : undefined,
            array: attr.array,
        });
    },
    datetime: async (databaseId, collectionId, attr) => {
        return await createDatetimeAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            required: attr.required,
            xdefault: "xdefault" in attr ? attr.xdefault : undefined,
            array: attr.array,
        });
    },
    email: async (databaseId, collectionId, attr) => {
        return await createEmailAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            required: attr.required,
            xdefault: "xdefault" in attr ? attr.xdefault : undefined,
            array: attr.array,
        });
    },
    enum: async (databaseId, collectionId, attr) => {
        return await createEnumAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            elements: attr.elements,
            required: attr.required,
            xdefault: "xdefault" in attr ? attr.xdefault : undefined,
            array: attr.array,
        });
    },
    float: async (databaseId, collectionId, attr) => {
        return await createFloatAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            required: attr.required,
            min: attr.min,
            max: attr.max,
            xdefault: "xdefault" in attr ? attr.xdefault : undefined,
            array: attr.array,
        });
    },
    integer: async (databaseId, collectionId, attr) => {
        return await createIntegerAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            required: attr.required,
            min: attr.min,
            max: attr.max,
            xdefault: "xdefault" in attr ? attr.xdefault : undefined,
            array: attr.array,
        });
    },
    ip: async (databaseId, collectionId, attr) => {
        return await createIpAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            required: attr.required,
            xdefault: "xdefault" in attr ? attr.xdefault : undefined,
            array: attr.array,
        });
    },
    relationship: async (databaseId, collectionId, attr, relatedCollectionId) => {
        return await createRelationshipAttribute({
            databaseId,
            collectionId,
            relatedCollectionId: relatedCollectionId,
            type: attr.relationType === "oneToOne"
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
        return await createStringAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            size: attr.size,
            required: attr.required,
            xdefault: "xdefault" in attr ? attr.xdefault : undefined,
            array: attr.array,
            encrypt: attr.encrypt,
        });
    },
    url: async (databaseId, collectionId, attr) => {
        return await createUrlAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            required: attr.required,
            xdefault: "xdefault" in attr ? attr.xdefault : undefined,
            array: attr.array,
        });
    },
};
export const createAttribute = async (databaseId, collectionId, attr, relatedCollectionId) => {
    const handler = createAttributeHandlers[attr.type];
    if (!handler) {
        throw new Error(`Unsupported attribute type: '${attr.type}'`);
    }
    // Validate that xdefault is not defined if required is set to true
    const hasRequiredTrue = "required" in attr && attr.required === true;
    const hasXdefault = attr.type !== "relationship" && "xdefault" in attr;
    if (hasRequiredTrue && hasXdefault) {
        throw new Error(`Cannot create attribute '${attr.key}' with both 'required: true' and 'xdefault' set. Appwrite forbids this combination.`);
    }
    return await handler(databaseId, collectionId, attr, relatedCollectionId);
};
