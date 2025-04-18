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
export declare const generateMigrationId: (collectionName: string) => Promise<string>;
export declare const toLogsFolder: (logTopic: string, logDetails: string, logContent: LogType) => Promise<void>;
export declare const toLogs: (logTopic: string, logDetails: string, logContent: LogType) => Promise<void>;
/**
 * Checks that all provided folder paths exist.
 * @param paths An array of absolute folder paths.
 * @throws An Error if any folder does not exist or is not accessible.
 */
export declare const checkPathsExists: (paths: string[]) => Promise<void>;
//# sourceMappingURL=ssr-utils.d.ts.map