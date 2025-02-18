import { IndexType, Models, RelationMutate, RelationshipType } from "node-appwrite";
interface ErrorObject {
    appwrite: boolean;
    header: string;
    type: string;
    code: number;
    variant: string;
    description: string;
    error?: object;
}
interface ReturnObject<T> {
    error: ErrorObject | null;
    data: T | null;
}
/**
 * Creates a boolean attribute in a collection.
 */
export type CreateBooleanAttributeParams = {
    dbId?: string;
    collId?: string;
    key: string;
    required: boolean;
    xdefault?: boolean;
    xarray?: boolean;
};
declare const createBooleanAttribute: ({ dbId, collId, key, required, xdefault, xarray, }: CreateBooleanAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Creates a collection.
 */
export type CreateCollectionParams = {
    dbId?: string;
    collId?: string;
    name: string;
    permissions?: string[];
    documentSecurity?: boolean;
    enabled?: boolean;
};
declare const createCollection: ({ dbId, collId, name, permissions, documentSecurity, enabled, }: CreateCollectionParams) => Promise<ReturnObject<Models.Collection>>;
/**
 * Creates a collection with schema.
 */
export type CreateCollectionWithSchemaParams = {
    dbId?: string;
    collId?: string;
    name: string;
    permissions?: string[];
    documentSecurity?: boolean;
    enabled?: boolean;
};
declare const createCollectionWithSchema: ({ dbId, collId, name, permissions, documentSecurity, enabled, }: CreateCollectionWithSchemaParams) => Promise<ReturnObject<Models.Collection>>;
/**
 * Creates a database.
 */
export type CreateDatabaseParams = {
    dbId?: string;
    name: string;
    enabled?: boolean;
};
declare const createDatabase: ({ dbId, name, enabled, }: CreateDatabaseParams) => Promise<ReturnObject<Models.Database>>;
/**
 * Creates a datetime attribute.
 */
export type CreateDatetimeAttributeParams = {
    dbId?: string;
    collId?: string;
    key: string;
    required: boolean;
    xdefault?: string;
    xarray?: boolean;
};
declare const createDatetimeAttribute: ({ dbId, collId, key, required, xdefault, xarray, }: CreateDatetimeAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Creates a document.
 */
export type CreateDocumentParams = {
    dbId?: string;
    collId?: string;
    documentId?: string;
    data: Record<string, any>;
    permissions?: string[];
};
declare const createDocument: ({ dbId, collId, documentId, data, permissions, }: CreateDocumentParams) => Promise<ReturnObject<Models.Document>>;
/**
 * Creates an email attribute.
 */
export type CreateEmailAttributeParams = {
    dbId?: string;
    collId?: string;
    key: string;
    required: boolean;
    xdefault?: string;
    xarray?: boolean;
};
declare const createEmailAttribute: ({ dbId, collId, key, required, xdefault, xarray, }: CreateEmailAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Creates an enum attribute.
 */
export type CreateEnumAttributeParams = {
    dbId?: string;
    collId?: string;
    key: string;
    elements: string[];
    required: boolean;
    xdefault?: string;
    xarray?: boolean;
};
declare const createEnumAttribute: ({ dbId, collId, key, elements, required, xdefault, xarray, }: CreateEnumAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Creates a float attribute.
 */
export type CreateFloatAttributeParams = {
    dbId?: string;
    collId?: string;
    key: string;
    required: boolean;
    min?: number;
    max?: number;
    xdefault?: number;
    xarray?: boolean;
};
declare const createFloatAttribute: ({ dbId, collId, key, required, min, max, xdefault, xarray, }: CreateFloatAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Creates an index in a collection.
 */
export type CreateIndexParams = {
    dbId?: string;
    collId?: string;
    key: string;
    type: IndexType;
    attributes: string[];
    orders?: string[];
};
declare const createIndex: ({ dbId, collId, key, type, attributes, orders, }: CreateIndexParams) => Promise<ReturnObject<Models.Index>>;
/**
 * Creates an integer attribute in a collection.
 */
export type CreateIntegerAttributeParams = {
    dbId?: string;
    collId?: string;
    key: string;
    required: boolean;
    min?: number;
    max?: number;
    xdefault?: number;
    xarray?: boolean;
};
declare const createIntegerAttribute: ({ dbId, collId, key, required, min, max, xdefault, xarray, }: CreateIntegerAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Creates an IP attribute in a collection.
 */
export type CreateIpAttributeParams = {
    dbId?: string;
    collId?: string;
    key: string;
    required: boolean;
    xdefault?: string;
    xarray?: boolean;
};
declare const createIpAttribute: ({ dbId, collId, key, required, xdefault, xarray, }: CreateIpAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Creates a relationship attribute in a collection.
 */
export type CreateRelationshipAttributeParams = {
    dbId?: string;
    collId?: string;
    relatedCollectionId: string;
    type: RelationshipType;
    twoWay?: boolean;
    key?: string;
    twoWayKey?: string;
    onDelete?: RelationMutate;
    required?: boolean;
};
declare const createRelationshipAttribute: ({ dbId, collId, relatedCollectionId, type, twoWay, key, twoWayKey, onDelete, }: CreateRelationshipAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Creates a string attribute in a collection.
 */
export type CreateStringAttributeParams = {
    dbId?: string;
    collId?: string;
    key: string;
    size: number;
    required: boolean;
    xdefault?: string;
    xarray?: boolean;
    encrypt?: boolean;
};
declare const createStringAttribute: ({ dbId, collId, key, size, required, xdefault, xarray, encrypt, }: CreateStringAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Creates a URL attribute in a collection.
 */
export type CreateUrlAttributeParams = {
    dbId?: string;
    collId?: string;
    key: string;
    required: boolean;
    xdefault?: string;
    xarray?: boolean;
};
declare const createUrlAttribute: ({ dbId, collId, key, required, xdefault, xarray, }: CreateUrlAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Deletes an attribute in a collection.
 */
export type DeleteAttributeParams = {
    dbId: string;
    collId: string;
    key: string;
};
declare const deleteAttribute: ({ dbId, collId, key, }: DeleteAttributeParams) => Promise<ReturnObject<void>>;
/**
 * Deletes a collection in a database.
 */
export type DeleteCollectionParams = {
    dbId: string;
    collId: string;
};
declare const deleteCollection: ({ dbId, collId, }: DeleteCollectionParams) => Promise<ReturnObject<void>>;
/**
 * Deletes a database.
 */
export type DeleteDatabaseParams = {
    dbId: string;
};
declare const deleteDatabase: ({ dbId, }: DeleteDatabaseParams) => Promise<ReturnObject<void>>;
/**
 * Deletes a document from a collection.
 */
export type DeleteDocumentParams = {
    dbId?: string;
    collId?: string;
    documentId: string;
};
declare const deleteDocument: ({ dbId, collId, documentId, }: DeleteDocumentParams) => Promise<ReturnObject<void>>;
/**
 * Deletes an index from a collection.
 */
export type DeleteIndexParams = {
    dbId: string;
    collId: string;
    key: string;
};
declare const deleteIndex: ({ dbId, collId, key, }: DeleteIndexParams) => Promise<ReturnObject<void>>;
/**
 * Retrieves an attribute from a collection.
 */
export type GetAttributeParams = {
    dbId?: string;
    collId?: string;
    key: string;
};
declare const getAttribute: ({ dbId, collId, key, }: GetAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Retrieves a collection from a database.
 */
export type GetCollectionParams = {
    dbId?: string;
    collId?: string;
};
declare const getCollection: ({ dbId, collId, }: GetCollectionParams) => Promise<ReturnObject<Models.Collection>>;
/**
 * Retrieves a database by its ID.
 */
export type GetDatabaseParams = {
    dbId: string;
};
declare const getDatabase: ({ dbId, }: GetDatabaseParams) => Promise<ReturnObject<Models.Database>>;
/**
 * Retrieves a document from a collection.
 */
export type GetDocumentParams = {
    dbId?: string;
    collId?: string;
    documentId: string;
};
declare const getDocument: ({ dbId, collId, documentId, }: GetDocumentParams) => Promise<ReturnObject<Models.Document>>;
/**
 * Retrieves an index from a collection.
 */
export type GetIndexParams = {
    dbId?: string;
    collId?: string;
    key: string;
};
declare const getIndex: ({ dbId, collId, key, }: GetIndexParams) => Promise<ReturnObject<Models.Index>>;
/**
 * Lists all attributes in a collection.
 */
export type ListAttributesParams = {
    dbId?: string;
    collId?: string;
};
declare const listAttributes: ({ dbId, collId, }: ListAttributesParams) => Promise<ReturnObject<any>>;
/**
 * Lists all collections in a database.
 */
export type ListCollectionsParams = {
    dbId?: string;
    queries?: string[];
    search?: string;
};
declare const listCollections: ({ dbId, queries, search, }: ListCollectionsParams) => Promise<ReturnObject<Models.CollectionList>>;
/**
 * Lists all databases in the Appwrite project.
 */
export type ListDatabasesParams = {
    queries?: string[];
    search?: string;
};
declare const listDatabases: ({ queries, search, }: ListDatabasesParams) => Promise<ReturnObject<Models.DatabaseList>>;
/**
 * Lists all documents in a specific collection.
 */
export type ListDocumentsParams = {
    dbId?: string;
    collId?: string;
    queries?: string[];
};
declare const listDocuments: ({ dbId, collId, queries, }: ListDocumentsParams) => Promise<ReturnObject<Models.DocumentList<Models.Document>>>;
/**
 * Lists all indexes in a collection.
 */
export type ListIndexesParams = {
    dbId?: string;
    collId?: string;
};
declare const listIndexes: ({ dbId, collId, }: ListIndexesParams) => Promise<ReturnObject<Models.IndexList>>;
/**
 * Updates a boolean attribute in a collection.
 */
export type UpdateBooleanAttributeParams = {
    dbId: string;
    collId: string;
    key: string;
    required: boolean;
    xdefault?: boolean;
    newKey?: string;
};
declare const updateBooleanAttribute: ({ dbId, collId, key, required, xdefault, newKey, }: UpdateBooleanAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Updates a collection in a database.
 */
export type UpdateCollectionParams = {
    dbId: string;
    collId: string;
    name: string;
    permissions?: string[];
    documentSecurity?: boolean;
    enabled?: boolean;
};
declare const updateCollection: ({ dbId, collId, name, permissions, documentSecurity, enabled, }: UpdateCollectionParams) => Promise<ReturnObject<Models.Collection>>;
/**
 * Updates a database in the Appwrite project.
 */
export type UpdateDatabaseParams = {
    dbId: string;
    name: string;
    enabled?: boolean;
};
declare const updateDatabase: ({ dbId, name, enabled, }: UpdateDatabaseParams) => Promise<ReturnObject<Models.Database>>;
/**
 * Updates a datetime attribute in a collection.
 */
export type UpdateDatetimeAttributeParams = {
    dbId: string;
    collId: string;
    key: string;
    required: boolean;
    xdefault?: string;
    newKey?: string;
};
declare const updateDatetimeAttribute: ({ dbId, collId, key, required, xdefault, newKey, }: UpdateDatetimeAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Updates a document in a collection.
 */
export type UpdateDocumentParams = {
    dbId?: string;
    collId?: string;
    documentId: string;
    data?: Record<string, any>;
    permissions?: string[];
};
declare const updateDocument: ({ dbId, collId, documentId, data, permissions, }: UpdateDocumentParams) => Promise<ReturnObject<Models.Document>>;
/**
 * Updates an email attribute in a collection.
 */
export type UpdateEmailAttributeParams = {
    dbId: string;
    collId: string;
    key: string;
    required: boolean;
    xdefault?: string;
    newKey?: string;
};
declare const updateEmailAttribute: ({ dbId, collId, key, required, xdefault, newKey, }: UpdateEmailAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Updates an enum attribute in a collection.
 */
export type UpdateEnumAttributeParams = {
    dbId: string;
    collId: string;
    key: string;
    elements: string[];
    required: boolean;
    xdefault?: string;
    newKey?: string;
};
declare const updateEnumAttribute: ({ dbId, collId, key, elements, required, xdefault, newKey, }: UpdateEnumAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Updates a float attribute in a collection.
 */
export type UpdateFloatAttributeParams = {
    dbId: string;
    collId: string;
    key: string;
    required: boolean;
    min: number;
    max: number;
    xdefault?: number;
    newKey?: string;
};
declare const updateFloatAttribute: ({ dbId, collId, key, required, min, max, xdefault, newKey, }: UpdateFloatAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Updates an integer attribute in a collection.
 */
export type UpdateIntegerAttributeParams = {
    dbId: string;
    collId: string;
    key: string;
    required: boolean;
    min: number;
    max: number;
    xdefault?: number;
    newKey?: string;
};
declare const updateIntegerAttribute: ({ dbId, collId, key, required, min, max, xdefault, newKey, }: UpdateIntegerAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Updates an IP address attribute in a collection.
 */
export type UpdateIpAttributeParams = {
    dbId: string;
    collId: string;
    key: string;
    required: boolean;
    xdefault?: string;
    newKey?: string;
};
declare const updateIpAttribute: ({ dbId, collId, key, required, xdefault, newKey, }: UpdateIpAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Updates a relationship attribute in a collection.
 */
export type UpdateRelationshipAttributeParams = {
    dbId: string;
    collId: string;
    key: string;
    onDelete?: RelationMutate;
    newKey?: string;
};
declare const updateRelationshipAttribute: ({ dbId, collId, key, onDelete, newKey, }: UpdateRelationshipAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Updates a string attribute in a collection.
 */
export type UpdateStringAttributeParams = {
    dbId: string;
    collId: string;
    key: string;
    required: boolean;
    xdefault?: string;
    size?: number;
    newKey?: string;
};
declare const updateStringAttribute: ({ dbId, collId, key, required, xdefault, size, newKey, }: UpdateStringAttributeParams) => Promise<ReturnObject<any>>;
/**
 * Updates a URL attribute in a collection.
 */
export type UpdateUrlAttributeParams = {
    dbId: string;
    collId: string;
    key: string;
    required: boolean;
    xdefault?: string;
    newKey?: string;
};
declare const updateUrlAttribute: ({ dbId, collId, key, required, xdefault, newKey, }: UpdateUrlAttributeParams) => Promise<ReturnObject<any>>;
export { createBooleanAttribute, createCollection, createCollectionWithSchema, createDatabase, createDatetimeAttribute, createDocument, createEmailAttribute, createEnumAttribute, createFloatAttribute, createIndex, createIntegerAttribute, createIpAttribute, createRelationshipAttribute, createStringAttribute, createUrlAttribute, deleteAttribute, deleteCollection, deleteDatabase, deleteDocument, deleteIndex, getAttribute, getCollection, getDatabase, getDocument, getIndex, listAttributes, listCollections, listDatabases, listDocuments, listIndexes, updateBooleanAttribute, updateCollection, updateDatabase, updateDatetimeAttribute, updateDocument, updateEmailAttribute, updateEnumAttribute, updateFloatAttribute, updateIntegerAttribute, updateIpAttribute, updateRelationshipAttribute, updateStringAttribute, updateUrlAttribute, };
//# sourceMappingURL=databases.d.ts.map