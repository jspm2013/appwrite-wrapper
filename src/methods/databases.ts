"use server";

import { ID } from "node-appwrite";
import { createAdminClient } from "../appwriteClients";

/**
 * Types for the `databases` module.
 */
export type CreateDocumentParams = {
  collectionId: string;
  documentId?: string;
  data: Record<string, any>;
  permissions?: string[];
  dbId?: string;
};

export type DeleteDocumentParams = {
  collectionId: string;
  documentId: string;
  dbId?: string;
};

export type GetDocumentParams = {
  collectionId: string;
  documentId: string;
  queries?: string[];
  dbId?: string;
};

export type ListDocumentsParams = {
  collectionId: string;
  queries?: string[];
  dbId?: string;
};

export type UpdateDocumentParams = {
  collectionId: string;
  documentId: string;
  data: Record<string, any>;
  permissions?: string[];
  dbId?: string;
};

/**
 * Creates a document in a collection.
 */
const createDocument = async ({
  collectionId,
  documentId = ID.unique(),
  data,
  permissions = ['read("any")'],
  dbId,
}: CreateDocumentParams): Promise<any | Error> => {
  try {
    const { databases } = await createAdminClient();
    return await databases.createDocument(
      dbId!,
      collectionId,
      documentId,
      data,
      permissions
    );
  } catch (err) {
    console.error("APW-LIB ERROR (databases): Error in createDocument():", err);
    throw JSON.parse(JSON.stringify(err));
  }
};

/**
 * Deletes a document from a collection.
 */
const deleteDocument = async ({
  collectionId,
  documentId,
  dbId,
}: DeleteDocumentParams): Promise<void | Error> => {
  try {
    const { databases } = await createAdminClient();
    await databases.deleteDocument(dbId!, collectionId, documentId);
  } catch (err) {
    console.error("APW-LIB ERROR (databases): Error in deleteDocument():", err);
    throw JSON.parse(JSON.stringify(err));
  }
};

/**
 * Retrieves a document from a collection.
 */
const getDocument = async ({
  collectionId,
  documentId,
  queries = [],
  dbId,
}: GetDocumentParams): Promise<any | Error> => {
  try {
    const { databases } = await createAdminClient();
    return await databases.getDocument(
      dbId!,
      collectionId,
      documentId,
      queries
    );
  } catch (err) {
    console.error("APW-LIB ERROR (databases): Error in getDocument():", err);
    throw JSON.parse(JSON.stringify(err));
  }
};

/**
 * Lists documents in a collection.
 */
const listDocuments = async ({
  collectionId,
  queries = [],
  dbId,
}: ListDocumentsParams): Promise<any | Error> => {
  try {
    const { databases } = await createAdminClient();
    return await databases.listDocuments(dbId!, collectionId, queries);
  } catch (err) {
    console.error("APW-LIB ERROR (databases): Error in listDocuments():", err);
    throw JSON.parse(JSON.stringify(err));
  }
};

/**
 * Updates a document in a collection.
 */
const updateDocument = async ({
  collectionId,
  documentId,
  data,
  permissions = ['read("any")'],
  dbId,
}: UpdateDocumentParams): Promise<any | Error> => {
  try {
    const { databases } = await createAdminClient();
    return await databases.updateDocument(
      dbId!,
      collectionId,
      documentId,
      data,
      permissions
    );
  } catch (err) {
    console.error("APW-LIB ERROR (databases): Error in updateDocument():", err);
    throw JSON.parse(JSON.stringify(err));
  }
};

export type DatabaseFunctions = {
  createDocument: typeof createDocument;
  deleteDocument: typeof deleteDocument;
  getDocument: typeof getDocument;
  listDocuments: typeof listDocuments;
  updateDocument: typeof updateDocument;
};

export {
  createDocument,
  deleteDocument,
  getDocument,
  listDocuments,
  updateDocument,
};
