import { Models } from "node-appwrite";
import { RelationshipType, RelationMutate, IndexType } from "../enums";
/**
 * Parameters for the listDatabases function.
 */
export type ListDatabasesParams = {
    queries?: string[];
    search?: string;
};
/**
 * List all databases in the Appwrite project.
 * @param params - Parameters for listing the databases.
 * @returns The list of databases.
 */
declare const listDatabases: ({ queries, search, }: ListDatabasesParams) => Promise<Models.DatabaseList>;
/**
 * Parameters for the createDatabase function.
 */
export type CreateDatabaseParams = {
    dbId?: string;
    name: string;
    enabled?: boolean;
};
/**
 * Create a new database in the Appwrite project.
 * @param params - Parameters for creating the database.
 * @returns The created database details.
 */
declare const createDatabase: ({ dbId, name, enabled, }: CreateDatabaseParams) => Promise<Models.Database>;
/**
 * Parameters for the getDatabase function.
 */
export type GetDatabaseParams = {
    dbId: string;
};
/**
 * Get details of a specific database by its ID.
 * @param params - Parameters for getting the database.
 * @returns The database details.
 */
declare const getDatabase: ({ dbId, }: GetDatabaseParams) => Promise<Models.Database>;
/**
 * Parameters for the updateDatabase function.
 */
export type UpdateDatabaseParams = {
    dbId: string;
    name: string;
    enabled?: boolean;
};
/**
 * Update details of a database by its ID.
 * @param params - Parameters for updating the database.
 * @returns The updated database details.
 */
declare const updateDatabase: ({ dbId, name, enabled, }: UpdateDatabaseParams) => Promise<Models.Database>;
/**
 * Parameters for the deleteDatabase function.
 */
export type DeleteDatabaseParams = {
    dbId: string;
};
/**
 * Delete a database by its ID.
 * @param params - Parameters for deleting the database.
 * @returns Confirmation of deletion.
 */
declare const deleteDatabase: ({ dbId, }: DeleteDatabaseParams) => Promise<void>;
/**
 * Parameters for the listCollections function.
 */
export type ListCollectionsParams = {
    dbId?: string;
    queries?: string[];
    search?: string;
};
/**
 * List all collections in a specific database.
 * @param params - Parameters for listing the collections.
 * @returns The list of collections.
 */
declare const listCollections: ({ dbId, queries, search, }: ListCollectionsParams) => Promise<Models.CollectionList>;
/**
 * Parameters for the createCollection function.
 */
export type CreateCollectionParams = {
    dbId?: string;
    collId?: string;
    name: string;
    permissions?: string[];
    documentSecurity?: boolean;
    enabled?: boolean;
};
/**
 * Create a new collection in a specific database.
 * @param params - Parameters for creating the collection.
 * @returns The created collection details.
 */
declare const createCollection: ({ dbId, collId, name, permissions, documentSecurity, enabled, }: CreateCollectionParams) => Promise<Models.Collection>;
/**
 * Parameters for the createCollectionWithSchema function.
 */
type CommonParams = {
    dbId?: string;
    name: string;
    permissions?: string[];
    documentSecurity?: boolean;
    enabled?: boolean;
};
type WithCollId = CommonParams & {
    collId: string;
    nameAsId: never;
};
type WithoutCollId = CommonParams & {
    collId: never;
    nameAsId: boolean;
};
export type CreateCollectionWithSchemaParams = WithCollId | WithoutCollId;
/**
 * Create a new collection according to a specific schema in a specific database.
 * @param params - Parameters for creating the collection.
 * @returns The created collection details.
 */
declare const createCollectionWithSchema: ({ dbId, collId, name, permissions, documentSecurity, enabled, nameAsId, }: CreateCollectionWithSchemaParams) => Promise<Models.Collection>;
/**
 * Parameters for the getCollection function.
 */
export type GetCollectionParams = {
    dbId?: string;
    collId?: string;
};
/**
 * Get details of a specific collection by its ID.
 * @param params - Parameters for getting the collection.
 * @returns The collection details.
 */
declare const getCollection: ({ dbId, collId, }: GetCollectionParams) => Promise<Models.Collection>;
/**
 * Parameters for the updateCollection function.
 */
export type UpdateCollectionParams = {
    dbId: string;
    collId: string;
    name: string;
    permissions?: string[];
    documentSecurity?: boolean;
    enabled?: boolean;
};
/**
 * Update details of a collection by its ID.
 * @param params - Parameters for updating the collection.
 * @returns The updated collection details.
 */
declare const updateCollection: ({ dbId, collId, name, permissions, documentSecurity, enabled, }: UpdateCollectionParams) => Promise<Models.Collection>;
/**
 * Parameters for the deleteCollection function.
 */
export type DeleteCollectionParams = {
    dbId: string;
    collId: string;
};
/**
 * Delete a collection by its ID.
 * @param params - Parameters for deleting the collection.
 * @returns Confirmation of deletion.
 */
declare const deleteCollection: ({ dbId, collId, }: DeleteCollectionParams) => Promise<void>;
/**
 * Parameters for the listDocuments function.
 */
export type ListDocumentsParams = {
    dbId?: string;
    collId?: string;
    queries?: string[];
};
/**
 * List all documents in a specific collection.
 * @param params - Parameters for listing the documents.
 * @returns The list of documents.
 */
declare const listDocuments: ({ dbId, collId, queries, }: ListDocumentsParams) => Promise<Models.DocumentList<Models.Document>>;
/**
 * Parameters for the createDocument function.
 */
export type CreateDocumentParams = {
    dbId?: string;
    collId?: string;
    documentId?: string;
    data: Record<string, any>;
    permissions?: string[];
};
/**
 * Create a new document in a specific collection.
 * @param params - Parameters for creating the document.
 * @returns The created document details.
 */
declare const createDocument: ({ dbId, collId, documentId, data, permissions, }: CreateDocumentParams) => Promise<Models.Document>;
/**
 * Parameters for the getDocument function.
 */
export type GetDocumentParams = {
    dbId?: string;
    collId?: string;
    documentId: string;
};
/**
 * Get a document by its ID from a specific collection.
 * @param params - Parameters for getting the document.
 * @returns The document details.
 */
declare const getDocument: ({ dbId, collId, documentId, }: GetDocumentParams) => Promise<Models.Document>;
/**
 * Parameters for the updateDocument function.
 */
export type UpdateDocumentParams = {
    dbId: string;
    collId: string;
    documentId: string;
    data?: Record<string, any>;
    permissions?: string[];
};
/**
 * Update a document by its ID in a specific collection.
 * @param params - Parameters for updating the document.
 * @returns The updated document details.
 */
declare const updateDocument: ({ dbId, collId, documentId, data, permissions, }: UpdateDocumentParams) => Promise<Models.Document>;
/**
 * Parameters for the deleteDocument function.
 */
export type DeleteDocumentParams = {
    dbId: string;
    collId: string;
    documentId: string;
};
/**
 * Delete a document by its ID from a specific collection.
 * @param params - Parameters for deleting the document.
 * @returns Confirmation of deletion.
 */
declare const deleteDocument: ({ dbId, collId, documentId, }: DeleteDocumentParams) => Promise<void>;
/**
 * Parameters for the listIndexes function.
 */
export type ListIndexesParams = {
    dbId?: string;
    collId?: string;
};
/**
 * List all indexes in a specific collection.
 * @param params - Parameters for listing the indexes.
 * @returns The list of indexes.
 */
declare const listIndexes: ({ dbId, collId, }: ListIndexesParams) => Promise<Models.IndexList>;
/**
 * Parameters for the createIndex function.
 */
export type CreateIndexParams = {
    dbId?: string;
    collId?: string;
    key: string;
    type: IndexType;
    attributes: string[];
    orders?: string[];
};
/**
 * Create a new index in a specific collection.
 * @param params - Parameters for creating the index.
 * @returns The created index details.
 */
declare const createIndex: ({ dbId, collId, key, type, attributes, orders, }: CreateIndexParams) => Promise<Models.Index>;
/**
 * Parameters for the getIndex function.
 */
export type GetIndexParams = {
    dbId?: string;
    collId?: string;
    key: string;
};
/**
 * Get an index by its key from a specific collection.
 * @param params - Parameters for getting the index.
 * @returns The index details.
 */
declare const getIndex: ({ dbId, collId, key, }: GetIndexParams) => Promise<Models.Index>;
/**
 * Parameters for the deleteIndex function.
 */
export type DeleteIndexParams = {
    dbId: string;
    collId: string;
    key: string;
};
/**
 * Delete an index by its key from a specific collection.
 * @param params - Parameters for deleting the index.
 * @returns Confirmation of deletion.
 */
declare const deleteIndex: ({ dbId, collId, key, }: DeleteIndexParams) => Promise<void>;
/**
 * Parameters for the listAttributes function.
 */
export type ListAttributesParams = {
    databaseId: string;
    collectionId: string;
};
/**
 * List all attributes in a specific collection.
 * @param params - Parameters for listing the attributes.
 * @returns The list of attributes.
 */
declare const listAttributes: ({ databaseId, collectionId, }: ListAttributesParams) => Promise<any>;
/**
 * Parameters for the createBooleanAttribute function.
 */
export type CreateBooleanAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    required: boolean;
    xdefault?: boolean;
    xarray?: boolean;
};
/**
 * Create a boolean attribute in a collection.
 * @param params - Parameters for creating the boolean attribute.
 * @returns The created attribute details.
 */
declare const createBooleanAttribute: ({ databaseId, collectionId, key, required, xdefault, xarray, }: CreateBooleanAttributeParams) => Promise<any>;
/**
 * Parameters for the updateBooleanAttribute function.
 */
export type UpdateBooleanAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    required: boolean;
    xdefault?: boolean;
    newKey?: string;
};
/**
 * Update a boolean attribute in a collection.
 * @param params - Parameters for updating the boolean attribute.
 * @returns The updated attribute details.
 */
declare const updateBooleanAttribute: ({ databaseId, collectionId, key, required, xdefault, newKey, }: UpdateBooleanAttributeParams) => Promise<any>;
/**
 * Parameters for the createDatetimeAttribute function.
 */
export type CreateDatetimeAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    required: boolean;
    xdefault?: string;
    xarray?: boolean;
};
/**
 * Create a datetime attribute in a collection.
 * @param params - Parameters for creating the datetime attribute.
 * @returns The created attribute details.
 */
declare const createDatetimeAttribute: ({ databaseId, collectionId, key, required, xdefault, xarray, }: CreateDatetimeAttributeParams) => Promise<any>;
/**
 * Parameters for the updateDatetimeAttribute function.
 */
export type UpdateDatetimeAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    required: boolean;
    xdefault?: string;
    newKey?: string;
};
/**
 * Update a datetime attribute in a collection.
 * @param params - Parameters for updating the datetime attribute.
 * @returns The updated attribute details.
 */
declare const updateDatetimeAttribute: ({ databaseId, collectionId, key, required, xdefault, newKey, }: UpdateDatetimeAttributeParams) => Promise<any>;
/**
 * Parameters for the createEmailAttribute function.
 */
export type CreateEmailAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    required: boolean;
    xdefault?: string;
    xarray?: boolean;
};
/**
 * Create an email attribute in a collection.
 * @param params - Parameters for creating the email attribute.
 * @returns The created attribute details.
 */
declare const createEmailAttribute: ({ databaseId, collectionId, key, required, xdefault, xarray, }: CreateEmailAttributeParams) => Promise<any>;
/**
 * Parameters for the updateEmailAttribute function.
 */
export type UpdateEmailAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    required: boolean;
    xdefault?: string;
    newKey?: string;
};
/**
 * Update an email attribute in a collection.
 * @param params - Parameters for updating the email attribute.
 * @returns The updated attribute details.
 */
declare const updateEmailAttribute: ({ databaseId, collectionId, key, required, xdefault, newKey, }: UpdateEmailAttributeParams) => Promise<any>;
/**
 * Parameters for the createEnumAttribute function.
 */
export type CreateEnumAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    elements: string[];
    required: boolean;
    xdefault?: string;
    xarray?: boolean;
};
/**
 * Create an enum attribute in a collection.
 * @param params - Parameters for creating the enum attribute.
 * @returns The created attribute details.
 */
declare const createEnumAttribute: ({ databaseId, collectionId, key, elements, required, xdefault, xarray, }: CreateEnumAttributeParams) => Promise<any>;
/**
 * Parameters for the updateEnumAttribute function.
 */
export type UpdateEnumAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    elements: string[];
    required: boolean;
    xdefault?: string;
    newKey?: string;
};
/**
 * Update an enum attribute in a collection.
 * @param params - Parameters for updating the enum attribute.
 * @returns The updated attribute details.
 */
declare const updateEnumAttribute: ({ databaseId, collectionId, key, elements, required, xdefault, newKey, }: UpdateEnumAttributeParams) => Promise<any>;
/**
 * Parameters for the createFloatAttribute function.
 */
export type CreateFloatAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    required: boolean;
    min?: number;
    max?: number;
    xdefault?: number;
    xarray?: boolean;
};
/**
 * Create a float attribute in a collection.
 * @param params - Parameters for creating the float attribute.
 * @returns The created attribute details.
 */
declare const createFloatAttribute: ({ databaseId, collectionId, key, required, min, max, xdefault, xarray, }: CreateFloatAttributeParams) => Promise<any>;
/**
 * Parameters for the updateFloatAttribute function.
 */
export type UpdateFloatAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    required: boolean;
    min: number;
    max: number;
    xdefault?: number;
    newKey?: string;
};
/**
 * Update a float attribute in a collection.
 * @param params - Parameters for updating the float attribute.
 * @returns The updated attribute details.
 */
declare const updateFloatAttribute: ({ databaseId, collectionId, key, required, min, max, xdefault, newKey, }: UpdateFloatAttributeParams) => Promise<any>;
/**
 * Parameters for the createIntegerAttribute function.
 */
export type CreateIntegerAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    required: boolean;
    min?: number;
    max?: number;
    xdefault?: number;
    xarray?: boolean;
};
/**
 * Create an integer attribute in a collection.
 * @param params - Parameters for creating the integer attribute.
 * @returns The created attribute details.
 */
declare const createIntegerAttribute: ({ databaseId, collectionId, key, required, min, max, xdefault, xarray, }: CreateIntegerAttributeParams) => Promise<any>;
/**
 * Parameters for the updateIntegerAttribute function.
 */
export type UpdateIntegerAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    required: boolean;
    min: number;
    max: number;
    xdefault?: number;
    newKey?: string;
};
/**
 * Update an integer attribute in a collection.
 * @param params - Parameters for updating the integer attribute.
 * @returns The updated attribute details.
 */
declare const updateIntegerAttribute: ({ databaseId, collectionId, key, required, min, max, xdefault, newKey, }: UpdateIntegerAttributeParams) => Promise<any>;
/**
 * Parameters for the createIpAttribute function.
 */
export type CreateIpAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    required: boolean;
    xdefault?: string;
    xarray?: boolean;
};
/**
 * Create an IP address attribute in a collection.
 * @param params - Parameters for creating the IP address attribute.
 * @returns The created attribute details.
 */
declare const createIpAttribute: ({ databaseId, collectionId, key, required, xdefault, xarray, }: CreateIpAttributeParams) => Promise<any>;
/**
 * Parameters for the updateIpAttribute function.
 */
export type UpdateIpAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    required: boolean;
    xdefault?: string;
    newKey?: string;
};
/**
 * Update an IP address attribute in a collection.
 * @param params - Parameters for updating the IP address attribute.
 * @returns The updated attribute details.
 */
declare const updateIpAttribute: ({ databaseId, collectionId, key, required, xdefault, newKey, }: UpdateIpAttributeParams) => Promise<any>;
/**
 * Parameters for the createStringAttribute function.
 */
export type CreateStringAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    size: number;
    required: boolean;
    xdefault?: string;
    xarray?: boolean;
    encrypt?: boolean;
};
/**
 * Create a string attribute in a collection.
 * @param params - Parameters for creating the string attribute.
 * @returns The created attribute details.
 */
declare const createStringAttribute: ({ databaseId, collectionId, key, size, required, xdefault, xarray, encrypt, }: CreateStringAttributeParams) => Promise<any>;
/**
 * Parameters for the updateStringAttribute function.
 */
export type UpdateStringAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    required: boolean;
    xdefault?: string;
    size?: number;
    newKey?: string;
};
/**
 * Update a string attribute in a collection.
 * @param params - Parameters for updating the string attribute.
 * @returns The updated attribute details.
 */
declare const updateStringAttribute: ({ databaseId, collectionId, key, required, xdefault, size, newKey, }: UpdateStringAttributeParams) => Promise<any>;
/**
 * Parameters for the createUrlAttribute function.
 */
export type CreateUrlAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    required: boolean;
    xdefault?: string;
    xarray?: boolean;
};
/**
 * Create a URL attribute in a collection.
 * @param params - Parameters for creating the URL attribute.
 * @returns The created attribute details.
 */
declare const createUrlAttribute: ({ databaseId, collectionId, key, required, xdefault, xarray, }: CreateUrlAttributeParams) => Promise<any>;
/**
 * Parameters for the updateUrlAttribute function.
 */
export type UpdateUrlAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    required: boolean;
    xdefault?: string;
    newKey?: string;
};
/**
 * Update a URL attribute in a collection.
 * @param params - Parameters for updating the URL attribute.
 * @returns The updated attribute details.
 */
declare const updateUrlAttribute: ({ databaseId, collectionId, key, required, xdefault, newKey, }: UpdateUrlAttributeParams) => Promise<any>;
/**
 * Parameters for the getAttribute function.
 */
export type GetAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
};
/**
 * Get an attribute by its key from a collection.
 * @param params - Parameters for getting the attribute.
 * @returns The attribute details.
 */
declare const getAttribute: ({ databaseId, collectionId, key, }: GetAttributeParams) => Promise<any>;
/**
 * Parameters for the deleteAttribute function.
 */
export type DeleteAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
};
/**
 * Delete an attribute by its key from a collection.
 * @param params - Parameters for deleting the attribute.
 * @returns Confirmation of deletion.
 */
declare const deleteAttribute: ({ databaseId, collectionId, key, }: DeleteAttributeParams) => Promise<void>;
/**
 * Parameters for the createRelationshipAttribute function.
 */
export type CreateRelationshipAttributeParams = {
    databaseId: string;
    collectionId: string;
    relatedCollectionId: string;
    type: RelationshipType;
    twoWay?: boolean;
    key?: string;
    twoWayKey?: string;
    onDelete?: RelationMutate;
};
/**
 * Create a relationship attribute in a collection.
 * @param params - Parameters for creating the relationship attribute.
 * @returns The created attribute details.
 */
declare const createRelationshipAttribute: ({ databaseId, collectionId, relatedCollectionId, type, twoWay, key, twoWayKey, onDelete, }: CreateRelationshipAttributeParams) => Promise<any>;
/**
 * Parameters for the updateRelationshipAttribute function.
 */
export type UpdateRelationshipAttributeParams = {
    databaseId: string;
    collectionId: string;
    key: string;
    onDelete?: RelationMutate;
    newKey?: string;
};
/**
 * Update a relationship attribute in a collection.
 * @param params - Parameters for updating the relationship attribute.
 * @returns The updated attribute details.
 */
declare const updateRelationshipAttribute: ({ databaseId, collectionId, key, onDelete, newKey, }: UpdateRelationshipAttributeParams) => Promise<any>;
export type DatabasesFunctionTypes = {
    createBooleanAttribute: typeof createBooleanAttribute;
    createCollection: typeof createCollection;
    createCollectionWithSchema: typeof createCollectionWithSchema;
    createDatabase: typeof createDatabase;
    createDatetimeAttribute: typeof createDatetimeAttribute;
    createDocument: typeof createDocument;
    createEmailAttribute: typeof createEmailAttribute;
    createEnumAttribute: typeof createEnumAttribute;
    createFloatAttribute: typeof createFloatAttribute;
    createIndex: typeof createIndex;
    createIntegerAttribute: typeof createIntegerAttribute;
    createIpAttribute: typeof createIpAttribute;
    createRelationshipAttribute: typeof createRelationshipAttribute;
    createStringAttribute: typeof createStringAttribute;
    createUrlAttribute: typeof createUrlAttribute;
    deleteAttribute: typeof deleteAttribute;
    deleteCollection: typeof deleteCollection;
    deleteDatabase: typeof deleteDatabase;
    deleteDocument: typeof deleteDocument;
    deleteIndex: typeof deleteIndex;
    getAttribute: typeof getAttribute;
    getCollection: typeof getCollection;
    getDatabase: typeof getDatabase;
    getDocument: typeof getDocument;
    getIndex: typeof getIndex;
    listAttributes: typeof listAttributes;
    listCollections: typeof listCollections;
    listDatabases: typeof listDatabases;
    listDocuments: typeof listDocuments;
    listIndexes: typeof listIndexes;
    updateBooleanAttribute: typeof updateBooleanAttribute;
    updateCollection: typeof updateCollection;
    updateDatabase: typeof updateDatabase;
    updateDatetimeAttribute: typeof updateDatetimeAttribute;
    updateDocument: typeof updateDocument;
    updateEmailAttribute: typeof updateEmailAttribute;
    updateEnumAttribute: typeof updateEnumAttribute;
    updateFloatAttribute: typeof updateFloatAttribute;
    updateIntegerAttribute: typeof updateIntegerAttribute;
    updateIpAttribute: typeof updateIpAttribute;
    updateRelationshipAttribute: typeof updateRelationshipAttribute;
    updateStringAttribute: typeof updateStringAttribute;
    updateUrlAttribute: typeof updateUrlAttribute;
};
/**
 * Export all created functions.
 */
export { createBooleanAttribute, createCollection, createCollectionWithSchema, createDatabase, createDatetimeAttribute, createDocument, createEmailAttribute, createEnumAttribute, createFloatAttribute, createIndex, createIntegerAttribute, createIpAttribute, createRelationshipAttribute, createStringAttribute, createUrlAttribute, deleteAttribute, deleteCollection, deleteDatabase, deleteDocument, deleteIndex, getAttribute, getCollection, getDatabase, getDocument, getIndex, listAttributes, listCollections, listDatabases, listDocuments, listIndexes, updateBooleanAttribute, updateCollection, updateDatabase, updateDatetimeAttribute, updateDocument, updateEmailAttribute, updateEnumAttribute, updateFloatAttribute, updateIntegerAttribute, updateIpAttribute, updateRelationshipAttribute, updateStringAttribute, updateUrlAttribute, };
//# sourceMappingURL=databases.d.ts.map