"use server";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileFromPath = exports.uploadFile = exports.updateFile = exports.updateBucket = exports.listFiles = exports.listBuckets = exports.getFileView = exports.getFilePreview = exports.getFileDownload = exports.getFile = exports.getBucket = exports.deleteFile = exports.deleteBucket = exports.createBucket = void 0;
const enums_1 = require("../enums");
const fs_1 = __importDefault(require("fs"));
const node_appwrite_1 = require("node-appwrite");
const file_1 = require("node-appwrite/file");
const exceptions_1 = require("../exceptions");
const appwriteClients_1 = require("../appwriteClients");
const utils_js_1 = require("../utils.js");
const oneMb = 1024 * 1024;
const createBucket = async ({ bucketName, permissions, fileSecurity = false, enabled = false, maxFileSizeInMb = 5, allowedFileExtensions = [], compression = enums_1.Compression.Gzip, encryption = true, antivirus = true, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const data = await storage.createBucket(node_appwrite_1.ID.unique(), bucketName, permissions, fileSecurity, enabled, maxFileSizeInMb * oneMb, allowedFileExtensions, compression, encryption, antivirus);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createBucket = createBucket;
const deleteBucket = async ({ bucketId, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const data = await storage.deleteBucket(bucketId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.deleteBucket = deleteBucket;
const getBucket = async ({ bucketId, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const data = await storage.getBucket(bucketId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.getBucket = getBucket;
const deleteFile = async ({ bucketId, fileId, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const data = await storage.deleteFile(bucketId, fileId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.deleteFile = deleteFile;
const getFile = async ({ bucketId, fileId, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const data = await storage.getFile(bucketId, fileId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.getFile = getFile;
const getFileDownload = async ({ bucketId, fileId, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const data = await storage.getFileDownload(bucketId, fileId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.getFileDownload = getFileDownload;
const getFilePreview = async ({ bucketId, fileId, width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const data = await storage.getFilePreview(bucketId, fileId, width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.getFilePreview = getFilePreview;
const listBuckets = async ({ queries, search = undefined, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const data = await storage.listBuckets(queries, search);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.listBuckets = listBuckets;
/**
 * Lists all files in a specific storage bucket.
 */
const listFiles = async ({ bucketId, queries, search, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const data = await storage.listFiles(bucketId, queries, search);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.listFiles = listFiles;
const getFileView = async ({ bucketId, fileId, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const data = await storage.getFileView(bucketId, fileId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.getFileView = getFileView;
const updateBucket = async ({ bucketId, name, permissions, fileSecurity, enabled, maxFileSizeInMb, allowedFileExtensions, compression, encryption, antivirus, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const data = await storage.updateBucket(bucketId, name, permissions, fileSecurity, enabled, maxFileSizeInMb ? maxFileSizeInMb * oneMb : undefined, allowedFileExtensions, compression, encryption, antivirus);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateBucket = updateBucket;
const updateFile = async ({ bucketId, fileId, name, permissions, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const data = await storage.updateFile(bucketId, fileId, name, permissions);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateFile = updateFile;
const uploadFile = async ({ bucketId, fileId = node_appwrite_1.ID.unique(), file, userId, onProgress, outputType, qualityPercentage, }) => {
    try {
        const { storage } = await (0, appwriteClients_1.createAdminClient)();
        const fileBuffer = await (0, utils_js_1.processImage)(file, outputType, qualityPercentage);
        const data = await storage.createFile(bucketId, fileId, file_1.InputFile.fromBuffer(fileBuffer, file.name), userId
            ? [`read("user:${userId}")`, `write("user:${userId}")`]
            : undefined, onProgress);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.uploadFile = uploadFile;
const uploadFileFromPath = async ({ bucketId, fileId = node_appwrite_1.ID.unique(), filePath, }) => {
    try {
        await fs_1.default.promises.access(filePath, fs_1.default.constants.R_OK);
        const file = fs_1.default.createReadStream(filePath);
        const result = await uploadFile({ bucketId, fileId, file });
        return { data: result.data, error: result.error };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.uploadFileFromPath = uploadFileFromPath;
