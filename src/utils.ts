import { randomInt } from "crypto";
//import sharp from "sharp";

/**
 * Converts an ArrayBuffer to a Base64 string.
 * @param buffer - The ArrayBuffer to convert.
 * @returns {string} - The Base64 encoded string.
 */
export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
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
export const isValidJsonString = (str: string): boolean => {
  try {
    JSON.parse(str); // Attempt to parse the string
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Checks if the given object is a valid JSON object.
 * @param obj - The object to check.
 * @returns {boolean} - True if the object is a valid JSON object, false otherwise.
 */
export const isValidJsonObject = (obj: object): boolean => {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
};

/**
 * Checks if the given object is an empty object.
 * @param obj - The object to check.
 * @returns {boolean} - True if the object is empty, false otherwise.
 */
export const isEmptyObject = (obj: object): boolean => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * Checks if the given object has only one key-value pair with an empty key and an empty value.
 * @param obj - The object to check.
 * @returns {boolean} - True if the object matches the condition, false otherwise.
 */
export const isEmptyKeyValuePair = (obj: Record<string, any>): boolean => {
  return Object.keys(obj).length === 1 && obj[""] === "";
};

/**
 * Generates a random password of the specified length.
 */
export function temporaryPassword(length = 12): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomValue = randomInt(0, charactersLength);
    password += characters.charAt(randomValue);
  }

  return password;
}

/**
 * Singleton class for managing appwrite state.
 * @class
 */
class AppwriteManager {
  private static instance: AppwriteManager;
  private locale: string = "de"; // Default locale
  private isAdmin: boolean = false; // Default admin state

  private constructor() {} // Prevent direct instantiation

  public static getInstance(): AppwriteManager {
    if (!AppwriteManager.instance) {
      AppwriteManager.instance = new AppwriteManager();
    }
    return AppwriteManager.instance;
  }

  // Locale management
  public getLocale(): string {
    return this.locale;
  }

  public setLocale(newLocale: string): void {
    this.locale = newLocale;
  }

  // Admin state management
  public getAdmin(): boolean {
    return this.isAdmin;
  }

  public setAdmin(isAdmin: boolean): void {
    this.isAdmin = isAdmin;
  }
}
// Export a global instance
export const apwManager = AppwriteManager.getInstance();

/*
 * Processes an image file based on the specified output type and quality percentage.
 * @param fileData - The image file data.
 * @param outputType - The desired output image type (optional).
 * @param qualityPercentage - The quality percentage for the output image (optional).
 * @returns {Promise<Buffer>} - A Promise that resolves to the processed image data.
 */
export enum ImageType {
  JPEG = "image/jpeg",
  JPG = "image/jpg",
  PNG = "image/png",
  WEBP = "image/webp",
  AVIF = "image/avif",
  GIF = "image/gif",
  TIFF = "image/tiff",
}
/*
export async function processImage(
  fileData: Buffer,
  outputType?: ImageType,
  qualityPercentage?: number
): Promise<Buffer> {
  try {
    let type = outputType;

    if (!type) {
      // Default to WebP if no outputType is provided
      type = ImageType.WEBP;
    }

    const quality =
      qualityPercentage !== undefined
        ? Math.round(Math.max(0, Math.min(1, qualityPercentage)) * 100)
        : 80;

    switch (type) {
      case ImageType.JPEG:
      case ImageType.JPG:
        return await sharp(fileData).jpeg({ quality }).toBuffer();
      case ImageType.PNG:
        return await sharp(fileData).png({ quality }).toBuffer();
      case ImageType.WEBP:
        return await sharp(fileData).webp({ quality }).toBuffer();
      case ImageType.AVIF:
        return await sharp(fileData).avif({ quality }).toBuffer();
      case ImageType.GIF:
        return await sharp(fileData).gif().toBuffer();
      case ImageType.TIFF:
        return await sharp(fileData).tiff({ quality }).toBuffer();
      default: // Default to WebP
        return await sharp(fileData).webp({ quality }).toBuffer();
    }
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}
*/
