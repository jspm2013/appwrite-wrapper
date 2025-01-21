"use server";
import fs from "fs";
import { ID } from "node-appwrite";
import { Compression, } from "../enums";
import { createAdminClient } from "../appwriteClients";
const oneMb = 1024 * 1024;
/**
 * List all files in a specific bucket.
 * @param params - Parameters for listing the files.
 * @returns The list of files.
 */
const listFiles = async ({ bucketId, queries, search, }) => {
    try {
        const { storage } = await createAdminClient();
        const result = await storage.listFiles(bucketId, queries, search);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing listFiles():", err);
        throw err;
    }
};
/**
 * Get details of a file by its unique ID.
 * @param params - Parameters for getting the file.
 * @returns The file details.
 */
const getFileDetails = async ({ bucketId, fileId, }) => {
    try {
        const { storage } = await createAdminClient();
        const result = await storage.getFile(bucketId, fileId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing getFileDetails():", err);
        throw err;
    }
};
/**
 * Update a file by its unique ID.
 * @param params - Parameters for updating the file.
 * @returns The updated file details.
 */
const updateFile = async ({ bucketId, fileId, name, permissions, }) => {
    try {
        const { storage } = await createAdminClient();
        const result = await storage.updateFile(bucketId, fileId, name, permissions);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing updateFile():", err);
        throw err;
    }
};
/**
 * Delete a file by its unique ID.
 * @param params - Parameters for deleting the file.
 * @returns Confirmation of deletion.
 */
const deleteFile = async ({ bucketId, fileId, }) => {
    try {
        const { storage } = await createAdminClient();
        const result = await storage.deleteFile(bucketId, fileId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing deleteFile():", err);
        throw err;
    }
};
/**
 * Get a file content for download by its unique ID.
 * @param params - Parameters for downloading the file.
 * @returns The file content.
 */
const getFileDownload = async ({ bucketId, fileId, }) => {
    try {
        const { storage } = await createAdminClient();
        const result = await storage.getFileDownload(bucketId, fileId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing getFileDownload():", err);
        throw err;
    }
};
/**
 * Get a file preview image.
 * @param params - Parameters for generating the preview.
 * @returns The file preview.
 */
const getFilePreview = async ({ bucketId, fileId, width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output, }) => {
    try {
        const { storage } = await createAdminClient();
        const result = await storage.getFilePreview(bucketId, fileId, width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing getFilePreview():", err);
        throw err;
    }
};
/**
 * Upload a file to a specific bucket.
 * @param params - Parameters for uploading the file.
 * @returns The uploaded file details.
 */
const uploadFile = async ({ bucketId, fileId = ID.unique(), file, userId, onProgress, }) => {
    try {
        const { storage } = await createAdminClient();
        const formData = new FormData();
        formData.append("file", file);
        const result = await storage.createFile(bucketId, fileId, file, userId
            ? [`read("user:${userId}")`, `write("user:${userId}")`]
            : undefined, onProgress);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing uploadFile():", err);
        throw err;
    }
};
/**
 * Upload a file to a bucket using its file path.
 * @param params - Parameters for uploading the file.
 * @returns The uploaded file details.
 */
const uploadFileFromPath = async ({ bucketId, fileId = ID.unique(), filePath, userId, onProgress, }) => {
    try {
        try {
            await fs.promises.access(filePath, fs.constants.R_OK);
        }
        catch (err) {
            if (err.code === "ENOENT") {
                throw new Error(`File not found: ${filePath}`);
            }
            else if (err.code === "EACCES") {
                throw new Error(`No read permission for file: ${filePath}`);
            }
            else {
                throw new Error(`Unable to access file: ${filePath}, Error: ${err.message}`);
            }
        }
        const file = fs.createReadStream(filePath);
        const result = await uploadFile({
            bucketId,
            fileId,
            file,
            userId,
            onProgress,
        });
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing uploadFileFromPath():", err);
        throw err;
    }
};
/**
 * List all storage buckets.
 * @param params - Parameters for listing the buckets.
 * @returns The list of buckets.
 */
const listBuckets = async ({ queries, search = undefined, }) => {
    try {
        const { storage } = await createAdminClient();
        const result = await storage.listBuckets(queries, search);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing listBuckets():", err);
        throw err;
    }
};
/**
 * Create a new storage bucket in Appwrite.
 * @param params - Parameters for creating the bucket.
 * @returns The created bucket.
 */
const createBucket = async ({ bucketName, permissions = ['read("any")', 'write("any")', 'delete("any")'], fileSecurity = false, enabled = false, maxFileSizeInMb = 5, allowedFileExtensions = [], compression = Compression.Gzip, encryption = true, antivirus = true, }) => {
    try {
        const { storage } = await createAdminClient();
        const result = await storage.createBucket(ID.unique(), bucketName, permissions, fileSecurity, enabled, maxFileSizeInMb * oneMb, allowedFileExtensions, compression, encryption, antivirus);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing createBucket():", err);
        throw err;
    }
};
/**
 * Get details of a specific storage bucket.
 * @param params - Parameters for getting the bucket.
 * @returns The bucket details.
 */
const getBucket = async ({ bucketId, }) => {
    try {
        const { storage } = await createAdminClient();
        const result = await storage.getBucket(bucketId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing getBucket():", err);
        throw err;
    }
};
/**
 * Update a storage bucket by its unique ID.
 * @param params - Parameters for updating the bucket.
 * @returns The updated bucket.
 */
const updateBucket = async ({ bucketId, name, permissions, fileSecurity, enabled, maximumFileSize, allowedFileExtensions, compression, encryption, antivirus, }) => {
    try {
        const { storage } = await createAdminClient();
        const result = await storage.updateBucket(bucketId, name, permissions, fileSecurity, enabled, maximumFileSize, allowedFileExtensions, compression, encryption, antivirus);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing updateBucket():", err);
        throw err;
    }
};
/**
 * Delete a storage bucket by its unique ID.
 * @param params - Parameters for deleting the bucket.
 * @returns Confirmation of deletion.
 */
const deleteBucket = async ({ bucketId }) => {
    try {
        const { storage } = await createAdminClient();
        const result = await storage.deleteBucket(bucketId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing deleteBucket():", err);
        throw err;
    }
};
export { createBucket, deleteBucket, getBucket, getFileDetails, getFileDownload, getFilePreview, deleteFile, listBuckets, listFiles, updateBucket, updateFile, uploadFile, uploadFileFromPath, };
