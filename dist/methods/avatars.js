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
        console.error("APW-LIB ERROR (avatars): Error in getFlag():", err);
        throw JSON.parse(JSON.stringify(err));
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
        console.error("APW-LIB ERROR (avatars): Error in getImageFromUrl():", err);
        throw JSON.parse(JSON.stringify(err));
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
        console.error("APW-LIB ERROR (avatars): Error in getUserInitials():", err);
        throw JSON.parse(JSON.stringify(err));
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
        console.error("APW-LIB ERROR (avatars): Error in getQrCodeFromString():", err);
        throw JSON.parse(JSON.stringify(err));
    }
};
export { getFlag, getImageFromUrl, getUserInitials, getQrCodeFromString };
