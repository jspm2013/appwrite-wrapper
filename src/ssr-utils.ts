"use server";

import path from "path";
import fs from "fs/promises";
import { humanTimeStamp } from "./utils";
import { logsPath } from "./appwriteConfig";
import { ID, Compression } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { logsBucketId, logsBucketName } from "./appwriteConfig";
import { createBucket, getBucket, uploadFile } from "./methods/storage";

const LOGS_FOLDER = path.join(process.cwd(), logsPath);

export type LogType = {
  id: string;
  executed_at: string;
  status: "success" | "failure";
  lastError?: string;
  databaseId: string;
  collectionId: string;
  changes: {
    action: string;
    information: string;
  }[];
};

// A helper to generate a migration ID.
export const generateMigrationId = async (
  collectionName: string
): Promise<string> => {
  // For example, YYYYMMDD_update_schema_<collectionName>
  const datePart = new Date().toISOString().split("T")[0].replace(/-/g, "");
  return `${datePart}_update_schema_${collectionName}`;
};

// A helper to log a migration.
export const toLogsFolder = async (
  logTopic: string,
  logDetails: string,
  logContent: LogType
): Promise<void> => {
  try {
    const timestamp = humanTimeStamp();
    const fileName = `${logTopic}_${timestamp}_${logDetails}.json`;
    const logJson = JSON.stringify(logContent, null, 2);

    // Define TypeScript file path
    const filePath = path.join(LOGS_FOLDER, fileName);

    await fs.writeFile(filePath, logJson, "utf-8");
    console.log(
      `Log file created: ${filePath} at ${new Date().toLocaleString()}`
    );
  } catch (err: any) {
    console.error(`Error writing log file: ${err.message}`);
    throw new Error(`Error writing log file: ${err.message}`);
  }
};

export const toLogs = async (
  logTopic: string,
  logDetails: string,
  logContent: LogType
): Promise<void> => {
  let bucket;
  const timestamp = humanTimeStamp();
  const fileName = `${logTopic}_${timestamp}_${logDetails}.json`;

  // Convert logContent to JSON string
  const logJson = JSON.stringify(logContent, null, 2);

  // Step 1: Ensure LOGS_BUCKET exists.
  try {
    bucket = await getBucket({ bucketId: logsBucketId });
  } catch (err: any) {
    if (err.code === 404) {
      // Bucket not found, create it.
      try {
        bucket = await createBucket({
          bucketName: logsBucketName,
          allowedFileExtensions: ["json"],
          compression: Compression.Gzip,
        });
      } catch (createErr) {
        console.error(`Error creating bucket '${logsBucketId}':`, createErr);
      }
    } else {
      console.error(`Error checking bucket '${logsBucketId}':`, err);
    }
  }

  // Step 2: Write log to Appwrite storage.
  try {
    if (bucket) {
      await uploadFile({
        bucketId: logsBucketId,
        fileId: ID.unique(),
        file: InputFile.fromBuffer(Buffer.from(logJson), fileName),
      });
      console.log(`Log stored in appwrite bucket '' as "${fileName}"`);
    } else {
      console.error("No bucket available. Using local log fallback.");
      toLogsFolder(logTopic, logDetails, logContent);
    }
  } catch (error) {
    // Step 3: Fallback to local logging on failure.
    console.error("Failed to upload log. Using local log fallback.", error);
    toLogsFolder(logTopic, logDetails, logContent);
  }
};

/**
 * Checks that all provided folder paths exist.
 * @param paths An array of absolute folder paths.
 * @throws An Error if any folder does not exist or is not accessible.
 */
export const checkPathsExists = async (paths: string[]): Promise<void> => {
  for (const folderPath of paths) {
    try {
      await fs.access(folderPath);
    } catch (error: any) {
      const folderName = path.basename(folderPath);
      throw new Error(
        `Required folder "${folderName}" not found or inaccessible at path: ${folderPath}. Please ensure the environment variable is correctly set and the folder exists.`
      );
    }
  }
};
