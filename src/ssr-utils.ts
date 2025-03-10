"use server";

import { logsPath } from "./appwriteConfig";
import fs from "fs/promises";
import path from "path";

const LOGS_FOLDER = path.join(process.cwd(), logsPath);

export const toLogFolder = async (data: string) => {
  // Write the logs to a file in the logs folder
  await fs.writeFile(LOGS_FOLDER, data, "utf-8");
  console.log(
    `Logs created at ${LOGS_FOLDER} at (locale datetime):${new Date().toLocaleString()} / (ISO datetime):${new Date().toISOString()} / (UTC datetime):${new Date().toUTCString()}`
  );
};
