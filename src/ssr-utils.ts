"use server";

import { logsPath } from "./appwriteConfig";
import fs from "fs/promises";
import path from "path";

const LOGS_FOLDER = path.join(process.cwd(), logsPath);

export type MigrationLog = {
  id: string;
  executed_at: string;
  status: "success" | "failure";
  databaseId: string;
  collectionId: string;
  changes: {
    action: string;
    attribute: string;
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
export const toLogFolder = async (log: MigrationLog): Promise<void> => {
  const logJson = JSON.stringify(log, null, 2);
  // Construct a filename, e.g., using the log id:
  const filename = `${LOGS_FOLDER}/${log.id}.json`;
  await fs.writeFile(filename, logJson, "utf-8");
  console.log(
    `Log file created: ${filename} at ${new Date().toLocaleString()}`
  );
};
