"use server";
import { createAdminClient } from "../appwriteClients";
/**
 * Retrieves a country flag image.
 */
const getFlag = async ({ code, width = 100, height = 100, quality = 100, }) => {
    try {
        const { avatars } = await createAdminClient();
        const buffer = await avatars.getFlag(code, width, height, quality);
        return Buffer.from(buffer).toString("base64");
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/avatars): Error executing getFlag():", err);
        throw err;
    }
};
/**
 * Retrieves an image from a URL.
 */
const getImageFromUrl = async ({ url, width = 400, height = 400, }) => {
    try {
        const { avatars } = await createAdminClient();
        const buffer = await avatars.getImage(url, width, height);
        return Buffer.from(buffer).toString("base64");
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/avatars): Error executing getImageFromUrl():", err);
        throw err;
    }
};
/**
 * Retrieves a QR code as an image.
 */
const getQrCodeFromString = async ({ text, size = 400, margin = 1, download = false, }) => {
    try {
        const { avatars } = await createAdminClient();
        const buffer = await avatars.getQR(text, size, margin, download);
        return Buffer.from(buffer).toString("base64");
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/avatars): Error executing getQrCodeFromString():", err);
        throw err;
    }
};
/**
 * Retrieves user initials as an avatar image.
 */
const getUserInitials = async ({ name, width = 100, height = 100, background, }) => {
    try {
        const { avatars } = await createAdminClient();
        const buffer = await avatars.getInitials(name, width, height, background);
        return Buffer.from(buffer).toString("base64");
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/avatars): Error executing getUserInitials():", err);
        throw err;
    }
};
export { getFlag, getImageFromUrl, getQrCodeFromString, getUserInitials };
