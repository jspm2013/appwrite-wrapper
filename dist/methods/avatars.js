var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createAdminClient } from "../appwriteClients";
/**
 * Retrieves a country flag image.
 */
const getFlag = (_a) => __awaiter(void 0, [_a], void 0, function* ({ code, width = 100, height = 100, quality = 100, }) {
    try {
        const { avatars } = yield createAdminClient();
        const buffer = yield avatars.getFlag(code, width, height, quality);
        return Buffer.from(buffer).toString("base64");
    }
    catch (err) {
        console.error("APW-LIB ERROR (avatars): Error in getFlag():", err);
        return err;
    }
});
/**
 * Retrieves an image from a URL.
 */
const getImageFromUrl = (_a) => __awaiter(void 0, [_a], void 0, function* ({ url, width = 400, height = 400, }) {
    try {
        const { avatars } = yield createAdminClient();
        const buffer = yield avatars.getImage(url, width, height);
        return Buffer.from(buffer).toString("base64");
    }
    catch (err) {
        console.error("APW-LIB ERROR (avatars): Error in getImageFromUrl():", err);
        return err;
    }
});
/**
 * Retrieves user initials as an avatar image.
 */
const getUserInitials = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, width = 100, height = 100, background, }) {
    try {
        const { avatars } = yield createAdminClient();
        const buffer = yield avatars.getInitials(name, width, height, background);
        return Buffer.from(buffer).toString("base64");
    }
    catch (err) {
        console.error("APW-LIB ERROR (avatars): Error in getUserInitials():", err);
        return err;
    }
});
/**
 * Retrieves a QR code as an image.
 */
const getQrCodeFromString = (_a) => __awaiter(void 0, [_a], void 0, function* ({ text, size = 400, margin = 1, download = false, }) {
    try {
        const { avatars } = yield createAdminClient();
        const buffer = yield avatars.getQR(text, size, margin, download);
        return Buffer.from(buffer).toString("base64");
    }
    catch (err) {
        console.error("APW-LIB ERROR (avatars): Error in getQrCodeFromString():", err);
        return err;
    }
});
export { getFlag, getImageFromUrl, getUserInitials, getQrCodeFromString };
