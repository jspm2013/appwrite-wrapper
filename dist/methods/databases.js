"use server";
import { getSchema, attributesEqual, createAttribute, updateAttribute, getAttributeFromKey, } from "../collections";
import { handleApwError } from "../exceptions";
import { createAdminClient } from "../appwriteClients";
import { ID, Query } from "node-appwrite";
import { databaseId, userCollectionId } from "../appwriteConfig";
import { generateMigrationId, toLogs } from "../ssr-utils";
import { isCollectionSchema, schemaToFile } from "../collections/schema";
const createBooleanAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const createBooleanAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.required,
            newArgs.xdefault,
            newArgs.array,
        ];
        const data = await databases.createBooleanAttribute(...createBooleanAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createCollection = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? ID.unique();
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const createCollectionParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.name,
            newArgs.permissions,
            newArgs.documentSecurity,
            newArgs.enabled,
        ];
        const data = await databases.createCollection(...createCollectionParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createCollectionWithSchema = async ({ ...args }) => {
    // Use provided databaseId/collectionId if available; otherwise use defaults.
    const finalDatabaseId = args.databaseId ?? databaseId;
    const finalCollectionId = args.collectionId ?? ID.unique();
    // Initialize a log object.
    const logTopic = "migration";
    const logDetails = "schemaCreate";
    const logContent = {
        id: await generateMigrationId(args.name),
        executed_at: new Date().toISOString(),
        status: "success",
        databaseId: finalDatabaseId,
        collectionId: finalCollectionId,
        changes: [],
    };
    try {
        const { databases } = await createAdminClient();
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        logContent.changes.push({
            action: "listCollections",
            information: `Listing collections in database '${newArgs.databaseId}'.`,
        });
        const collList = await databases.listCollections(newArgs.databaseId);
        let coll = collList.collections.find((collection) => collection.name === newArgs.name);
        if (coll) {
            logContent.changes.push({
                action: "listCollections",
                information: `Collection '${newArgs.name}' already exists.`,
            });
            throw new Error(`Collection '${newArgs.name}' already exists`);
        }
        else {
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
                throw new Error(`No attributes found in schema for collection '${newArgs.name}'`);
            }
            logContent.changes.push({
                action: "getSchema",
                information: `Schema '${schema.collectionName}' loaded for collection creation.`,
            });
            coll = await databases.createCollection(newArgs.databaseId, newArgs.collectionId, schema.collectionName, schema.permissions, schema.documentSecurity, schema.enabled);
            logContent.changes.push({
                action: "createCollection",
                information: `Collection '${schema.collectionName}' created.`,
            });
            for (const attr of schema.attributes) {
                logContent.changes.push({
                    action: "createAttribute",
                    information: `Creating attribute '${attr.key}'.`,
                });
                await createAttribute(newArgs.databaseId, newArgs.collectionId, attr);
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
                await databases.createIndex(newArgs.databaseId, newArgs.collectionId, index.key, index.type, index.attributes, index.orders);
                logContent.changes.push({
                    action: "createIndex",
                    information: `Index '${index.key}' created.`,
                });
            }
            logContent.executed_at = new Date().toISOString();
            logContent.status = "success";
            await toLogs(logTopic, logDetails, logContent);
            return { data: coll, error: null };
        }
    }
    catch (error) {
        logContent.executed_at = new Date().toISOString();
        logContent.status = "failure";
        await toLogs(logTopic, logDetails, logContent);
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createDatabase = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
        };
        const createDatabaseParams = [
            newArgs.databaseId,
            newArgs.name,
            newArgs.enabled,
        ];
        const data = await databases.create(...createDatabaseParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createDatetimeAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const createDatetimeAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.required,
            newArgs.xdefault,
            newArgs.array,
        ];
        const data = await databases.createDatetimeAttribute(...createDatetimeAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createDocument = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
            documentId: ID.unique(),
        };
        const createDocumentParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.documentId,
            newArgs.data,
            newArgs.permissions,
        ];
        const data = await databases.createDocument(...Object.values(newArgs));
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createEmailAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const createEmailAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.required,
            newArgs.xdefault,
            newArgs.array,
        ];
        const data = await databases.createEmailAttribute(...createEmailAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createEnumAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const createEnumAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.elements,
            newArgs.required,
            newArgs.xdefault,
            newArgs.array,
        ];
        const data = await databases.createEnumAttribute(...createEnumAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createFloatAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const createFloatAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.required,
            newArgs.min,
            newArgs.max,
            newArgs.xdefault,
            newArgs.array,
        ];
        const data = await databases.createFloatAttribute(...createFloatAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createIndex = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const createIndexParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.type,
            newArgs.attributes,
            newArgs.orders,
        ];
        const data = await databases.createIndex(...createIndexParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createIntegerAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const createIntegerAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.required,
            newArgs.min,
            newArgs.max,
            newArgs.xdefault,
            newArgs.array,
        ];
        const data = await databases.createIntegerAttribute(...createIntegerAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createIpAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const createIpAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.required,
            newArgs.xdefault,
            newArgs.array,
        ];
        const data = await databases.createIpAttribute(...createIpAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createRelationshipAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const createRelationshipAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.relatedCollectionId,
            newArgs.type,
            newArgs.twoWay,
            newArgs.key,
            newArgs.twoWayKey,
            newArgs.onDelete,
        ];
        const data = await databases.createRelationshipAttribute(...createRelationshipAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createStringAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const createStringAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.size,
            newArgs.required,
            newArgs.xdefault,
            newArgs.array,
            newArgs.encrypt,
        ];
        const data = await databases.createStringAttribute(...createStringAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createUrlAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const createUrlAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.required,
            newArgs.xdefault,
            newArgs.array,
        ];
        const data = await databases.createUrlAttribute(...createUrlAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const deleteAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const deleteAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
        ];
        const data = await databases.deleteAttribute(...deleteAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const deleteCollection = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
        };
        const deleteCollectionParams = [
            newArgs.databaseId,
            newArgs.collectionId,
        ];
        const data = await databases.deleteCollection(...deleteCollectionParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const deleteDatabase = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        const newArgs = {
            ...args,
        };
        const deleteDatabaseParams = [newArgs.databaseId];
        const data = await databases.delete(...deleteDatabaseParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const deleteDocument = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const deleteDocumentParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.documentId,
        ];
        const data = await databases.deleteDocument(...deleteDocumentParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const deleteIndex = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const deleteIndexParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
        ];
        const data = await databases.deleteIndex(...deleteIndexParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const getAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const getAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
        ];
        const data = await databases.getAttribute(...getAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const getCollection = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
        };
        const getCollectionParams = [
            newArgs.databaseId,
            newArgs.collectionId,
        ];
        const data = await databases.getCollection(...getCollectionParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const getDatabase = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        const newArgs = {
            ...args,
        };
        const getDatabaseParams = [newArgs.databaseId];
        const data = await databases.get(...getDatabaseParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const getDocument = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const getDocumentParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.documentId,
            newArgs.queries,
        ];
        const data = await databases.getDocument(...getDocumentParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const getIndex = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const getIndexParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
        ];
        const data = await databases.getIndex(...getIndexParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const listAttributes = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const listAttributesParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.queries,
        ];
        const data = await databases.listAttributes(...listAttributesParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const listCollections = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
        };
        const listCollectionsParams = [
            newArgs.databaseId,
            newArgs.queries,
            newArgs.search,
        ];
        const data = await databases.listCollections(...listCollectionsParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const listDatabases = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        const newArgs = {
            ...args,
        };
        const listDatabasesParams = [
            newArgs.queries,
            newArgs.search,
        ];
        const data = await databases.list(...listDatabasesParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const listDocuments = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const listDocumentsParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.queries,
        ];
        const data = await databases.listDocuments(...listDocumentsParams);
        let filteredDocuments = data.documents;
        if (newArgs.relationshipQueries && newArgs.relationshipQueries.length > 0) {
            filteredDocuments = data.documents.filter((document) => {
                return newArgs.relationshipQueries.every((query) => {
                    try {
                        const parsedQuery = JSON.parse(query);
                        const attribute = parsedQuery.attribute;
                        const method = parsedQuery.method;
                        const values = parsedQuery.values;
                        switch (method) {
                            case "equal":
                                return document[attribute] === values[0];
                            case "notEqual":
                                return document[attribute] !== values[0];
                            case "lessThan":
                                return document[attribute] < values[0];
                            case "lessThanEqual":
                                return document[attribute] <= values[0];
                            case "greaterThan":
                                return document[attribute] > values[0];
                            case "greaterThanEqual":
                                return document[attribute] >= values[0];
                            case "search":
                                return String(document[attribute]).includes(String(values[0]));
                            case "isIn":
                                return (Array.isArray(values) && values.includes(document[attribute]));
                            case "isNotIn":
                                return (Array.isArray(values) && !values.includes(document[attribute]));
                            case "contains":
                                if (typeof document[attribute] === "string" &&
                                    typeof values === "string") {
                                    return document[attribute].includes(values);
                                }
                                else if (Array.isArray(values) &&
                                    typeof document[attribute] === "string") {
                                    return values.some((val) => document[attribute].includes(val));
                                }
                                return false;
                            case "between":
                                return (document[attribute] >= values[0] &&
                                    document[attribute] <= values[1]);
                            // Add more cases for other methods as needed
                            default:
                                return false;
                        }
                    }
                    catch (e) {
                        console.error("error while parsing relationship query: ", e);
                        return false;
                    }
                });
            });
            return {
                data: {
                    ...data,
                    documents: filteredDocuments,
                    total: filteredDocuments.length,
                },
                error: null,
            };
        }
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const listIndexes = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const listIndexesParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.queries,
        ];
        const data = await databases.listIndexes(...listIndexesParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateBooleanAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const updateBooleanAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.required,
            newArgs.xdefault,
            newArgs.newKey,
        ];
        const data = await databases.updateBooleanAttribute(...updateBooleanAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateCollection = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
        };
        const updateCollectionParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.name,
            newArgs.permissions,
            newArgs.documentSecurity,
            newArgs.enabled,
        ];
        const collList = await databases.listCollections(newArgs.databaseId, [
            Query.and([
                Query.equal("name", newArgs.name),
                Query.equal("$id", newArgs.collectionId),
            ]),
        ]);
        if (collList.total < 1) {
            throw new Error(`Collection with name: '${newArgs.name}' / id:'${newArgs.collectionId}' not found`);
        }
        if (collList.total > 1) {
            throw new Error(`Collection with name: '${newArgs.name}' / id:'${newArgs.collectionId}' not unique, multiple collections with the same name and/or id found`);
        }
        const data = await databases.updateCollection(...updateCollectionParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateCollectionWithSchema = async ({ ...args }) => {
    // Use provided databaseId/collectionId if available; otherwise use defaults.
    const finalDatabaseId = args.databaseId ?? databaseId;
    const finalCollectionId = args.collectionId ?? ID.unique();
    // Initialize a log object.
    const logTopic = "migration";
    const logDetails = "schemaUpdate";
    const logContent = {
        id: await generateMigrationId(args.name),
        executed_at: new Date().toISOString(),
        status: "success",
        databaseId: finalDatabaseId,
        collectionId: finalCollectionId,
        changes: [],
    };
    try {
        const { databases } = await createAdminClient();
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        // List collections.
        logContent.changes.push({
            action: "listCollections",
            information: `Listing collection '${newArgs.name}' (id: '${newArgs.collectionId}') in database '${newArgs.databaseId}'.`,
        });
        const collList = await databases.listCollections(newArgs.databaseId, [
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
            throw new Error(`Collection '${newArgs.name}' (id: '${newArgs.collectionId}') not found`);
        }
        if (collList.total > 1) {
            logContent.changes.push({
                action: "listCollections",
                information: `Collection '${newArgs.name}' (id: '${newArgs.collectionId}') not unique.`,
            });
            throw new Error(`Collection '${newArgs.name}' (id: '${newArgs.collectionId}') not unique`);
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
            throw new Error(`No attributes found in schema for collection '${newArgs.name}'`);
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
        let coll;
        if (JSON.stringify(newArgs.permissions) !==
            JSON.stringify(currentCollection.$permissions) ||
            newArgs.documentSecurity !== currentCollection.documentSecurity ||
            newArgs.enabled !== currentCollection.enabled) {
            const updateCollectionParams = [
                newArgs.databaseId,
                newArgs.collectionId,
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
        }
        else {
            coll = currentCollection;
            logContent.changes.push({
                action: "updateCollection",
                information: `No update necessary for permissions, documentSecurity, or enabled.`,
            });
        }
        // Process attributes.
        const currentAttributeKeys = new Set(coll.attributes.map((attr) => attr.key));
        const schemaAttributeKeys = new Set(schema.attributes.map((attr) => attr.key));
        for (const schemaAttr of schema.attributes) {
            if (!currentAttributeKeys.has(schemaAttr.key)) {
                logContent.changes.push({
                    action: "createAttribute",
                    information: `Attribute '${schemaAttr.key}' not found; creating it.`,
                });
                await createAttribute(newArgs.databaseId, newArgs.collectionId, schemaAttr);
                logContent.changes.push({
                    action: "createAttribute",
                    information: `Attribute '${schemaAttr.key}' created.`,
                });
            }
            else if (args.destructive) {
                const existingAttr = getAttributeFromKey(schemaAttr.key, schema.attributes);
                if (!attributesEqual(existingAttr, schemaAttr)) {
                    logContent.changes.push({
                        action: "updateAttribute",
                        information: `Attribute '${schemaAttr.key}' differs from schema; updating it.`,
                    });
                    await updateAttribute(newArgs.databaseId, newArgs.collectionId, schemaAttr);
                    logContent.changes.push({
                        action: "updateAttribute",
                        information: `Attribute '${schemaAttr.key}' updated.`,
                    });
                }
                else {
                    logContent.changes.push({
                        action: "updateAttribute",
                        information: `Attribute '${schemaAttr.key}' is up-to-date.`,
                    });
                }
            }
            else {
                logContent.changes.push({
                    action: "skipAttribute",
                    information: `Attribute '${schemaAttr.key}' exists; no update performed.`,
                });
            }
        }
        if (args.destructive) {
            const attributesToRemove = Array.from(currentAttributeKeys).filter((key) => !schemaAttributeKeys.has(key));
            for (const key of attributesToRemove) {
                logContent.changes.push({
                    action: "deleteAttribute",
                    information: `Attribute '${key}' exists in collection but not in schema; removing it.`,
                });
                await deleteAttribute({
                    databaseId: newArgs.databaseId,
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
            await databases.createIndex(newArgs.databaseId, newArgs.collectionId, index.key, index.type, index.attributes, index.orders);
            logContent.changes.push({
                action: "createIndex",
                information: `Index '${index.key}' created.`,
            });
        }
        logContent.executed_at = new Date().toISOString();
        logContent.status = "success";
        // Safe old schema to file
        await schemaToFile(coll);
        // Write log
        await toLogs(logTopic, logDetails, logContent);
        return { data: coll, error: null };
    }
    catch (error) {
        // Write log
        logContent.executed_at = new Date().toISOString();
        logContent.status = "failure";
        await toLogs(logTopic, logDetails, logContent);
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateDatabase = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
        };
        const updateDatabaseParams = [
            newArgs.databaseId,
            newArgs.name,
            newArgs.enabled,
        ];
        const data = await databases.update(...updateDatabaseParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateDatetimeAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const updateDatetimeAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.required,
            newArgs.xdefault,
            newArgs.newKey,
        ];
        const data = await databases.updateDatetimeAttribute(...updateDatetimeAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateDocument = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const updateDocumentParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.documentId,
            newArgs.data,
            newArgs.permissions,
        ];
        const data = await databases.updateDocument(...updateDocumentParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateEmailAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const updateEmailAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.required,
            newArgs.xdefault,
            newArgs.newKey,
        ];
        const data = await databases.updateEmailAttribute(...updateEmailAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateEnumAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const updateEnumAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.elements,
            newArgs.required,
            newArgs.xdefault,
            newArgs.newKey,
        ];
        const data = await databases.updateEnumAttribute(...updateEnumAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateFloatAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const updateFloatAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.required,
            newArgs.min,
            newArgs.max,
            newArgs.xdefault,
            newArgs.newKey,
        ];
        const data = await databases.updateFloatAttribute(...updateFloatAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateIntegerAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const updateIntegerAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.required,
            newArgs.min,
            newArgs.max,
            newArgs.xdefault,
            newArgs.newKey,
        ];
        const data = await databases.updateIntegerAttribute(...updateIntegerAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateIpAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const updateIpAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.required,
            newArgs.xdefault,
            newArgs.newKey,
        ];
        const data = await databases.updateIpAttribute(...updateIpAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateRelationshipAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const updateRelationshipAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.onDelete,
            newArgs.newKey,
        ];
        const data = await databases.updateRelationshipAttribute(...updateRelationshipAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateStringAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const updateStringAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.required,
            newArgs.xdefault,
            newArgs.size,
            newArgs.newKey,
        ];
        const data = await databases.updateStringAttribute(...updateStringAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateUrlAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const finalDatabaseId = args.databaseId ?? databaseId;
        const finalCollectionId = args.collectionId ?? userCollectionId;
        const newArgs = {
            ...args,
            databaseId: finalDatabaseId,
            collectionId: finalCollectionId,
        };
        const updateUrlAttributeParams = [
            newArgs.databaseId,
            newArgs.collectionId,
            newArgs.key,
            newArgs.required,
            newArgs.xdefault,
            newArgs.newKey,
        ];
        const data = await databases.updateUrlAttribute(...updateUrlAttributeParams);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
export { createBooleanAttribute, createCollection, createCollectionWithSchema, createDatabase, createDatetimeAttribute, createDocument, createEmailAttribute, createEnumAttribute, createFloatAttribute, createIndex, createIntegerAttribute, createIpAttribute, createRelationshipAttribute, createStringAttribute, createUrlAttribute, deleteAttribute, deleteCollection, deleteDatabase, deleteDocument, deleteIndex, getAttribute, getCollection, getDatabase, getDocument, getIndex, listAttributes, listCollections, listDatabases, listDocuments, listIndexes, updateBooleanAttribute, updateCollection, updateCollectionWithSchema, updateDatabase, updateDatetimeAttribute, updateDocument, updateEmailAttribute, updateEnumAttribute, updateFloatAttribute, updateIntegerAttribute, updateIpAttribute, updateRelationshipAttribute, updateStringAttribute, updateUrlAttribute, };
