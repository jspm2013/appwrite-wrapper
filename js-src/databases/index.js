"use server";

import { ID } from "node-appwrite";
import { createAdminClient } from "../../src/appwriteClients";

if (!process.env.APPWRITE_MAIN_DATABASE_ID) {
  throw new Error(
    "APW-LIB ERROR: Missing required environment variable: APPWRITE_MAIN_DATABASE_ID"
  );
}

const databaseId = process.env.APPWRITE_MAIN_DATABASE_ID;

/*
 *
 * Functions based on
 *
 * > > > createAdminClient < < <
 *
 */
const createDocument = async ({
  collectionId,
  documentId = ID.unique(),
  data,
  permissions = ['read("any")'],
  dbId = databaseId,
}) => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.createDocument(
      dbId,
      collectionId,
      documentId,
      data,
      permissions
    );
    return result;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing createDocument():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const deleteDocument = async ({
  collectionId,
  documentId,
  dbId = databaseId,
}) => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.deleteDocument(
      dbId,
      collectionId,
      documentId
    );
    return result;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing deleteDocument():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const getDocument = async ({
  collectionId,
  documentId,
  queries = [],
  dbId = databaseId,
}) => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.getDocument(
      dbId,
      collectionId,
      documentId,
      queries
    );
    return result;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing getDocument():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const listDocuments = async ({
  collectionId,
  queries = [],
  dbId = databaseId,
}) => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.listDocuments(dbId, collectionId, queries);
    return result;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing listDocuments():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const updateDocument = async ({
  collectionId,
  documentId,
  data,
  permissions = ['read("any")'],
  dbId = databaseId,
}) => {
  try {
    const { databases } = await createAdminClient();
    const result = await databases.updateDocument(
      dbId,
      collectionId,
      documentId,
      data,
      permissions
    );
    return result;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing updateDocument():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

export {
  createDocument,
  deleteDocument,
  getDocument,
  listDocuments,
  updateDocument,
};
