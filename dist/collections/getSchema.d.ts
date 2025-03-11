import { CollectionSchema } from "./types";
import { LogType } from "../ssr-utils";
export declare const getSchema: (schema: string, log?: LogType) => Promise<CollectionSchema | LogType | null>;
export declare const isCollectionSchema: (obj: any) => obj is CollectionSchema;
//# sourceMappingURL=getSchema.d.ts.map