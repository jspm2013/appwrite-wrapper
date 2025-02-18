"use server";
import fs from "fs";
import { ID } from "node-appwrite";
import { Compression, } from "../enums";
import { createAdminClient } from "../appwriteClients";
import { live } from "../host";
const admin = !live;
const oneMb = 1024 * 1024;
const errMsg = (fn) => admin ? `ApwWrapper Error (methods/storage): ${fn}()` : "Storage Error";
const createBucket = async ({ bucketName, permissions, fileSecurity = false, enabled = false, maxFileSizeInMb = 5, allowedFileExtensions = [], compression = Compression.Gzip, encryption = true, antivirus = true, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.createBucket(ID.unique(), bucketName, permissions, fileSecurity, enabled, maxFileSizeInMb * oneMb, allowedFileExtensions, compression, encryption, antivirus);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("createBucket"),
                description: JSON.stringify(err),
            },
        };
    }
};
const deleteBucket = async ({ bucketId, }) => {
    try {
        const { storage } = await createAdminClient();
        await storage.deleteBucket(bucketId);
        return { data: true, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("deleteBucket"),
                description: JSON.stringify(err),
            },
        };
    }
};
const getBucket = async ({ bucketId, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.getBucket(bucketId);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: { message: errMsg("getBucket"), description: JSON.stringify(err) },
        };
    }
};
const deleteFile = async ({ bucketId, fileId, }) => {
    try {
        const { storage } = await createAdminClient();
        await storage.deleteFile(bucketId, fileId);
        return { data: true, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("deleteFile"),
                description: JSON.stringify(err),
            },
        };
    }
};
const getFile = async ({ bucketId, fileId, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.getFile(bucketId, fileId);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: { message: errMsg("getFile"), description: JSON.stringify(err) },
        };
    }
};
const getFileDownload = async ({ bucketId, fileId, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.getFileDownload(bucketId, fileId);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getFileDownload"),
                description: JSON.stringify(err),
            },
        };
    }
};
const getFilePreview = async ({ bucketId, fileId, width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.getFilePreview(bucketId, fileId, width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getFilePreview"),
                description: JSON.stringify(err),
            },
        };
    }
};
const listBuckets = async ({ queries, search = undefined, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.listBuckets(queries, search);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("listBuckets"),
                description: JSON.stringify(err),
            },
        };
    }
};
/**
 * Lists all files in a specific storage bucket.
 */
const listFiles = async ({ bucketId, queries, search, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.listFiles(bucketId, queries, search);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("listFiles"),
                description: JSON.stringify(err),
            },
        };
    }
};
const getFileView = async ({ bucketId, fileId, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.getFileView(bucketId, fileId);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getFileView"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateBucket = async ({ bucketId, name, permissions, fileSecurity, enabled, maxFileSizeInMb, allowedFileExtensions, compression, encryption, antivirus, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.updateBucket(bucketId, name, permissions, fileSecurity, enabled, maxFileSizeInMb ? maxFileSizeInMb * oneMb : undefined, allowedFileExtensions, compression, encryption, antivirus);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateBucket"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateFile = async ({ bucketId, fileId, name, permissions, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.updateFile(bucketId, fileId, name, permissions);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateFile"),
                description: JSON.stringify(err),
            },
        };
    }
};
const uploadFile = async ({ bucketId, fileId = ID.unique(), file, userId, onProgress, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.createFile(bucketId, fileId, file, userId
            ? [`read("user:${userId}")`, `write("user:${userId}")`]
            : undefined, onProgress);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("uploadFile"),
                description: JSON.stringify(err),
            },
        };
    }
};
const uploadFileFromPath = async ({ bucketId, fileId = ID.unique(), filePath, }) => {
    try {
        await fs.promises.access(filePath, fs.constants.R_OK);
        const file = fs.createReadStream(filePath);
        const result = await uploadFile({ bucketId, fileId, file });
        return { data: result.data, error: result.error };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("uploadFileFromPath"),
                description: JSON.stringify(err),
            },
        };
    }
};
export { createBucket, deleteBucket, deleteFile, getBucket, getFile, getFileDownload, getFilePreview, getFileView, listBuckets, listFiles, updateBucket, updateFile, uploadFile, uploadFileFromPath, };
