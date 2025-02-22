"use server";
import { handleApwError } from "../exceptions";
import { createAdminClient } from "../appwriteClients";
/**
 * Retrieves a browser icon image.
 */
const getBrowserIcon = async ({ code, width = 100, height = 100, quality = 100, }) => {
    try {
        const { avatars } = await createAdminClient();
        const data = await avatars.getBrowser(code, width, height, quality);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
/**
 * Retrieves a website favicon image.
 */
const getFavicon = async ({ url, }) => {
    try {
        const { avatars } = await createAdminClient();
        const data = await avatars.getFavicon(url);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
/**
 * Retrieves a country flag image.
 */
const getFlag = async ({ code, width = 100, height = 100, quality = 100, }) => {
    try {
        const { avatars } = await createAdminClient();
        const data = await avatars.getFlag(code, width, height, quality);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
/**
 * Retrieves a credit card icon image.
 */
const getCreditCardIcon = async ({ code, width = 100, height = 100, quality = 100, }) => {
    try {
        const { avatars } = await createAdminClient();
        const data = await avatars.getCreditCard(code, width, height, quality);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
/**
 * Retrieves user initials as an avatar image.
 */
const getInitials = async ({ name, width = 100, height = 100, background, }) => {
    try {
        const { avatars } = await createAdminClient();
        const data = await avatars.getInitials(name, width, height, background);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
/**
 * Retrieves an image from a URL.
 */
const getImage = async ({ url, width = 400, height = 400, }) => {
    try {
        const { avatars } = await createAdminClient();
        const data = await avatars.getImage(url, width, height);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
/**
 * Retrieves a QR code as an image.
 */
const getQr = async ({ text, size = 400, margin = 1, download = false, }) => {
    try {
        const { avatars } = await createAdminClient();
        const data = await avatars.getQR(text, size, margin, download);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
export { getBrowserIcon, getCreditCardIcon, getFavicon, getFlag, getImage, getInitials, getQr, };
