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
declare const createDocument: ({ collectionId, documentId, data, permissions, dbId, }: CreateDocumentParams) => Promise<any | Error>;
/**
 * Deletes a document from a collection.
 */
declare const deleteDocument: ({ collectionId, documentId, dbId, }: DeleteDocumentParams) => Promise<void | Error>;
/**
 * Retrieves a document from a collection.
 */
declare const getDocument: ({ collectionId, documentId, queries, dbId, }: GetDocumentParams) => Promise<any | Error>;
/**
 * Lists documents in a collection.
 */
declare const listDocuments: ({ collectionId, queries, dbId, }: ListDocumentsParams) => Promise<any | Error>;
/**
 * Updates a document in a collection.
 */
declare const updateDocument: ({ collectionId, documentId, data, permissions, dbId, }: UpdateDocumentParams) => Promise<any | Error>;
export type DatabaseFunctions = {
    createDocument: typeof createDocument;
    deleteDocument: typeof deleteDocument;
    getDocument: typeof getDocument;
    listDocuments: typeof listDocuments;
    updateDocument: typeof updateDocument;
};
export { createDocument, deleteDocument, getDocument, listDocuments, updateDocument, };
//# sourceMappingURL=databases.d.ts.map