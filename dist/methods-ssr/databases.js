"use server";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUrlAttribute = exports.updateStringAttribute = exports.updateRelationshipAttribute = exports.updateIpAttribute = exports.updateIntegerAttribute = exports.updateFloatAttribute = exports.updateEnumAttribute = exports.updateEmailAttribute = exports.updateDocument = exports.updateDatetimeAttribute = exports.updateDatabase = exports.updateCollection = exports.updateBooleanAttribute = exports.listIndexes = exports.listDocuments = exports.listDatabases = exports.listCollections = exports.listAttributes = exports.getIndex = exports.getDocument = exports.getDatabase = exports.getCollection = exports.getAttribute = exports.deleteIndex = exports.deleteDocument = exports.deleteDatabase = exports.deleteCollection = exports.deleteAttribute = exports.createUrlAttribute = exports.createStringAttribute = exports.createRelationshipAttribute = exports.createIpAttribute = exports.createIntegerAttribute = exports.createIndex = exports.createFloatAttribute = exports.createEnumAttribute = exports.createEmailAttribute = exports.createDocument = exports.createDatetimeAttribute = exports.createDatabase = exports.createCollectionWithSchema = exports.createCollection = exports.createBooleanAttribute = void 0;
const node_appwrite_1 = require("node-appwrite");
const exceptions_1 = require("../exceptions");
const appwriteClients_1 = require("../appwriteClients");
const appwriteConfig_1 = require("../appwriteConfig");
const createBooleanAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.createBooleanAttribute(dbId, collId, key, required, xdefault, xarray);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createBooleanAttribute = createBooleanAttribute;
const createCollection = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, name, permissions, documentSecurity, enabled, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.createCollection(dbId, collId, name, permissions, documentSecurity, enabled);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createCollection = createCollection;
const createCollectionWithSchema = async ({ dbId = appwriteConfig_1.databaseId, collId, name, permissions, documentSecurity, enabled, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.createCollection(dbId, collId ?? node_appwrite_1.ID.unique(), name, permissions, documentSecurity, enabled);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createCollectionWithSchema = createCollectionWithSchema;
const createDatabase = async ({ dbId = appwriteConfig_1.databaseId, name, enabled, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.create(dbId, name, enabled);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createDatabase = createDatabase;
const createDatetimeAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.createDatetimeAttribute(dbId, collId, key, required, xdefault, xarray);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createDatetimeAttribute = createDatetimeAttribute;
const createDocument = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, documentId = node_appwrite_1.ID.unique(), data, permissions, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const document = await databases.createDocument(dbId, collId, documentId, data, permissions);
        return { data: document, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createDocument = createDocument;
const createEmailAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.createEmailAttribute(dbId, collId, key, required, xdefault, xarray);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createEmailAttribute = createEmailAttribute;
const createEnumAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, elements, required, xdefault, xarray, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.createEnumAttribute(dbId, collId, key, elements, required, xdefault, xarray);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createEnumAttribute = createEnumAttribute;
const createFloatAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, required, min, max, xdefault, xarray, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.createFloatAttribute(dbId, collId, key, required, min, max, xdefault, xarray);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createFloatAttribute = createFloatAttribute;
const createIndex = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, type, attributes, orders, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.createIndex(dbId, collId, key, type, attributes, orders);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createIndex = createIndex;
const createIntegerAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, required, min, max, xdefault, xarray, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.createIntegerAttribute(dbId, collId, key, required, min, max, xdefault, xarray);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createIntegerAttribute = createIntegerAttribute;
const createIpAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.createIpAttribute(dbId, collId, key, required, xdefault, xarray);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createIpAttribute = createIpAttribute;
const createRelationshipAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, relatedCollectionId, type, twoWay, key, twoWayKey, onDelete, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.createRelationshipAttribute(dbId, collId, relatedCollectionId, type, twoWay, key, twoWayKey, onDelete);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createRelationshipAttribute = createRelationshipAttribute;
const createStringAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, size, required, xdefault, xarray, encrypt, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.createStringAttribute(dbId, collId, key, size, required, xdefault, xarray, encrypt);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createStringAttribute = createStringAttribute;
const createUrlAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.createUrlAttribute(dbId, collId, key, required, xdefault, xarray);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createUrlAttribute = createUrlAttribute;
const deleteAttribute = async ({ dbId, collId, key, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        await databases.deleteAttribute(dbId, collId, key);
        return { data: undefined, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.deleteAttribute = deleteAttribute;
const deleteCollection = async ({ dbId, collId, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        await databases.deleteCollection(dbId, collId);
        return { data: undefined, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.deleteCollection = deleteCollection;
const deleteDatabase = async ({ dbId, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        await databases.delete(dbId);
        return { data: undefined, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.deleteDatabase = deleteDatabase;
const deleteDocument = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, documentId, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        await databases.deleteDocument(dbId, collId, documentId);
        return { data: undefined, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.deleteDocument = deleteDocument;
const deleteIndex = async ({ dbId, collId, key, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        await databases.deleteIndex(dbId, collId, key);
        return { data: undefined, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.deleteIndex = deleteIndex;
const getAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.getAttribute(dbId, collId, key);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.getAttribute = getAttribute;
const getCollection = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.getCollection(dbId, collId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.getCollection = getCollection;
const getDatabase = async ({ dbId = appwriteConfig_1.databaseId, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.get(dbId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.getDatabase = getDatabase;
const getDocument = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, documentId, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.getDocument(dbId, collId, documentId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.getDocument = getDocument;
const getIndex = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.getIndex(dbId, collId, key);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.getIndex = getIndex;
const listAttributes = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.listAttributes(dbId, collId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.listAttributes = listAttributes;
const listCollections = async ({ dbId = appwriteConfig_1.databaseId, queries = [], search, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.listCollections(dbId, queries, search);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.listCollections = listCollections;
const listDatabases = async ({ queries = [], search, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.list(queries, search);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.listDatabases = listDatabases;
const listDocuments = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, queries = [], }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.listDocuments(dbId, collId, queries);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.listDocuments = listDocuments;
const listIndexes = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.listIndexes(dbId, collId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.listIndexes = listIndexes;
const updateBooleanAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.updateBooleanAttribute(dbId, collId, key, required, xdefault, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateBooleanAttribute = updateBooleanAttribute;
const updateCollection = async ({ dbId, collId, name, permissions, documentSecurity, enabled, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.updateCollection(dbId, collId, name, permissions, documentSecurity, enabled);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateCollection = updateCollection;
const updateDatabase = async ({ dbId, name, enabled, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.update(dbId, name, enabled);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateDatabase = updateDatabase;
const updateDatetimeAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.updateDatetimeAttribute(dbId, collId, key, required, xdefault, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateDatetimeAttribute = updateDatetimeAttribute;
const updateDocument = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, documentId, data, permissions, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const updatedData = await databases.updateDocument(dbId, collId, documentId, data, permissions);
        return { data: updatedData, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateDocument = updateDocument;
const updateEmailAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.updateEmailAttribute(dbId, collId, key, required, xdefault, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateEmailAttribute = updateEmailAttribute;
const updateEnumAttribute = async ({ dbId, collId, key, elements, required, xdefault, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.updateEnumAttribute(dbId, collId, key, elements, required, xdefault, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateEnumAttribute = updateEnumAttribute;
const updateFloatAttribute = async ({ dbId, collId, key, required, min, max, xdefault, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.updateFloatAttribute(dbId, collId, key, required, min, max, xdefault, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateFloatAttribute = updateFloatAttribute;
const updateIntegerAttribute = async ({ dbId, collId, key, required, min, max, xdefault, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.updateIntegerAttribute(dbId, collId, key, required, min, max, xdefault, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateIntegerAttribute = updateIntegerAttribute;
const updateIpAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.updateIpAttribute(dbId, collId, key, required, xdefault, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateIpAttribute = updateIpAttribute;
const updateRelationshipAttribute = async ({ dbId, collId, key, onDelete, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.updateRelationshipAttribute(dbId, collId, key, onDelete, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateRelationshipAttribute = updateRelationshipAttribute;
const updateStringAttribute = async ({ dbId, collId, key, required, xdefault, size, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.updateStringAttribute(dbId, collId, key, required, xdefault, size, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateStringAttribute = updateStringAttribute;
const updateUrlAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const data = await databases.updateUrlAttribute(dbId, collId, key, required, xdefault, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateUrlAttribute = updateUrlAttribute;
