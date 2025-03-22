import { Databases } from "node-appwrite";
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
type CreateDatabase = Parameters<Databases["create"]>;
type CreateBooleanAttribute = Parameters<Databases["createBooleanAttribute"]>;
type CreateCollection = Parameters<Databases["createCollection"]>;
type CreateCollectionWithSchema = CreateCollectionAwaited;
type CreateDatetimeAttribute = Parameters<Databases["createDatetimeAttribute"]>;
type CreateDocument = Parameters<Databases["createDocument"]>;
type CreateEmailAttribute = Parameters<Databases["createEmailAttribute"]>;
type CreateEnumAttribute = Parameters<Databases["createEnumAttribute"]>;
type CreateFloatAttribute = Parameters<Databases["createFloatAttribute"]>;
type CreateIndex = Parameters<Databases["createIndex"]>;
type CreateIntegerAttribute = Parameters<Databases["createIntegerAttribute"]>;
type CreateIpAttribute = Parameters<Databases["createIpAttribute"]>;
type CreateRelationshipAttribute = Parameters<Databases["createRelationshipAttribute"]>;
type CreateStringAttribute = Parameters<Databases["createStringAttribute"]>;
type CreateUrlAttribute = Parameters<Databases["createUrlAttribute"]>;
type DeleteAttribute = Parameters<Databases["deleteAttribute"]>;
type DeleteCollection = Parameters<Databases["deleteCollection"]>;
type DeleteDatabase = Parameters<Databases["delete"]>;
type DeleteDocument = Parameters<Databases["deleteDocument"]>;
type DeleteIndex = Parameters<Databases["deleteIndex"]>;
type GetAttribute = Parameters<Databases["getAttribute"]>;
type GetCollection = Parameters<Databases["getCollection"]>;
type GetDatabase = Parameters<Databases["get"]>;
type GetDocument = Parameters<Databases["getDocument"]>;
type GetIndex = Parameters<Databases["getIndex"]>;
type ListAttributes = Parameters<Databases["listAttributes"]>;
type ListCollections = Parameters<Databases["listCollections"]>;
type ListDatabases = Parameters<Databases["list"]>;
type ListDocuments = Parameters<Databases["listDocuments"]>;
type ListIndexes = Parameters<Databases["listIndexes"]>;
type UpdateBooleanAttribute = Parameters<Databases["updateBooleanAttribute"]>;
type UpdateCollection = Parameters<Databases["updateCollection"]>;
type UpdateCollectionWithSchema = UpdateCollection;
type UpdateDatabase = Parameters<Databases["update"]>;
type UpdateDatetimeAttribute = Parameters<Databases["updateDatetimeAttribute"]>;
type UpdateDocument = Parameters<Databases["updateDocument"]>;
type UpdateEmailAttribute = Parameters<Databases["updateEmailAttribute"]>;
type UpdateEnumAttribute = Parameters<Databases["updateEnumAttribute"]>;
type UpdateFloatAttribute = Parameters<Databases["updateFloatAttribute"]>;
type UpdateIntegerAttribute = Parameters<Databases["updateIntegerAttribute"]>;
type UpdateIpAttribute = Parameters<Databases["updateIpAttribute"]>;
type UpdateRelationshipAttribute = Parameters<Databases["updateRelationshipAttribute"]>;
type UpdateStringAttribute = Parameters<Databases["updateStringAttribute"]>;
type UpdateUrlAttribute = Parameters<Databases["updateUrlAttribute"]>;
type CreateDatabaseReturnType = ReturnType<Databases["create"]>;
type CreateBooleanAttributeReturnType = ReturnType<Databases["createBooleanAttribute"]>;
type CreateCollectionReturnType = ReturnType<Databases["createCollection"]>;
type CreateCollectionWithSchemaReturnType = CreateCollectionReturnType;
type CreateDatetimeAttributeReturnType = ReturnType<Databases["createDatetimeAttribute"]>;
type CreateDocumentReturnType = ReturnType<Databases["createDocument"]>;
type CreateEmailAttributeReturnType = ReturnType<Databases["createEmailAttribute"]>;
type CreateEnumAttributeReturnType = ReturnType<Databases["createEnumAttribute"]>;
type CreateFloatAttributeReturnType = ReturnType<Databases["createFloatAttribute"]>;
type CreateIndexReturnType = ReturnType<Databases["createIndex"]>;
type CreateIntegerAttributeReturnType = ReturnType<Databases["createIntegerAttribute"]>;
type CreateIpAttributeReturnType = ReturnType<Databases["createIpAttribute"]>;
type CreateRelationshipAttributeReturnType = ReturnType<Databases["createRelationshipAttribute"]>;
type CreateStringAttributeReturnType = ReturnType<Databases["createStringAttribute"]>;
type CreateUrlAttributeReturnType = ReturnType<Databases["createUrlAttribute"]>;
type DeleteAttributeReturnType = ReturnType<Databases["deleteAttribute"]>;
type DeleteCollectionReturnType = ReturnType<Databases["deleteCollection"]>;
type DeleteDatabaseReturnType = ReturnType<Databases["delete"]>;
type DeleteDocumentReturnType = ReturnType<Databases["deleteDocument"]>;
type DeleteIndexReturnType = ReturnType<Databases["deleteIndex"]>;
type GetAttributeReturnType = ReturnType<Databases["getAttribute"]>;
type GetCollectionReturnType = ReturnType<Databases["getCollection"]>;
type GetDatabaseReturnType = ReturnType<Databases["get"]>;
type GetDocumentReturnType = ReturnType<Databases["getDocument"]>;
type GetIndexReturnType = ReturnType<Databases["getIndex"]>;
type ListAttributesReturnType = ReturnType<Databases["listAttributes"]>;
type ListCollectionsReturnType = ReturnType<Databases["listCollections"]>;
type ListDatabasesReturnType = ReturnType<Databases["list"]>;
type ListDocumentsReturnType = ReturnType<Databases["listDocuments"]>;
type ListIndexesReturnType = ReturnType<Databases["listIndexes"]>;
type UpdateBooleanAttributeReturnType = ReturnType<Databases["updateBooleanAttribute"]>;
type UpdateCollectionReturnType = ReturnType<Databases["updateCollection"]>;
type UpdateCollectionWithSchemaReturnType = UpdateCollectionReturnType;
type UpdateDatabaseReturnType = ReturnType<Databases["update"]>;
type UpdateDatetimeAttributeReturnType = ReturnType<Databases["updateDatetimeAttribute"]>;
type UpdateDocumentReturnType = ReturnType<Databases["updateDocument"]>;
type UpdateEmailAttributeReturnType = ReturnType<Databases["updateEmailAttribute"]>;
type UpdateEnumAttributeReturnType = ReturnType<Databases["updateEnumAttribute"]>;
type UpdateFloatAttributeReturnType = ReturnType<Databases["updateFloatAttribute"]>;
type UpdateIntegerAttributeReturnType = ReturnType<Databases["updateIntegerAttribute"]>;
type UpdateIpAttributeReturnType = ReturnType<Databases["updateIpAttribute"]>;
type UpdateRelationshipAttributeReturnType = ReturnType<Databases["updateRelationshipAttribute"]>;
type UpdateStringAttributeReturnType = ReturnType<Databases["updateStringAttribute"]>;
type UpdateUrlAttributeReturnType = ReturnType<Databases["updateUrlAttribute"]>;
type CreateDatabaseAwaited = Awaited<ReturnType<Databases["create"]>>;
type CreateBooleanAttributeAwaited = Awaited<ReturnType<Databases["createBooleanAttribute"]>>;
type CreateCollectionAwaited = Awaited<ReturnType<Databases["createCollection"]>>;
type CreateCollectionWithSchemaAwaited = CreateCollectionAwaited;
type CreateDatetimeAttributeAwaited = Awaited<ReturnType<Databases["createDatetimeAttribute"]>>;
type CreateDocumentAwaited = Awaited<ReturnType<Databases["createDocument"]>>;
type CreateEmailAttributeAwaited = Awaited<ReturnType<Databases["createEmailAttribute"]>>;
type CreateEnumAttributeAwaited = Awaited<ReturnType<Databases["createEnumAttribute"]>>;
type CreateFloatAttributeAwaited = Awaited<ReturnType<Databases["createFloatAttribute"]>>;
type CreateIndexAwaited = Awaited<ReturnType<Databases["createIndex"]>>;
type CreateIntegerAttributeAwaited = Awaited<ReturnType<Databases["createIntegerAttribute"]>>;
type CreateIpAttributeAwaited = Awaited<ReturnType<Databases["createIpAttribute"]>>;
type CreateRelationshipAttributeAwaited = Awaited<ReturnType<Databases["createRelationshipAttribute"]>>;
type CreateStringAttributeAwaited = Awaited<ReturnType<Databases["createStringAttribute"]>>;
type CreateUrlAttributeAwaited = Awaited<ReturnType<Databases["createUrlAttribute"]>>;
type DeleteAttributeAwaited = Awaited<ReturnType<Databases["deleteAttribute"]>>;
type DeleteCollectionAwaited = Awaited<ReturnType<Databases["deleteCollection"]>>;
type DeleteDatabaseAwaited = Awaited<ReturnType<Databases["delete"]>>;
type DeleteDocumentAwaited = Awaited<ReturnType<Databases["deleteDocument"]>>;
type DeleteIndexAwaited = Awaited<ReturnType<Databases["deleteIndex"]>>;
type GetAttributeAwaited = Awaited<ReturnType<Databases["getAttribute"]>>;
type GetCollectionAwaited = Awaited<ReturnType<Databases["getCollection"]>>;
type GetDatabaseAwaited = Awaited<ReturnType<Databases["get"]>>;
type GetDocumentAwaited = Awaited<ReturnType<Databases["getDocument"]>>;
type GetIndexAwaited = Awaited<ReturnType<Databases["getIndex"]>>;
type ListAttributesAwaited = Awaited<ReturnType<Databases["listAttributes"]>>;
type ListCollectionsAwaited = Awaited<ReturnType<Databases["listCollections"]>>;
type ListDatabasesAwaited = Awaited<ReturnType<Databases["list"]>>;
type ListDocumentsAwaited = Awaited<ReturnType<Databases["listDocuments"]>>;
type ListIndexesAwaited = Awaited<ReturnType<Databases["listIndexes"]>>;
type UpdateBooleanAttributeAwaited = Awaited<ReturnType<Databases["updateBooleanAttribute"]>>;
type UpdateCollectionAwaited = Awaited<ReturnType<Databases["updateCollection"]>>;
type UpdateCollectionWithSchemaAwaited = UpdateCollectionAwaited;
type UpdateDatabaseAwaited = Awaited<ReturnType<Databases["update"]>>;
type UpdateDatetimeAttributeAwaited = Awaited<ReturnType<Databases["updateDatetimeAttribute"]>>;
type UpdateDocumentAwaited = Awaited<ReturnType<Databases["updateDocument"]>>;
type UpdateEmailAttributeAwaited = Awaited<ReturnType<Databases["updateEmailAttribute"]>>;
type UpdateEnumAttributeAwaited = Awaited<ReturnType<Databases["updateEnumAttribute"]>>;
type UpdateFloatAttributeAwaited = Awaited<ReturnType<Databases["updateFloatAttribute"]>>;
type UpdateIntegerAttributeAwaited = Awaited<ReturnType<Databases["updateIntegerAttribute"]>>;
type UpdateIpAttributeAwaited = Awaited<ReturnType<Databases["updateIpAttribute"]>>;
type UpdateRelationshipAttributeAwaited = Awaited<ReturnType<Databases["updateRelationshipAttribute"]>>;
type UpdateStringAttributeAwaited = Awaited<ReturnType<Databases["updateStringAttribute"]>>;
type UpdateUrlAttributeAwaited = Awaited<ReturnType<Databases["updateUrlAttribute"]>>;
/**
 * Creates a boolean attribute in a collection.
 */
type CreateBooleanAttributeArgs = {
    databaseId?: CreateBooleanAttribute[0];
    collectionId?: CreateBooleanAttribute[1];
    key: CreateBooleanAttribute[2];
    required: CreateBooleanAttribute[3];
    xdefault?: CreateBooleanAttribute[4];
    array?: CreateBooleanAttribute[5];
};
declare const createBooleanAttribute: ({ ...args }: CreateBooleanAttributeArgs) => Promise<ReturnObject<CreateBooleanAttributeAwaited>>;
/**
 * Creates a collection.
 */
type CreateCollectionArgs = {
    databaseId?: CreateCollection[0];
    collectionId?: CreateCollection[1];
    name: CreateCollection[2];
    permissions?: CreateCollection[3];
    documentSecurity?: CreateCollection[4];
    enabled?: CreateCollection[5];
};
declare const createCollection: ({ ...args }: CreateCollectionArgs) => Promise<ReturnObject<CreateCollectionAwaited>>;
/**
 * Creates a collection according to a defined schema.
 * To execute successfully, there must be a schema file (JSON) in the schemas folder,
 * named as the collection name.
 * This schema folder path must be defined in env vars (see appwriteConfig.ts)
 */
type CreateCollectionWithSchemaArgs = CreateCollectionArgs;
declare const createCollectionWithSchema: ({ ...args }: CreateCollectionWithSchemaArgs) => Promise<ReturnObject<CreateCollectionAwaited>>;
/**
 * Creates a database.
 */
type CreateDatabaseArgs = {
    databaseId?: CreateDatabase[0];
    name: CreateDatabase[1];
    enabled?: CreateDatabase[2];
};
declare const createDatabase: ({ ...args }: CreateDatabaseArgs) => Promise<ReturnObject<CreateDatabaseAwaited>>;
/**
 * Creates a datetime attribute.
 */
type CreateDatetimeAttributeArgs = {
    databaseId?: CreateDatetimeAttribute[0];
    collectionId?: CreateDatetimeAttribute[1];
    key: CreateDatetimeAttribute[2];
    required: CreateDatetimeAttribute[3];
    xdefault?: CreateDatetimeAttribute[4];
    array?: CreateDatetimeAttribute[5];
};
declare const createDatetimeAttribute: ({ ...args }: CreateDatetimeAttributeArgs) => Promise<ReturnObject<CreateDatetimeAttributeAwaited>>;
/**
 * Creates a document.
 */
type CreateDocumentArgs = {
    databaseId?: CreateDocument[0];
    collectionId?: CreateDocument[1];
    documentId?: CreateDocument[2];
    data: CreateDocument[3];
    permissions?: CreateDocument[4];
};
declare const createDocument: ({ ...args }: CreateDocumentArgs) => Promise<ReturnObject<CreateDocumentAwaited>>;
/**
 * Creates an email attribute.
 */
type CreateEmailAttributeArgs = {
    databaseId?: CreateEmailAttribute[0];
    collectionId?: CreateEmailAttribute[1];
    key: CreateEmailAttribute[2];
    required: CreateEmailAttribute[3];
    xdefault?: CreateEmailAttribute[4];
    array?: CreateEmailAttribute[5];
};
declare const createEmailAttribute: ({ ...args }: CreateEmailAttributeArgs) => Promise<ReturnObject<CreateEmailAttributeAwaited>>;
/**
 * Creates an enum attribute.
 */
type CreateEnumAttributeArgs = {
    databaseId?: CreateEnumAttribute[0];
    collectionId?: CreateEnumAttribute[1];
    key: CreateEnumAttribute[2];
    elements: CreateEnumAttribute[3];
    required: CreateEnumAttribute[4];
    xdefault?: CreateEnumAttribute[5];
    array?: CreateEnumAttribute[6];
};
declare const createEnumAttribute: ({ ...args }: CreateEnumAttributeArgs) => Promise<ReturnObject<CreateEnumAttributeAwaited>>;
/**
 * Creates a float attribute.
 */
type CreateFloatAttributeArgs = {
    databaseId?: CreateFloatAttribute[0];
    collectionId?: CreateFloatAttribute[1];
    key: CreateFloatAttribute[2];
    required: CreateFloatAttribute[3];
    min?: CreateFloatAttribute[4];
    max?: CreateFloatAttribute[5];
    xdefault?: CreateFloatAttribute[6];
    array?: CreateFloatAttribute[7];
};
declare const createFloatAttribute: ({ ...args }: CreateFloatAttributeArgs) => Promise<ReturnObject<CreateFloatAttributeAwaited>>;
/**
 * Creates an index in a collection.
 */
type CreateIndexArgs = {
    databaseId?: CreateIndex[0];
    collectionId?: CreateIndex[1];
    key: CreateIndex[2];
    type: CreateIndex[3];
    attributes: CreateIndex[4];
    orders?: CreateIndex[5];
};
declare const createIndex: ({ ...args }: CreateIndexArgs) => Promise<ReturnObject<CreateIndexAwaited>>;
/**
 * Creates an integer attribute in a collection.
 */
type CreateIntegerAttributeArgs = {
    databaseId?: CreateIntegerAttribute[0];
    collectionId?: CreateIntegerAttribute[1];
    key: CreateIntegerAttribute[2];
    required: CreateIntegerAttribute[3];
    min?: CreateIntegerAttribute[4];
    max?: CreateIntegerAttribute[5];
    xdefault?: CreateIntegerAttribute[6];
    array?: CreateIntegerAttribute[7];
};
declare const createIntegerAttribute: ({ ...args }: CreateIntegerAttributeArgs) => Promise<ReturnObject<CreateIntegerAttributeAwaited>>;
/**
 * Creates an IP attribute in a collection.
 */
type CreateIpAttributeArgs = {
    databaseId?: CreateIpAttribute[0];
    collectionId?: CreateIpAttribute[1];
    key: CreateIpAttribute[2];
    required: CreateIpAttribute[3];
    xdefault?: CreateIpAttribute[4];
    array?: CreateIpAttribute[5];
};
declare const createIpAttribute: ({ ...args }: CreateIpAttributeArgs) => Promise<ReturnObject<CreateIpAttributeAwaited>>;
/**
 * Creates a relationship attribute in a collection.
 */
type CreateRelationshipAttributeArgs = {
    databaseId?: CreateRelationshipAttribute[0];
    collectionId?: CreateRelationshipAttribute[1];
    relatedCollectionId: CreateRelationshipAttribute[2];
    type: CreateRelationshipAttribute[3];
    twoWay?: CreateRelationshipAttribute[4];
    key?: CreateRelationshipAttribute[5];
    twoWayKey?: CreateRelationshipAttribute[6];
    onDelete?: CreateRelationshipAttribute[7];
};
declare const createRelationshipAttribute: ({ ...args }: CreateRelationshipAttributeArgs) => Promise<ReturnObject<CreateRelationshipAttributeAwaited>>;
/**
 * Creates a string attribute in a collection.
 */
type CreateStringAttributeArgs = {
    databaseId?: CreateStringAttribute[0];
    collectionId?: CreateStringAttribute[1];
    key: CreateStringAttribute[2];
    size: CreateStringAttribute[3];
    required: CreateStringAttribute[4];
    xdefault?: CreateStringAttribute[5];
    array?: CreateStringAttribute[6];
    encrypt?: CreateStringAttribute[7];
};
declare const createStringAttribute: ({ ...args }: CreateStringAttributeArgs) => Promise<ReturnObject<CreateStringAttributeAwaited>>;
/**
 * Creates a URL attribute in a collection.
 */
type CreateUrlAttributeArgs = {
    databaseId?: CreateUrlAttribute[0];
    collectionId?: CreateUrlAttribute[1];
    key: CreateUrlAttribute[2];
    required: CreateUrlAttribute[3];
    xdefault?: CreateUrlAttribute[4];
    array?: CreateUrlAttribute[5];
};
declare const createUrlAttribute: ({ ...args }: CreateUrlAttributeArgs) => Promise<ReturnObject<CreateUrlAttributeAwaited>>;
/**
 * Deletes an attribute in a collection.
 */
type DeleteAttributeArgs = {
    databaseId?: DeleteAttribute[0];
    collectionId?: DeleteAttribute[1];
    key: DeleteAttribute[2];
};
declare const deleteAttribute: ({ ...args }: DeleteAttributeArgs) => Promise<ReturnObject<DeleteAttributeAwaited>>;
/**
 * Deletes a collection in a database.
 */
type DeleteCollectionArgs = {
    databaseId?: DeleteCollection[0];
    collectionId: DeleteCollection[1];
};
declare const deleteCollection: ({ ...args }: DeleteCollectionArgs) => Promise<ReturnObject<DeleteCollectionAwaited>>;
/**
 * Deletes a database.
 */
type DeleteDatabaseArgs = {
    databaseId: DeleteDatabase[0];
};
declare const deleteDatabase: ({ ...args }: DeleteDatabaseArgs) => Promise<ReturnObject<DeleteDatabaseAwaited>>;
/**
 * Deletes a document from a collection.
 */
type DeleteDocumentArgs = {
    databaseId?: DeleteDocument[0];
    collectionId?: DeleteDocument[1];
    documentId: DeleteDocument[2];
};
declare const deleteDocument: ({ ...args }: DeleteDocumentArgs) => Promise<ReturnObject<DeleteDocumentAwaited>>;
/**
 * Deletes an index from a collection.
 */
type DeleteIndexArgs = {
    databaseId?: DeleteIndex[0];
    collectionId?: DeleteIndex[1];
    key: DeleteIndex[2];
};
declare const deleteIndex: ({ ...args }: DeleteIndexArgs) => Promise<ReturnObject<DeleteIndexAwaited>>;
/**
 * Retrieves an attribute from a collection.
 */
type GetAttributeArgs = {
    databaseId?: GetAttribute[0];
    collectionId?: GetAttribute[1];
    key: GetAttribute[2];
};
declare const getAttribute: ({ ...args }: GetAttributeArgs) => Promise<ReturnObject<GetAttributeAwaited>>;
/**
 * Retrieves a collection from a database.
 */
type GetCollectionArgs = {
    databaseId?: GetCollection[0];
    collectionId: GetCollection[1];
};
declare const getCollection: ({ ...args }: GetCollectionArgs) => Promise<ReturnObject<GetCollectionAwaited>>;
/**
 * Retrieves a database by its ID.
 */
type GetDatabaseArgs = {
    databaseId: GetDatabase[0];
};
declare const getDatabase: ({ ...args }: GetDatabaseArgs) => Promise<ReturnObject<GetDatabaseAwaited>>;
/**
 * Retrieves a document from a collection.
 */
type GetDocumentArgs = {
    databaseId?: GetDocument[0];
    collectionId?: GetDocument[1];
    documentId: GetDocument[2];
    queries?: GetDocument[3];
};
declare const getDocument: ({ ...args }: GetDocumentArgs) => Promise<ReturnObject<GetDocumentAwaited>>;
/**
 * Retrieves an index from a collection.
 */
type GetIndexArgs = {
    databaseId?: GetIndex[0];
    collectionId?: GetIndex[1];
    key: GetIndex[2];
};
declare const getIndex: ({ ...args }: GetIndexArgs) => Promise<ReturnObject<GetIndexAwaited>>;
/**
 * Lists all attributes in a collection.
 */
type ListAttributesArgs = {
    databaseId?: ListAttributes[0];
    collectionId?: ListAttributes[1];
    queries?: ListAttributes[2];
};
declare const listAttributes: ({ ...args }: ListAttributesArgs) => Promise<ReturnObject<ListAttributesAwaited>>;
/**
 * Lists all collections in a database.
 */
type ListCollectionsArgs = {
    databaseId?: ListCollections[0];
    queries?: ListCollections[1];
    search?: ListCollections[2];
};
declare const listCollections: ({ ...args }: ListCollectionsArgs) => Promise<ReturnObject<ListCollectionsAwaited>>;
/**
 * Lists all databases in the Appwrite project.
 */
type ListDatabasesArgs = {
    queries?: ListDatabases[0];
    search?: ListDatabases[1];
};
declare const listDatabases: ({ ...args }: ListDatabasesArgs) => Promise<ReturnObject<ListDatabasesAwaited>>;
/**
 * Lists all documents in a specific collection.
 */
type ListDocumentsArgs = {
    databaseId?: ListDocuments[0];
    collectionId?: ListDocuments[1];
    queries?: ListDocuments[2];
    relationshipQueries?: string[];
};
declare const listDocuments: ({ ...args }: ListDocumentsArgs) => Promise<ReturnObject<ListDocumentsAwaited>>;
/**
 * Lists all indexes in a collection.
 */
type ListIndexesArgs = {
    databaseId?: ListIndexes[0];
    collectionId?: ListIndexes[1];
    queries?: ListIndexes[2];
};
declare const listIndexes: ({ ...args }: ListIndexesArgs) => Promise<ReturnObject<ListIndexesAwaited>>;
/**
 * Updates a boolean attribute in a collection.
 */
type UpdateBooleanAttributeArgs = {
    databaseId?: UpdateBooleanAttribute[0];
    collectionId?: UpdateBooleanAttribute[1];
    key: UpdateBooleanAttribute[2];
    required: UpdateBooleanAttribute[3];
    xdefault?: UpdateBooleanAttribute[4];
    newKey?: UpdateBooleanAttribute[5];
};
declare const updateBooleanAttribute: ({ ...args }: UpdateBooleanAttributeArgs) => Promise<ReturnObject<UpdateBooleanAttributeAwaited>>;
/**
 * Updates a collection in a database.
 */
type UpdateCollectionArgs = {
    databaseId?: UpdateCollection[0];
    collectionId: UpdateCollection[1];
    name: UpdateCollection[2];
    permissions?: UpdateCollection[3];
    documentSecurity?: UpdateCollection[4];
    enabled?: UpdateCollection[5];
};
declare const updateCollection: ({ ...args }: UpdateCollectionArgs) => Promise<ReturnObject<UpdateCollectionAwaited>>;
/**
 * Updates a collection according to a defined schema.
 * To execute successfully, there must be a schema file (JSON) in the schemas folder,
 * named as the collection name. The schema folder path must be defined in env vars.
 */
type UpdateCollectionWithSchemaArgs = UpdateCollectionArgs & {
    destructive?: boolean;
};
declare const updateCollectionWithSchema: ({ ...args }: UpdateCollectionWithSchemaArgs) => Promise<ReturnObject<UpdateCollectionWithSchemaAwaited>>;
/**
 * Updates a database in the Appwrite project.
 */
type UpdateDatabaseArgs = {
    databaseId?: UpdateDatabase[0];
    name: UpdateDatabase[1];
    enabled?: UpdateDatabase[2];
};
declare const updateDatabase: ({ ...args }: UpdateDatabaseArgs) => Promise<ReturnObject<UpdateDatabaseAwaited>>;
/**
 * Updates a datetime attribute in a collection.
 */
type UpdateDatetimeAttributeArgs = {
    databaseId?: UpdateDatetimeAttribute[0];
    collectionId?: UpdateDatetimeAttribute[1];
    key: UpdateDatetimeAttribute[2];
    required: UpdateDatetimeAttribute[3];
    xdefault?: UpdateDatetimeAttribute[4];
    newKey?: UpdateDatetimeAttribute[5];
};
declare const updateDatetimeAttribute: ({ ...args }: UpdateDatetimeAttributeArgs) => Promise<ReturnObject<UpdateDatetimeAttributeAwaited>>;
/**
 * Updates a document in a collection.
 */
type UpdateDocumentArgs = {
    databaseId?: UpdateDocument[0];
    collectionId?: UpdateDocument[1];
    documentId: UpdateDocument[2];
    data?: UpdateDocument[3];
    permissions?: UpdateDocument[4];
};
declare const updateDocument: ({ ...args }: UpdateDocumentArgs) => Promise<ReturnObject<UpdateDocumentAwaited>>;
/**
 * Updates an email attribute in a collection.
 */
type UpdateEmailAttributeArgs = {
    databaseId?: UpdateEmailAttribute[0];
    collectionId?: UpdateEmailAttribute[1];
    key: UpdateEmailAttribute[2];
    required: UpdateEmailAttribute[3];
    xdefault?: UpdateEmailAttribute[4];
    newKey?: UpdateEmailAttribute[5];
};
declare const updateEmailAttribute: ({ ...args }: UpdateEmailAttributeArgs) => Promise<ReturnObject<UpdateEmailAttributeAwaited>>;
/**
 * Updates an enum attribute in a collection.
 */
type UpdateEnumAttributeArgs = {
    databaseId?: UpdateEnumAttribute[0];
    collectionId?: UpdateEnumAttribute[1];
    key: UpdateEnumAttribute[2];
    elements: UpdateEnumAttribute[3];
    required: UpdateEnumAttribute[4];
    xdefault?: UpdateEnumAttribute[5];
    newKey?: UpdateEnumAttribute[6];
};
declare const updateEnumAttribute: ({ ...args }: UpdateEnumAttributeArgs) => Promise<ReturnObject<UpdateEnumAttributeAwaited>>;
/**
 * Updates a float attribute in a collection.
 */
type UpdateFloatAttributeArgs = {
    databaseId?: UpdateFloatAttribute[0];
    collectionId?: UpdateFloatAttribute[1];
    key: UpdateFloatAttribute[2];
    required: UpdateFloatAttribute[3];
    min: UpdateFloatAttribute[4];
    max: UpdateFloatAttribute[5];
    xdefault?: UpdateFloatAttribute[6];
    newKey?: UpdateFloatAttribute[7];
};
declare const updateFloatAttribute: ({ ...args }: UpdateFloatAttributeArgs) => Promise<ReturnObject<UpdateFloatAttributeAwaited>>;
/**
 * Updates an integer attribute in a collection.
 */
type UpdateIntegerAttributeArgs = {
    databaseId?: UpdateIntegerAttribute[0];
    collectionId?: UpdateIntegerAttribute[1];
    key: UpdateIntegerAttribute[2];
    required: UpdateIntegerAttribute[3];
    min: UpdateIntegerAttribute[4];
    max: UpdateIntegerAttribute[5];
    xdefault?: UpdateIntegerAttribute[6];
    newKey?: UpdateIntegerAttribute[7];
};
declare const updateIntegerAttribute: ({ ...args }: UpdateIntegerAttributeArgs) => Promise<ReturnObject<UpdateIntegerAttributeAwaited>>;
/**
 * Updates an IP address attribute in a collection.
 */
type UpdateIpAttributeArgs = {
    databaseId?: UpdateIpAttribute[0];
    collectionId?: UpdateIpAttribute[1];
    key: UpdateIpAttribute[2];
    required: UpdateIpAttribute[3];
    xdefault?: UpdateIpAttribute[4];
    newKey?: UpdateIpAttribute[5];
};
declare const updateIpAttribute: ({ ...args }: UpdateIpAttributeArgs) => Promise<ReturnObject<UpdateIpAttributeAwaited>>;
/**
 * Updates a relationship attribute in a collection.
 */
type UpdateRelationshipAttributeArgs = {
    databaseId?: UpdateRelationshipAttribute[0];
    collectionId?: UpdateRelationshipAttribute[1];
    key: UpdateRelationshipAttribute[2];
    onDelete?: UpdateRelationshipAttribute[3];
    newKey?: UpdateRelationshipAttribute[4];
};
declare const updateRelationshipAttribute: ({ ...args }: UpdateRelationshipAttributeArgs) => Promise<ReturnObject<UpdateRelationshipAttributeAwaited>>;
/**
 * Updates a string attribute in a collection.
 */
type UpdateStringAttributeArgs = {
    databaseId?: UpdateStringAttribute[0];
    collectionId?: UpdateStringAttribute[1];
    key: UpdateStringAttribute[2];
    required: UpdateStringAttribute[3];
    xdefault?: UpdateStringAttribute[4];
    size?: UpdateStringAttribute[5];
    newKey?: UpdateStringAttribute[6];
};
declare const updateStringAttribute: ({ ...args }: UpdateStringAttributeArgs) => Promise<ReturnObject<UpdateStringAttributeAwaited>>;
/**
 * Updates a URL attribute in a collection.
 */
type UpdateUrlAttributeArgs = {
    databaseId?: UpdateUrlAttribute[0];
    collectionId?: UpdateUrlAttribute[1];
    key: UpdateUrlAttribute[2];
    required: UpdateUrlAttribute[3];
    xdefault?: UpdateUrlAttribute[4];
    newKey?: UpdateUrlAttribute[5];
};
declare const updateUrlAttribute: ({ ...args }: UpdateUrlAttributeArgs) => Promise<ReturnObject<UpdateUrlAttributeAwaited>>;
export { createBooleanAttribute, createCollection, createCollectionWithSchema, createDatabase, createDatetimeAttribute, createDocument, createEmailAttribute, createEnumAttribute, createFloatAttribute, createIndex, createIntegerAttribute, createIpAttribute, createRelationshipAttribute, createStringAttribute, createUrlAttribute, deleteAttribute, deleteCollection, deleteDatabase, deleteDocument, deleteIndex, getAttribute, getCollection, getDatabase, getDocument, getIndex, listAttributes, listCollections, listDatabases, listDocuments, listIndexes, updateBooleanAttribute, updateCollection, updateCollectionWithSchema, updateDatabase, updateDatetimeAttribute, updateDocument, updateEmailAttribute, updateEnumAttribute, updateFloatAttribute, updateIntegerAttribute, updateIpAttribute, updateRelationshipAttribute, updateStringAttribute, updateUrlAttribute, };
export { type CreateDatabase, type CreateDatabaseAwaited, type CreateDatabaseArgs, type CreateDatabaseReturnType, };
export { type CreateBooleanAttribute, type CreateBooleanAttributeAwaited, type CreateBooleanAttributeArgs, type CreateBooleanAttributeReturnType, };
export { type CreateCollection, type CreateCollectionAwaited, type CreateCollectionArgs, type CreateCollectionReturnType, };
export { type CreateCollectionWithSchema, type CreateCollectionWithSchemaAwaited, type CreateCollectionWithSchemaArgs, type CreateCollectionWithSchemaReturnType, };
export { type CreateDatetimeAttribute, type CreateDatetimeAttributeAwaited, type CreateDatetimeAttributeArgs, type CreateDatetimeAttributeReturnType, };
export { type CreateDocument, type CreateDocumentAwaited, type CreateDocumentArgs, type CreateDocumentReturnType, };
export { type CreateEmailAttribute, type CreateEmailAttributeAwaited, type CreateEmailAttributeArgs, type CreateEmailAttributeReturnType, };
export { type CreateEnumAttribute, type CreateEnumAttributeAwaited, type CreateEnumAttributeArgs, type CreateEnumAttributeReturnType, };
export { type CreateFloatAttribute, type CreateFloatAttributeAwaited, type CreateFloatAttributeArgs, type CreateFloatAttributeReturnType, };
export { type CreateIndex, type CreateIndexAwaited, type CreateIndexArgs, type CreateIndexReturnType, };
export { type CreateIntegerAttribute, type CreateIntegerAttributeAwaited, type CreateIntegerAttributeArgs, type CreateIntegerAttributeReturnType, };
export { type CreateIpAttribute, type CreateIpAttributeAwaited, type CreateIpAttributeArgs, type CreateIpAttributeReturnType, };
export { type CreateRelationshipAttribute, type CreateRelationshipAttributeAwaited, type CreateRelationshipAttributeArgs, type CreateRelationshipAttributeReturnType, };
export { type CreateStringAttribute, type CreateStringAttributeAwaited, type CreateStringAttributeArgs, type CreateStringAttributeReturnType, };
export { type CreateUrlAttribute, type CreateUrlAttributeAwaited, type CreateUrlAttributeArgs, type CreateUrlAttributeReturnType, };
export { type DeleteAttribute, type DeleteAttributeAwaited, type DeleteAttributeArgs, type DeleteAttributeReturnType, };
export { type DeleteCollection, type DeleteCollectionAwaited, type DeleteCollectionArgs, type DeleteCollectionReturnType, };
export { type DeleteDatabase, type DeleteDatabaseAwaited, type DeleteDatabaseArgs, type DeleteDatabaseReturnType, };
export { type DeleteDocument, type DeleteDocumentAwaited, type DeleteDocumentArgs, type DeleteDocumentReturnType, };
export { type DeleteIndex, type DeleteIndexAwaited, type DeleteIndexArgs, type DeleteIndexReturnType, };
export { type GetAttribute, type GetAttributeAwaited, type GetAttributeArgs, type GetAttributeReturnType, };
export { type GetCollection, type GetCollectionAwaited, type GetCollectionArgs, type GetCollectionReturnType, };
export { type GetDatabase, type GetDatabaseAwaited, type GetDatabaseArgs, type GetDatabaseReturnType, };
export { type GetDocument, type GetDocumentAwaited, type GetDocumentArgs, type GetDocumentReturnType, };
export { type GetIndex, type GetIndexAwaited, type GetIndexArgs, type GetIndexReturnType, };
export { type ListAttributes, type ListAttributesAwaited, type ListAttributesArgs, type ListAttributesReturnType, };
export { type ListCollections, type ListCollectionsAwaited, type ListCollectionsArgs, type ListCollectionsReturnType, };
export { type ListDatabases, type ListDatabasesAwaited, type ListDatabasesArgs, type ListDatabasesReturnType, };
export { type ListDocuments, type ListDocumentsAwaited, type ListDocumentsArgs, type ListDocumentsReturnType, };
export { type ListIndexes, type ListIndexesAwaited, type ListIndexesArgs, type ListIndexesReturnType, };
export { type UpdateBooleanAttribute, type UpdateBooleanAttributeAwaited, type UpdateBooleanAttributeArgs, type UpdateBooleanAttributeReturnType, };
export { type UpdateCollection, type UpdateCollectionAwaited, type UpdateCollectionArgs, type UpdateCollectionReturnType, };
export { type UpdateCollectionWithSchema, type UpdateCollectionWithSchemaAwaited, type UpdateCollectionWithSchemaArgs, type UpdateCollectionWithSchemaReturnType, };
export { type UpdateDatabase, type UpdateDatabaseAwaited, type UpdateDatabaseArgs, type UpdateDatabaseReturnType, };
export { type UpdateDatetimeAttribute, type UpdateDatetimeAttributeAwaited, type UpdateDatetimeAttributeArgs, type UpdateDatetimeAttributeReturnType, };
export { type UpdateDocument, type UpdateDocumentAwaited, type UpdateDocumentArgs, type UpdateDocumentReturnType, };
export { type UpdateEmailAttribute, type UpdateEmailAttributeAwaited, type UpdateEmailAttributeArgs, type UpdateEmailAttributeReturnType, };
export { type UpdateEnumAttribute, type UpdateEnumAttributeAwaited, type UpdateEnumAttributeArgs, type UpdateEnumAttributeReturnType, };
export { type UpdateFloatAttribute, type UpdateFloatAttributeAwaited, type UpdateFloatAttributeArgs, type UpdateFloatAttributeReturnType, };
export { type UpdateIntegerAttribute, type UpdateIntegerAttributeAwaited, type UpdateIntegerAttributeArgs, type UpdateIntegerAttributeReturnType, };
export { type UpdateIpAttribute, type UpdateIpAttributeAwaited, type UpdateIpAttributeArgs, type UpdateIpAttributeReturnType, };
export { type UpdateRelationshipAttribute, type UpdateRelationshipAttributeAwaited, type UpdateRelationshipAttributeArgs, type UpdateRelationshipAttributeReturnType, };
export { type UpdateStringAttribute, type UpdateStringAttributeAwaited, type UpdateStringAttributeArgs, type UpdateStringAttributeReturnType, };
export { type UpdateUrlAttribute, type UpdateUrlAttributeAwaited, type UpdateUrlAttributeArgs, type UpdateUrlAttributeReturnType, };
//# sourceMappingURL=databases.d.ts.map