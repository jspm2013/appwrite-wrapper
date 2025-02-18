"use server";

import { handleApwError } from "../exceptions";
import { createAdminClient } from "../appwriteClients";
import { Browser, CreditCard, Flag } from "node-appwrite";

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
const getBrowserIcon = async ({
  code,
  width = 100,
  height = 100,
  quality = 100,
}: GetBrowserIconParams): Promise<ReturnObject<string>> => {
  try {
    const { avatars } = await createAdminClient();
    const buffer = await avatars.getBrowser(code, width, height, quality);
    return { data: Buffer.from(buffer).toString("base64"), error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Parameters for retrieving a website favicon.
 */
export type GetFaviconParams = {
  url: string;
};
/**
 * Retrieves a website favicon image.
 */
const getFavicon = async ({
  url,
}: GetFaviconParams): Promise<ReturnObject<string>> => {
  try {
    const { avatars } = await createAdminClient();
    const buffer = await avatars.getFavicon(url);
    return { data: Buffer.from(buffer).toString("base64"), error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const getFlag = async ({
  code,
  width = 100,
  height = 100,
  quality = 100,
}: GetFlagParams): Promise<ReturnObject<string>> => {
  try {
    const { avatars } = await createAdminClient();
    const buffer = await avatars.getFlag(code, width, height, quality);
    return { data: Buffer.from(buffer).toString("base64"), error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const getCreditCardIcon = async ({
  code,
  width = 100,
  height = 100,
  quality = 100,
}: GetCreditCardIconParams): Promise<ReturnObject<string>> => {
  try {
    const { avatars } = await createAdminClient();
    const buffer = await avatars.getCreditCard(code, width, height, quality);
    return { data: Buffer.from(buffer).toString("base64"), error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const getInitials = async ({
  name,
  width = 100,
  height = 100,
  background,
}: GetInitialsParams): Promise<ReturnObject<string>> => {
  try {
    const { avatars } = await createAdminClient();
    const buffer = await avatars.getInitials(name, width, height, background);
    return { data: Buffer.from(buffer).toString("base64"), error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const getImage = async ({
  url,
  width = 400,
  height = 400,
}: GetImageParams): Promise<ReturnObject<string>> => {
  try {
    const { avatars } = await createAdminClient();
    const buffer = await avatars.getImage(url, width, height);
    return { data: Buffer.from(buffer).toString("base64"), error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const getQr = async ({
  text,
  size = 400,
  margin = 1,
  download = false,
}: GetQrParams): Promise<ReturnObject<string>> => {
  try {
    const { avatars } = await createAdminClient();
    const buffer = await avatars.getQR(text, size, margin, download);
    return { data: Buffer.from(buffer).toString("base64"), error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

export {
  getBrowserIcon,
  getCreditCardIcon,
  getFavicon,
  getFlag,
  getImage,
  getInitials,
  getQr,
};
