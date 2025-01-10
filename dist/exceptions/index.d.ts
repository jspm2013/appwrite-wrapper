/**
 * Handles Appwrite errors and maps them to a readable format.
 * @param error - The error to handle.
 * @param locale - The locale for error messages (e.g., "en", "de").
 * @returns {object} - Formatted error object.
 */
export declare const handleApwError: (error: any, locale?: string) => Promise<{
    description: string;
    appwrite: boolean;
    name: string;
    type: string;
    code: number;
    variant: string;
}>;
//# sourceMappingURL=index.d.ts.map