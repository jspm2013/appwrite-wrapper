"use server";
import { Compression, } from "../enums";
//import fs from "fs";
import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { handleApwError } from "../exceptions";
import { createAdminClient } from "../appwriteClients";
import { processImage } from "../utils";
const oneMb = 1024 * 1024;
const createBucket = async ({ bucketName, permissions, fileSecurity = false, enabled = false, maxFileSizeInMb = 5, allowedFileExtensions = [], compression = Compression.Gzip, encryption = true, antivirus = true, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.createBucket(ID.unique(), bucketName, permissions, fileSecurity, enabled, maxFileSizeInMb * oneMb, allowedFileExtensions, compression, encryption, antivirus);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const deleteBucket = async ({ bucketId, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.deleteBucket(bucketId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const getBucket = async ({ bucketId, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.getBucket(bucketId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const deleteFile = async ({ bucketId, fileId, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.deleteFile(bucketId, fileId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const getFile = async ({ bucketId, fileId, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.getFile(bucketId, fileId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const getFileDownload = async ({ bucketId, fileId, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.getFileDownload(bucketId, fileId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const getFilePreview = async ({ bucketId, fileId, width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.getFilePreview(bucketId, fileId, width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const listBuckets = async ({ queries, search = undefined, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.listBuckets(queries, search);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
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
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const getFileView = async ({ bucketId, fileId, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.getFileView(bucketId, fileId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateBucket = async ({ bucketId, name, permissions, fileSecurity, enabled, maxFileSizeInMb, allowedFileExtensions, compression, encryption, antivirus, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.updateBucket(bucketId, name, permissions, fileSecurity, enabled, maxFileSizeInMb ? maxFileSizeInMb * oneMb : undefined, allowedFileExtensions, compression, encryption, antivirus);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateFile = async ({ bucketId, fileId, name, permissions, }) => {
    try {
        const { storage } = await createAdminClient();
        const data = await storage.updateFile(bucketId, fileId, name, permissions);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const uploadFile = async ({ bucketId, fileId = ID.unique(), file, userId, onProgress, outputType, qualityPercentage, }) => {
    try {
        const { storage } = await createAdminClient();
        const fileBuffer = await processImage(file, outputType, qualityPercentage);
        const data = await storage.createFile(bucketId, fileId, InputFile.fromBuffer(fileBuffer, file.name), userId
            ? [`read("user:${userId}")`, `write("user:${userId}")`]
            : undefined, onProgress);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
/* const uploadFileFromPath = async ({
  bucketId,
  fileId = ID.unique(),
  filePath,
}: UploadFileFromPathParams): Promise<ReturnObject<Models.File>> => {
  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    const file = fs.createReadStream(filePath);
    const result = await uploadFile({ bucketId, fileId, file });
    return { data: result.data, error: result.error };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
}; */
export { createBucket, deleteBucket, deleteFile, getBucket, getFile, getFileDownload, getFilePreview, getFileView, listBuckets, listFiles, updateBucket, updateFile, uploadFile,
//uploadFileFromPath,
 };
