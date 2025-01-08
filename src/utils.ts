// Helper function to convert ArrayBuffer to Base64 string
export const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
};

export const isValidJsonString = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const isValidJsonObject = (obj: object) => {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
};

export const isEmptyObject = (obj: object) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const isEmptyKeyValuePair = (obj: Record<string, any>): boolean =>
  Object.keys(obj).length === 1 && obj[""] === "";
