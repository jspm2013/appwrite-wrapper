import { Client } from "../appwriteRealtimeClient";
import { handleApwError } from "../exceptions";
import { createRealtimeSessionClient } from "../appwriteClients";

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
const createRealtime = async (): Promise<ReturnObject<Client>> => {
  try {
    const { client } = await createRealtimeSessionClient();
    return { data: client, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

export { createRealtime };
