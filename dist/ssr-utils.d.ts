export type MigrationLog = {
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
export declare const toLogsFolder: (logTopic: string, logDetails: string, logContent: MigrationLog) => Promise<void>;
export declare const toLogs: (logTopic: string, logDetails: string, logContent: MigrationLog) => Promise<void>;
//# sourceMappingURL=ssr-utils.d.ts.map