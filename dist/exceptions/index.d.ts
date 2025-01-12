interface ErrorHandler {
    error: object;
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
 * @param locale - The locale for error messages (e.g., "en", "de").
 * @param admin - Tells the function to show detailed error messages or not.
 * @returns {object} - Formatted error object.
 */
export declare const handleApwError: ({ error, locale, admin, }: ErrorHandler) => Promise<ReturnedError>;
export {};
//# sourceMappingURL=index.d.ts.map