"use server";
import { getSchema, attributesEqual, createAttribute, updateAttribute, getAttributeFromKey, } from "../collections";
import { handleApwError } from "../exceptions";
import { createAdminClient } from "../appwriteClients";
import { ID, Query } from "node-appwrite";
import { databaseId, userCollectionId } from "../appwriteConfig";
import { toLogFolder } from "../ssr-utils";
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
    try {
        const { databases } = await createAdminClient();
        const newArgs = {
            ...args,
            databaseId: args.databaseId ?? databaseId,
            collectionId: args.collectionId ?? ID.unique(),
        };
        const collList = await databases.listCollections(newArgs.databaseId);
        let coll = collList.collections.find((collection) => collection.name === newArgs.name);
        if (coll) {
            throw new Error(`Collection '${newArgs.name}' already exists`);
        }
        else {
            const schema = await getSchema(newArgs.name);
            coll = await databases.createCollection(newArgs.databaseId, ID.unique(), schema.collectionName, schema.permissions, schema.documentSecurity, schema.enabled);
            for (const attr of schema.attributes) {
                await createAttribute(newArgs.databaseId, newArgs.collectionId, attr);
            }
            for (const index of schema.indexes) {
                await databases.createIndex(newArgs.databaseId, newArgs.collectionId, index.key, index.type, index.attributes, index.orders);
            }
            return { data: coll, error: null };
        }
    }
    catch (error) {
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
    // Create a log tracker to capture every action.
    const logActions = [];
    logActions.push(`Update started at ${new Date().toISOString()}`);
    logActions.push(`Destructive flag: ${args.destructive ? "true" : "false"}`);
    try {
        const { databases } = await createAdminClient();
        // Use provided databaseId/collectionId if available; otherwise use defaults.
        const newArgs = {
            ...args,
            databaseId: args.databaseId ?? databaseId,
            collectionId: args.collectionId ?? ID.unique(),
        };
        // Verify that the collection exists and is unique.
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
        logActions.push(`Found collection: name='${newArgs.name}', id='${newArgs.collectionId}'`);
        // Retrieve the schema.
        const schema = await getSchema(newArgs.name);
        if (!schema) {
            throw new Error(`No schema found for collection '${newArgs.name}'`);
        }
        if (!schema.attributes || schema.attributes.length < 1) {
            throw new Error(`No attributes found in schema for collection '${newArgs.name}'`);
        }
        if (!schema.indexes || schema.indexes.length < 1) {
            throw new Error(`No indexes found in schema for collection '${newArgs.name}'`);
        }
        logActions.push(`Schema loaded for collection '${newArgs.name}'`);
        // Update newArgs with values from the schema.
        newArgs.name = schema.collectionName;
        newArgs.permissions = schema.permissions;
        newArgs.documentSecurity = schema.documentSecurity;
        newArgs.enabled = schema.enabled;
        // Update the collection.
        const coll = await databases.updateCollection(...Object.values(newArgs));
        logActions.push(`Collection updated with new schema values.`);
        // coll.attributes is a string[] of attribute keys.
        const currentAttributeKeys = coll.attributes || [];
        // Build a Set of attribute keys defined in the new schema.
        const schemaAttributeKeys = new Set(schema.attributes.map((attr) => attr.key));
        // Loop through each attribute defined in the schema.
        for (const schemaAttr of schema.attributes) {
            const exists = currentAttributeKeys.includes(schemaAttr.key);
            if (!exists) {
                logActions.push(`Attribute '${schemaAttr.key}' not found; creating it.`);
                await createAttribute(newArgs.databaseId, newArgs.collectionId, schemaAttr);
                logActions.push(`Attribute '${schemaAttr.key}' created.`);
            }
            else if (args.destructive) {
                // In destructive mode, update attribute if it differs.
                // Helper function "attributesEqual" compares only the relevant common
                // properties for the given attribute type.
                // If they differ, update the attribute.
                const existingAttr = getAttributeFromKey(schemaAttr.key, schema.attributes);
                if (!attributesEqual(existingAttr, schemaAttr)) {
                    logActions.push(`Attribute '${schemaAttr.key}' differs from schema; updating it (destructive update).`);
                    await updateAttribute(newArgs.databaseId, newArgs.collectionId, schemaAttr);
                    logActions.push(`Attribute '${schemaAttr.key}' updated.`);
                }
                else {
                    logActions.push(`Attribute '${schemaAttr.key}' is up-to-date.`);
                }
            }
            else {
                // If not destructive, you might choose to skip the update.
                logActions.push(`Attribute '${schemaAttr.key}' exists but no update was performed (no destructive flag set).`);
            }
        }
        // If destructive mode is enabled, remove any attribute that exists in the collection
        // but is not defined in the new schema.
        if (args.destructive) {
            const attributesToRemove = currentAttributeKeys.filter((key) => !schemaAttributeKeys.has(key));
            for (const key of attributesToRemove) {
                logActions.push(`Attribute '${key}' exists in collection but not in schema; removing it.`);
                await deleteAttribute({
                    databaseId: newArgs.databaseId,
                    collectionId: newArgs.collectionId,
                    key,
                });
                logActions.push(`Attribute '${key}' removed.`);
            }
        }
        // Process each index defined in the schema.
        for (const index of schema.indexes) {
            logActions.push(`Creating index '${index.key}' of type '${index.type}'`);
            await databases.createIndex(newArgs.databaseId, newArgs.collectionId, index.key, index.type, index.attributes, index.orders);
            logActions.push(`Index '${index.key}' created.`);
        }
        // Write the log to the migration logs folder.
        await toLogFolder(logActions.join("\n"));
        logActions.push(`Migration log saved.`);
        return { data: coll, error: null };
    }
    catch (error) {
        // In case of an error, write the log (or part of it) to file.
        await toLogFolder(logActions.join("\n"));
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
