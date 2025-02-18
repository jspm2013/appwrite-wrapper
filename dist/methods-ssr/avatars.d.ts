import { Browser, CreditCard, Flag } from "node-appwrite";
interface ErrorObject {
    message: string;
    description: string;
}
interface ReturnObject<T> {
    error: ErrorObject | null;
    data: T | null;
}
/**
 * Parameters for retrieving a browser icon, including optional width, height, and quality settings.
 */
export type GetBrowserIconParams = {
    code: Browser;
    width?: number;
    height?: number;
    quality?: number;
};
/**
 * Retrieves a browser icon image.
 */
declare const getBrowserIcon: ({ code, width, height, quality, }: GetBrowserIconParams) => Promise<ReturnObject<string>>;
/**
 * Parameters for retrieving a website favicon.
 */
export type GetFaviconParams = {
    url: string;
};
/**
 * Retrieves a website favicon image.
 */
declare const getFavicon: ({ url, }: GetFaviconParams) => Promise<ReturnObject<string>>;
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
declare const getFlag: ({ code, width, height, quality, }: GetFlagParams) => Promise<ReturnObject<string>>;
/**
 * Parameters for retrieving a credit card icon, including optional width, height, and quality settings.
 */
export type GetCreditCardIconParams = {
    code: CreditCard;
    width?: number;
    height?: number;
    quality?: number;
};
/**
 * Retrieves a credit card icon image.
 */
declare const getCreditCardIcon: ({ code, width, height, quality, }: GetCreditCardIconParams) => Promise<ReturnObject<string>>;
/**
 * Parameters for retrieving user initials as an avatar image, including optional width, height, and background color settings.
 */
export type GetInitialsParams = {
    name?: string;
    width?: number;
    height?: number;
    background?: string;
};
/**
 * Retrieves user initials as an avatar image.
 */
declare const getInitials: ({ name, width, height, background, }: GetInitialsParams) => Promise<ReturnObject<string>>;
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
declare const getImage: ({ url, width, height, }: GetImageParams) => Promise<ReturnObject<string>>;
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
declare const getQr: ({ text, size, margin, download, }: GetQrParams) => Promise<ReturnObject<string>>;
export { getBrowserIcon, getCreditCardIcon, getFavicon, getFlag, getImage, getInitials, getQr, };
//# sourceMappingURL=avatars.d.ts.map