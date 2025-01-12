"use server";

import { Flag } from "node-appwrite";
import { createAdminClient } from "../appwriteClients";

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
    throw JSON.parse(JSON.stringify(err));
  }
};

/**
 * Retrieves an image from a URL.
 */
const getImageFromUrl = async ({
  url,
  width = 400,
  height = 400,
}: GetImageFromUrlParams): Promise<string> => {
  try {
    const { avatars } = await createAdminClient();
    const buffer = await avatars.getImage(url, width, height);
    return Buffer.from(buffer).toString("base64");
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/avatars): Error executing getImageFromUrl():",
      err
    );
    throw JSON.parse(JSON.stringify(err));
  }
};

/**
 * Retrieves user initials as an avatar image.
 */
const getUserInitials = async ({
  name,
  width = 100,
  height = 100,
  background,
}: GetUserInitialsParams): Promise<string> => {
  try {
    const { avatars } = await createAdminClient();
    const buffer = await avatars.getInitials(name, width, height, background);
    return Buffer.from(buffer).toString("base64");
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/avatars): Error executing getUserInitials():",
      err
    );
    throw JSON.parse(JSON.stringify(err));
  }
};

/**
 * Retrieves a QR code as an image.
 */
const getQrCodeFromString = async ({
  text,
  size = 400,
  margin = 1,
  download = false,
}: GetQrCodeFromStringParams): Promise<string> => {
  try {
    const { avatars } = await createAdminClient();
    const buffer = await avatars.getQR(text, size, margin, download);
    return Buffer.from(buffer).toString("base64");
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/avatars): Error executing getQrCodeFromString():",
      err
    );
    throw JSON.parse(JSON.stringify(err));
  }
};

export type AvatarFunctions = {
  getFlag: typeof getFlag;
  getImageFromUrl: typeof getImageFromUrl;
  getUserInitials: typeof getUserInitials;
  getQrCodeFromString: typeof getQrCodeFromString;
};

export { getFlag, getImageFromUrl, getUserInitials, getQrCodeFromString };
