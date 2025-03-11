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
export declare const generateMigrationId: (collectionName: string) => string;
export declare const toLogFolder: (log: MigrationLog) => Promise<void>;
//# sourceMappingURL=ssr-utils.d.ts.map