"use server";

import { ID, Models } from "node-appwrite";
import { createAttribute, getSchema } from "../collections";
import { RelationshipType, RelationMutate, IndexType } from "../enums";
import { createAdminClient } from "../appwriteClients";

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
const listDatabases = async ({
  queries = [],
  search = undefined,
}: ListDatabasesParams): Promise<Models.DatabaseList> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.list(queries, search);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing listDatabases():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the createDatabase function.
 */
export type CreateDatabaseParams = {
  dbId: string;
  name: string;
  enabled?: boolean;
};
/**
 * Create a new database in the Appwrite project.
 * @param params - Parameters for creating the database.
 * @returns The created database details.
 */
const createDatabase = async ({
  dbId,
  name,
  enabled,
}: CreateDatabaseParams): Promise<Models.Database> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.create(dbId, name, enabled);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing createDatabase():",
      err
    );
    throw err;
  }
};

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
const getDatabase = async ({
  dbId,
}: GetDatabaseParams): Promise<Models.Database> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.get(dbId);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing getDatabase():",
      err
    );
    throw err;
  }
};

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
const updateDatabase = async ({
  dbId,
  name,
  enabled,
}: UpdateDatabaseParams): Promise<Models.Database> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.update(dbId, name, enabled);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing updateDatabase():",
      err
    );
    throw err;
  }
};

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
const deleteDatabase = async ({
  dbId,
}: DeleteDatabaseParams): Promise<void> => {
  try {
    const { databases } = await createAdminClient();
    await databases.delete(dbId);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing deleteDatabase():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the listCollections function.
 */
export type ListCollectionsParams = {
  dbId: string;
  queries?: string[];
  search?: string;
};
/**
 * List all collections in a specific database.
 * @param params - Parameters for listing the collections.
 * @returns The list of collections.
 */
const listCollections = async ({
  dbId,
  queries = [],
  search,
}: ListCollectionsParams): Promise<Models.CollectionList> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.listCollections(dbId, queries, search);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing listCollections():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the createCollection function.
 */
export type CreateCollectionParams = {
  dbId: string;
  collId: string;
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
const createCollection = async ({
  dbId,
  collId,
  name,
  permissions,
  documentSecurity,
  enabled,
}: CreateCollectionParams): Promise<Models.Collection> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.createCollection(
      dbId,
      collId,
      name,
      permissions,
      documentSecurity,
      enabled
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing createCollection():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the createCollectionWithSchema function.
 */
type CommonParams = {
  dbId: string;
  name: string;
  permissions?: string[];
  documentSecurity?: boolean;
  enabled?: boolean;
};
type WithCollId = CommonParams & {
  collId: string;
  nameAsId?: never;
};
type WithoutCollId = CommonParams & {
  collId?: never;
  nameAsId: boolean;
};
export type CreateCollectionWithSchemaParams = WithCollId | WithoutCollId;
/**
 * Create a new collection according to a specific schema in a specific database.
 * @param params - Parameters for creating the collection.
 * @returns The created collection details.
 */
const createCollectionWithSchema = async ({
  dbId,
  collId,
  name,
  permissions,
  documentSecurity,
  enabled,
  nameAsId,
}: CreateCollectionWithSchemaParams): Promise<Models.Collection> => {
  try {
    const { databases } = await createAdminClient();

    const collList = await databases.listCollections(dbId);
    let coll = collList.collections.find(
      (collection: Models.Collection) => collection.name === name
    );

    if (!coll) {
      const schema = await getSchema(name);

      const collectionId = collId ?? (nameAsId ? name : ID.unique());

      coll = await databases.createCollection(
        dbId,
        collectionId,
        name,
        permissions ?? schema.permissions,
        documentSecurity ?? schema.documentSecurity,
        enabled ?? schema.enabled
      );

      for (const attr of schema.attributes) {
        await createAttribute(dbId, collectionId, attr);
      }

      for (const index of schema.indexes) {
        await databases.createIndex(
          dbId,
          collectionId,
          index.key,
          index.type,
          index.attributes,
          index.orders
        );
      }
    }

    return coll;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing createCollectionWithSchema():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the getCollection function.
 */
export type GetCollectionParams = {
  dbId: string;
  collId: string;
};
/**
 * Get details of a specific collection by its ID.
 * @param params - Parameters for getting the collection.
 * @returns The collection details.
 */
const getCollection = async ({
  dbId,
  collId,
}: GetCollectionParams): Promise<Models.Collection> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.getCollection(dbId, collId);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing getCollection():",
      err
    );
    throw err;
  }
};

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
const updateCollection = async ({
  dbId,
  collId,
  name,
  permissions,
  documentSecurity,
  enabled,
}: UpdateCollectionParams): Promise<Models.Collection> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.updateCollection(
      dbId,
      collId,
      name,
      permissions,
      documentSecurity,
      enabled
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing updateCollection():",
      err
    );
    throw err;
  }
};

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
const deleteCollection = async ({
  dbId,
  collId,
}: DeleteCollectionParams): Promise<void> => {
  try {
    const { databases } = await createAdminClient();
    await databases.deleteCollection(dbId, collId);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing deleteCollection():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the listDocuments function.
 */
export type ListDocumentsParams = {
  dbId: string;
  collId: string;
  queries?: string[];
};
/**
 * List all documents in a specific collection.
 * @param params - Parameters for listing the documents.
 * @returns The list of documents.
 */
const listDocuments = async ({
  dbId,
  collId,
  queries = [],
}: ListDocumentsParams): Promise<Models.DocumentList<Models.Document>> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.listDocuments(dbId, collId, queries);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing listDocuments():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the createDocument function.
 */
export type CreateDocumentParams = {
  dbId: string;
  collId: string;
  documentId?: string;
  data: Record<string, any>;
  permissions?: string[];
};
/**
 * Create a new document in a specific collection.
 * @param params - Parameters for creating the document.
 * @returns The created document details.
 */
const createDocument = async ({
  dbId,
  collId,
  documentId = ID.unique(),
  data,
  permissions,
}: CreateDocumentParams): Promise<Models.Document> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.createDocument(
      dbId,
      collId,
      documentId,
      data,
      permissions
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing createDocument():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the getDocument function.
 */
export type GetDocumentParams = {
  dbId: string;
  collId: string;
  documentId: string;
};
/**
 * Get a document by its ID from a specific collection.
 * @param params - Parameters for getting the document.
 * @returns The document details.
 */
const getDocument = async ({
  dbId,
  collId,
  documentId,
}: GetDocumentParams): Promise<Models.Document> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.getDocument(dbId, collId, documentId);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing getDocument():",
      err
    );
    throw err;
  }
};

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
const updateDocument = async ({
  dbId,
  collId,
  documentId,
  data,
  permissions,
}: UpdateDocumentParams): Promise<Models.Document> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.updateDocument(
      dbId,
      collId,
      documentId,
      data,
      permissions
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing updateDocument():",
      err
    );
    throw err;
  }
};

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
const deleteDocument = async ({
  dbId,
  collId,
  documentId,
}: DeleteDocumentParams): Promise<void> => {
  try {
    const { databases } = await createAdminClient();
    await databases.deleteDocument(dbId, collId, documentId);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing deleteDocument():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the listIndexes function.
 */
export type ListIndexesParams = {
  dbId: string;
  collId: string;
};
/**
 * List all indexes in a specific collection.
 * @param params - Parameters for listing the indexes.
 * @returns The list of indexes.
 */
const listIndexes = async ({
  dbId,
  collId,
}: ListIndexesParams): Promise<Models.IndexList> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.listIndexes(dbId, collId);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing listIndexes():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the createIndex function.
 */
export type CreateIndexParams = {
  dbId: string;
  collId: string;
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
const createIndex = async ({
  dbId,
  collId,
  key,
  type,
  attributes,
  orders,
}: CreateIndexParams): Promise<Models.Index> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.createIndex(
      dbId,
      collId,
      key,
      type,
      attributes,
      orders
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing createIndex():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the getIndex function.
 */
export type GetIndexParams = {
  dbId: string;
  collId: string;
  key: string;
};
/**
 * Get an index by its key from a specific collection.
 * @param params - Parameters for getting the index.
 * @returns The index details.
 */
const getIndex = async ({
  dbId,
  collId,
  key,
}: GetIndexParams): Promise<Models.Index> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.getIndex(dbId, collId, key);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing getIndex():",
      err
    );
    throw err;
  }
};

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
const deleteIndex = async ({
  dbId,
  collId,
  key,
}: DeleteIndexParams): Promise<void> => {
  try {
    const { databases } = await createAdminClient();
    await databases.deleteIndex(dbId, collId, key);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing deleteIndex():",
      err
    );
    throw err;
  }
};

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
const listAttributes = async ({
  databaseId,
  collectionId,
}: ListAttributesParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.listAttributes(databaseId, collectionId);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing listAttributes():",
      err
    );
    throw err;
  }
};

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
const createBooleanAttribute = async ({
  databaseId,
  collectionId,
  key,
  required,
  xdefault,
  xarray,
}: CreateBooleanAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.createBooleanAttribute(
      databaseId,
      collectionId,
      key,
      required,
      xdefault,
      xarray
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing createBooleanAttribute():",
      err
    );
    throw err;
  }
};

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
const updateBooleanAttribute = async ({
  databaseId,
  collectionId,
  key,
  required,
  xdefault,
  newKey,
}: UpdateBooleanAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.updateBooleanAttribute(
      databaseId,
      collectionId,
      key,
      required,
      xdefault,
      newKey
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing updateBooleanAttribute():",
      err
    );
    throw err;
  }
};

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
const createDatetimeAttribute = async ({
  databaseId,
  collectionId,
  key,
  required,
  xdefault,
  xarray,
}: CreateDatetimeAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.createDatetimeAttribute(
      databaseId,
      collectionId,
      key,
      required,
      xdefault,
      xarray
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing createDatetimeAttribute():",
      err
    );
    throw err;
  }
};

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
const updateDatetimeAttribute = async ({
  databaseId,
  collectionId,
  key,
  required,
  xdefault,
  newKey,
}: UpdateDatetimeAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.updateDatetimeAttribute(
      databaseId,
      collectionId,
      key,
      required,
      xdefault,
      newKey
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing updateDatetimeAttribute():",
      err
    );
    throw err;
  }
};

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
const createEmailAttribute = async ({
  databaseId,
  collectionId,
  key,
  required,
  xdefault,
  xarray,
}: CreateEmailAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.createEmailAttribute(
      databaseId,
      collectionId,
      key,
      required,
      xdefault,
      xarray
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing createEmailAttribute():",
      err
    );
    throw err;
  }
};

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
const updateEmailAttribute = async ({
  databaseId,
  collectionId,
  key,
  required,
  xdefault,
  newKey,
}: UpdateEmailAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.updateEmailAttribute(
      databaseId,
      collectionId,
      key,
      required,
      xdefault,
      newKey
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing updateEmailAttribute():",
      err
    );
    throw err;
  }
};

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
const createEnumAttribute = async ({
  databaseId,
  collectionId,
  key,
  elements,
  required,
  xdefault,
  xarray,
}: CreateEnumAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.createEnumAttribute(
      databaseId,
      collectionId,
      key,
      elements,
      required,
      xdefault,
      xarray
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing createEnumAttribute():",
      err
    );
    throw err;
  }
};

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
const updateEnumAttribute = async ({
  databaseId,
  collectionId,
  key,
  elements,
  required,
  xdefault,
  newKey,
}: UpdateEnumAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.updateEnumAttribute(
      databaseId,
      collectionId,
      key,
      elements,
      required,
      xdefault,
      newKey
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing updateEnumAttribute():",
      err
    );
    throw err;
  }
};

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
const createFloatAttribute = async ({
  databaseId,
  collectionId,
  key,
  required,
  min,
  max,
  xdefault,
  xarray,
}: CreateFloatAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.createFloatAttribute(
      databaseId,
      collectionId,
      key,
      required,
      min,
      max,
      xdefault,
      xarray
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing createFloatAttribute():",
      err
    );
    throw err;
  }
};

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
const updateFloatAttribute = async ({
  databaseId,
  collectionId,
  key,
  required,
  min,
  max,
  xdefault,
  newKey,
}: UpdateFloatAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.updateFloatAttribute(
      databaseId,
      collectionId,
      key,
      required,
      min,
      max,
      xdefault,
      newKey
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing updateFloatAttribute():",
      err
    );
    throw err;
  }
};

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
const createIntegerAttribute = async ({
  databaseId,
  collectionId,
  key,
  required,
  min,
  max,
  xdefault,
  xarray,
}: CreateIntegerAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.createIntegerAttribute(
      databaseId,
      collectionId,
      key,
      required,
      min,
      max,
      xdefault,
      xarray
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing createIntegerAttribute():",
      err
    );
    throw err;
  }
};

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
const updateIntegerAttribute = async ({
  databaseId,
  collectionId,
  key,
  required,
  min,
  max,
  xdefault,
  newKey,
}: UpdateIntegerAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.updateIntegerAttribute(
      databaseId,
      collectionId,
      key,
      required,
      min,
      max,
      xdefault,
      newKey
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing updateIntegerAttribute():",
      err
    );
    throw err;
  }
};

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
const createIpAttribute = async ({
  databaseId,
  collectionId,
  key,
  required,
  xdefault,
  xarray,
}: CreateIpAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.createIpAttribute(
      databaseId,
      collectionId,
      key,
      required,
      xdefault,
      xarray
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing createIpAttribute():",
      err
    );
    throw err;
  }
};

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
const updateIpAttribute = async ({
  databaseId,
  collectionId,
  key,
  required,
  xdefault,
  newKey,
}: UpdateIpAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.updateIpAttribute(
      databaseId,
      collectionId,
      key,
      required,
      xdefault,
      newKey
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing updateIpAttribute():",
      err
    );
    throw err;
  }
};

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
const createStringAttribute = async ({
  databaseId,
  collectionId,
  key,
  size,
  required,
  xdefault,
  xarray,
  encrypt,
}: CreateStringAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.createStringAttribute(
      databaseId,
      collectionId,
      key,
      size,
      required,
      xdefault,
      xarray,
      encrypt
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing createStringAttribute():",
      err
    );
    throw err;
  }
};

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
const updateStringAttribute = async ({
  databaseId,
  collectionId,
  key,
  required,
  xdefault,
  size,
  newKey,
}: UpdateStringAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.updateStringAttribute(
      databaseId,
      collectionId,
      key,
      required,
      xdefault,
      size,
      newKey
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing updateStringAttribute():",
      err
    );
    throw err;
  }
};

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
const createUrlAttribute = async ({
  databaseId,
  collectionId,
  key,
  required,
  xdefault,
  xarray,
}: CreateUrlAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.createUrlAttribute(
      databaseId,
      collectionId,
      key,
      required,
      xdefault,
      xarray
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing createUrlAttribute():",
      err
    );
    throw err;
  }
};

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
const updateUrlAttribute = async ({
  databaseId,
  collectionId,
  key,
  required,
  xdefault,
  newKey,
}: UpdateUrlAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.updateUrlAttribute(
      databaseId,
      collectionId,
      key,
      required,
      xdefault,
      newKey
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing updateUrlAttribute():",
      err
    );
    throw err;
  }
};

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
const getAttribute = async ({
  databaseId,
  collectionId,
  key,
}: GetAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.getAttribute(databaseId, collectionId, key);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing getAttribute():",
      err
    );
    throw err;
  }
};

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
const deleteAttribute = async ({
  databaseId,
  collectionId,
  key,
}: DeleteAttributeParams): Promise<void> => {
  try {
    const { databases } = await createAdminClient();
    await databases.deleteAttribute(databaseId, collectionId, key);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing deleteAttribute():",
      err
    );
    throw err;
  }
};

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
const createRelationshipAttribute = async ({
  databaseId,
  collectionId,
  relatedCollectionId,
  type,
  twoWay,
  key,
  twoWayKey,
  onDelete,
}: CreateRelationshipAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.createRelationshipAttribute(
      databaseId,
      collectionId,
      relatedCollectionId,
      type,
      twoWay,
      key,
      twoWayKey,
      onDelete
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing createRelationshipAttribute():",
      err
    );
    throw err;
  }
};

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
const updateRelationshipAttribute = async ({
  databaseId,
  collectionId,
  key,
  onDelete,
  newKey,
}: UpdateRelationshipAttributeParams): Promise<any> => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.updateRelationshipAttribute(
      databaseId,
      collectionId,
      key,
      onDelete,
      newKey
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/databases): Error executing updateRelationshipAttribute():",
      err
    );
    throw err;
  }
};

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
export {
  createBooleanAttribute,
  createCollection,
  createCollectionWithSchema,
  createDatabase,
  createDatetimeAttribute,
  createDocument,
  createEmailAttribute,
  createEnumAttribute,
  createFloatAttribute,
  createIndex,
  createIntegerAttribute,
  createIpAttribute,
  createRelationshipAttribute,
  createStringAttribute,
  createUrlAttribute,
  deleteAttribute,
  deleteCollection,
  deleteDatabase,
  deleteDocument,
  deleteIndex,
  getAttribute,
  getCollection,
  getDatabase,
  getDocument,
  getIndex,
  listAttributes,
  listCollections,
  listDatabases,
  listDocuments,
  listIndexes,
  updateBooleanAttribute,
  updateCollection,
  updateDatabase,
  updateDatetimeAttribute,
  updateDocument,
  updateEmailAttribute,
  updateEnumAttribute,
  updateFloatAttribute,
  updateIntegerAttribute,
  updateIpAttribute,
  updateRelationshipAttribute,
  updateStringAttribute,
  updateUrlAttribute,
};
