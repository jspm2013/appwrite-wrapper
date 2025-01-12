"use server";
import { ID } from "node-appwrite";
import { createAdminClient } from "../appwriteClients";
/**
 * Creates a document in a collection.
 */
const createDocument = async ({ collectionId, documentId = ID.unique(), data, permissions = ['read("any")'], dbId, }) => {
    try {
        const { databases } = await createAdminClient();
        return await databases.createDocument(dbId, collectionId, documentId, data, permissions);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing createDocument():", err);
        throw JSON.parse(JSON.stringify(err));
    }
};
/**
 * Deletes a document from a collection.
 */
const deleteDocument = async ({ collectionId, documentId, dbId, }) => {
    try {
        const { databases } = await createAdminClient();
        await databases.deleteDocument(dbId, collectionId, documentId);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing deleteDocument():", err);
        throw JSON.parse(JSON.stringify(err));
    }
};
/**
 * Retrieves a document from a collection.
 */
const getDocument = async ({ collectionId, documentId, queries = [], dbId, }) => {
    try {
        const { databases } = await createAdminClient();
        return await databases.getDocument(dbId, collectionId, documentId, queries);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing getDocument():", err);
        throw JSON.parse(JSON.stringify(err));
    }
};
/**
 * Lists documents in a collection.
 */
const listDocuments = async ({ collectionId, queries = [], dbId, }) => {
    try {
        const { databases } = await createAdminClient();
        return await databases.listDocuments(dbId, collectionId, queries);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing listDocuments():", err);
        throw JSON.parse(JSON.stringify(err));
    }
};
/**
 * Updates a document in a collection.
 */
const updateDocument = async ({ collectionId, documentId, data, permissions = ['read("any")'], dbId, }) => {
    try {
        const { databases } = await createAdminClient();
        return await databases.updateDocument(dbId, collectionId, documentId, data, permissions);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/databases): Error executing updateDocument():", err);
        throw JSON.parse(JSON.stringify(err));
    }
};
export { createDocument, deleteDocument, getDocument, listDocuments, updateDocument, };
