import { Compression, ImageFormat, ImageGravity, UploadProgress } from "../enums";
import { Models } from "node-appwrite";
import { ImageType } from "../utils";
interface ErrorObject {
    appwrite: boolean;
    header: string;
    type: string;
    code: number;
    variant: string;
    description: string;
    error?: object;
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
declare const createBucket: ({ bucketName, permissions, fileSecurity, enabled, maxFileSizeInMb, allowedFileExtensions, compression, encryption, antivirus, }: CreateBucketParams) => Promise<ReturnObject<Models.Bucket>>;
/**
 * Deletes a storage bucket.
 */
export type DeleteBucketParams = {
    bucketId: string;
};
declare const deleteBucket: ({ bucketId, }: DeleteBucketParams) => Promise<ReturnObject<{}>>;
/**
 * Retrieves a specific bucket by ID.
 */
export type GetBucketParams = {
    bucketId: string;
};
declare const getBucket: ({ bucketId, }: GetBucketParams) => Promise<ReturnObject<Models.Bucket>>;
/**
 * Deletes a file from storage.
 */
export type DeleteFileParams = {
    bucketId: string;
    fileId: string;
};
declare const deleteFile: ({ bucketId, fileId, }: DeleteFileParams) => Promise<ReturnObject<{}>>;
/**
 * Retrieves file metadata.
 */
export type GetFileParams = {
    bucketId: string;
    fileId: string;
};
declare const getFile: ({ bucketId, fileId, }: GetFileParams) => Promise<ReturnObject<Models.File>>;
/**
 * Retrieves a downloadable file URL.
 */
export type GetFileDownloadParams = {
    bucketId: string;
    fileId: string;
};
declare const getFileDownload: ({ bucketId, fileId, }: GetFileDownloadParams) => Promise<ReturnObject<ArrayBuffer>>;
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
declare const getFilePreview: ({ bucketId, fileId, width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output, }: GetFilePreviewParams) => Promise<ReturnObject<ArrayBuffer>>;
/**
 * Lists all storage buckets.
 */
export type ListBucketsParams = {
    queries?: string[];
    search?: string;
};
declare const listBuckets: ({ queries, search, }: ListBucketsParams) => Promise<ReturnObject<Models.BucketList>>;
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
declare const listFiles: ({ bucketId, queries, search, }: ListFilesParams) => Promise<ReturnObject<Models.FileList>>;
/**
 * Retrieves file content.
 */
export type GetFileViewParams = {
    bucketId: string;
    fileId: string;
};
declare const getFileView: ({ bucketId, fileId, }: GetFileViewParams) => Promise<ReturnObject<ArrayBuffer>>;
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
declare const updateBucket: ({ bucketId, name, permissions, fileSecurity, enabled, maxFileSizeInMb, allowedFileExtensions, compression, encryption, antivirus, }: UpdateBucketParams) => Promise<ReturnObject<Models.Bucket>>;
/**
 * Updates a file's metadata.
 */
export type UpdateFileParams = {
    bucketId: string;
    fileId: string;
    name?: string;
    permissions?: string[];
};
declare const updateFile: ({ bucketId, fileId, name, permissions, }: UpdateFileParams) => Promise<ReturnObject<Models.File>>;
/**
 * Uploads a file to storage.
 */
export type UploadFileParams = {
    bucketId: string;
    fileId?: string;
    file: any;
    userId?: string;
    onProgress?: (progress: UploadProgress) => void;
    outputType?: ImageType;
    qualityPercentage?: number;
};
declare const uploadFile: ({ bucketId, fileId, file, userId, onProgress, outputType, qualityPercentage, }: UploadFileParams) => Promise<ReturnObject<Models.File>>;
/**
 * Uploads a file from a local path.
 */
export type UploadFileFromPathParams = {
    bucketId: string;
    fileId?: string;
    filePath: string;
};
declare const uploadFileFromPath: ({ bucketId, fileId, filePath, }: UploadFileFromPathParams) => Promise<ReturnObject<Models.File>>;
export { createBucket, deleteBucket, deleteFile, getBucket, getFile, getFileDownload, getFilePreview, getFileView, listBuckets, listFiles, updateBucket, updateFile, uploadFile, uploadFileFromPath, };
//# sourceMappingURL=storage.d.ts.map