"use server";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileFromPath = exports.uploadFile = exports.updateFile = exports.updateBucket = exports.listFiles = exports.listBuckets = exports.deleteFile = exports.getFileView = exports.getFilePreview = exports.getFileDownload = exports.getFile = exports.getBucket = exports.deleteBucket = exports.createBucket = void 0;
const fs_1 = __importDefault(require("fs"));
const node_appwrite_1 = require("node-appwrite");
const enums_1 = require("../enums");
const appwriteClients_1 = require("../appwriteClients");
const oneMb = 1024 * 1024;
/**
 * List all files in a specific bucket.
 * @param params - Parameters for listing the files.
 * @returns The list of files.
 */
const listFiles = async ({ bucketId, queries, search, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const result = await storage.listFiles(bucketId, queries, search);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing listFiles():", err);
        throw err;
    }
};
exports.listFiles = listFiles;
/**
 * Get metadata of a file by its unique ID.
 * @param params - Parameters for getting the file.
 * @returns The file metadata.
 */
const getFile = async ({ bucketId, fileId }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const { getFile: fetchFile } = storage;
        const result = await fetchFile(bucketId, fileId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing getFile():", err);
        throw err;
    }
};
exports.getFile = getFile;
/**
 * Get file content of a file by its unique ID.
 * @param params - Parameters for getting the file.
 * @returns The file content.
 */
const getFileView = async ({ bucketId, fileId, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const { getFileView: fetchFileView } = storage;
        const result = await fetchFileView(bucketId, fileId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing getFileView():", err);
        throw err;
    }
};
exports.getFileView = getFileView;
/**
 * Update a file by its unique ID.
 * @param params - Parameters for updating the file.
 * @returns The updated file details.
 */
const updateFile = async ({ bucketId, fileId, name, permissions, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const result = await storage.updateFile(bucketId, fileId, name, permissions);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing updateFile():", err);
        throw err;
    }
};
exports.updateFile = updateFile;
/**
 * Delete a file by its unique ID.
 * @param params - Parameters for deleting the file.
 * @returns Confirmation of deletion.
 */
const deleteFile = async ({ bucketId, fileId, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const result = await storage.deleteFile(bucketId, fileId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing deleteFile():", err);
        throw err;
    }
};
exports.deleteFile = deleteFile;
/**
 * Get a file content for download by its unique ID.
 * @param params - Parameters for downloading the file.
 * @returns The file content.
 */
const getFileDownload = async ({ bucketId, fileId, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const result = await storage.getFileDownload(bucketId, fileId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing getFileDownload():", err);
        throw err;
    }
};
exports.getFileDownload = getFileDownload;
/**
 * Get a file preview image.
 * @param params - Parameters for generating the preview.
 * @returns The file preview.
 */
const getFilePreview = async ({ bucketId, fileId, width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const result = await storage.getFilePreview(bucketId, fileId, width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing getFilePreview():", err);
        throw err;
    }
};
exports.getFilePreview = getFilePreview;
/**
 * Upload a file to a specific bucket.
 * @param params - Parameters for uploading the file.
 * @returns The uploaded file details.
 */
const uploadFile = async ({ bucketId, fileId = node_appwrite_1.ID.unique(), file, userId, onProgress, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
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
exports.uploadFile = uploadFile;
/**
 * Upload a file to a bucket using its file path.
 * @param params - Parameters for uploading the file.
 * @returns The uploaded file details.
 */
const uploadFileFromPath = async ({ bucketId, fileId = node_appwrite_1.ID.unique(), filePath, userId, onProgress, }) => {
    try {
        try {
            await fs_1.default.promises.access(filePath, fs_1.default.constants.R_OK);
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
        const file = fs_1.default.createReadStream(filePath);
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
exports.uploadFileFromPath = uploadFileFromPath;
/**
 * List all storage buckets.
 * @param params - Parameters for listing the buckets.
 * @returns The list of buckets.
 */
const listBuckets = async ({ queries, search = undefined, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const result = await storage.listBuckets(queries, search);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing listBuckets():", err);
        throw err;
    }
};
exports.listBuckets = listBuckets;
/**
 * Create a new storage bucket in Appwrite.
 * @param params - Parameters for creating the bucket.
 * @returns The created bucket.
 */
const createBucket = async ({ bucketName, permissions = ['read("any")', 'write("any")', 'delete("any")'], fileSecurity = false, enabled = false, maxFileSizeInMb = 5, allowedFileExtensions = [], compression = enums_1.Compression.Gzip, encryption = true, antivirus = true, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const result = await storage.createBucket(node_appwrite_1.ID.unique(), bucketName, permissions, fileSecurity, enabled, maxFileSizeInMb * oneMb, allowedFileExtensions, compression, encryption, antivirus);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing createBucket():", err);
        throw err;
    }
};
exports.createBucket = createBucket;
/**
 * Get details of a specific storage bucket.
 * @param params - Parameters for getting the bucket.
 * @returns The bucket details.
 */
const getBucket = async ({ bucketId, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const result = await storage.getBucket(bucketId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing getBucket():", err);
        throw err;
    }
};
exports.getBucket = getBucket;
/**
 * Update a storage bucket by its unique ID.
 * @param params - Parameters for updating the bucket.
 * @returns The updated bucket.
 */
const updateBucket = async ({ bucketId, name, permissions, fileSecurity, enabled, maximumFileSize, allowedFileExtensions, compression, encryption, antivirus, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const result = await storage.updateBucket(bucketId, name, permissions, fileSecurity, enabled, maximumFileSize, allowedFileExtensions, compression, encryption, antivirus);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing updateBucket():", err);
        throw err;
    }
};
exports.updateBucket = updateBucket;
/**
 * Delete a storage bucket by its unique ID.
 * @param params - Parameters for deleting the bucket.
 * @returns Confirmation of deletion.
 */
const deleteBucket = async ({ bucketId }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const result = await storage.deleteBucket(bucketId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/storage): Error executing deleteBucket():", err);
        throw err;
    }
};
exports.deleteBucket = deleteBucket;
