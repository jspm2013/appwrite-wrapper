"use server";
import { ID } from "node-appwrite";
import { createAttribute, getSchema } from "../collections";
import { createAdminClient } from "../appwriteClients";
/**
 * List all databases in the Appwrite project.
 * @param params - Parameters for listing the databases.
 * @returns The list of databases.
 */
const listDatabases = async ({ queries = [], search = undefined, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.list(queries, search);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing listDatabases():", err);
        throw err;
    }
};
/**
 * Create a new database in the Appwrite project.
 * @param params - Parameters for creating the database.
 * @returns The created database details.
 */
const createDatabase = async ({ dbId, name, enabled, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.create(dbId, name, enabled);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createDatabase():", err);
        throw err;
    }
};
/**
 * Get details of a specific database by its ID.
 * @param params - Parameters for getting the database.
 * @returns The database details.
 */
const getDatabase = async ({ dbId, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.get(dbId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing getDatabase():", err);
        throw err;
    }
};
/**
 * Update details of a database by its ID.
 * @param params - Parameters for updating the database.
 * @returns The updated database details.
 */
const updateDatabase = async ({ dbId, name, enabled, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.update(dbId, name, enabled);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateDatabase():", err);
        throw err;
    }
};
/**
 * Delete a database by its ID.
 * @param params - Parameters for deleting the database.
 * @returns Confirmation of deletion.
 */
const deleteDatabase = async ({ dbId, }) => {
    try {
        const { databases } = await createAdminClient();
        await databases.delete(dbId);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing deleteDatabase():", err);
        throw err;
    }
};
/**
 * List all collections in a specific database.
 * @param params - Parameters for listing the collections.
 * @returns The list of collections.
 */
const listCollections = async ({ dbId, queries = [], search, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.listCollections(dbId, queries, search);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing listCollections():", err);
        throw err;
    }
};
/**
 * Create a new collection in a specific database.
 * @param params - Parameters for creating the collection.
 * @returns The created collection details.
 */
const createCollection = async ({ dbId, collId, name, permissions, documentSecurity, enabled, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.createCollection(dbId, collId, name, permissions, documentSecurity, enabled);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createCollection():", err);
        throw err;
    }
};
/**
 * Create a new collection according to a specific schema in a specific database.
 * @param params - Parameters for creating the collection.
 * @returns The created collection details.
 */
const createCollectionWithSchema = async ({ dbId, collId, name, permissions, documentSecurity, enabled, nameAsId, }) => {
    try {
        const { databases } = await createAdminClient();
        const collList = await databases.listCollections(dbId);
        let coll = collList.collections.find((collection) => collection.name === name);
        if (!coll) {
            const schema = await getSchema(name);
            const collectionId = collId ?? (nameAsId ? name : ID.unique());
            coll = await databases.createCollection(dbId, collectionId, name, permissions ?? schema.permissions, documentSecurity ?? schema.documentSecurity, enabled ?? schema.enabled);
            for (const attr of schema.attributes) {
                await createAttribute(dbId, collectionId, attr);
            }
            for (const index of schema.indexes) {
                await databases.createIndex(dbId, collectionId, index.key, index.type, index.attributes, index.orders);
            }
        }
        return coll;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createCollectionWithSchema():", err);
        throw err;
    }
};
/**
 * Get details of a specific collection by its ID.
 * @param params - Parameters for getting the collection.
 * @returns The collection details.
 */
const getCollection = async ({ dbId, collId, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.getCollection(dbId, collId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing getCollection():", err);
        throw err;
    }
};
/**
 * Update details of a collection by its ID.
 * @param params - Parameters for updating the collection.
 * @returns The updated collection details.
 */
const updateCollection = async ({ dbId, collId, name, permissions, documentSecurity, enabled, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.updateCollection(dbId, collId, name, permissions, documentSecurity, enabled);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateCollection():", err);
        throw err;
    }
};
/**
 * Delete a collection by its ID.
 * @param params - Parameters for deleting the collection.
 * @returns Confirmation of deletion.
 */
const deleteCollection = async ({ dbId, collId, }) => {
    try {
        const { databases } = await createAdminClient();
        await databases.deleteCollection(dbId, collId);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing deleteCollection():", err);
        throw err;
    }
};
/**
 * List all documents in a specific collection.
 * @param params - Parameters for listing the documents.
 * @returns The list of documents.
 */
const listDocuments = async ({ dbId, collId, queries = [], }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.listDocuments(dbId, collId, queries);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing listDocuments():", err);
        throw err;
    }
};
/**
 * Create a new document in a specific collection.
 * @param params - Parameters for creating the document.
 * @returns The created document details.
 */
const createDocument = async ({ dbId, collId, documentId = ID.unique(), data, permissions, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.createDocument(dbId, collId, documentId, data, permissions);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createDocument():", err);
        throw err;
    }
};
/**
 * Get a document by its ID from a specific collection.
 * @param params - Parameters for getting the document.
 * @returns The document details.
 */
const getDocument = async ({ dbId, collId, documentId, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.getDocument(dbId, collId, documentId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing getDocument():", err);
        throw err;
    }
};
/**
 * Update a document by its ID in a specific collection.
 * @param params - Parameters for updating the document.
 * @returns The updated document details.
 */
const updateDocument = async ({ dbId, collId, documentId, data, permissions, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.updateDocument(dbId, collId, documentId, data, permissions);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateDocument():", err);
        throw err;
    }
};
/**
 * Delete a document by its ID from a specific collection.
 * @param params - Parameters for deleting the document.
 * @returns Confirmation of deletion.
 */
const deleteDocument = async ({ dbId, collId, documentId, }) => {
    try {
        const { databases } = await createAdminClient();
        await databases.deleteDocument(dbId, collId, documentId);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing deleteDocument():", err);
        throw err;
    }
};
/**
 * List all indexes in a specific collection.
 * @param params - Parameters for listing the indexes.
 * @returns The list of indexes.
 */
const listIndexes = async ({ dbId, collId, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.listIndexes(dbId, collId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing listIndexes():", err);
        throw err;
    }
};
/**
 * Create a new index in a specific collection.
 * @param params - Parameters for creating the index.
 * @returns The created index details.
 */
const createIndex = async ({ dbId, collId, key, type, attributes, orders, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.createIndex(dbId, collId, key, type, attributes, orders);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createIndex():", err);
        throw err;
    }
};
/**
 * Get an index by its key from a specific collection.
 * @param params - Parameters for getting the index.
 * @returns The index details.
 */
const getIndex = async ({ dbId, collId, key, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.getIndex(dbId, collId, key);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing getIndex():", err);
        throw err;
    }
};
/**
 * Delete an index by its key from a specific collection.
 * @param params - Parameters for deleting the index.
 * @returns Confirmation of deletion.
 */
const deleteIndex = async ({ dbId, collId, key, }) => {
    try {
        const { databases } = await createAdminClient();
        await databases.deleteIndex(dbId, collId, key);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing deleteIndex():", err);
        throw err;
    }
};
/**
 * List all attributes in a specific collection.
 * @param params - Parameters for listing the attributes.
 * @returns The list of attributes.
 */
const listAttributes = async ({ databaseId, collectionId, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.listAttributes(databaseId, collectionId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing listAttributes():", err);
        throw err;
    }
};
/**
 * Create a boolean attribute in a collection.
 * @param params - Parameters for creating the boolean attribute.
 * @returns The created attribute details.
 */
const createBooleanAttribute = async ({ databaseId, collectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.createBooleanAttribute(databaseId, collectionId, key, required, xdefault, xarray);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createBooleanAttribute():", err);
        throw err;
    }
};
/**
 * Update a boolean attribute in a collection.
 * @param params - Parameters for updating the boolean attribute.
 * @returns The updated attribute details.
 */
const updateBooleanAttribute = async ({ databaseId, collectionId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.updateBooleanAttribute(databaseId, collectionId, key, required, xdefault, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateBooleanAttribute():", err);
        throw err;
    }
};
/**
 * Create a datetime attribute in a collection.
 * @param params - Parameters for creating the datetime attribute.
 * @returns The created attribute details.
 */
const createDatetimeAttribute = async ({ databaseId, collectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.createDatetimeAttribute(databaseId, collectionId, key, required, xdefault, xarray);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createDatetimeAttribute():", err);
        throw err;
    }
};
/**
 * Update a datetime attribute in a collection.
 * @param params - Parameters for updating the datetime attribute.
 * @returns The updated attribute details.
 */
const updateDatetimeAttribute = async ({ databaseId, collectionId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.updateDatetimeAttribute(databaseId, collectionId, key, required, xdefault, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateDatetimeAttribute():", err);
        throw err;
    }
};
/**
 * Create an email attribute in a collection.
 * @param params - Parameters for creating the email attribute.
 * @returns The created attribute details.
 */
const createEmailAttribute = async ({ databaseId, collectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.createEmailAttribute(databaseId, collectionId, key, required, xdefault, xarray);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createEmailAttribute():", err);
        throw err;
    }
};
/**
 * Update an email attribute in a collection.
 * @param params - Parameters for updating the email attribute.
 * @returns The updated attribute details.
 */
const updateEmailAttribute = async ({ databaseId, collectionId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.updateEmailAttribute(databaseId, collectionId, key, required, xdefault, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateEmailAttribute():", err);
        throw err;
    }
};
/**
 * Create an enum attribute in a collection.
 * @param params - Parameters for creating the enum attribute.
 * @returns The created attribute details.
 */
const createEnumAttribute = async ({ databaseId, collectionId, key, elements, required, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.createEnumAttribute(databaseId, collectionId, key, elements, required, xdefault, xarray);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createEnumAttribute():", err);
        throw err;
    }
};
/**
 * Update an enum attribute in a collection.
 * @param params - Parameters for updating the enum attribute.
 * @returns The updated attribute details.
 */
const updateEnumAttribute = async ({ databaseId, collectionId, key, elements, required, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.updateEnumAttribute(databaseId, collectionId, key, elements, required, xdefault, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateEnumAttribute():", err);
        throw err;
    }
};
/**
 * Create a float attribute in a collection.
 * @param params - Parameters for creating the float attribute.
 * @returns The created attribute details.
 */
const createFloatAttribute = async ({ databaseId, collectionId, key, required, min, max, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.createFloatAttribute(databaseId, collectionId, key, required, min, max, xdefault, xarray);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createFloatAttribute():", err);
        throw err;
    }
};
/**
 * Update a float attribute in a collection.
 * @param params - Parameters for updating the float attribute.
 * @returns The updated attribute details.
 */
const updateFloatAttribute = async ({ databaseId, collectionId, key, required, min, max, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.updateFloatAttribute(databaseId, collectionId, key, required, min, max, xdefault, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateFloatAttribute():", err);
        throw err;
    }
};
/**
 * Create an integer attribute in a collection.
 * @param params - Parameters for creating the integer attribute.
 * @returns The created attribute details.
 */
const createIntegerAttribute = async ({ databaseId, collectionId, key, required, min, max, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.createIntegerAttribute(databaseId, collectionId, key, required, min, max, xdefault, xarray);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createIntegerAttribute():", err);
        throw err;
    }
};
/**
 * Update an integer attribute in a collection.
 * @param params - Parameters for updating the integer attribute.
 * @returns The updated attribute details.
 */
const updateIntegerAttribute = async ({ databaseId, collectionId, key, required, min, max, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.updateIntegerAttribute(databaseId, collectionId, key, required, min, max, xdefault, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateIntegerAttribute():", err);
        throw err;
    }
};
/**
 * Create an IP address attribute in a collection.
 * @param params - Parameters for creating the IP address attribute.
 * @returns The created attribute details.
 */
const createIpAttribute = async ({ databaseId, collectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.createIpAttribute(databaseId, collectionId, key, required, xdefault, xarray);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createIpAttribute():", err);
        throw err;
    }
};
/**
 * Update an IP address attribute in a collection.
 * @param params - Parameters for updating the IP address attribute.
 * @returns The updated attribute details.
 */
const updateIpAttribute = async ({ databaseId, collectionId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.updateIpAttribute(databaseId, collectionId, key, required, xdefault, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateIpAttribute():", err);
        throw err;
    }
};
/**
 * Create a string attribute in a collection.
 * @param params - Parameters for creating the string attribute.
 * @returns The created attribute details.
 */
const createStringAttribute = async ({ databaseId, collectionId, key, size, required, xdefault, xarray, encrypt, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.createStringAttribute(databaseId, collectionId, key, size, required, xdefault, xarray, encrypt);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createStringAttribute():", err);
        throw err;
    }
};
/**
 * Update a string attribute in a collection.
 * @param params - Parameters for updating the string attribute.
 * @returns The updated attribute details.
 */
const updateStringAttribute = async ({ databaseId, collectionId, key, required, xdefault, size, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.updateStringAttribute(databaseId, collectionId, key, required, xdefault, size, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateStringAttribute():", err);
        throw err;
    }
};
/**
 * Create a URL attribute in a collection.
 * @param params - Parameters for creating the URL attribute.
 * @returns The created attribute details.
 */
const createUrlAttribute = async ({ databaseId, collectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.createUrlAttribute(databaseId, collectionId, key, required, xdefault, xarray);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createUrlAttribute():", err);
        throw err;
    }
};
/**
 * Update a URL attribute in a collection.
 * @param params - Parameters for updating the URL attribute.
 * @returns The updated attribute details.
 */
const updateUrlAttribute = async ({ databaseId, collectionId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.updateUrlAttribute(databaseId, collectionId, key, required, xdefault, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateUrlAttribute():", err);
        throw err;
    }
};
/**
 * Get an attribute by its key from a collection.
 * @param params - Parameters for getting the attribute.
 * @returns The attribute details.
 */
const getAttribute = async ({ databaseId, collectionId, key, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.getAttribute(databaseId, collectionId, key);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing getAttribute():", err);
        throw err;
    }
};
/**
 * Delete an attribute by its key from a collection.
 * @param params - Parameters for deleting the attribute.
 * @returns Confirmation of deletion.
 */
const deleteAttribute = async ({ databaseId, collectionId, key, }) => {
    try {
        const { databases } = await createAdminClient();
        await databases.deleteAttribute(databaseId, collectionId, key);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing deleteAttribute():", err);
        throw err;
    }
};
/**
 * Create a relationship attribute in a collection.
 * @param params - Parameters for creating the relationship attribute.
 * @returns The created attribute details.
 */
const createRelationshipAttribute = async ({ databaseId, collectionId, relatedCollectionId, type, twoWay, key, twoWayKey, onDelete, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.createRelationshipAttribute(databaseId, collectionId, relatedCollectionId, type, twoWay, key, twoWayKey, onDelete);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createRelationshipAttribute():", err);
        throw err;
    }
};
/**
 * Update a relationship attribute in a collection.
 * @param params - Parameters for updating the relationship attribute.
 * @returns The updated attribute details.
 */
const updateRelationshipAttribute = async ({ databaseId, collectionId, key, onDelete, newKey, }) => {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.updateRelationshipAttribute(databaseId, collectionId, key, onDelete, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateRelationshipAttribute():", err);
        throw err;
    }
};
/**
 * Export all created functions.
 */
export { createBooleanAttribute, createCollection, createCollectionWithSchema, createDatabase, createDatetimeAttribute, createDocument, createEmailAttribute, createEnumAttribute, createFloatAttribute, createIndex, createIntegerAttribute, createIpAttribute, createRelationshipAttribute, createStringAttribute, createUrlAttribute, deleteAttribute, deleteCollection, deleteDatabase, deleteDocument, deleteIndex, getAttribute, getCollection, getDatabase, getDocument, getIndex, listAttributes, listCollections, listDatabases, listDocuments, listIndexes, updateBooleanAttribute, updateCollection, updateDatabase, updateDatetimeAttribute, updateDocument, updateEmailAttribute, updateEnumAttribute, updateFloatAttribute, updateIntegerAttribute, updateIpAttribute, updateRelationshipAttribute, updateStringAttribute, updateUrlAttribute, };
