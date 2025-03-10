import { randomInt } from "crypto";
import { logsPath } from "./appwriteConfig";
import fs from "fs/promises";
import path from "path";
const LOGS_FOLDER = path.join(process.cwd(), logsPath);
/**
 * Converts an ArrayBuffer to a Base64 string.
 * @param buffer - The ArrayBuffer to convert.
 * @returns {string} - The Base64 encoded string.
 */
export const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary); // Converts binary string to Base64
};
/**
 * Validates if a given string is a valid JSON string.
 * @param str - The string to validate.
 * @returns {boolean} - True if the string is a valid JSON string, false otherwise.
 */
export const isValidJsonString = (str) => {
    try {
        JSON.parse(str); // Attempt to parse the string
        return true;
    }
    catch (e) {
        return false;
    }
};
/**
 * Checks if the given object is a valid JSON object.
 * @param obj - The object to check.
 * @returns {boolean} - True if the object is a valid JSON object, false otherwise.
 */
export const isValidJsonObject = (obj) => {
    return obj !== null && typeof obj === "object" && !Array.isArray(obj);
};
/**
 * Checks if the given object is an empty object.
 * @param obj - The object to check.
 * @returns {boolean} - True if the object is empty, false otherwise.
 */
export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};
/**
 * Checks if the given object has only one key-value pair with an empty key and an empty value.
 * @param obj - The object to check.
 * @returns {boolean} - True if the object matches the condition, false otherwise.
 */
export const isEmptyKeyValuePair = (obj) => {
    return Object.keys(obj).length === 1 && obj[""] === "";
};
/**
 * Generates a random password of the specified length.
 */
export const temporaryPassword = (length = 12) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomValue = randomInt(0, charactersLength);
        password += characters.charAt(randomValue);
    }
    return password;
};
/**
 * Singleton class for managing appwrite state.
 * @class
 */
class AppwriteManager {
    static instance;
    locale = "de"; // Default locale
    isAdmin = false; // Default admin state
    constructor() { } // Prevent direct instantiation
    static getInstance() {
        if (!AppwriteManager.instance) {
            AppwriteManager.instance = new AppwriteManager();
        }
        return AppwriteManager.instance;
    }
    // Locale management
    getLocale() {
        return this.locale;
    }
    setLocale(newLocale) {
        this.locale = newLocale;
    }
    // Admin state management
    getAdmin() {
        return this.isAdmin;
    }
    setAdmin(isAdmin) {
        this.isAdmin = isAdmin;
    }
}
// Export a global instance
export const apwManager = AppwriteManager.getInstance();
/**
 * WebP image conversion
 * @param file - The image file to convert.
 * @param quality - The quality of the output image (0-1).
 * @param width - The width of the output image.
 * @param height - The height of the output image.
 * @param background - The background color of the output image.
 * @returns {Promise<File>} - A promise that resolves to the converted image file.
 */
export const imgToWebP = async (file, quality = 0.9, width, height, background = "transparent" // Default is transparent
) => {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith("image/")) {
            return reject(new Error("Invalid file type"));
        }
        // Validate background color (allow only hex or transparent)
        const isValidHex = /^#([0-9A-F]{3}){1,2}$/i.test(background);
        if (background !== "transparent" && !isValidHex) {
            return reject(new Error("Invalid background color. Use a hex string."));
        }
        const reader = new FileReader();
        reader.onload = async function (event) {
            if (!event.target?.result)
                return reject(new Error("File reading failed"));
            const img = new Image();
            img.src = event.target.result;
            img.crossOrigin = "anonymous"; // Prevent CORS issues
            img.onload = () => {
                let newWidth = img.width;
                let newHeight = img.height;
                if (width && !height) {
                    // Scale based on width while maintaining aspect ratio
                    newHeight = Math.round((img.height / img.width) * width);
                    newWidth = width;
                }
                else if (height && !width) {
                    // Scale based on height while maintaining aspect ratio
                    newWidth = Math.round((img.width / img.height) * height);
                    newHeight = height;
                }
                else if (width && height) {
                    // Full resize with background padding if aspect ratio doesn't match
                    const aspectRatio = img.width / img.height;
                    const targetAspectRatio = width / height;
                    if (aspectRatio > targetAspectRatio) {
                        // Image is wider than target aspect ratio
                        newWidth = width;
                        newHeight = Math.round(width / aspectRatio);
                    }
                    else {
                        // Image is taller than target aspect ratio
                        newHeight = height;
                        newWidth = Math.round(height * aspectRatio);
                    }
                }
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                if (!ctx)
                    return reject(new Error("Canvas not supported"));
                // Set final canvas size
                canvas.width = width || newWidth;
                canvas.height = height || newHeight;
                // Fill background if a hex color is provided (not transparent)
                if (background !== "transparent") {
                    ctx.fillStyle = background;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
                // Calculate center positioning for images with padding
                const offsetX = (canvas.width - newWidth) / 2;
                const offsetY = (canvas.height - newHeight) / 2;
                ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
                canvas.toBlob((blob) => {
                    if (!blob)
                        return reject(new Error("Failed to create WebP blob"));
                    resolve(new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
                        type: "image/webp",
                    }));
                }, "image/webp", quality // Quality (0-1)
                );
            };
        };
        reader.onerror = () => reject(new Error("FileReader error"));
        reader.readAsDataURL(file);
    });
};
export const toLogFolder = async (data) => {
    // Write the logs to a file in the logs folder
    await fs.writeFile(LOGS_FOLDER, data, "utf-8");
    console.log(`Logs created at ${LOGS_FOLDER} at (locale datetime):${new Date().toLocaleString()} / (ISO datetime):${new Date().toISOString()} / (UTC datetime):${new Date().toUTCString()}`);
};
