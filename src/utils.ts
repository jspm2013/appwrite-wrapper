import { randomInt } from "crypto";

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
 * Converts an image file to WebP format.
 * @param file - The image file to convert.
 * @returns {Promise<File>} - A promise that resolves to the converted WebP file.
 */
export const imgToWebP = async (file: File, quality = 0.9): Promise<File> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      return reject(new Error("Invalid file type"));
    }

    const reader = new FileReader();

    reader.onload = async function (event) {
      if (!event.target?.result)
        return reject(new Error("File reading failed"));

      const img = new Image();
      img.src = event.target.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return reject(new Error("Canvas not supported"));

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Failed to create WebP blob"));
            resolve(
              new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
                type: "image/webp",
              })
            );
          },
          "image/webp",
          quality // Quality (0-1)
        );
      };
    };

    reader.onerror = () => reject(new Error("FileReader error"));
    reader.readAsDataURL(file);
  });
};
