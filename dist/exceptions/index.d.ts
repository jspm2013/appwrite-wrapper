interface ErrorHandler {
    error: any;
    locale?: string;
    admin?: boolean;
}
interface ReturnedError {
    appwrite: boolean;
    header: string;
    type: string;
    code: number;
    variant: string;
    description: string;
    error?: object;
}
/**
 * Handles Appwrite errors and maps them to a readable format.
 * @param error - The error to handle.
 * @returns {object} - Formatted error object.
 */
export declare const handleApwError: ({ error, }: ErrorHandler) => Promise<ReturnedError>;
export {};
//# sourceMappingURL=index.d.ts.map