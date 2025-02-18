"use server";

import {
  ID,
  IndexType,
  Models,
  RelationMutate,
  RelationshipType,
} from "node-appwrite";
import { live } from "../host";
import { createAdminClient } from "../appwriteClients";
import { databaseId, userCollectionId } from "../appwriteConfig";

const admin: boolean = !live;
const errMsg = (fn: string) =>
  admin ? `ApwWrapper Error (methods/databases): ${fn}()` : "Database Error";

interface ErrorObject {
  message: string;
  description: string;
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
const createBooleanAttribute = async ({
  dbId = databaseId,
  collId = userCollectionId,
  key,
  required,
  xdefault,
  xarray,
}: CreateBooleanAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.createBooleanAttribute(
      dbId,
      collId,
      key,
      required,
      xdefault,
      xarray
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createBooleanAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const createCollection = async ({
  dbId = databaseId,
  collId = userCollectionId,
  name,
  permissions,
  documentSecurity,
  enabled,
}: CreateCollectionParams): Promise<ReturnObject<Models.Collection>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.createCollection(
      dbId,
      collId,
      name,
      permissions,
      documentSecurity,
      enabled
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createCollection"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const createCollectionWithSchema = async ({
  dbId = databaseId,
  collId,
  name,
  permissions,
  documentSecurity,
  enabled,
}: CreateCollectionWithSchemaParams): Promise<
  ReturnObject<Models.Collection>
> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.createCollection(
      dbId,
      collId ?? ID.unique(),
      name,
      permissions,
      documentSecurity,
      enabled
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createCollectionWithSchema"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Creates a database.
 */
export type CreateDatabaseParams = {
  dbId?: string;
  name: string;
  enabled?: boolean;
};
const createDatabase = async ({
  dbId = databaseId,
  name,
  enabled,
}: CreateDatabaseParams): Promise<ReturnObject<Models.Database>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.create(dbId, name, enabled);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createDatabase"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const createDatetimeAttribute = async ({
  dbId = databaseId,
  collId = userCollectionId,
  key,
  required,
  xdefault,
  xarray,
}: CreateDatetimeAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.createDatetimeAttribute(
      dbId,
      collId,
      key,
      required,
      xdefault,
      xarray
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createDatetimeAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const createDocument = async ({
  dbId = databaseId,
  collId = userCollectionId,
  documentId = ID.unique(),
  data,
  permissions,
}: CreateDocumentParams): Promise<ReturnObject<Models.Document>> => {
  try {
    const { databases } = await createAdminClient();
    const document = await databases.createDocument(
      dbId,
      collId,
      documentId,
      data,
      permissions
    );
    return { data: document, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createDocument"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const createEmailAttribute = async ({
  dbId = databaseId,
  collId = userCollectionId,
  key,
  required,
  xdefault,
  xarray,
}: CreateEmailAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.createEmailAttribute(
      dbId,
      collId,
      key,
      required,
      xdefault,
      xarray
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createEmailAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const createEnumAttribute = async ({
  dbId = databaseId,
  collId = userCollectionId,
  key,
  elements,
  required,
  xdefault,
  xarray,
}: CreateEnumAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.createEnumAttribute(
      dbId,
      collId,
      key,
      elements,
      required,
      xdefault,
      xarray
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createEnumAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const createFloatAttribute = async ({
  dbId = databaseId,
  collId = userCollectionId,
  key,
  required,
  min,
  max,
  xdefault,
  xarray,
}: CreateFloatAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.createFloatAttribute(
      dbId,
      collId,
      key,
      required,
      min,
      max,
      xdefault,
      xarray
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createFloatAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const createIndex = async ({
  dbId = databaseId,
  collId = userCollectionId,
  key,
  type,
  attributes,
  orders,
}: CreateIndexParams): Promise<ReturnObject<Models.Index>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.createIndex(
      dbId,
      collId,
      key,
      type,
      attributes,
      orders
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createIndex"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const createIntegerAttribute = async ({
  dbId = databaseId,
  collId = userCollectionId,
  key,
  required,
  min,
  max,
  xdefault,
  xarray,
}: CreateIntegerAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.createIntegerAttribute(
      dbId,
      collId,
      key,
      required,
      min,
      max,
      xdefault,
      xarray
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createIntegerAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const createIpAttribute = async ({
  dbId = databaseId,
  collId = userCollectionId,
  key,
  required,
  xdefault,
  xarray,
}: CreateIpAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.createIpAttribute(
      dbId,
      collId,
      key,
      required,
      xdefault,
      xarray
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createIpAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const createRelationshipAttribute = async ({
  dbId = databaseId,
  collId = userCollectionId,
  relatedCollectionId,
  type,
  twoWay,
  key,
  twoWayKey,
  onDelete,
}: CreateRelationshipAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.createRelationshipAttribute(
      dbId,
      collId,
      relatedCollectionId,
      type,
      twoWay,
      key,
      twoWayKey,
      onDelete
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createRelationshipAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const createStringAttribute = async ({
  dbId = databaseId,
  collId = userCollectionId,
  key,
  size,
  required,
  xdefault,
  xarray,
  encrypt,
}: CreateStringAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.createStringAttribute(
      dbId,
      collId,
      key,
      size,
      required,
      xdefault,
      xarray,
      encrypt
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createStringAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const createUrlAttribute = async ({
  dbId = databaseId,
  collId = userCollectionId,
  key,
  required,
  xdefault,
  xarray,
}: CreateUrlAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.createUrlAttribute(
      dbId,
      collId,
      key,
      required,
      xdefault,
      xarray
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createUrlAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Deletes an attribute in a collection.
 */
export type DeleteAttributeParams = {
  dbId: string;
  collId: string;
  key: string;
};
const deleteAttribute = async ({
  dbId,
  collId,
  key,
}: DeleteAttributeParams): Promise<ReturnObject<void>> => {
  try {
    const { databases } = await createAdminClient();
    await databases.deleteAttribute(dbId, collId, key);
    return { data: undefined, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("deleteAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Deletes a collection in a database.
 */
export type DeleteCollectionParams = {
  dbId: string;
  collId: string;
};
const deleteCollection = async ({
  dbId,
  collId,
}: DeleteCollectionParams): Promise<ReturnObject<void>> => {
  try {
    const { databases } = await createAdminClient();
    await databases.deleteCollection(dbId, collId);
    return { data: undefined, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("deleteCollection"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Deletes a database.
 */
export type DeleteDatabaseParams = {
  dbId: string;
};
const deleteDatabase = async ({
  dbId,
}: DeleteDatabaseParams): Promise<ReturnObject<void>> => {
  try {
    const { databases } = await createAdminClient();
    await databases.delete(dbId);
    return { data: undefined, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("deleteDatabase"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Deletes a document from a collection.
 */
export type DeleteDocumentParams = {
  dbId?: string;
  collId?: string;
  documentId: string;
};
const deleteDocument = async ({
  dbId = databaseId,
  collId = userCollectionId,
  documentId,
}: DeleteDocumentParams): Promise<ReturnObject<void>> => {
  try {
    const { databases } = await createAdminClient();
    await databases.deleteDocument(dbId, collId, documentId);
    return { data: undefined, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("deleteDocument"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Deletes an index from a collection.
 */
export type DeleteIndexParams = {
  dbId: string;
  collId: string;
  key: string;
};
const deleteIndex = async ({
  dbId,
  collId,
  key,
}: DeleteIndexParams): Promise<ReturnObject<void>> => {
  try {
    const { databases } = await createAdminClient();
    await databases.deleteIndex(dbId, collId, key);
    return { data: undefined, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("deleteIndex"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Retrieves an attribute from a collection.
 */
export type GetAttributeParams = {
  dbId?: string;
  collId?: string;
  key: string;
};
const getAttribute = async ({
  dbId = databaseId,
  collId = userCollectionId,
  key,
}: GetAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.getAttribute(dbId, collId, key);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Retrieves a collection from a database.
 */
export type GetCollectionParams = {
  dbId?: string;
  collId?: string;
};
const getCollection = async ({
  dbId = databaseId,
  collId = userCollectionId,
}: GetCollectionParams): Promise<ReturnObject<Models.Collection>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.getCollection(dbId, collId);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getCollection"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Retrieves a database by its ID.
 */
export type GetDatabaseParams = {
  dbId: string;
};
const getDatabase = async ({
  dbId = databaseId,
}: GetDatabaseParams): Promise<ReturnObject<Models.Database>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.get(dbId);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getDatabase"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Retrieves a document from a collection.
 */
export type GetDocumentParams = {
  dbId?: string;
  collId?: string;
  documentId: string;
};
const getDocument = async ({
  dbId = databaseId,
  collId = userCollectionId,
  documentId,
}: GetDocumentParams): Promise<ReturnObject<Models.Document>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.getDocument(dbId, collId, documentId);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getDocument"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Retrieves an index from a collection.
 */
export type GetIndexParams = {
  dbId?: string;
  collId?: string;
  key: string;
};
const getIndex = async ({
  dbId = databaseId,
  collId = userCollectionId,
  key,
}: GetIndexParams): Promise<ReturnObject<Models.Index>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.getIndex(dbId, collId, key);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getIndex"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Lists all attributes in a collection.
 */
export type ListAttributesParams = {
  dbId?: string;
  collId?: string;
};
const listAttributes = async ({
  dbId = databaseId,
  collId = userCollectionId,
}: ListAttributesParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.listAttributes(dbId, collId);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("listAttributes"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Lists all collections in a database.
 */
export type ListCollectionsParams = {
  dbId?: string;
  queries?: string[];
  search?: string;
};
const listCollections = async ({
  dbId = databaseId,
  queries = [],
  search,
}: ListCollectionsParams): Promise<ReturnObject<Models.CollectionList>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.listCollections(dbId, queries, search);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("listCollections"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Lists all databases in the Appwrite project.
 */
export type ListDatabasesParams = {
  queries?: string[];
  search?: string;
};
const listDatabases = async ({
  queries = [],
  search,
}: ListDatabasesParams): Promise<ReturnObject<Models.DatabaseList>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.list(queries, search);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("listDatabases"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Lists all documents in a specific collection.
 */
export type ListDocumentsParams = {
  dbId?: string;
  collId?: string;
  queries?: string[];
};
const listDocuments = async ({
  dbId = databaseId,
  collId = userCollectionId,
  queries = [],
}: ListDocumentsParams): Promise<
  ReturnObject<Models.DocumentList<Models.Document>>
> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.listDocuments(dbId, collId, queries);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("listDocuments"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Lists all indexes in a collection.
 */
export type ListIndexesParams = {
  dbId?: string;
  collId?: string;
};
const listIndexes = async ({
  dbId = databaseId,
  collId = userCollectionId,
}: ListIndexesParams): Promise<ReturnObject<Models.IndexList>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.listIndexes(dbId, collId);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("listIndexes"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const updateBooleanAttribute = async ({
  dbId,
  collId,
  key,
  required,
  xdefault,
  newKey,
}: UpdateBooleanAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.updateBooleanAttribute(
      dbId,
      collId,
      key,
      required,
      xdefault,
      newKey
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateBooleanAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const updateCollection = async ({
  dbId,
  collId,
  name,
  permissions,
  documentSecurity,
  enabled,
}: UpdateCollectionParams): Promise<ReturnObject<Models.Collection>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.updateCollection(
      dbId,
      collId,
      name,
      permissions,
      documentSecurity,
      enabled
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateCollection"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Updates a database in the Appwrite project.
 */
export type UpdateDatabaseParams = {
  dbId: string;
  name: string;
  enabled?: boolean;
};
const updateDatabase = async ({
  dbId,
  name,
  enabled,
}: UpdateDatabaseParams): Promise<ReturnObject<Models.Database>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.update(dbId, name, enabled);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateDatabase"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const updateDatetimeAttribute = async ({
  dbId,
  collId,
  key,
  required,
  xdefault,
  newKey,
}: UpdateDatetimeAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.updateDatetimeAttribute(
      dbId,
      collId,
      key,
      required,
      xdefault,
      newKey
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateDatetimeAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const updateDocument = async ({
  dbId = databaseId,
  collId = userCollectionId,
  documentId,
  data,
  permissions,
}: UpdateDocumentParams): Promise<ReturnObject<Models.Document>> => {
  try {
    const { databases } = await createAdminClient();
    const updatedData = await databases.updateDocument(
      dbId,
      collId,
      documentId,
      data,
      permissions
    );
    return { data: updatedData, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateDocument"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const updateEmailAttribute = async ({
  dbId,
  collId,
  key,
  required,
  xdefault,
  newKey,
}: UpdateEmailAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.updateEmailAttribute(
      dbId,
      collId,
      key,
      required,
      xdefault,
      newKey
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateEmailAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const updateEnumAttribute = async ({
  dbId,
  collId,
  key,
  elements,
  required,
  xdefault,
  newKey,
}: UpdateEnumAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.updateEnumAttribute(
      dbId,
      collId,
      key,
      elements,
      required,
      xdefault,
      newKey
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateEnumAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const updateFloatAttribute = async ({
  dbId,
  collId,
  key,
  required,
  min,
  max,
  xdefault,
  newKey,
}: UpdateFloatAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.updateFloatAttribute(
      dbId,
      collId,
      key,
      required,
      min,
      max,
      xdefault,
      newKey
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateFloatAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const updateIntegerAttribute = async ({
  dbId,
  collId,
  key,
  required,
  min,
  max,
  xdefault,
  newKey,
}: UpdateIntegerAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.updateIntegerAttribute(
      dbId,
      collId,
      key,
      required,
      min,
      max,
      xdefault,
      newKey
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateIntegerAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const updateIpAttribute = async ({
  dbId,
  collId,
  key,
  required,
  xdefault,
  newKey,
}: UpdateIpAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.updateIpAttribute(
      dbId,
      collId,
      key,
      required,
      xdefault,
      newKey
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateIpAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const updateRelationshipAttribute = async ({
  dbId,
  collId,
  key,
  onDelete,
  newKey,
}: UpdateRelationshipAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.updateRelationshipAttribute(
      dbId,
      collId,
      key,
      onDelete,
      newKey
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateRelationshipAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const updateStringAttribute = async ({
  dbId,
  collId,
  key,
  required,
  xdefault,
  size,
  newKey,
}: UpdateStringAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.updateStringAttribute(
      dbId,
      collId,
      key,
      required,
      xdefault,
      size,
      newKey
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateStringAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
const updateUrlAttribute = async ({
  dbId,
  collId,
  key,
  required,
  xdefault,
  newKey,
}: UpdateUrlAttributeParams): Promise<ReturnObject<any>> => {
  try {
    const { databases } = await createAdminClient();
    const data = await databases.updateUrlAttribute(
      dbId,
      collId,
      key,
      required,
      xdefault,
      newKey
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateUrlAttribute"),
        description: JSON.stringify(err),
      },
    };
  }
};

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
