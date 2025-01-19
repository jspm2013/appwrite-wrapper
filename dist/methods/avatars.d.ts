import { Flag } from "node-appwrite";
/**
 * Parameters for retrieving a country flag image, including optional width, height, and quality settings.
 */
export type GetFlagParams = {
    code: Flag;
    width?: number;
    height?: number;
    quality?: number;
};
/**
 * Retrieves a country flag image.
 */
declare const getFlag: ({ code, width, height, quality, }: GetFlagParams) => Promise<string>;
/**
 * Parameters for retrieving an image from a URL, with optional width and height settings.
 */
export type GetImageFromUrlParams = {
    url: string;
    width?: number;
    height?: number;
};
/**
 * Retrieves an image from a URL.
 */
declare const getImageFromUrl: ({ url, width, height, }: GetImageFromUrlParams) => Promise<string>;
/**
 * Parameters for retrieving a QR code as an image, with optional size, margin, and download settings.
 */
export type GetQrCodeFromStringParams = {
    text: string;
    size?: number;
    margin?: number;
    download?: boolean;
};
/**
 * Retrieves a QR code as an image.
 */
declare const getQrCodeFromString: ({ text, size, margin, download, }: GetQrCodeFromStringParams) => Promise<string>;
/**
 * Parameters for retrieving user initials as an avatar image, including optional width, height, and background color settings.
 */
export type GetUserInitialsParams = {
    name: string;
    width?: number;
    height?: number;
    background?: string;
};
/**
 * Retrieves user initials as an avatar image.
 */
declare const getUserInitials: ({ name, width, height, background, }: GetUserInitialsParams) => Promise<string>;
export type AvatarsFunctionTypes = {
    getFlag: typeof getFlag;
    getImageFromUrl: typeof getImageFromUrl;
    getQrCodeFromString: typeof getQrCodeFromString;
    getUserInitials: typeof getUserInitials;
};
export { getFlag, getImageFromUrl, getQrCodeFromString, getUserInitials };
//# sourceMappingURL=avatars.d.ts.map