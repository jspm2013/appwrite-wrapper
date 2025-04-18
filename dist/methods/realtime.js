import { handleApwError } from "../exceptions";
import { createRealtimeSessionClient } from "../appwriteClients";
/**
 * Creates a new storage bucket.
 */
const createRealtime = async () => {
    try {
        const { client } = await createRealtimeSessionClient();
        return { data: client, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
export { createRealtime };
