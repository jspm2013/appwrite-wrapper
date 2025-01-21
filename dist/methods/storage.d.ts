import { Models } from "node-appwrite";
import { Compression, ImageFormat, ImageGravity, UploadProgress } from "../enums";
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
declare const listFiles: ({ bucketId, queries, search, }: ListFilesParams) => Promise<any>;
/**
 * Parameters for the getFile function.
 */
export type GetFileDetailsParams = {
    bucketId: string;
    fileId: string;
};
/**
 * Get details of a file by its unique ID.
 * @param params - Parameters for getting the file.
 * @returns The file details.
 */
declare const getFileDetails: ({ bucketId, fileId, }: GetFileDetailsParams) => Promise<any>;
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
declare const updateFile: ({ bucketId, fileId, name, permissions, }: UpdateFileParams) => Promise<any>;
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
declare const deleteFile: ({ bucketId, fileId, }: DeleteFileParams) => Promise<any>;
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
declare const getFileDownload: ({ bucketId, fileId, }: GetFileDownloadParams) => Promise<any>;
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
declare const getFilePreview: ({ bucketId, fileId, width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output, }: GetFilePreviewParams) => Promise<any>;
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
declare const uploadFile: ({ bucketId, fileId, file, userId, onProgress, }: UploadFileParams) => Promise<any>;
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
declare const uploadFileFromPath: ({ bucketId, fileId, filePath, userId, onProgress, }: UploadFileFromPathParams) => Promise<any>;
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
declare const listBuckets: ({ queries, search, }: ListBucketsParams) => Promise<Models.BucketList>;
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
declare const createBucket: ({ bucketName, permissions, fileSecurity, enabled, maxFileSizeInMb, allowedFileExtensions, compression, encryption, antivirus, }: CreateBucketParams) => Promise<any>;
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
declare const getBucket: ({ bucketId, }: GetBucketParams) => Promise<Models.Bucket>;
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
declare const updateBucket: ({ bucketId, name, permissions, fileSecurity, enabled, maximumFileSize, allowedFileExtensions, compression, encryption, antivirus, }: UpdateBucketParams) => Promise<any>;
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
declare const deleteBucket: ({ bucketId }: DeleteBucketParams) => Promise<any>;
export type StorageFunctionTypes = {
    createBucket: typeof createBucket;
    deleteBucket: typeof deleteBucket;
    getBucket: typeof getBucket;
    getFileDetails: typeof getFileDetails;
    getFileDownload: typeof getFileDownload;
    getFilePreview: typeof getFilePreview;
    deleteFile: typeof deleteFile;
    listBuckets: typeof listBuckets;
    listFiles: typeof listFiles;
    updateBucket: typeof updateBucket;
    updateFile: typeof updateFile;
    uploadFile: typeof uploadFile;
    uploadFileFromPath: typeof uploadFileFromPath;
};
export { createBucket, deleteBucket, getBucket, getFileDetails, getFileDownload, getFilePreview, deleteFile, listBuckets, listFiles, updateBucket, updateFile, uploadFile, uploadFileFromPath, };
//# sourceMappingURL=storage.d.ts.map