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

const oneMb: number = 1024 * 1024;

/**
 * Parameters for the listFiles function.
 */
export type ListFilesParams = {
  bucketId: string;
  queries?: string[];
  search?: string;
};
/**
 * List all files in a specific bucket.
 * @param params - Parameters for listing the files.
 * @returns The list of files.
 */
const listFiles = async ({
  bucketId,
  queries,
  search,
}: ListFilesParams): Promise<any> => {
  try {
    const { storage } = await createAdminClient();
    const result = await storage.listFiles(bucketId, queries, search);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/storage): Error executing listFiles():",
      err
    );
    throw err;
  }
};

/**
 * Get a file by its unique ID.
 * This endpoint response returns a JSON object with the file metadata.
 */
export type GetFileParams = {
  bucketId: string;
  fileId: string;
};
/**
 * Get metadata of a file by its unique ID.
 * @param params - Parameters for getting the file.
 * @returns The file metadata.
 */
const getFile = async ({ bucketId, fileId }: GetFileParams): Promise<any> => {
  try {
    const { storage } = await createAdminClient();
    const { getFile: fetchFile } = storage;
    const result = await fetchFile(bucketId, fileId);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/storage): Error executing getFile():",
      err
    );
    throw err;
  }
};

/**
 * Get a file content by its unique ID.
 * This endpoint is similar to the download method but returns with no 'Content-Disposition: attachment' header.
 */
export type GetFileViewParams = {
  bucketId: string;
  fileId: string;
};
/**
 * Get file content of a file by its unique ID.
 * @param params - Parameters for getting the file.
 * @returns The file content.
 */
const getFileView = async ({
  bucketId,
  fileId,
}: GetFileViewParams): Promise<any> => {
  try {
    const { storage } = await createAdminClient();
    const { getFileView: fetchFileView } = storage;
    const result = await fetchFileView(bucketId, fileId);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/storage): Error executing getFileView():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the updateFile function.
 */
export type UpdateFileParams = {
  bucketId: string;
  fileId: string;
  name?: string;
  permissions?: string[];
};
/**
 * Update a file by its unique ID.
 * @param params - Parameters for updating the file.
 * @returns The updated file details.
 */
const updateFile = async ({
  bucketId,
  fileId,
  name,
  permissions,
}: UpdateFileParams): Promise<any> => {
  try {
    const { storage } = await createAdminClient();
    const result = await storage.updateFile(
      bucketId,
      fileId,
      name,
      permissions
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/storage): Error executing updateFile():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the deleteFile function.
 */
export type DeleteFileParams = {
  bucketId: string;
  fileId: string;
};
/**
 * Delete a file by its unique ID.
 * @param params - Parameters for deleting the file.
 * @returns Confirmation of deletion.
 */
const deleteFile = async ({
  bucketId,
  fileId,
}: DeleteFileParams): Promise<any> => {
  try {
    const { storage } = await createAdminClient();
    const result = await storage.deleteFile(bucketId, fileId);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/storage): Error executing deleteFile():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the getFileDownload function.
 */
export type GetFileDownloadParams = {
  bucketId: string;
  fileId: string;
};
/**
 * Get a file content for download by its unique ID.
 * @param params - Parameters for downloading the file.
 * @returns The file content.
 */
const getFileDownload = async ({
  bucketId,
  fileId,
}: GetFileDownloadParams): Promise<any> => {
  try {
    const { storage } = await createAdminClient();
    const result = await storage.getFileDownload(bucketId, fileId);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/storage): Error executing getFileDownload():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the getFilePreview function.
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
/**
 * Get a file preview image.
 * @param params - Parameters for generating the preview.
 * @returns The file preview.
 */
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
}: GetFilePreviewParams): Promise<any> => {
  try {
    const { storage } = await createAdminClient();
    const result = await storage.getFilePreview(
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
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/storage): Error executing getFilePreview():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the uploadFile function.
 */
export type UploadFileParams = {
  bucketId: string;
  fileId?: string;
  file: any;
  userId?: string;
  onProgress?: (progress: UploadProgress) => void;
};
/**
 * Upload a file to a specific bucket.
 * @param params - Parameters for uploading the file.
 * @returns The uploaded file details.
 */
const uploadFile = async ({
  bucketId,
  fileId = ID.unique(),
  file,
  userId,
  onProgress,
}: UploadFileParams): Promise<any> => {
  try {
    const { storage } = await createAdminClient();

    const formData = new FormData();
    formData.append("file", file);

    const result = await storage.createFile(
      bucketId,
      fileId,
      file,
      userId
        ? [`read("user:${userId}")`, `write("user:${userId}")`]
        : undefined,
      onProgress
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/storage): Error executing uploadFile():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the uploadFileFromPath function.
 */
export type UploadFileFromPathParams = {
  bucketId: string;
  fileId?: string;
  filePath: string;
  userId?: string;
  onProgress?: (progress: UploadProgress) => void;
};
/**
 * Upload a file to a bucket using its file path.
 * @param params - Parameters for uploading the file.
 * @returns The uploaded file details.
 */
const uploadFileFromPath = async ({
  bucketId,
  fileId = ID.unique(),
  filePath,
  userId,
  onProgress,
}: UploadFileFromPathParams): Promise<any> => {
  try {
    try {
      await fs.promises.access(filePath, fs.constants.R_OK);
    } catch (err: any) {
      if (err.code === "ENOENT") {
        throw new Error(`File not found: ${filePath}`);
      } else if (err.code === "EACCES") {
        throw new Error(`No read permission for file: ${filePath}`);
      } else {
        throw new Error(
          `Unable to access file: ${filePath}, Error: ${err.message}`
        );
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
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/storage): Error executing uploadFileFromPath():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the listBuckets function.
 */
export type ListBucketsParams = {
  queries?: string[];
  search?: string;
};
/**
 * List all storage buckets.
 * @param params - Parameters for listing the buckets.
 * @returns The list of buckets.
 */
const listBuckets = async ({
  queries,
  search = undefined,
}: ListBucketsParams): Promise<Models.BucketList> => {
  try {
    const { storage } = await createAdminClient();
    const result = await storage.listBuckets(queries, search);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/storage): Error executing listBuckets():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the createBucket function.
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
/**
 * Create a new storage bucket in Appwrite.
 * @param params - Parameters for creating the bucket.
 * @returns The created bucket.
 */
const createBucket = async ({
  bucketName,
  permissions = ['read("any")', 'write("any")', 'delete("any")'],
  fileSecurity = false,
  enabled = false,
  maxFileSizeInMb = 5,
  allowedFileExtensions = [],
  compression = Compression.Gzip,
  encryption = true,
  antivirus = true,
}: CreateBucketParams): Promise<any> => {
  try {
    const { storage } = await createAdminClient();
    const result = await storage.createBucket(
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
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/storage): Error executing createBucket():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the getBucket function.
 */
export type GetBucketParams = {
  bucketId: string;
};
/**
 * Get details of a specific storage bucket.
 * @param params - Parameters for getting the bucket.
 * @returns The bucket details.
 */
const getBucket = async ({
  bucketId,
}: GetBucketParams): Promise<Models.Bucket> => {
  try {
    const { storage } = await createAdminClient();
    const result = await storage.getBucket(bucketId);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/storage): Error executing getBucket():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the updateBucket function.
 */
export type UpdateBucketParams = {
  bucketId: string;
  name: string;
  permissions?: string[];
  fileSecurity?: boolean;
  enabled?: boolean;
  maximumFileSize?: number;
  allowedFileExtensions?: string[];
  compression?: Compression;
  encryption?: boolean;
  antivirus?: boolean;
};
/**
 * Update a storage bucket by its unique ID.
 * @param params - Parameters for updating the bucket.
 * @returns The updated bucket.
 */
const updateBucket = async ({
  bucketId,
  name,
  permissions,
  fileSecurity,
  enabled,
  maximumFileSize,
  allowedFileExtensions,
  compression,
  encryption,
  antivirus,
}: UpdateBucketParams): Promise<any> => {
  try {
    const { storage } = await createAdminClient();
    const result = await storage.updateBucket(
      bucketId,
      name,
      permissions,
      fileSecurity,
      enabled,
      maximumFileSize,
      allowedFileExtensions,
      compression,
      encryption,
      antivirus
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/storage): Error executing updateBucket():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for the deleteBucket function.
 */
export type DeleteBucketParams = {
  bucketId: string;
};
/**
 * Delete a storage bucket by its unique ID.
 * @param params - Parameters for deleting the bucket.
 * @returns Confirmation of deletion.
 */
const deleteBucket = async ({ bucketId }: DeleteBucketParams): Promise<any> => {
  try {
    const { storage } = await createAdminClient();
    const result = await storage.deleteBucket(bucketId);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/storage): Error executing deleteBucket():",
      err
    );
    throw err;
  }
};

export type StorageFunctionTypes = {
  createBucket: typeof createBucket;
  deleteBucket: typeof deleteBucket;
  getBucket: typeof getBucket;
  getFile: typeof getFile;
  getFileDownload: typeof getFileDownload;
  getFilePreview: typeof getFilePreview;
  getFileView: typeof getFileView;
  deleteFile: typeof deleteFile;
  listBuckets: typeof listBuckets;
  listFiles: typeof listFiles;
  updateBucket: typeof updateBucket;
  updateFile: typeof updateFile;
  uploadFile: typeof uploadFile;
  uploadFileFromPath: typeof uploadFileFromPath;
};

export {
  createBucket,
  deleteBucket,
  getBucket,
  getFile,
  getFileDownload,
  getFilePreview,
  getFileView,
  deleteFile,
  listBuckets,
  listFiles,
  updateBucket,
  updateFile,
  uploadFile,
  uploadFileFromPath,
};
