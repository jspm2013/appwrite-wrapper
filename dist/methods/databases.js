"use server";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ID } from "node-appwrite";
import { createAdminClient } from "../appwriteClients";
/**
 * Creates a document in a collection.
 */
const createDocument = (_a) => __awaiter(void 0, [_a], void 0, function* ({ collectionId, documentId = ID.unique(), data, permissions = ['read("any")'], dbId, }) {
    try {
        const { databases } = yield createAdminClient();
        return yield databases.createDocument(dbId, collectionId, documentId, data, permissions);
    }
    catch (err) {
        console.error("APW-LIB ERROR (databases): Error in createDocument():", err);
        return err;
    }
});
/**
 * Deletes a document from a collection.
 */
const deleteDocument = (_a) => __awaiter(void 0, [_a], void 0, function* ({ collectionId, documentId, dbId, }) {
    try {
        const { databases } = yield createAdminClient();
        yield databases.deleteDocument(dbId, collectionId, documentId);
    }
    catch (err) {
        console.error("APW-LIB ERROR (databases): Error in deleteDocument():", err);
        return err;
    }
});
/**
 * Retrieves a document from a collection.
 */
const getDocument = (_a) => __awaiter(void 0, [_a], void 0, function* ({ collectionId, documentId, queries = [], dbId, }) {
    try {
        const { databases } = yield createAdminClient();
        return yield databases.getDocument(dbId, collectionId, documentId, queries);
    }
    catch (err) {
        console.error("APW-LIB ERROR (databases): Error in getDocument():", err);
        return err;
    }
});
/**
 * Lists documents in a collection.
 */
const listDocuments = (_a) => __awaiter(void 0, [_a], void 0, function* ({ collectionId, queries = [], dbId, }) {
    try {
        const { databases } = yield createAdminClient();
        return yield databases.listDocuments(dbId, collectionId, queries);
    }
    catch (err) {
        console.error("APW-LIB ERROR (databases): Error in listDocuments():", err);
        return err;
    }
});
/**
 * Updates a document in a collection.
 */
const updateDocument = (_a) => __awaiter(void 0, [_a], void 0, function* ({ collectionId, documentId, data, permissions = ['read("any")'], dbId, }) {
    try {
        const { databases } = yield createAdminClient();
        return yield databases.updateDocument(dbId, collectionId, documentId, data, permissions);
    }
    catch (err) {
        console.error("APW-LIB ERROR (databases): Error in updateDocument():", err);
        return err;
    }
});
export { createDocument, deleteDocument, getDocument, listDocuments, updateDocument, };
