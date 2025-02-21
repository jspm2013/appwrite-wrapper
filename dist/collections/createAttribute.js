"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAttribute = void 0;
const index_1 = require("../index");
const attributeHandlers = {
    string: async (dbId, collId, attr, encrypt = false) => await (0, index_1.createStringAttribute)({
        dbId,
        collId,
        key: attr.key,
        size: attr.size,
        required: attr.required,
        xdefault: attr.default,
        xarray: attr.array,
        encrypt: encrypt,
    }),
    integer: async (dbId, collId, attr) => await (0, index_1.createIntegerAttribute)({
        dbId,
        collId,
        key: attr.key,
        required: attr.required,
        min: attr.min,
        max: attr.max,
        xdefault: attr.default,
        xarray: attr.array,
    }),
    float: async (dbId, collId, attr) => await (0, index_1.createFloatAttribute)({
        dbId,
        collId,
        key: attr.key,
        required: attr.required,
        min: attr.min,
        max: attr.max,
        xdefault: attr.default,
        xarray: attr.array,
    }),
    boolean: async (dbId, collId, attr) => await (0, index_1.createBooleanAttribute)({
        dbId,
        collId,
        key: attr.key,
        required: attr.required,
        xdefault: attr.default,
        xarray: attr.array,
    }),
    email: async (dbId, collId, attr) => await (0, index_1.createEmailAttribute)({
        dbId,
        collId,
        key: attr.key,
        required: attr.required,
        xdefault: attr.default,
        xarray: attr.array,
    }),
    enum: async (dbId, collId, attr) => await (0, index_1.createEnumAttribute)({
        dbId,
        collId,
        key: attr.key,
        elements: attr.elements,
        required: attr.required,
        xdefault: attr.default,
        xarray: attr.array,
    }),
    url: async (dbId, collId, attr) => await (0, index_1.createUrlAttribute)({
        dbId,
        collId,
        key: attr.key,
        required: attr.required,
        xdefault: attr.default,
        xarray: attr.array,
    }),
    ip: async (dbId, collId, attr) => await (0, index_1.createIpAttribute)({
        dbId,
        collId,
        key: attr.key,
        required: attr.required,
        xdefault: attr.default,
        xarray: attr.array,
    }),
    datetime: async (dbId, collId, attr) => await (0, index_1.createDatetimeAttribute)({
        dbId,
        collId,
        key: attr.key,
        required: attr.required,
        xdefault: attr.default,
        xarray: attr.array,
    }),
    relationship: async (dbId, collId, attr) => await (0, index_1.createRelationshipAttribute)({
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
const createAttribute = async (dbId, collId, attr) => {
    const handler = attributeHandlers[attr.type];
    if (!handler) {
        throw new Error(`Unsupported attribute type: ${attr.type}`);
    }
    await handler(dbId, collId, attr);
};
exports.createAttribute = createAttribute;
