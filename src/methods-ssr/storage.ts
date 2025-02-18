"use server";

import fs from "fs";
import { ID, Models } from "node-appwrite";
import {
  Compression,
  ImageFormat,
  ImageGravity,
  UploadProgress,
} from "../enums";
import { createAdminClient } from "../appwriteClients";
import { live } from "../host";

const admin: boolean = !live;
const oneMb: number = 1024 * 1024;

const errMsg = (fn: string) =>
  admin ? `ApwWrapper Error (methods/storage): ${fn}()` : "Storage Error";

interface ErrorObject {
  message: string;
  description: string;
}

interface ReturnObject<T> {
  error: ErrorObject | null;
  data: T | null;
}

/**
 * Creates a new storage bucket.
 */
export type CreateBucketParams = {
  bucketName: string;
  permissions?: string[];
  fileSecurity?: boolean;
  enabled?: boolean;
  maxFileSizeInMb?: number;
  allowedFileExtensions?: string[];
  compression?: Compression;
  encryption?: boolean;
  antivirus?: boolean;
};
const createBucket = async ({
  bucketName,
  permissions,
  fileSecurity = false,
  enabled = false,
  maxFileSizeInMb = 5,
  allowedFileExtensions = [],
  compression = Compression.Gzip,
  encryption = true,
  antivirus = true,
}: CreateBucketParams): Promise<ReturnObject<Models.Bucket>> => {
  try {
    const { storage } = await createAdminClient();
    const data = await storage.createBucket(
      ID.unique(),
      bucketName,
      permissions,
      fileSecurity,
      enabled,
      maxFileSizeInMb * oneMb,
      allowedFileExtensions,
      compression,
      encryption,
      antivirus
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createBucket"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Deletes a storage bucket.
 */
export type DeleteBucketParams = {
  bucketId: string;
};

const deleteBucket = async ({
  bucketId,
}: DeleteBucketParams): Promise<ReturnObject<boolean>> => {
  try {
    const { storage } = await createAdminClient();
    await storage.deleteBucket(bucketId);
    return { data: true, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("deleteBucket"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Retrieves a specific bucket by ID.
 */
export type GetBucketParams = {
  bucketId: string;
};

const getBucket = async ({
  bucketId,
}: GetBucketParams): Promise<ReturnObject<Models.Bucket>> => {
  try {
    const { storage } = await createAdminClient();
    const data = await storage.getBucket(bucketId);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: { message: errMsg("getBucket"), description: JSON.stringify(err) },
    };
  }
};

/**
 * Deletes a file from storage.
 */
export type DeleteFileParams = {
  bucketId: string;
  fileId: string;
};

const deleteFile = async ({
  bucketId,
  fileId,
}: DeleteFileParams): Promise<ReturnObject<boolean>> => {
  try {
    const { storage } = await createAdminClient();
    await storage.deleteFile(bucketId, fileId);
    return { data: true, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("deleteFile"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Retrieves file metadata.
 */
export type GetFileParams = {
  bucketId: string;
  fileId: string;
};

const getFile = async ({
  bucketId,
  fileId,
}: GetFileParams): Promise<ReturnObject<Models.File>> => {
  try {
    const { storage } = await createAdminClient();
    const data = await storage.getFile(bucketId, fileId);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: { message: errMsg("getFile"), description: JSON.stringify(err) },
    };
  }
};

/**
 * Retrieves a downloadable file URL.
 */
export type GetFileDownloadParams = {
  bucketId: string;
  fileId: string;
};

const getFileDownload = async ({
  bucketId,
  fileId,
}: GetFileDownloadParams): Promise<ReturnObject<ArrayBuffer>> => {
  try {
    const { storage } = await createAdminClient();
    const data = await storage.getFileDownload(bucketId, fileId);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getFileDownload"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Retrieves a file preview image.
 */
export type GetFilePreviewParams = {
  bucketId: string;
  fileId: string;
  width?: number;
  height?: number;
  gravity?: ImageGravity;
  quality?: number;
  borderWidth?: number;
  borderColor?: string;
  borderRadius?: number;
  opacity?: number;
  rotation?: number;
  background?: string;
  output?: ImageFormat;
};

const getFilePreview = async ({
  bucketId,
  fileId,
  width,
  height,
  gravity,
  quality,
  borderWidth,
  borderColor,
  borderRadius,
  opacity,
  rotation,
  background,
  output,
}: GetFilePreviewParams): Promise<ReturnObject<ArrayBuffer>> => {
  try {
    const { storage } = await createAdminClient();
    const data = await storage.getFilePreview(
      bucketId,
      fileId,
      width,
      height,
      gravity,
      quality,
      borderWidth,
      borderColor,
      borderRadius,
      opacity,
      rotation,
      background,
      output
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getFilePreview"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Lists all storage buckets.
 */
export type ListBucketsParams = {
  queries?: string[];
  search?: string;
};

const listBuckets = async ({
  queries,
  search = undefined,
}: ListBucketsParams): Promise<ReturnObject<Models.BucketList>> => {
  try {
    const { storage } = await createAdminClient();
    const data = await storage.listBuckets(queries, search);
    return { data, error: null };
  } catch (err: any) {
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
 * Parameters for listing files in a storage bucket.
 */
export type ListFilesParams = {
  bucketId: string;
  queries?: string[];
  search?: string;
};

/**
 * Lists all files in a specific storage bucket.
 */
const listFiles = async ({
  bucketId,
  queries,
  search,
}: ListFilesParams): Promise<ReturnObject<Models.FileList>> => {
  try {
    const { storage } = await createAdminClient();
    const data = await storage.listFiles(bucketId, queries, search);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("listFiles"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Retrieves file content.
 */
export type GetFileViewParams = {
  bucketId: string;
  fileId: string;
};

const getFileView = async ({
  bucketId,
  fileId,
}: GetFileViewParams): Promise<ReturnObject<ArrayBuffer>> => {
  try {
    const { storage } = await createAdminClient();
    const data = await storage.getFileView(bucketId, fileId);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getFileView"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Updates a storage bucket.
 */
export type UpdateBucketParams = {
  bucketId: string;
  name: string;
  permissions?: string[];
  fileSecurity?: boolean;
  enabled?: boolean;
  maxFileSizeInMb?: number;
  allowedFileExtensions?: string[];
  compression?: Compression;
  encryption?: boolean;
  antivirus?: boolean;
};

const updateBucket = async ({
  bucketId,
  name,
  permissions,
  fileSecurity,
  enabled,
  maxFileSizeInMb,
  allowedFileExtensions,
  compression,
  encryption,
  antivirus,
}: UpdateBucketParams): Promise<ReturnObject<Models.Bucket>> => {
  try {
    const { storage } = await createAdminClient();
    const data = await storage.updateBucket(
      bucketId,
      name,
      permissions,
      fileSecurity,
      enabled,
      maxFileSizeInMb ? maxFileSizeInMb * oneMb : undefined,
      allowedFileExtensions,
      compression,
      encryption,
      antivirus
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateBucket"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Updates a file's metadata.
 */
export type UpdateFileParams = {
  bucketId: string;
  fileId: string;
  name?: string;
  permissions?: string[];
};

const updateFile = async ({
  bucketId,
  fileId,
  name,
  permissions,
}: UpdateFileParams): Promise<ReturnObject<Models.File>> => {
  try {
    const { storage } = await createAdminClient();
    const data = await storage.updateFile(bucketId, fileId, name, permissions);
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateFile"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Uploads a file to storage.
 */
export type UploadFileParams = {
  bucketId: string;
  fileId?: string;
  file: any;
  userId?: string;
  onProgress?: (progress: UploadProgress) => void;
};
const uploadFile = async ({
  bucketId,
  fileId = ID.unique(),
  file,
  userId,
  onProgress,
}: UploadFileParams): Promise<ReturnObject<Models.File>> => {
  try {
    const { storage } = await createAdminClient();
    const data = await storage.createFile(
      bucketId,
      fileId,
      file,
      userId
        ? [`read("user:${userId}")`, `write("user:${userId}")`]
        : undefined,
      onProgress
    );
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("uploadFile"),
        description: JSON.stringify(err),
      },
    };
  }
};

/**
 * Uploads a file from a local path.
 */
export type UploadFileFromPathParams = {
  bucketId: string;
  fileId?: string;
  filePath: string;
};

const uploadFileFromPath = async ({
  bucketId,
  fileId = ID.unique(),
  filePath,
}: UploadFileFromPathParams): Promise<ReturnObject<Models.File>> => {
  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    const file = fs.createReadStream(filePath);
    const result = await uploadFile({ bucketId, fileId, file });
    return { data: result.data, error: result.error };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("uploadFileFromPath"),
        description: JSON.stringify(err),
      },
    };
  }
};

export {
  createBucket,
  deleteBucket,
  deleteFile,
  getBucket,
  getFile,
  getFileDownload,
  getFilePreview,
  getFileView,
  listBuckets,
  listFiles,
  updateBucket,
  updateFile,
  uploadFile,
  uploadFileFromPath,
};
