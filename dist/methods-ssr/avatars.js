"use server";
import { live } from "../host";
import { createAdminClient } from "../appwriteClients";
const admin = !live;
const errMsg = (fn) => admin ? `ApwWrapper Error (methods/avatars): ${fn}()` : "Avatars Error";
("use server");
/**
 * Retrieves a browser icon image.
 */
const getBrowserIcon = async ({ code, width = 100, height = 100, quality = 100, }) => {
    try {
        const { avatars } = await createAdminClient();
        const buffer = await avatars.getBrowser(code, width, height, quality);
        return { data: Buffer.from(buffer).toString("base64"), error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getBrowserIcon"),
                description: JSON.stringify(err),
            },
        };
    }
};
/**
 * Retrieves a website favicon image.
 */
const getFavicon = async ({ url, }) => {
    try {
        const { avatars } = await createAdminClient();
        const buffer = await avatars.getFavicon(url);
        return { data: Buffer.from(buffer).toString("base64"), error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getFavicon"),
                description: JSON.stringify(err),
            },
        };
    }
};
/**
 * Retrieves a country flag image.
 */
const getFlag = async ({ code, width = 100, height = 100, quality = 100, }) => {
    try {
        const { avatars } = await createAdminClient();
        const buffer = await avatars.getFlag(code, width, height, quality);
        return { data: Buffer.from(buffer).toString("base64"), error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getFlag"),
                description: JSON.stringify(err),
            },
        };
    }
};
/**
 * Retrieves a credit card icon image.
 */
const getCreditCardIcon = async ({ code, width = 100, height = 100, quality = 100, }) => {
    try {
        const { avatars } = await createAdminClient();
        const buffer = await avatars.getCreditCard(code, width, height, quality);
        return { data: Buffer.from(buffer).toString("base64"), error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getCreditCardIcon"),
                description: JSON.stringify(err),
            },
        };
    }
};
/**
 * Retrieves user initials as an avatar image.
 */
const getInitials = async ({ name, width = 100, height = 100, background, }) => {
    try {
        const { avatars } = await createAdminClient();
        const buffer = await avatars.getInitials(name, width, height, background);
        return { data: Buffer.from(buffer).toString("base64"), error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getInitials"),
                description: JSON.stringify(err),
            },
        };
    }
};
/**
 * Retrieves an image from a URL.
 */
const getImage = async ({ url, width = 400, height = 400, }) => {
    try {
        const { avatars } = await createAdminClient();
        const buffer = await avatars.getImage(url, width, height);
        return { data: Buffer.from(buffer).toString("base64"), error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getImage"),
                description: JSON.stringify(err),
            },
        };
    }
};
/**
 * Retrieves a QR code as an image.
 */
const getQr = async ({ text, size = 400, margin = 1, download = false, }) => {
    try {
        const { avatars } = await createAdminClient();
        const buffer = await avatars.getQR(text, size, margin, download);
        return { data: Buffer.from(buffer).toString("base64"), error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("getQr"),
                description: JSON.stringify(err),
            },
        };
    }
};
export { getBrowserIcon, getCreditCardIcon, getFavicon, getFlag, getImage, getInitials, getQr, };
