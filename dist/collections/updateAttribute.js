import { updateBooleanAttribute, updateDatetimeAttribute, updateEmailAttribute, updateEnumAttribute, updateFloatAttribute, updateIntegerAttribute, updateIpAttribute, updateRelationshipAttribute, updateStringAttribute, updateUrlAttribute, } from "../methods/databases";
import { RelationMutate } from "../enums";
const updateAttributeHandlers = {
    boolean: async (databaseId, collectionId, attr) => {
        return await updateBooleanAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            required: attr.required,
            xdefault: attr.xdefault,
            newKey: attr.newKey,
        });
    },
    datetime: async (databaseId, collectionId, attr) => {
        return await updateDatetimeAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            required: attr.required,
            xdefault: attr.xdefault,
            newKey: attr.newKey,
        });
    },
    email: async (databaseId, collectionId, attr) => {
        return await updateEmailAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            required: attr.required,
            xdefault: attr.xdefault,
            newKey: attr.newKey,
        });
    },
    enum: async (databaseId, collectionId, attr) => {
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
    float: async (databaseId, collectionId, attr) => {
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
    integer: async (databaseId, collectionId, attr) => {
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
    ip: async (databaseId, collectionId, attr) => {
        return await updateIpAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            required: attr.required,
            xdefault: attr.xdefault,
            newKey: attr.newKey,
        });
    },
    relationship: async (databaseId, collectionId, attr) => {
        return await updateRelationshipAttribute({
            databaseId,
            collectionId,
            key: attr.key,
            onDelete: attr.onDelete === "setNull"
                ? RelationMutate.SetNull
                : attr.onDelete === "restrict"
                    ? RelationMutate.Restrict
                    : attr.onDelete === "cascade"
                        ? RelationMutate.Cascade
                        : undefined,
            newKey: attr.newKey,
        });
    },
    string: async (databaseId, collectionId, attr) => {
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
    url: async (databaseId, collectionId, attr) => {
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
export const updateAttribute = async (databaseId, collectionId, attr) => {
    const handler = updateAttributeHandlers[attr.type];
    if (!handler) {
        throw new Error(`Unsupported attribute type: '${attr.type}'`);
    }
    // ⚠️ Check for xdefault + required conflict
    const hasRequired = "required" in attr && attr.required !== undefined && attr.required === true;
    const hasXdefault = attr.type !== "relationship" &&
        "xdefault" in attr &&
        attr.xdefault !== undefined;
    if (hasRequired && hasXdefault) {
        throw new Error(`Cannot update attribute '${attr.key}' because both 'xdefault' and 'required' are set. Appwrite forbids this combination.`);
    }
    return await handler(databaseId, collectionId, attr);
};
