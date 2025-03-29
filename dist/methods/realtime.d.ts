import { Client } from "../appwriteRealtimeClient";
interface ErrorObject {
    appwrite: boolean;
    header: string;
    type: string;
    code: number;
    variant: string;
    description: string;
    error?: object;
}
interface ReturnObject<T> {
    error: ErrorObject | null;
    data: T | null;
}
/**
 * Creates a new storage bucket.
 */
declare const createRealtime: () => Promise<ReturnObject<Client>>;
export { createRealtime };
//# sourceMappingURL=realtime.d.ts.map