"use server";
import { ID, } from "node-appwrite";
import { live } from "../host";
import { createAdminClient } from "../appwriteClients";
import { databaseId, userCollectionId } from "../appwriteConfig";
const admin = !live;
const errMsg = (fn) => admin ? `ApwWrapper Error (methods/databases): ${fn}()` : "Database Error";
const createBooleanAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createBooleanAttribute(dbId, collId, key, required, xdefault, xarray);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("createBooleanAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const createCollection = async ({ dbId = databaseId, collId = userCollectionId, name, permissions, documentSecurity, enabled, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createCollection(dbId, collId, name, permissions, documentSecurity, enabled);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("createCollection"),
                description: JSON.stringify(err),
            },
        };
    }
};
const createCollectionWithSchema = async ({ dbId = databaseId, collId, name, permissions, documentSecurity, enabled, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createCollection(dbId, collId ?? ID.unique(), name, permissions, documentSecurity, enabled);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("createCollectionWithSchema"),
                description: JSON.stringify(err),
            },
        };
    }
};
const createDatabase = async ({ dbId = databaseId, name, enabled, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.create(dbId, name, enabled);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("createDatabase"),
                description: JSON.stringify(err),
            },
        };
    }
};
const createDatetimeAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createDatetimeAttribute(dbId, collId, key, required, xdefault, xarray);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("createDatetimeAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const createDocument = async ({ dbId = databaseId, collId = userCollectionId, documentId = ID.unique(), data, permissions, }) => {
    try {
        const { databases } = await createAdminClient();
        const document = await databases.createDocument(dbId, collId, documentId, data, permissions);
        return { data: document, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("createDocument"),
                description: JSON.stringify(err),
            },
        };
    }
};
const createEmailAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createEmailAttribute(dbId, collId, key, required, xdefault, xarray);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("createEmailAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const createEnumAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, elements, required, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createEnumAttribute(dbId, collId, key, elements, required, xdefault, xarray);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("createEnumAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const createFloatAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, required, min, max, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createFloatAttribute(dbId, collId, key, required, min, max, xdefault, xarray);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("createFloatAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const createIndex = async ({ dbId = databaseId, collId = userCollectionId, key, type, attributes, orders, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createIndex(dbId, collId, key, type, attributes, orders);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("createIndex"),
                description: JSON.stringify(err),
            },
        };
    }
};
const createIntegerAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, required, min, max, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createIntegerAttribute(dbId, collId, key, required, min, max, xdefault, xarray);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("createIntegerAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const createIpAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createIpAttribute(dbId, collId, key, required, xdefault, xarray);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("createIpAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const createRelationshipAttribute = async ({ dbId = databaseId, collId = userCollectionId, relatedCollectionId, type, twoWay, key, twoWayKey, onDelete, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createRelationshipAttribute(dbId, collId, relatedCollectionId, type, twoWay, key, twoWayKey, onDelete);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("createRelationshipAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const createStringAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, size, required, xdefault, xarray, encrypt, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createStringAttribute(dbId, collId, key, size, required, xdefault, xarray, encrypt);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("createStringAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const createUrlAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.createUrlAttribute(dbId, collId, key, required, xdefault, xarray);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("createUrlAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const deleteAttribute = async ({ dbId, collId, key, }) => {
    try {
        const { databases } = await createAdminClient();
        await databases.deleteAttribute(dbId, collId, key);
        return { data: undefined, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("deleteAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const deleteCollection = async ({ dbId, collId, }) => {
    try {
        const { databases } = await createAdminClient();
        await databases.deleteCollection(dbId, collId);
        return { data: undefined, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("deleteCollection"),
                description: JSON.stringify(err),
            },
        };
    }
};
const deleteDatabase = async ({ dbId, }) => {
    try {
        const { databases } = await createAdminClient();
        await databases.delete(dbId);
        return { data: undefined, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("deleteDatabase"),
                description: JSON.stringify(err),
            },
        };
    }
};
const deleteDocument = async ({ dbId = databaseId, collId = userCollectionId, documentId, }) => {
    try {
        const { databases } = await createAdminClient();
        await databases.deleteDocument(dbId, collId, documentId);
        return { data: undefined, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("deleteDocument"),
                description: JSON.stringify(err),
            },
        };
    }
};
const deleteIndex = async ({ dbId, collId, key, }) => {
    try {
        const { databases } = await createAdminClient();
        await databases.deleteIndex(dbId, collId, key);
        return { data: undefined, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("deleteIndex"),
                description: JSON.stringify(err),
            },
        };
    }
};
const getAttribute = async ({ dbId = databaseId, collId = userCollectionId, key, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.getAttribute(dbId, collId, key);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const getCollection = async ({ dbId = databaseId, collId = userCollectionId, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.getCollection(dbId, collId);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getCollection"),
                description: JSON.stringify(err),
            },
        };
    }
};
const getDatabase = async ({ dbId = databaseId, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.get(dbId);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getDatabase"),
                description: JSON.stringify(err),
            },
        };
    }
};
const getDocument = async ({ dbId = databaseId, collId = userCollectionId, documentId, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.getDocument(dbId, collId, documentId);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getDocument"),
                description: JSON.stringify(err),
            },
        };
    }
};
const getIndex = async ({ dbId = databaseId, collId = userCollectionId, key, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.getIndex(dbId, collId, key);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getIndex"),
                description: JSON.stringify(err),
            },
        };
    }
};
const listAttributes = async ({ dbId = databaseId, collId = userCollectionId, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.listAttributes(dbId, collId);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("listAttributes"),
                description: JSON.stringify(err),
            },
        };
    }
};
const listCollections = async ({ dbId = databaseId, queries = [], search, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.listCollections(dbId, queries, search);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("listCollections"),
                description: JSON.stringify(err),
            },
        };
    }
};
const listDatabases = async ({ queries = [], search, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.list(queries, search);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("listDatabases"),
                description: JSON.stringify(err),
            },
        };
    }
};
const listDocuments = async ({ dbId = databaseId, collId = userCollectionId, queries = [], }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.listDocuments(dbId, collId, queries);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("listDocuments"),
                description: JSON.stringify(err),
            },
        };
    }
};
const listIndexes = async ({ dbId = databaseId, collId = userCollectionId, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.listIndexes(dbId, collId);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("listIndexes"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateBooleanAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateBooleanAttribute(dbId, collId, key, required, xdefault, newKey);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateBooleanAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateCollection = async ({ dbId, collId, name, permissions, documentSecurity, enabled, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateCollection(dbId, collId, name, permissions, documentSecurity, enabled);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateCollection"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateDatabase = async ({ dbId, name, enabled, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.update(dbId, name, enabled);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateDatabase"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateDatetimeAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateDatetimeAttribute(dbId, collId, key, required, xdefault, newKey);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateDatetimeAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateDocument = async ({ dbId = databaseId, collId = userCollectionId, documentId, data, permissions, }) => {
    try {
        const { databases } = await createAdminClient();
        const updatedData = await databases.updateDocument(dbId, collId, documentId, data, permissions);
        return { data: updatedData, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateDocument"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateEmailAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateEmailAttribute(dbId, collId, key, required, xdefault, newKey);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateEmailAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateEnumAttribute = async ({ dbId, collId, key, elements, required, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateEnumAttribute(dbId, collId, key, elements, required, xdefault, newKey);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateEnumAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateFloatAttribute = async ({ dbId, collId, key, required, min, max, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateFloatAttribute(dbId, collId, key, required, min, max, xdefault, newKey);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateFloatAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateIntegerAttribute = async ({ dbId, collId, key, required, min, max, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateIntegerAttribute(dbId, collId, key, required, min, max, xdefault, newKey);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateIntegerAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateIpAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateIpAttribute(dbId, collId, key, required, xdefault, newKey);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateIpAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateRelationshipAttribute = async ({ dbId, collId, key, onDelete, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateRelationshipAttribute(dbId, collId, key, onDelete, newKey);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateRelationshipAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateStringAttribute = async ({ dbId, collId, key, required, xdefault, size, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateStringAttribute(dbId, collId, key, required, xdefault, size, newKey);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateStringAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateUrlAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const data = await databases.updateUrlAttribute(dbId, collId, key, required, xdefault, newKey);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateUrlAttribute"),
                description: JSON.stringify(err),
            },
        };
    }
};
export { createBooleanAttribute, createCollection, createCollectionWithSchema, createDatabase, createDatetimeAttribute, createDocument, createEmailAttribute, createEnumAttribute, createFloatAttribute, createIndex, createIntegerAttribute, createIpAttribute, createRelationshipAttribute, createStringAttribute, createUrlAttribute, deleteAttribute, deleteCollection, deleteDatabase, deleteDocument, deleteIndex, getAttribute, getCollection, getDatabase, getDocument, getIndex, listAttributes, listCollections, listDatabases, listDocuments, listIndexes, updateBooleanAttribute, updateCollection, updateDatabase, updateDatetimeAttribute, updateDocument, updateEmailAttribute, updateEnumAttribute, updateFloatAttribute, updateIntegerAttribute, updateIpAttribute, updateRelationshipAttribute, updateStringAttribute, updateUrlAttribute, };
