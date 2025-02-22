"use server";
import { ID, } from "node-appwrite";
import { handleApwError } from "../exceptions";
import { createAdminClient } from "../appwriteClients";
import { databaseId, userCollectionId } from "../appwriteConfig";
const createBooleanAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createBooleanAttribute(dbId, collId, key, required, xdefault, xarray);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createCollection = async ({ dbId = databaseId, collId = userCollectionId, name, permissions, documentSecurity, enabled, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createCollection(dbId, collId, name, permissions, documentSecurity, enabled);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createCollectionWithSchema = async ({ dbId = databaseId, collId, name, permissions, documentSecurity, enabled, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createCollection(dbId, collId ?? ID.unique(), name, permissions, documentSecurity, enabled);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createDatabase = async ({ dbId = databaseId, name, enabled, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.create(dbId, name, enabled);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createDatetimeAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createDatetimeAttribute(dbId, collId, key, required, xdefault, xarray);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createDocument = async ({ dbId = databaseId, collId = userCollectionId, documentId = ID.unique(), data, permissions, }) => {
    try {
        const { databases } = await createAdminClient();
        const document = await databases.createDocument(dbId, collId, documentId, data, permissions);
        return { data: document, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createEmailAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createEmailAttribute(dbId, collId, key, required, xdefault, xarray);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createEnumAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, elements, required, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createEnumAttribute(dbId, collId, key, elements, required, xdefault, xarray);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createFloatAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, required, min, max, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createFloatAttribute(dbId, collId, key, required, min, max, xdefault, xarray);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createIndex = async ({ dbId = databaseId, collId = userCollectionId, key, type, attributes, orders, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createIndex(dbId, collId, key, type, attributes, orders);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createIntegerAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, required, min, max, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createIntegerAttribute(dbId, collId, key, required, min, max, xdefault, xarray);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createIpAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createIpAttribute(dbId, collId, key, required, xdefault, xarray);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createRelationshipAttribute = async ({ dbId = databaseId, collId = userCollectionId, relatedCollectionId, type, twoWay, key, twoWayKey, onDelete, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createRelationshipAttribute(dbId, collId, relatedCollectionId, type, twoWay, key, twoWayKey, onDelete);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createStringAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, size, required, xdefault, xarray, encrypt, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createStringAttribute(dbId, collId, key, size, required, xdefault, xarray, encrypt);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createUrlAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createUrlAttribute(dbId, collId, key, required, xdefault, xarray);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const deleteAttribute = async ({ dbId, collId, key, }) => {
    try {
        const { databases } = await createAdminClient();
        await databases.deleteAttribute(dbId, collId, key);
        return { data: undefined, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const deleteCollection = async ({ dbId, collId, }) => {
    try {
        const { databases } = await createAdminClient();
        await databases.deleteCollection(dbId, collId);
        return { data: undefined, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const deleteDatabase = async ({ dbId, }) => {
    try {
        const { databases } = await createAdminClient();
        await databases.delete(dbId);
        return { data: undefined, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const deleteDocument = async ({ dbId = databaseId, collId = userCollectionId, documentId, }) => {
    try {
        const { databases } = await createAdminClient();
        await databases.deleteDocument(dbId, collId, documentId);
        return { data: undefined, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const deleteIndex = async ({ dbId, collId, key, }) => {
    try {
        const { databases } = await createAdminClient();
        await databases.deleteIndex(dbId, collId, key);
        return { data: undefined, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const getAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.getAttribute(dbId, collId, key);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const getCollection = async ({ dbId = databaseId, collId = userCollectionId, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.getCollection(dbId, collId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const getDatabase = async ({ dbId = databaseId, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.get(dbId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const getDocument = async ({ dbId = databaseId, collId = userCollectionId, documentId, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.getDocument(dbId, collId, documentId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const getIndex = async ({ dbId = databaseId, collId = userCollectionId, key, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.getIndex(dbId, collId, key);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const listAttributes = async ({ dbId = databaseId, collId = userCollectionId, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.listAttributes(dbId, collId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const listCollections = async ({ dbId = databaseId, queries = [], search, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.listCollections(dbId, queries, search);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const listDatabases = async ({ queries = [], search, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.list(queries, search);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const listDocuments = async ({ dbId = databaseId, collId = userCollectionId, queries = [], }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.listDocuments(dbId, collId, queries);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const listIndexes = async ({ dbId = databaseId, collId = userCollectionId, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.listIndexes(dbId, collId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateBooleanAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateBooleanAttribute(dbId, collId, key, required, xdefault, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateCollection = async ({ dbId, collId, name, permissions, documentSecurity, enabled, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateCollection(dbId, collId, name, permissions, documentSecurity, enabled);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateDatabase = async ({ dbId, name, enabled, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.update(dbId, name, enabled);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateDatetimeAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateDatetimeAttribute(dbId, collId, key, required, xdefault, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateDocument = async ({ dbId = databaseId, collId = userCollectionId, documentId, data, permissions, }) => {
    try {
        const { databases } = await createAdminClient();
        const updatedData = await databases.updateDocument(dbId, collId, documentId, data, permissions);
        return { data: updatedData, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateEmailAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateEmailAttribute(dbId, collId, key, required, xdefault, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateEnumAttribute = async ({ dbId, collId, key, elements, required, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateEnumAttribute(dbId, collId, key, elements, required, xdefault, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateFloatAttribute = async ({ dbId, collId, key, required, min, max, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateFloatAttribute(dbId, collId, key, required, min, max, xdefault, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateIntegerAttribute = async ({ dbId, collId, key, required, min, max, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateIntegerAttribute(dbId, collId, key, required, min, max, xdefault, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateIpAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateIpAttribute(dbId, collId, key, required, xdefault, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateRelationshipAttribute = async ({ dbId, collId, key, onDelete, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateRelationshipAttribute(dbId, collId, key, onDelete, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateStringAttribute = async ({ dbId, collId, key, required, xdefault, size, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateStringAttribute(dbId, collId, key, required, xdefault, size, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateUrlAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateUrlAttribute(dbId, collId, key, required, xdefault, newKey);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
export { createBooleanAttribute, createCollection, createCollectionWithSchema, createDatabase, createDatetimeAttribute, createDocument, createEmailAttribute, createEnumAttribute, createFloatAttribute, createIndex, createIntegerAttribute, createIpAttribute, createRelationshipAttribute, createStringAttribute, createUrlAttribute, deleteAttribute, deleteCollection, deleteDatabase, deleteDocument, deleteIndex, getAttribute, getCollection, getDatabase, getDocument, getIndex, listAttributes, listCollections, listDatabases, listDocuments, listIndexes, updateBooleanAttribute, updateCollection, updateDatabase, updateDatetimeAttribute, updateDocument, updateEmailAttribute, updateEnumAttribute, updateFloatAttribute, updateIntegerAttribute, updateIpAttribute, updateRelationshipAttribute, updateStringAttribute, updateUrlAttribute, };
