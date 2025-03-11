"use server";
import { toLogsFolder, generateMigrationId, toLogs, } from "../ssr-utils";
import { getSchema, attributesEqual, createAttribute, updateAttribute, getAttributeFromKey, } from "../collections";
import { databaseId, userCollectionId, } from "../appwriteConfig";
import { handleApwError } from "../exceptions";
import { createAdminClient } from "../appwriteClients";
import { ID, Query } from "node-appwrite";
const createBooleanAttribute = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.createBooleanAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: ID.unique(),
        };
        const data = await databases.createCollection(...Object.values(newArgs));
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
    // Initialize a migration log object.
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
            if (!schema) {
                logContent.changes.push({
                    action: "getSchema",
                    information: `No schema found for collection '${newArgs.name}'.`,
                });
                throw new Error(`No schema found for collection '${newArgs.name}'`);
            }
            logContent.changes.push({
                action: "getSchema",
                information: `Schema '${schema.collectionName}' loaded for collection creation.`,
            });
            coll = await databases.createCollection(newArgs.databaseId, ID.unique(), schema.collectionName, schema.permissions, schema.documentSecurity, schema.enabled);
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
            // Write the log to the migration logs bucket (or fallback to logs folder) as JSON.
            await toLogs(logTopic, logDetails, logContent);
            return { data: coll, error: null };
        }
    }
    catch (error) {
        logContent.executed_at = new Date().toISOString();
        logContent.status = "failure";
        await toLogsFolder(logTopic, logDetails, logContent);
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const createDatabase = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        const newArgs = {
            ...args,
            databaseId: databaseId,
        };
        const data = await databases.create(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.createDatetimeAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
            documentId: ID.unique(),
        };
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.createEmailAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.createEnumAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.createFloatAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.createIndex(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.createIntegerAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.createIpAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.createRelationshipAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.createStringAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.createUrlAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.deleteAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
        };
        const data = await databases.deleteCollection(...Object.values(newArgs));
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
        const data = await databases.delete(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.deleteDocument(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.deleteIndex(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.getAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
        };
        const data = await databases.getCollection(...Object.values(newArgs));
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
        const data = await databases.get(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.getDocument(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.getIndex(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.listAttributes(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
        };
        const data = await databases.listCollections(...Object.values(newArgs));
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
        const data = await databases.list(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.listDocuments(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.listIndexes(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.updateBooleanAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
        };
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
        const data = await databases.updateCollection(...Object.values(newArgs));
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
    // Initialize a migration log object.
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
        // Verify that the collection exists and is unique.
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
            information: `Found collection '${newArgs.name}' (id: '${newArgs.collectionId}')`,
        });
        // Retrieve the schema.
        const schema = await getSchema(newArgs.name, logContent);
        if (!schema) {
            logContent.changes.push({
                action: "getSchema",
                information: `No schema found for collection '${newArgs.name}'`,
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
            information: `Schema '${schema.collectionName}' loaded for collection.`,
        });
        // Update newArgs with values from the schema.
        newArgs.name = schema.collectionName;
        newArgs.permissions = schema.permissions;
        newArgs.documentSecurity = schema.documentSecurity;
        newArgs.enabled = schema.enabled;
        // Retrieve the current collection from the list.
        const currentCollection = collList.collections[0];
        let coll;
        // Compare keys: permissions, documentSecurity, and enabled.
        // Note: currentCollection.$permissions is used as the returned permissions.
        if (JSON.stringify(newArgs.permissions) !==
            JSON.stringify(currentCollection.$permissions) ||
            newArgs.documentSecurity !== currentCollection.documentSecurity ||
            newArgs.enabled !== currentCollection.enabled) {
            // Build the tuple in the order expected by databases.updateCollection.
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
                information: `Collection updated with new schema values`,
            });
        }
        else {
            coll = currentCollection;
            logContent.changes.push({
                action: "updateCollection",
                information: `No update necessary for permissions, documentSecurity, or enabled keys.`,
            });
        }
        // coll.attributes is a string[] of attribute keys.
        const currentAttributeKeys = new Set(
        // unknown casting needed since according to the Appwrite SDK’s type definition,
        // the attributes property on a collection is declared as a string array (string[])
        coll.attributes.map((attr) => attr.key));
        // Build a Set of attribute keys defined in the new schema.
        const schemaAttributeKeys = new Set(schema.attributes.map((attr) => attr.key));
        // Loop through each attribute defined in the schema.
        for (const schemaAttr of schema.attributes) {
            const exists = currentAttributeKeys.has(schemaAttr.key);
            if (!exists) {
                logContent.changes.push({
                    action: "createAttribute",
                    information: `Attribute '${schemaAttr.key}' not found; creating it`,
                });
                await createAttribute(newArgs.databaseId, newArgs.collectionId, schemaAttr);
                logContent.changes.push({
                    action: "createAttribute",
                    information: `Attribute '${schemaAttr.key}' created`,
                });
            }
            else if (args.destructive) {
                // In destructive mode, update attribute if it differs.
                const existingAttr = getAttributeFromKey(schemaAttr.key, schema.attributes);
                if (!attributesEqual(existingAttr, schemaAttr)) {
                    logContent.changes.push({
                        action: "updateAttribute",
                        information: `Attribute '${schemaAttr.key}' differs from schema; updating it`,
                    });
                    await updateAttribute(newArgs.databaseId, newArgs.collectionId, schemaAttr);
                    logContent.changes.push({
                        action: "updateAttribute",
                        information: `Attribute '${schemaAttr.key}' updated`,
                    });
                }
                else {
                    logContent.changes.push({
                        action: "updateAttribute",
                        information: `Attribute '${schemaAttr.key}' is up-to-date`,
                    });
                }
            }
            else {
                logContent.changes.push({
                    action: "skipAttribute",
                    information: `Attribute '${schemaAttr.key}' exists but destructive arg was not enabled; no update performed`,
                });
            }
        }
        // If destructive mode is enabled, remove any attribute that exists in the collection
        // but is not defined in the new schema.
        if (args.destructive) {
            const attributesToRemove = Array.from(currentAttributeKeys).filter((key) => !schemaAttributeKeys.has(key));
            for (const key of attributesToRemove) {
                logContent.changes.push({
                    action: "deleteAttribute",
                    information: `Attribute '${key}' exists in collection but not in schema; removing it`,
                });
                await deleteAttribute({
                    databaseId: newArgs.databaseId,
                    collectionId: newArgs.collectionId,
                    key,
                });
                logContent.changes.push({
                    action: "deleteAttribute",
                    information: `Attribute '${key}' removed`,
                });
            }
        }
        // Process each index defined in the schema.
        for (const index of schema.indexes) {
            logContent.changes.push({
                action: "createIndex",
                information: `Creating index '${index.key}' of type '${index.type}'`,
            });
            await databases.createIndex(newArgs.databaseId, newArgs.collectionId, index.key, index.type, index.attributes, index.orders);
            logContent.changes.push({
                action: "createIndex",
                information: `Index '${index.key}' created`,
            });
        }
        // Update the execution time and status.
        logContent.executed_at = new Date().toISOString();
        logContent.status = "success";
        // Write the log to the migration logs bucket (or fallback to logs folder) as JSON.
        toLogs(logTopic, logDetails, logContent);
        return { data: coll, error: null };
    }
    catch (error) {
        logContent.executed_at = new Date().toISOString();
        logContent.status = "failure";
        await toLogsFolder(logTopic, logDetails, logContent);
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateDatabase = async ({ ...args }) => {
    try {
        const { databases } = await createAdminClient();
        const newArgs = {
            ...args,
            databaseId: databaseId,
        };
        const data = await databases.update(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.updateDatetimeAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.updateDocument(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.updateEmailAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.updateEnumAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.updateFloatAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.updateIntegerAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.updateIpAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.updateRelationshipAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.updateStringAttribute(...Object.values(newArgs));
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
        const newArgs = {
            ...args,
            databaseId: databaseId,
            collectionId: userCollectionId,
        };
        const data = await databases.updateUrlAttribute(...Object.values(newArgs));
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
