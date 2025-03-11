"use server";

import {
  toLogsFolder,
  generateMigrationId,
  type LogType,
  toLogs,
} from "../ssr-utils";
import {
  getSchema,
  attributesEqual,
  createAttribute,
  updateAttribute,
  getAttributeFromKey,
  CollectionSchema,
} from "../collections";
import { handleApwError } from "../exceptions";
import { createAdminClient } from "../appwriteClients";
import { ID, Query, Models, Databases } from "node-appwrite";
import { isCollectionSchema } from "../collections/getSchema";
import { databaseId, userCollectionId } from "../appwriteConfig";

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

/*
 *
 * ARGUMENT TYPE DEFINITIONS
 *
 */
type CreateDatabase = Parameters<Databases["create"]>;
type CreateBooleanAttribute = Parameters<Databases["createBooleanAttribute"]>;
type CreateCollection = Parameters<Databases["createCollection"]>;
type CreateCollectionWithSchema = CreateCollectionAwaited; // NOT NATIVE APPWRITE METHOD
type CreateDatetimeAttribute = Parameters<Databases["createDatetimeAttribute"]>;
type CreateDocument = Parameters<Databases["createDocument"]>;
type CreateEmailAttribute = Parameters<Databases["createEmailAttribute"]>;
type CreateEnumAttribute = Parameters<Databases["createEnumAttribute"]>;
type CreateFloatAttribute = Parameters<Databases["createFloatAttribute"]>;
type CreateIndex = Parameters<Databases["createIndex"]>;
type CreateIntegerAttribute = Parameters<Databases["createIntegerAttribute"]>;
type CreateIpAttribute = Parameters<Databases["createIpAttribute"]>;
type CreateRelationshipAttribute = Parameters<
  Databases["createRelationshipAttribute"]
>;
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
type UpdateCollectionWithSchema = UpdateCollection; // NOT NATIVE APPWRITE METHOD
type UpdateDatabase = Parameters<Databases["update"]>;
type UpdateDatetimeAttribute = Parameters<Databases["updateDatetimeAttribute"]>;
type UpdateDocument = Parameters<Databases["updateDocument"]>;
type UpdateEmailAttribute = Parameters<Databases["updateEmailAttribute"]>;
type UpdateEnumAttribute = Parameters<Databases["updateEnumAttribute"]>;
type UpdateFloatAttribute = Parameters<Databases["updateFloatAttribute"]>;
type UpdateIntegerAttribute = Parameters<Databases["updateIntegerAttribute"]>;
type UpdateIpAttribute = Parameters<Databases["updateIpAttribute"]>;
type UpdateRelationshipAttribute = Parameters<
  Databases["updateRelationshipAttribute"]
>;
type UpdateStringAttribute = Parameters<Databases["updateStringAttribute"]>;
type UpdateUrlAttribute = Parameters<Databases["updateUrlAttribute"]>;

/*
 *
 * RETURN TYPE DEFINITIONS
 *
 */
type CreateDatabaseReturnType = ReturnType<Databases["create"]>;
type CreateBooleanAttributeReturnType = ReturnType<
  Databases["createBooleanAttribute"]
>;
type CreateCollectionReturnType = ReturnType<Databases["createCollection"]>;
type CreateCollectionWithSchemaReturnType = CreateCollectionReturnType; // NOT NATIVE APPWRITE METHOD
type CreateDatetimeAttributeReturnType = ReturnType<
  Databases["createDatetimeAttribute"]
>;
type CreateDocumentReturnType = ReturnType<Databases["createDocument"]>;
type CreateEmailAttributeReturnType = ReturnType<
  Databases["createEmailAttribute"]
>;
type CreateEnumAttributeReturnType = ReturnType<
  Databases["createEnumAttribute"]
>;
type CreateFloatAttributeReturnType = ReturnType<
  Databases["createFloatAttribute"]
>;
type CreateIndexReturnType = ReturnType<Databases["createIndex"]>;
type CreateIntegerAttributeReturnType = ReturnType<
  Databases["createIntegerAttribute"]
>;
type CreateIpAttributeReturnType = ReturnType<Databases["createIpAttribute"]>;
type CreateRelationshipAttributeReturnType = ReturnType<
  Databases["createRelationshipAttribute"]
>;
type CreateStringAttributeReturnType = ReturnType<
  Databases["createStringAttribute"]
>;
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
type UpdateBooleanAttributeReturnType = ReturnType<
  Databases["updateBooleanAttribute"]
>;
type UpdateCollectionReturnType = ReturnType<Databases["updateCollection"]>;
type UpdateCollectionWithSchemaReturnType = UpdateCollectionReturnType; // NOT NATIVE APPWRITE METHOD
type UpdateDatabaseReturnType = ReturnType<Databases["update"]>;
type UpdateDatetimeAttributeReturnType = ReturnType<
  Databases["updateDatetimeAttribute"]
>;
type UpdateDocumentReturnType = ReturnType<Databases["updateDocument"]>;
type UpdateEmailAttributeReturnType = ReturnType<
  Databases["updateEmailAttribute"]
>;
type UpdateEnumAttributeReturnType = ReturnType<
  Databases["updateEnumAttribute"]
>;
type UpdateFloatAttributeReturnType = ReturnType<
  Databases["updateFloatAttribute"]
>;
type UpdateIntegerAttributeReturnType = ReturnType<
  Databases["updateIntegerAttribute"]
>;
type UpdateIpAttributeReturnType = ReturnType<Databases["updateIpAttribute"]>;
type UpdateRelationshipAttributeReturnType = ReturnType<
  Databases["updateRelationshipAttribute"]
>;
type UpdateStringAttributeReturnType = ReturnType<
  Databases["updateStringAttribute"]
>;
type UpdateUrlAttributeReturnType = ReturnType<Databases["updateUrlAttribute"]>;

/*
 *
 * AWAITED RETURN TYPE DEFINITIONS
 *
 */
type CreateDatabaseAwaited = Awaited<ReturnType<Databases["create"]>>;
type CreateBooleanAttributeAwaited = Awaited<
  ReturnType<Databases["createBooleanAttribute"]>
>;
type CreateCollectionAwaited = Awaited<
  ReturnType<Databases["createCollection"]>
>;
type CreateCollectionWithSchemaAwaited = CreateCollectionAwaited; // NOT NATIVE APPWRITE METHOD
type CreateDatetimeAttributeAwaited = Awaited<
  ReturnType<Databases["createDatetimeAttribute"]>
>;
type CreateDocumentAwaited = Awaited<ReturnType<Databases["createDocument"]>>;
type CreateEmailAttributeAwaited = Awaited<
  ReturnType<Databases["createEmailAttribute"]>
>;
type CreateEnumAttributeAwaited = Awaited<
  ReturnType<Databases["createEnumAttribute"]>
>;
type CreateFloatAttributeAwaited = Awaited<
  ReturnType<Databases["createFloatAttribute"]>
>;
type CreateIndexAwaited = Awaited<ReturnType<Databases["createIndex"]>>;
type CreateIntegerAttributeAwaited = Awaited<
  ReturnType<Databases["createIntegerAttribute"]>
>;
type CreateIpAttributeAwaited = Awaited<
  ReturnType<Databases["createIpAttribute"]>
>;
type CreateRelationshipAttributeAwaited = Awaited<
  ReturnType<Databases["createRelationshipAttribute"]>
>;
type CreateStringAttributeAwaited = Awaited<
  ReturnType<Databases["createStringAttribute"]>
>;
type CreateUrlAttributeAwaited = Awaited<
  ReturnType<Databases["createUrlAttribute"]>
>;
type DeleteAttributeAwaited = Awaited<ReturnType<Databases["deleteAttribute"]>>;
type DeleteCollectionAwaited = Awaited<
  ReturnType<Databases["deleteCollection"]>
>;
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
type UpdateBooleanAttributeAwaited = Awaited<
  ReturnType<Databases["updateBooleanAttribute"]>
>;
type UpdateCollectionAwaited = Awaited<
  ReturnType<Databases["updateCollection"]>
>;
type UpdateCollectionWithSchemaAwaited = UpdateCollectionAwaited; // NOT NATIVE APPWRITE METHOD
type UpdateDatabaseAwaited = Awaited<ReturnType<Databases["update"]>>;
type UpdateDatetimeAttributeAwaited = Awaited<
  ReturnType<Databases["updateDatetimeAttribute"]>
>;
type UpdateDocumentAwaited = Awaited<ReturnType<Databases["updateDocument"]>>;
type UpdateEmailAttributeAwaited = Awaited<
  ReturnType<Databases["updateEmailAttribute"]>
>;
type UpdateEnumAttributeAwaited = Awaited<
  ReturnType<Databases["updateEnumAttribute"]>
>;
type UpdateFloatAttributeAwaited = Awaited<
  ReturnType<Databases["updateFloatAttribute"]>
>;
type UpdateIntegerAttributeAwaited = Awaited<
  ReturnType<Databases["updateIntegerAttribute"]>
>;
type UpdateIpAttributeAwaited = Awaited<
  ReturnType<Databases["updateIpAttribute"]>
>;
type UpdateRelationshipAttributeAwaited = Awaited<
  ReturnType<Databases["updateRelationshipAttribute"]>
>;
type UpdateStringAttributeAwaited = Awaited<
  ReturnType<Databases["updateStringAttribute"]>
>;
type UpdateUrlAttributeAwaited = Awaited<
  ReturnType<Databases["updateUrlAttribute"]>
>;

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
const createBooleanAttribute = async ({
  ...args
}: CreateBooleanAttributeArgs): Promise<
  ReturnObject<CreateBooleanAttributeAwaited>
> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as CreateBooleanAttributeArgs;
    const data = await databases.createBooleanAttribute(
      ...(Object.values(newArgs) as CreateBooleanAttribute)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const createCollection = async ({
  ...args
}: CreateCollectionArgs): Promise<ReturnObject<CreateCollectionAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: ID.unique(),
    } as CreateCollectionArgs;

    const data = await databases.createCollection(
      ...(Object.values(newArgs) as CreateCollection)
    );

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Creates a collection according to a defined schema.
 * To execute successfully, there must be a schema file (JSON) in the schemas folder,
 * named as the collection name.
 * This schema folder path must be defined in env vars (see appwriteConfig.ts)
 */
type CreateCollectionWithSchemaArgs = CreateCollectionArgs;
const createCollectionWithSchema = async ({
  ...args
}: CreateCollectionWithSchemaArgs): Promise<
  ReturnObject<CreateCollectionAwaited>
> => {
  // Use provided databaseId/collectionId if available; otherwise use defaults.
  const finalDatabaseId = args.databaseId ?? databaseId;
  const finalCollectionId = args.collectionId ?? ID.unique();

  // Initialize a log object.
  const logTopic = "migration";
  const logDetails = "schemaCreate";
  const logContent: LogType = {
    id: await generateMigrationId(args.name),
    executed_at: new Date().toISOString(),
    status: "success",
    databaseId: finalDatabaseId,
    collectionId: finalCollectionId,
    changes: [],
  };

  try {
    const { databases } = await createAdminClient();

    const newArgs: CreateCollectionWithSchemaArgs = {
      ...args,
      databaseId: finalDatabaseId,
      collectionId: finalCollectionId,
    };

    logContent.changes.push({
      action: "listCollections",
      information: `Listing collections in database '${newArgs.databaseId}'.`,
    });
    const collList = await databases.listCollections(newArgs.databaseId!);
    let coll = collList.collections.find(
      (collection: Models.Collection) => collection.name === newArgs.name
    );

    if (coll) {
      logContent.changes.push({
        action: "listCollections",
        information: `Collection '${newArgs.name}' already exists.`,
      });
      throw new Error(`Collection '${newArgs.name}' already exists`);
    } else {
      logContent.changes.push({
        action: "listCollections",
        information: `Collection '${newArgs.name}' not found; proceeding to create.`,
      });
      const schema = await getSchema(newArgs.name, logContent);
      if (!schema || !isCollectionSchema(schema)) {
        logContent.changes.push({
          action: "getSchema",
          information: `No valid schema found for collection '${newArgs.name}'.`,
        });
        throw new Error(`No schema found for collection '${newArgs.name}'`);
      }
      if (!schema.attributes || schema.attributes.length < 1) {
        logContent.changes.push({
          action: "getSchema",
          information: `No attributes found in schema '${schema.collectionName}'.`,
        });
        throw new Error(
          `No attributes found in schema for collection '${newArgs.name}'`
        );
      }
      logContent.changes.push({
        action: "getSchema",
        information: `Schema '${schema.collectionName}' loaded for collection creation.`,
      });

      coll = await databases.createCollection(
        newArgs.databaseId!,
        ID.unique(),
        schema.collectionName,
        schema.permissions,
        schema.documentSecurity,
        schema.enabled
      );
      logContent.changes.push({
        action: "createCollection",
        information: `Collection '${schema.collectionName}' created.`,
      });

      for (const attr of schema.attributes) {
        logContent.changes.push({
          action: "createAttribute",
          information: `Creating attribute '${attr.key}'.`,
        });
        await createAttribute(newArgs.databaseId!, newArgs.collectionId!, attr);
        logContent.changes.push({
          action: "createAttribute",
          information: `Attribute '${attr.key}' created.`,
        });
      }

      for (const index of schema.indexes) {
        logContent.changes.push({
          action: "createIndex",
          information: `Creating index '${index.key}' of type '${index.type}'.`,
        });
        await databases.createIndex(
          newArgs.databaseId!,
          newArgs.collectionId!,
          index.key,
          index.type,
          index.attributes,
          index.orders
        );
        logContent.changes.push({
          action: "createIndex",
          information: `Index '${index.key}' created.`,
        });
      }
      logContent.executed_at = new Date().toISOString();
      logContent.status = "success";

      // Write log using primary logging mechanism.
      await toLogs(logTopic, logDetails, logContent);

      return { data: coll, error: null };
    }
  } catch (error: any) {
    logContent.executed_at = new Date().toISOString();
    logContent.status = "failure";
    await toLogsFolder(logTopic, logDetails, logContent);
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Creates a database.
 */
type CreateDatabaseArgs = {
  databaseId?: CreateDatabase[0];
  name: CreateDatabase[1];
  enabled?: CreateDatabase[2];
};
const createDatabase = async ({
  ...args
}: CreateDatabaseArgs): Promise<ReturnObject<CreateDatabaseAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
    } as CreateDatabaseArgs;

    const data = await databases.create(
      ...(Object.values(newArgs) as CreateDatabase)
    );

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const createDatetimeAttribute = async ({
  ...args
}: CreateDatetimeAttributeArgs): Promise<
  ReturnObject<CreateDatetimeAttributeAwaited>
> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as CreateDatetimeAttributeArgs;

    const data = await databases.createDatetimeAttribute(
      ...(Object.values(newArgs) as CreateDatetimeAttribute)
    );

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const createDocument = async ({
  ...args
}: CreateDocumentArgs): Promise<ReturnObject<CreateDocumentAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
      documentId: ID.unique(),
    } as CreateDocumentArgs;

    const data = await databases.createDocument(
      ...(Object.values(newArgs) as CreateDocument)
    );

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const createEmailAttribute = async ({
  ...args
}: CreateEmailAttributeArgs): Promise<
  ReturnObject<CreateEmailAttributeAwaited>
> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as CreateEmailAttributeArgs;

    const data = await databases.createEmailAttribute(
      ...(Object.values(newArgs) as CreateEmailAttribute)
    );

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const createEnumAttribute = async ({
  ...args
}: CreateEnumAttributeArgs): Promise<
  ReturnObject<CreateEnumAttributeAwaited>
> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as CreateEnumAttributeArgs;

    const data = await databases.createEnumAttribute(
      ...(Object.values(newArgs) as CreateEnumAttribute)
    );

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const createFloatAttribute = async ({
  ...args
}: CreateFloatAttributeArgs): Promise<
  ReturnObject<CreateFloatAttributeAwaited>
> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as CreateFloatAttributeArgs;

    const data = await databases.createFloatAttribute(
      ...(Object.values(newArgs) as CreateFloatAttribute)
    );

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const createIndex = async ({
  ...args
}: CreateIndexArgs): Promise<ReturnObject<CreateIndexAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as CreateIndexArgs;

    const data = await databases.createIndex(
      ...(Object.values(newArgs) as CreateIndex)
    );

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const createIntegerAttribute = async ({
  ...args
}: CreateIntegerAttributeArgs): Promise<
  ReturnObject<CreateIntegerAttributeAwaited>
> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as CreateIntegerAttributeArgs;

    const data = await databases.createIntegerAttribute(
      ...(Object.values(newArgs) as CreateIntegerAttribute)
    );

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const createIpAttribute = async ({
  ...args
}: CreateIpAttributeArgs): Promise<ReturnObject<CreateIpAttributeAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as CreateIpAttributeArgs;

    const data = await databases.createIpAttribute(
      ...(Object.values(newArgs) as CreateIpAttribute)
    );

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const createRelationshipAttribute = async ({
  ...args
}: CreateRelationshipAttributeArgs): Promise<
  ReturnObject<CreateRelationshipAttributeAwaited>
> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as CreateRelationshipAttributeArgs;

    const data = await databases.createRelationshipAttribute(
      ...(Object.values(newArgs) as CreateRelationshipAttribute)
    );

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const createStringAttribute = async ({
  ...args
}: CreateStringAttributeArgs): Promise<
  ReturnObject<CreateStringAttributeAwaited>
> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as CreateStringAttributeArgs;

    const data = await databases.createStringAttribute(
      ...(Object.values(newArgs) as CreateStringAttribute)
    );

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const createUrlAttribute = async ({
  ...args
}: CreateUrlAttributeArgs): Promise<
  ReturnObject<CreateUrlAttributeAwaited>
> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as CreateUrlAttributeArgs;

    const data = await databases.createUrlAttribute(
      ...(Object.values(newArgs) as CreateUrlAttribute)
    );

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Deletes an attribute in a collection.
 */
type DeleteAttributeArgs = {
  databaseId?: DeleteAttribute[0];
  collectionId?: DeleteAttribute[1];
  key: DeleteAttribute[2];
};
const deleteAttribute = async ({
  ...args
}: DeleteAttributeArgs): Promise<ReturnObject<DeleteAttributeAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as DeleteAttributeArgs;

    const data = await databases.deleteAttribute(
      ...(Object.values(newArgs) as DeleteAttribute)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Deletes a collection in a database.
 */
type DeleteCollectionArgs = {
  databaseId?: DeleteCollection[0];
  collectionId: DeleteCollection[1];
};
const deleteCollection = async ({
  ...args
}: DeleteCollectionArgs): Promise<ReturnObject<DeleteCollectionAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
    } as DeleteCollectionArgs;

    const data = await databases.deleteCollection(
      ...(Object.values(newArgs) as DeleteCollection)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Deletes a database.
 */
type DeleteDatabaseArgs = {
  databaseId: DeleteDatabase[0];
};
const deleteDatabase = async ({
  ...args
}: DeleteDatabaseArgs): Promise<ReturnObject<DeleteDatabaseAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
    } as DeleteDatabaseArgs;

    const data = await databases.delete(
      ...(Object.values(newArgs) as DeleteDatabase)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Deletes a document from a collection.
 */
type DeleteDocumentArgs = {
  databaseId?: DeleteDocument[0];
  collectionId?: DeleteDocument[1];
  documentId: DeleteDocument[2];
};
const deleteDocument = async ({
  ...args
}: DeleteDocumentArgs): Promise<ReturnObject<DeleteDocumentAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as DeleteDocumentArgs;

    const data = await databases.deleteDocument(
      ...(Object.values(newArgs) as DeleteDocument)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Deletes an index from a collection.
 */
type DeleteIndexArgs = {
  databaseId?: DeleteIndex[0];
  collectionId?: DeleteIndex[1];
  key: DeleteIndex[2];
};
const deleteIndex = async ({
  ...args
}: DeleteIndexArgs): Promise<ReturnObject<DeleteIndexAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as DeleteIndexArgs;

    const data = await databases.deleteIndex(
      ...(Object.values(newArgs) as DeleteIndex)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Retrieves an attribute from a collection.
 */
type GetAttributeArgs = {
  databaseId?: GetAttribute[0];
  collectionId?: GetAttribute[1];
  key: GetAttribute[2];
};
const getAttribute = async ({
  ...args
}: GetAttributeArgs): Promise<ReturnObject<GetAttributeAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as GetAttributeArgs;

    const data = await databases.getAttribute(
      ...(Object.values(newArgs) as GetAttribute)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Retrieves a collection from a database.
 */
type GetCollectionArgs = {
  databaseId?: GetCollection[0];
  collectionId: GetCollection[1];
};
const getCollection = async ({
  ...args
}: GetCollectionArgs): Promise<ReturnObject<GetCollectionAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
    } as GetCollectionArgs;

    const data = await databases.getCollection(
      ...(Object.values(newArgs) as GetCollection)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Retrieves a database by its ID.
 */
type GetDatabaseArgs = { dbId: GetDatabase[0] };
const getDatabase = async ({
  ...args
}: GetDatabaseArgs): Promise<ReturnObject<GetDatabaseAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
    } as GetDatabaseArgs;

    const data = await databases.get(
      ...(Object.values(newArgs) as GetDatabase)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Retrieves a document from a collection.
 */
type GetDocumentArgs = {
  databaseId?: GetDocument[0];
  collectionId?: GetDocument[1];
  documentId: GetDocument[2];
  query?: string;
};
const getDocument = async ({
  ...args
}: GetDocumentArgs): Promise<ReturnObject<GetDocumentAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as GetDocumentArgs;

    const data = await databases.getDocument(
      ...(Object.values(newArgs) as GetDocument)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Retrieves an index from a collection.
 */
type GetIndexArgs = {
  databaseId?: GetIndex[0];
  collectionId?: GetIndex[1];
  key: GetIndex[2];
};
const getIndex = async ({
  ...args
}: GetIndexArgs): Promise<ReturnObject<GetIndexAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as GetIndexArgs;

    const data = await databases.getIndex(
      ...(Object.values(newArgs) as GetIndex)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Lists all attributes in a collection.
 */
type ListAttributesArgs = {
  databaseId?: ListAttributes[0];
  collectionId?: ListAttributes[1];
  queries?: ListAttributes[2];
};
const listAttributes = async ({
  ...args
}: ListAttributesArgs): Promise<ReturnObject<ListAttributesAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as ListAttributesArgs;

    const data = await databases.listAttributes(
      ...(Object.values(newArgs) as ListAttributes)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Lists all collections in a database.
 */
type ListCollectionsArgs = {
  databaseId?: ListCollections[0];
  queries?: ListCollections[1];
  search?: ListCollections[2];
};
const listCollections = async ({
  ...args
}: ListCollectionsArgs): Promise<ReturnObject<ListCollectionsAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
    } as ListCollectionsArgs;

    const data = await databases.listCollections(
      ...(Object.values(newArgs) as ListCollections)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Lists all databases in the Appwrite project.
 */
type ListDatabasesArgs = {
  queries?: ListDatabases[0];
  search?: ListDatabases[1];
};
const listDatabases = async ({
  ...args
}: ListDatabasesArgs): Promise<ReturnObject<ListDatabasesAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
    } as ListDatabasesArgs;

    const data = await databases.list(
      ...(Object.values(newArgs) as ListDatabases)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Lists all documents in a specific collection.
 */
type ListDocumentsArgs = {
  databaseId?: ListDocuments[0];
  collectionId?: ListDocuments[1];
  queries?: ListDocuments[2];
};
const listDocuments = async ({
  ...args
}: ListDocumentsArgs): Promise<ReturnObject<ListDocumentsAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as ListDocumentsArgs;

    const data = await databases.listDocuments(
      ...(Object.values(newArgs) as ListDocuments)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Lists all indexes in a collection.
 */
type ListIndexesArgs = {
  databaseId?: ListIndexes[0];
  collectionId?: ListIndexes[1];
  queries?: ListIndexes[2];
};
const listIndexes = async ({
  ...args
}: ListIndexesArgs): Promise<ReturnObject<ListIndexesAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as ListIndexesArgs;

    const data = await databases.listIndexes(
      ...(Object.values(newArgs) as ListIndexes)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const updateBooleanAttribute = async ({
  ...args
}: UpdateBooleanAttributeArgs): Promise<
  ReturnObject<UpdateBooleanAttributeAwaited>
> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as UpdateBooleanAttributeArgs;

    const data = await databases.updateBooleanAttribute(
      ...(Object.values(newArgs) as UpdateBooleanAttribute)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const updateCollection = async ({
  ...args
}: UpdateCollectionArgs): Promise<ReturnObject<UpdateCollectionAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
    } as UpdateCollectionArgs;

    const collList = await databases.listCollections(newArgs.databaseId!, [
      Query.and([
        Query.equal("name", newArgs.name),
        Query.equal("$id", newArgs.collectionId),
      ]),
    ]);

    if (collList.total < 1) {
      throw new Error(
        `Collection with name: '${newArgs.name}' / id:'${newArgs.collectionId}' not found`
      );
    }
    if (collList.total > 1) {
      throw new Error(
        `Collection with name: '${newArgs.name}' / id:'${newArgs.collectionId}' not unique, multiple collections with the same name and/or id found`
      );
    }

    const data = await databases.updateCollection(
      ...(Object.values(newArgs) as UpdateCollection)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Updates a collection according to a defined schema.
 * To execute successfully, there must be a schema file (JSON) in the schemas folder,
 * named as the collection name. The schema folder path must be defined in env vars.
 */
type UpdateCollectionWithSchemaArgs = UpdateCollectionArgs & {
  destructive?: boolean;
};
const updateCollectionWithSchema = async ({
  ...args
}: UpdateCollectionWithSchemaArgs): Promise<
  ReturnObject<UpdateCollectionWithSchemaAwaited>
> => {
  // Use provided databaseId/collectionId if available; otherwise use defaults.
  const finalDatabaseId = args.databaseId ?? databaseId;
  const finalCollectionId = args.collectionId ?? ID.unique();

  // Initialize a log object.
  const logTopic = "migration";
  const logDetails = "schemaUpdate";
  const logContent: LogType = {
    id: await generateMigrationId(args.name),
    executed_at: new Date().toISOString(),
    status: "success",
    databaseId: finalDatabaseId,
    collectionId: finalCollectionId,
    changes: [],
  };

  try {
    const { databases } = await createAdminClient();

    const newArgs: UpdateCollectionWithSchemaArgs = {
      ...args,
      databaseId: finalDatabaseId,
      collectionId: finalCollectionId,
    };

    // List collections.
    logContent.changes.push({
      action: "listCollections",
      information: `Listing collection '${newArgs.name}' (id: '${newArgs.collectionId}') in database '${newArgs.databaseId}'.`,
    });
    const collList = await databases.listCollections(newArgs.databaseId!, [
      Query.and([
        Query.equal("name", newArgs.name),
        Query.equal("$id", newArgs.collectionId),
      ]),
    ]);
    if (collList.total < 1) {
      logContent.changes.push({
        action: "listCollections",
        information: `Collection '${newArgs.name}' (id: '${newArgs.collectionId}') not found.`,
      });
      throw new Error(
        `Collection '${newArgs.name}' (id: '${newArgs.collectionId}') not found`
      );
    }
    if (collList.total > 1) {
      logContent.changes.push({
        action: "listCollections",
        information: `Collection '${newArgs.name}' (id: '${newArgs.collectionId}') not unique.`,
      });
      throw new Error(
        `Collection '${newArgs.name}' (id: '${newArgs.collectionId}') not unique`
      );
    }
    logContent.changes.push({
      action: "listCollections",
      information: `Found collection '${newArgs.name}' (id: '${newArgs.collectionId}').`,
    });
    const currentCollection = collList.collections[0];

    // Retrieve the schema.
    const schema = await getSchema(newArgs.name, logContent);
    if (!schema || !isCollectionSchema(schema)) {
      logContent.changes.push({
        action: "getSchema",
        information: `No valid schema found for collection '${newArgs.name}'.`,
      });
      throw new Error(`No schema found for collection '${newArgs.name}'`);
    }
    // Now schema is of type CollectionSchema
    if (!schema.attributes || schema.attributes.length < 1) {
      logContent.changes.push({
        action: "getSchema",
        information: `No attributes found in schema '${schema.collectionName}'.`,
      });
      throw new Error(
        `No attributes found in schema for collection '${newArgs.name}'`
      );
    }
    logContent.changes.push({
      action: "getSchema",
      information: `Schema '${schema.collectionName}' loaded.`,
    });

    // Update newArgs with schema values.
    newArgs.name = schema.collectionName;
    newArgs.permissions = schema.permissions;
    newArgs.documentSecurity = schema.documentSecurity;
    newArgs.enabled = schema.enabled;

    // Compare collection keys: permissions, documentSecurity, enabled.
    let coll: Models.Collection;
    if (
      JSON.stringify(newArgs.permissions) !==
        JSON.stringify(currentCollection.$permissions) ||
      newArgs.documentSecurity !== currentCollection.documentSecurity ||
      newArgs.enabled !== currentCollection.enabled
    ) {
      const updateCollectionParams: UpdateCollection = [
        newArgs.databaseId!,
        newArgs.collectionId!,
        newArgs.name,
        newArgs.permissions,
        newArgs.documentSecurity,
        newArgs.enabled,
      ];
      coll = await databases.updateCollection(...updateCollectionParams);
      logContent.changes.push({
        action: "updateCollection",
        information: `Collection updated with new schema values.`,
      });
    } else {
      coll = currentCollection;
      logContent.changes.push({
        action: "updateCollection",
        information: `No update necessary for permissions, documentSecurity, or enabled.`,
      });
    }

    // Process attributes.
    const currentAttributeKeys = new Set(
      (coll.attributes as unknown as Array<{ key: string }>).map(
        (attr) => attr.key
      )
    );
    const schemaAttributeKeys = new Set(
      schema.attributes.map((attr) => attr.key)
    );
    for (const schemaAttr of schema.attributes) {
      if (!currentAttributeKeys.has(schemaAttr.key)) {
        logContent.changes.push({
          action: "createAttribute",
          information: `Attribute '${schemaAttr.key}' not found; creating it.`,
        });
        await createAttribute(
          newArgs.databaseId!,
          newArgs.collectionId,
          schemaAttr
        );
        logContent.changes.push({
          action: "createAttribute",
          information: `Attribute '${schemaAttr.key}' created.`,
        });
      } else if (args.destructive) {
        const existingAttr = getAttributeFromKey(
          schemaAttr.key,
          schema.attributes
        );
        if (!attributesEqual(existingAttr!, schemaAttr)) {
          logContent.changes.push({
            action: "updateAttribute",
            information: `Attribute '${schemaAttr.key}' differs from schema; updating it.`,
          });
          await updateAttribute(
            newArgs.databaseId!,
            newArgs.collectionId,
            schemaAttr
          );
          logContent.changes.push({
            action: "updateAttribute",
            information: `Attribute '${schemaAttr.key}' updated.`,
          });
        } else {
          logContent.changes.push({
            action: "updateAttribute",
            information: `Attribute '${schemaAttr.key}' is up-to-date.`,
          });
        }
      } else {
        logContent.changes.push({
          action: "skipAttribute",
          information: `Attribute '${schemaAttr.key}' exists; no update performed.`,
        });
      }
    }

    if (args.destructive) {
      const attributesToRemove = Array.from(currentAttributeKeys).filter(
        (key) => !schemaAttributeKeys.has(key)
      );
      for (const key of attributesToRemove) {
        logContent.changes.push({
          action: "deleteAttribute",
          information: `Attribute '${key}' exists in collection but not in schema; removing it.`,
        });
        await deleteAttribute({
          databaseId: newArgs.databaseId!,
          collectionId: newArgs.collectionId,
          key,
        });
        logContent.changes.push({
          action: "deleteAttribute",
          information: `Attribute '${key}' removed.`,
        });
      }
    }

    // Process indexes.
    for (const index of schema.indexes) {
      logContent.changes.push({
        action: "createIndex",
        information: `Creating index '${index.key}' of type '${index.type}'.`,
      });
      await databases.createIndex(
        newArgs.databaseId!,
        newArgs.collectionId,
        index.key,
        index.type,
        index.attributes,
        index.orders
      );
      logContent.changes.push({
        action: "createIndex",
        information: `Index '${index.key}' created.`,
      });
    }

    logContent.executed_at = new Date().toISOString();
    logContent.status = "success";

    // Write log using primary logging mechanism.
    await toLogs(logTopic, logDetails, logContent);

    return { data: coll, error: null };
  } catch (error: any) {
    logContent.executed_at = new Date().toISOString();
    logContent.status = "failure";
    await toLogsFolder(logTopic, logDetails, logContent);
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Updates a database in the Appwrite project.
 */
type UpdateDatabaseArgs = {
  databaseId?: UpdateDatabase[0];
  name: UpdateDatabase[1];
  enabled?: UpdateDatabase[2];
};
const updateDatabase = async ({
  ...args
}: UpdateDatabaseArgs): Promise<ReturnObject<UpdateDatabaseAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
    } as UpdateDatabaseArgs;

    const data = await databases.update(
      ...(Object.values(newArgs) as UpdateDatabase)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const updateDatetimeAttribute = async ({
  ...args
}: UpdateDatetimeAttributeArgs): Promise<
  ReturnObject<UpdateDatetimeAttributeAwaited>
> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as UpdateDatetimeAttributeArgs;

    const data = await databases.updateDatetimeAttribute(
      ...(Object.values(newArgs) as UpdateDatetimeAttribute)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const updateDocument = async ({
  ...args
}: UpdateDocumentArgs): Promise<ReturnObject<UpdateDocumentAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as UpdateDocumentArgs;

    const data = await databases.updateDocument(
      ...(Object.values(newArgs) as UpdateDocument)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const updateEmailAttribute = async ({
  ...args
}: UpdateEmailAttributeArgs): Promise<
  ReturnObject<UpdateEmailAttributeAwaited>
> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as UpdateEmailAttributeArgs;

    const data = await databases.updateEmailAttribute(
      ...(Object.values(newArgs) as UpdateEmailAttribute)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const updateEnumAttribute = async ({
  ...args
}: UpdateEnumAttributeArgs): Promise<
  ReturnObject<UpdateEnumAttributeAwaited>
> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as UpdateEnumAttributeArgs;

    const data = await databases.updateEnumAttribute(
      ...(Object.values(newArgs) as UpdateEnumAttribute)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const updateFloatAttribute = async ({
  ...args
}: UpdateFloatAttributeArgs): Promise<
  ReturnObject<UpdateFloatAttributeAwaited>
> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as UpdateFloatAttributeArgs;

    const data = await databases.updateFloatAttribute(
      ...(Object.values(newArgs) as UpdateFloatAttribute)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const updateIntegerAttribute = async ({
  ...args
}: UpdateIntegerAttributeArgs): Promise<
  ReturnObject<UpdateIntegerAttributeAwaited>
> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as UpdateIntegerAttributeArgs;

    const data = await databases.updateIntegerAttribute(
      ...(Object.values(newArgs) as UpdateIntegerAttribute)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const updateIpAttribute = async ({
  ...args
}: UpdateIpAttributeArgs): Promise<ReturnObject<UpdateIpAttributeAwaited>> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as UpdateIpAttributeArgs;

    const data = await databases.updateIpAttribute(
      ...(Object.values(newArgs) as UpdateIpAttribute)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const updateRelationshipAttribute = async ({
  ...args
}: UpdateRelationshipAttributeArgs): Promise<
  ReturnObject<UpdateRelationshipAttributeAwaited>
> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as UpdateRelationshipAttributeArgs;

    const data = await databases.updateRelationshipAttribute(
      ...(Object.values(newArgs) as UpdateRelationshipAttribute)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const updateStringAttribute = async ({
  ...args
}: UpdateStringAttributeArgs): Promise<
  ReturnObject<UpdateStringAttributeAwaited>
> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as UpdateStringAttributeArgs;

    const data = await databases.updateStringAttribute(
      ...(Object.values(newArgs) as UpdateStringAttribute)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const updateUrlAttribute = async ({
  ...args
}: UpdateUrlAttributeArgs): Promise<
  ReturnObject<UpdateUrlAttributeAwaited>
> => {
  try {
    const { databases } = await createAdminClient();

    const newArgs = {
      ...args,
      databaseId: databaseId,
      collectionId: userCollectionId,
    } as UpdateUrlAttributeArgs;

    const data = await databases.updateUrlAttribute(
      ...(Object.values(newArgs) as UpdateUrlAttribute)
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
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
  updateCollectionWithSchema,
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

export {
  type CreateDatabase,
  type CreateDatabaseAwaited,
  type CreateDatabaseArgs,
  type CreateDatabaseReturnType,
};
export {
  type CreateBooleanAttribute,
  type CreateBooleanAttributeAwaited,
  type CreateBooleanAttributeArgs,
  type CreateBooleanAttributeReturnType,
};
export {
  type CreateCollection,
  type CreateCollectionAwaited,
  type CreateCollectionArgs,
  type CreateCollectionReturnType,
};
export {
  type CreateCollectionWithSchema,
  type CreateCollectionWithSchemaAwaited,
  type CreateCollectionWithSchemaArgs,
  type CreateCollectionWithSchemaReturnType,
};
export {
  type CreateDatetimeAttribute,
  type CreateDatetimeAttributeAwaited,
  type CreateDatetimeAttributeArgs,
  type CreateDatetimeAttributeReturnType,
};
export {
  type CreateDocument,
  type CreateDocumentAwaited,
  type CreateDocumentArgs,
  type CreateDocumentReturnType,
};
export {
  type CreateEmailAttribute,
  type CreateEmailAttributeAwaited,
  type CreateEmailAttributeArgs,
  type CreateEmailAttributeReturnType,
};
export {
  type CreateEnumAttribute,
  type CreateEnumAttributeAwaited,
  type CreateEnumAttributeArgs,
  type CreateEnumAttributeReturnType,
};
export {
  type CreateFloatAttribute,
  type CreateFloatAttributeAwaited,
  type CreateFloatAttributeArgs,
  type CreateFloatAttributeReturnType,
};
export {
  type CreateIndex,
  type CreateIndexAwaited,
  type CreateIndexArgs,
  type CreateIndexReturnType,
};
export {
  type CreateIntegerAttribute,
  type CreateIntegerAttributeAwaited,
  type CreateIntegerAttributeArgs,
  type CreateIntegerAttributeReturnType,
};
export {
  type CreateIpAttribute,
  type CreateIpAttributeAwaited,
  type CreateIpAttributeArgs,
  type CreateIpAttributeReturnType,
};
export {
  type CreateRelationshipAttribute,
  type CreateRelationshipAttributeAwaited,
  type CreateRelationshipAttributeArgs,
  type CreateRelationshipAttributeReturnType,
};
export {
  type CreateStringAttribute,
  type CreateStringAttributeAwaited,
  type CreateStringAttributeArgs,
  type CreateStringAttributeReturnType,
};
export {
  type CreateUrlAttribute,
  type CreateUrlAttributeAwaited,
  type CreateUrlAttributeArgs,
  type CreateUrlAttributeReturnType,
};
export {
  type DeleteAttribute,
  type DeleteAttributeAwaited,
  type DeleteAttributeArgs,
  type DeleteAttributeReturnType,
};
export {
  type DeleteCollection,
  type DeleteCollectionAwaited,
  type DeleteCollectionArgs,
  type DeleteCollectionReturnType,
};
export {
  type DeleteDatabase,
  type DeleteDatabaseAwaited,
  type DeleteDatabaseArgs,
  type DeleteDatabaseReturnType,
};
export {
  type DeleteDocument,
  type DeleteDocumentAwaited,
  type DeleteDocumentArgs,
  type DeleteDocumentReturnType,
};
export {
  type DeleteIndex,
  type DeleteIndexAwaited,
  type DeleteIndexArgs,
  type DeleteIndexReturnType,
};
export {
  type GetAttribute,
  type GetAttributeAwaited,
  type GetAttributeArgs,
  type GetAttributeReturnType,
};
export {
  type GetCollection,
  type GetCollectionAwaited,
  type GetCollectionArgs,
  type GetCollectionReturnType,
};
export {
  type GetDatabase,
  type GetDatabaseAwaited,
  type GetDatabaseArgs,
  type GetDatabaseReturnType,
};
export {
  type GetDocument,
  type GetDocumentAwaited,
  type GetDocumentArgs,
  type GetDocumentReturnType,
};
export {
  type GetIndex,
  type GetIndexAwaited,
  type GetIndexArgs,
  type GetIndexReturnType,
};
export {
  type ListAttributes,
  type ListAttributesAwaited,
  type ListAttributesArgs,
  type ListAttributesReturnType,
};
export {
  type ListCollections,
  type ListCollectionsAwaited,
  type ListCollectionsArgs,
  type ListCollectionsReturnType,
};
export {
  type ListDatabases,
  type ListDatabasesAwaited,
  type ListDatabasesArgs,
  type ListDatabasesReturnType,
};
export {
  type ListDocuments,
  type ListDocumentsAwaited,
  type ListDocumentsArgs,
  type ListDocumentsReturnType,
};
export {
  type ListIndexes,
  type ListIndexesAwaited,
  type ListIndexesArgs,
  type ListIndexesReturnType,
};
export {
  type UpdateBooleanAttribute,
  type UpdateBooleanAttributeAwaited,
  type UpdateBooleanAttributeArgs,
  type UpdateBooleanAttributeReturnType,
};
export {
  type UpdateCollection,
  type UpdateCollectionAwaited,
  type UpdateCollectionArgs,
  type UpdateCollectionReturnType,
};
export {
  type UpdateCollectionWithSchema,
  type UpdateCollectionWithSchemaAwaited,
  type UpdateCollectionWithSchemaArgs,
  type UpdateCollectionWithSchemaReturnType,
};
export {
  type UpdateDatabase,
  type UpdateDatabaseAwaited,
  type UpdateDatabaseArgs,
  type UpdateDatabaseReturnType,
};
export {
  type UpdateDatetimeAttribute,
  type UpdateDatetimeAttributeAwaited,
  type UpdateDatetimeAttributeArgs,
  type UpdateDatetimeAttributeReturnType,
};
export {
  type UpdateDocument,
  type UpdateDocumentAwaited,
  type UpdateDocumentArgs,
  type UpdateDocumentReturnType,
};
export {
  type UpdateEmailAttribute,
  type UpdateEmailAttributeAwaited,
  type UpdateEmailAttributeArgs,
  type UpdateEmailAttributeReturnType,
};
export {
  type UpdateEnumAttribute,
  type UpdateEnumAttributeAwaited,
  type UpdateEnumAttributeArgs,
  type UpdateEnumAttributeReturnType,
};
export {
  type UpdateFloatAttribute,
  type UpdateFloatAttributeAwaited,
  type UpdateFloatAttributeArgs,
  type UpdateFloatAttributeReturnType,
};
export {
  type UpdateIntegerAttribute,
  type UpdateIntegerAttributeAwaited,
  type UpdateIntegerAttributeArgs,
  type UpdateIntegerAttributeReturnType,
};
export {
  type UpdateIpAttribute,
  type UpdateIpAttributeAwaited,
  type UpdateIpAttributeArgs,
  type UpdateIpAttributeReturnType,
};
export {
  type UpdateRelationshipAttribute,
  type UpdateRelationshipAttributeAwaited,
  type UpdateRelationshipAttributeArgs,
  type UpdateRelationshipAttributeReturnType,
};
export {
  type UpdateStringAttribute,
  type UpdateStringAttributeAwaited,
  type UpdateStringAttributeArgs,
  type UpdateStringAttributeReturnType,
};
export {
  type UpdateUrlAttribute,
  type UpdateUrlAttributeAwaited,
  type UpdateUrlAttributeArgs,
  type UpdateUrlAttributeReturnType,
};
