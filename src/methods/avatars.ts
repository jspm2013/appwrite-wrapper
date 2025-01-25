"use server";

import { Flag } from "node-appwrite";
import { createAdminClient } from "../appwriteClients";

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
}: GetFlagParams): Promise<string> => {
  try {
    const { avatars } = await createAdminClient();
    const buffer = await avatars.getFlag(code, width, height, quality);
    return Buffer.from(buffer).toString("base64");
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/avatars): Error executing getFlag():",
      err
    );
    throw err;
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
}: GetImageParams): Promise<string> => {
  try {
    const { avatars } = await createAdminClient();
    const buffer = await avatars.getImage(url, width, height);
    return Buffer.from(buffer).toString("base64");
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/avatars): Error executing getImage():",
      err
    );
    throw err;
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
}: GetQrParams): Promise<string> => {
  try {
    const { avatars } = await createAdminClient();
    const buffer = await avatars.getQR(text, size, margin, download);
    return Buffer.from(buffer).toString("base64");
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/avatars): Error executing getQr():",
      err
    );
    throw err;
  }
};

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
const getInitials = async ({
  name,
  width = 100,
  height = 100,
  background,
}: GetInitialsParams): Promise<string> => {
  try {
    const { avatars } = await createAdminClient();
    const buffer = await avatars.getInitials(name, width, height, background);
    return Buffer.from(buffer).toString("base64");
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/avatars): Error executing getInitials():",
      err
    );
    throw err;
  }
};

export type AvatarsFunctionTypes = {
  getFlag: typeof getFlag;
  getImage: typeof getImage;
  getQr: typeof getQr;
  getInitials: typeof getInitials;
};

export { getFlag, getImage, getQr, getInitials };
