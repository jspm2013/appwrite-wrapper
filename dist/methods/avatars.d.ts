import { Flag } from "node-appwrite";
/**
 * Types for the `avatars` module.
 */
export type GetFlagParams = {
    code: Flag;
    width?: number;
    height?: number;
    quality?: number;
};
export type GetImageFromUrlParams = {
    url: string;
    width?: number;
    height?: number;
};
export type GetUserInitialsParams = {
    name: string;
    width?: number;
    height?: number;
    background?: string;
};
export type GetQrCodeFromStringParams = {
    text: string;
    size?: number;
    margin?: number;
    download?: boolean;
};
/**
 * Retrieves a country flag image.
 */
declare const getFlag: ({ code, width, height, quality, }: GetFlagParams) => Promise<string>;
/**
 * Retrieves an image from a URL.
 */
declare const getImageFromUrl: ({ url, width, height, }: GetImageFromUrlParams) => Promise<string>;
/**
 * Retrieves a QR code as an image.
 */
declare const getQrCodeFromString: ({ text, size, margin, download, }: GetQrCodeFromStringParams) => Promise<string>;
/**
 * Retrieves user initials as an avatar image.
 */
declare const getUserInitials: ({ name, width, height, background, }: GetUserInitialsParams) => Promise<string>;
export type AvatarFunctions = {
    getFlag: typeof getFlag;
    getImageFromUrl: typeof getImageFromUrl;
    getQrCodeFromString: typeof getQrCodeFromString;
    getUserInitials: typeof getUserInitials;
};
export { getFlag, getImageFromUrl, getQrCodeFromString, getUserInitials };
//# sourceMappingURL=avatars.d.ts.map