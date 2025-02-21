"use server";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUrlAttribute = exports.updateStringAttribute = exports.updateRelationshipAttribute = exports.updateIpAttribute = exports.updateIntegerAttribute = exports.updateFloatAttribute = exports.updateEnumAttribute = exports.updateEmailAttribute = exports.updateDocument = exports.updateDatetimeAttribute = exports.updateDatabase = exports.updateCollection = exports.updateBooleanAttribute = exports.listIndexes = exports.listDocuments = exports.listDatabases = exports.listCollections = exports.listAttributes = exports.getIndex = exports.getDocument = exports.getDatabase = exports.getCollection = exports.getAttribute = exports.deleteIndex = exports.deleteDocument = exports.deleteDatabase = exports.deleteCollection = exports.deleteAttribute = exports.createUrlAttribute = exports.createStringAttribute = exports.createRelationshipAttribute = exports.createIpAttribute = exports.createIntegerAttribute = exports.createIndex = exports.createFloatAttribute = exports.createEnumAttribute = exports.createEmailAttribute = exports.createDocument = exports.createDatetimeAttribute = exports.createDatabase = exports.createCollectionWithSchema = exports.createCollection = exports.createBooleanAttribute = void 0;
const node_appwrite_1 = require("node-appwrite");
const collections_1 = require("../collections");
const appwriteClients_1 = require("../appwriteClients");
const appwriteConfig_1 = require("../appwriteConfig");
/**
 * List all databases in the Appwrite project.
 * @param params - Parameters for listing the databases.
 * @returns The list of databases.
 */
const listDatabases = async ({ queries = [], search = undefined, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.list(queries, search);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing listDatabases():", err);
        throw err;
    }
};
exports.listDatabases = listDatabases;
/**
 * Create a new database in the Appwrite project.
 * @param params - Parameters for creating the database.
 * @returns The created database details.
 */
const createDatabase = async ({ dbId = appwriteConfig_1.databaseId, name, enabled, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.create(dbId, name, enabled);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createDatabase():", err);
        throw err;
    }
};
exports.createDatabase = createDatabase;
/**
 * Get details of a specific database by its ID.
 * @param params - Parameters for getting the database.
 * @returns The database details.
 */
const getDatabase = async ({ dbId = appwriteConfig_1.databaseId, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.get(dbId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing getDatabase():", err);
        throw err;
    }
};
exports.getDatabase = getDatabase;
/**
 * Update details of a database by its ID.
 * @param params - Parameters for updating the database.
 * @returns The updated database details.
 */
const updateDatabase = async ({ dbId, name, enabled, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.update(dbId, name, enabled);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateDatabase():", err);
        throw err;
    }
};
exports.updateDatabase = updateDatabase;
/**
 * Delete a database by its ID.
 * @param params - Parameters for deleting the database.
 * @returns Confirmation of deletion.
 */
const deleteDatabase = async ({ dbId, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        await databases.delete(dbId);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing deleteDatabase():", err);
        throw err;
    }
};
exports.deleteDatabase = deleteDatabase;
/**
 * List all collections in a specific database.
 * @param params - Parameters for listing the collections.
 * @returns The list of collections.
 */
const listCollections = async ({ dbId = appwriteConfig_1.databaseId, queries = [], search, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.listCollections(dbId, queries, search);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing listCollections():", err);
        throw err;
    }
};
exports.listCollections = listCollections;
/**
 * Create a new collection in a specific database.
 * @param params - Parameters for creating the collection.
 * @returns The created collection details.
 */
const createCollection = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, name, permissions, documentSecurity, enabled, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.createCollection(dbId, collId, name, permissions, documentSecurity, enabled);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createCollection():", err);
        throw err;
    }
};
exports.createCollection = createCollection;
/**
 * Create a new collection according to a specific schema in a specific database.
 * @param params - Parameters for creating the collection.
 * @returns The created collection details.
 */
const createCollectionWithSchema = async ({ dbId = appwriteConfig_1.databaseId, collId, name, permissions, documentSecurity, enabled, nameAsId, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const collList = await databases.listCollections(dbId);
        let coll = collList.collections.find((collection) => collection.name === name);
        if (!coll) {
            const schema = await (0, collections_1.getSchema)(name);
            const collectionId = collId ?? (nameAsId ? name : node_appwrite_1.ID.unique());
            coll = await databases.createCollection(dbId, collectionId, name, permissions ?? schema.permissions, documentSecurity ?? schema.documentSecurity, enabled ?? schema.enabled);
            for (const attr of schema.attributes) {
                await (0, collections_1.createAttribute)(dbId, collectionId, attr);
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
exports.createCollectionWithSchema = createCollectionWithSchema;
/**
 * Get details of a specific collection by its ID.
 * @param params - Parameters for getting the collection.
 * @returns The collection details.
 */
const getCollection = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.getCollection(dbId, collId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing getCollection():", err);
        throw err;
    }
};
exports.getCollection = getCollection;
/**
 * Update details of a collection by its ID.
 * @param params - Parameters for updating the collection.
 * @returns The updated collection details.
 */
const updateCollection = async ({ dbId, collId, name, permissions, documentSecurity, enabled, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.updateCollection(dbId, collId, name, permissions, documentSecurity, enabled);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateCollection():", err);
        throw err;
    }
};
exports.updateCollection = updateCollection;
/**
 * Delete a collection by its ID.
 * @param params - Parameters for deleting the collection.
 * @returns Confirmation of deletion.
 */
const deleteCollection = async ({ dbId, collId, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        await databases.deleteCollection(dbId, collId);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing deleteCollection():", err);
        throw err;
    }
};
exports.deleteCollection = deleteCollection;
/**
 * List all documents in a specific collection.
 * @param params - Parameters for listing the documents.
 * @returns The list of documents.
 */
const listDocuments = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, queries = [], }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.listDocuments(dbId, collId, queries);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing listDocuments():", err);
        throw err;
    }
};
exports.listDocuments = listDocuments;
/**
 * Create a new document in a specific collection.
 * @param params - Parameters for creating the document.
 * @returns The created document details.
 */
const createDocument = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, documentId = node_appwrite_1.ID.unique(), data, permissions, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.createDocument(dbId, collId, documentId, data, permissions);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createDocument():", err);
        throw err;
    }
};
exports.createDocument = createDocument;
/**
 * Get a document by its ID from a specific collection.
 * @param params - Parameters for getting the document.
 * @returns The document details.
 */
const getDocument = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, documentId, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.getDocument(dbId, collId, documentId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing getDocument():", err);
        throw err;
    }
};
exports.getDocument = getDocument;
/**
 * Update a document by its ID in a specific collection.
 * @param params - Parameters for updating the document.
 * @returns The updated document details.
 */
const updateDocument = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, documentId, data, permissions, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.updateDocument(dbId, collId, documentId, data, permissions);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateDocument():", err);
        throw err;
    }
};
exports.updateDocument = updateDocument;
/**
 * Delete a document by its ID from a specific collection.
 * @param params - Parameters for deleting the document.
 * @returns Confirmation of deletion.
 */
const deleteDocument = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, documentId, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        await databases.deleteDocument(dbId, collId, documentId);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing deleteDocument():", err);
        throw err;
    }
};
exports.deleteDocument = deleteDocument;
/**
 * List all indexes in a specific collection.
 * @param params - Parameters for listing the indexes.
 * @returns The list of indexes.
 */
const listIndexes = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.listIndexes(dbId, collId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing listIndexes():", err);
        throw err;
    }
};
exports.listIndexes = listIndexes;
/**
 * Create a new index in a specific collection.
 * @param params - Parameters for creating the index.
 * @returns The created index details.
 */
const createIndex = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, type, attributes, orders, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.createIndex(dbId, collId, key, type, attributes, orders);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createIndex():", err);
        throw err;
    }
};
exports.createIndex = createIndex;
/**
 * Get an index by its key from a specific collection.
 * @param params - Parameters for getting the index.
 * @returns The index details.
 */
const getIndex = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.getIndex(dbId, collId, key);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing getIndex():", err);
        throw err;
    }
};
exports.getIndex = getIndex;
/**
 * Delete an index by its key from a specific collection.
 * @param params - Parameters for deleting the index.
 * @returns Confirmation of deletion.
 */
const deleteIndex = async ({ dbId, collId, key, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        await databases.deleteIndex(dbId, collId, key);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing deleteIndex():", err);
        throw err;
    }
};
exports.deleteIndex = deleteIndex;
/**
 * List all attributes in a specific collection.
 * @param params - Parameters for listing the attributes.
 * @returns The list of attributes.
 */
const listAttributes = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.listAttributes(dbId, collId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing listAttributes():", err);
        throw err;
    }
};
exports.listAttributes = listAttributes;
/**
 * Create a boolean attribute in a collection.
 * @param params - Parameters for creating the boolean attribute.
 * @returns The created attribute details.
 */
const createBooleanAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.createBooleanAttribute(dbId, collId, key, required, xdefault, xarray);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createBooleanAttribute():", err);
        throw err;
    }
};
exports.createBooleanAttribute = createBooleanAttribute;
/**
 * Update a boolean attribute in a collection.
 * @param params - Parameters for updating the boolean attribute.
 * @returns The updated attribute details.
 */
const updateBooleanAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.updateBooleanAttribute(dbId, collId, key, required, xdefault, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateBooleanAttribute():", err);
        throw err;
    }
};
exports.updateBooleanAttribute = updateBooleanAttribute;
/**
 * Create a datetime attribute in a collection.
 * @param params - Parameters for creating the datetime attribute.
 * @returns The created attribute details.
 */
const createDatetimeAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.createDatetimeAttribute(dbId, collId, key, required, xdefault, xarray);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createDatetimeAttribute():", err);
        throw err;
    }
};
exports.createDatetimeAttribute = createDatetimeAttribute;
/**
 * Update a datetime attribute in a collection.
 * @param params - Parameters for updating the datetime attribute.
 * @returns The updated attribute details.
 */
const updateDatetimeAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.updateDatetimeAttribute(dbId, collId, key, required, xdefault, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateDatetimeAttribute():", err);
        throw err;
    }
};
exports.updateDatetimeAttribute = updateDatetimeAttribute;
/**
 * Create an email attribute in a collection.
 * @param params - Parameters for creating the email attribute.
 * @returns The created attribute details.
 */
const createEmailAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.createEmailAttribute(dbId, collId, key, required, xdefault, xarray);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createEmailAttribute():", err);
        throw err;
    }
};
exports.createEmailAttribute = createEmailAttribute;
/**
 * Update an email attribute in a collection.
 * @param params - Parameters for updating the email attribute.
 * @returns The updated attribute details.
 */
const updateEmailAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.updateEmailAttribute(dbId, collId, key, required, xdefault, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateEmailAttribute():", err);
        throw err;
    }
};
exports.updateEmailAttribute = updateEmailAttribute;
/**
 * Create an enum attribute in a collection.
 * @param params - Parameters for creating the enum attribute.
 * @returns The created attribute details.
 */
const createEnumAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, elements, required, xdefault, xarray, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.createEnumAttribute(dbId, collId, key, elements, required, xdefault, xarray);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createEnumAttribute():", err);
        throw err;
    }
};
exports.createEnumAttribute = createEnumAttribute;
/**
 * Update an enum attribute in a collection.
 * @param params - Parameters for updating the enum attribute.
 * @returns The updated attribute details.
 */
const updateEnumAttribute = async ({ dbId, collId, key, elements, required, xdefault, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.updateEnumAttribute(dbId, collId, key, elements, required, xdefault, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateEnumAttribute():", err);
        throw err;
    }
};
exports.updateEnumAttribute = updateEnumAttribute;
/**
 * Create a float attribute in a collection.
 * @param params - Parameters for creating the float attribute.
 * @returns The created attribute details.
 */
const createFloatAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, required, min, max, xdefault, xarray, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.createFloatAttribute(dbId, collId, key, required, min, max, xdefault, xarray);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createFloatAttribute():", err);
        throw err;
    }
};
exports.createFloatAttribute = createFloatAttribute;
/**
 * Update a float attribute in a collection.
 * @param params - Parameters for updating the float attribute.
 * @returns The updated attribute details.
 */
const updateFloatAttribute = async ({ dbId, collId, key, required, min, max, xdefault, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.updateFloatAttribute(dbId, collId, key, required, min, max, xdefault, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateFloatAttribute():", err);
        throw err;
    }
};
exports.updateFloatAttribute = updateFloatAttribute;
/**
 * Create an integer attribute in a collection.
 * @param params - Parameters for creating the integer attribute.
 * @returns The created attribute details.
 */
const createIntegerAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, required, min, max, xdefault, xarray, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.createIntegerAttribute(dbId, collId, key, required, min, max, xdefault, xarray);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createIntegerAttribute():", err);
        throw err;
    }
};
exports.createIntegerAttribute = createIntegerAttribute;
/**
 * Update an integer attribute in a collection.
 * @param params - Parameters for updating the integer attribute.
 * @returns The updated attribute details.
 */
const updateIntegerAttribute = async ({ dbId, collId, key, required, min, max, xdefault, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.updateIntegerAttribute(dbId, collId, key, required, min, max, xdefault, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateIntegerAttribute():", err);
        throw err;
    }
};
exports.updateIntegerAttribute = updateIntegerAttribute;
/**
 * Create an IP address attribute in a collection.
 * @param params - Parameters for creating the IP address attribute.
 * @returns The created attribute details.
 */
const createIpAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.createIpAttribute(dbId, collId, key, required, xdefault, xarray);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createIpAttribute():", err);
        throw err;
    }
};
exports.createIpAttribute = createIpAttribute;
/**
 * Update an IP address attribute in a collection.
 * @param params - Parameters for updating the IP address attribute.
 * @returns The updated attribute details.
 */
const updateIpAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.updateIpAttribute(dbId, collId, key, required, xdefault, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateIpAttribute():", err);
        throw err;
    }
};
exports.updateIpAttribute = updateIpAttribute;
/**
 * Create a string attribute in a collection.
 * @param params - Parameters for creating the string attribute.
 * @returns The created attribute details.
 */
const createStringAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, size, required, xdefault, xarray, encrypt, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.createStringAttribute(dbId, collId, key, size, required, xdefault, xarray, encrypt);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createStringAttribute():", err);
        throw err;
    }
};
exports.createStringAttribute = createStringAttribute;
/**
 * Update a string attribute in a collection.
 * @param params - Parameters for updating the string attribute.
 * @returns The updated attribute details.
 */
const updateStringAttribute = async ({ dbId, collId, key, required, xdefault, size, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.updateStringAttribute(dbId, collId, key, required, xdefault, size, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateStringAttribute():", err);
        throw err;
    }
};
exports.updateStringAttribute = updateStringAttribute;
/**
 * Create a URL attribute in a collection.
 * @param params - Parameters for creating the URL attribute.
 * @returns The created attribute details.
 */
const createUrlAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, required, xdefault, xarray, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.createUrlAttribute(dbId, collId, key, required, xdefault, xarray);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createUrlAttribute():", err);
        throw err;
    }
};
exports.createUrlAttribute = createUrlAttribute;
/**
 * Update a URL attribute in a collection.
 * @param params - Parameters for updating the URL attribute.
 * @returns The updated attribute details.
 */
const updateUrlAttribute = async ({ dbId, collId, key, required, xdefault, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.updateUrlAttribute(dbId, collId, key, required, xdefault, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateUrlAttribute():", err);
        throw err;
    }
};
exports.updateUrlAttribute = updateUrlAttribute;
/**
 * Get an attribute by its key from a collection.
 * @param params - Parameters for getting the attribute.
 * @returns The attribute details.
 */
const getAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, key, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.getAttribute(dbId, collId, key);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing getAttribute():", err);
        throw err;
    }
};
exports.getAttribute = getAttribute;
/**
 * Delete an attribute by its key from a collection.
 * @param params - Parameters for deleting the attribute.
 * @returns Confirmation of deletion.
 */
const deleteAttribute = async ({ dbId, collId, key, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        await databases.deleteAttribute(dbId, collId, key);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing deleteAttribute():", err);
        throw err;
    }
};
exports.deleteAttribute = deleteAttribute;
/**
 * Create a relationship attribute in a collection.
 * @param params - Parameters for creating the relationship attribute.
 * @returns The created attribute details.
 */
const createRelationshipAttribute = async ({ dbId = appwriteConfig_1.databaseId, collId = appwriteConfig_1.userCollectionId, relatedCollectionId, type, twoWay, key, twoWayKey, onDelete, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.createRelationshipAttribute(dbId, collId, relatedCollectionId, type, twoWay, key, twoWayKey, onDelete);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createRelationshipAttribute():", err);
        throw err;
    }
};
exports.createRelationshipAttribute = createRelationshipAttribute;
/**
 * Update a relationship attribute in a collection.
 * @param params - Parameters for updating the relationship attribute.
 * @returns The updated attribute details.
 */
const updateRelationshipAttribute = async ({ dbId, collId, key, onDelete, newKey, }) => {
    try {
        const { databases } = await (0, appwriteClients_1.createAdminClient)();
        const result = await databases.updateRelationshipAttribute(dbId, collId, key, onDelete, newKey);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateRelationshipAttribute():", err);
        throw err;
    }
};
exports.updateRelationshipAttribute = updateRelationshipAttribute;
