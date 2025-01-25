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
export type GetImageParams = {
    url: string;
    width?: number;
    height?: number;
};
/**
 * Retrieves an image from a URL.
 */
declare const getImage: ({ url, width, height, }: GetImageParams) => Promise<string>;
/**
 * Parameters for retrieving a QR code as an image, with optional size, margin, and download settings.
 */
export type GetQrParams = {
    text: string;
    size?: number;
    margin?: number;
    download?: boolean;
};
/**
 * Retrieves a QR code as an image.
 */
declare const getQr: ({ text, size, margin, download, }: GetQrParams) => Promise<string>;
/**
 * Parameters for retrieving user initials as an avatar image, including optional width, height, and background color settings.
 */
export type GetInitialsParams = {
    name: string;
    width?: number;
    height?: number;
    background?: string;
};
/**
 * Retrieves user initials as an avatar image.
 */
declare const getInitials: ({ name, width, height, background, }: GetInitialsParams) => Promise<string>;
export type AvatarsFunctionTypes = {
    getFlag: typeof getFlag;
    getImage: typeof getImage;
    getQr: typeof getQr;
    getInitials: typeof getInitials;
};
export { getFlag, getImage, getQr, getInitials };
//# sourceMappingURL=avatars.d.ts.map