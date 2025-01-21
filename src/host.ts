import { port, appDomain, liveEnvVarName } from "./appwriteConfig.js";
export const localeOrigin = `localhost:${port}`;
export const localeHost = `http://${localeOrigin}`;
export const liveOrigin = appDomain;
export const liveHost = `https://${liveOrigin}`;
export const live = !!process.env[liveEnvVarName!];
export const origin = live ? liveOrigin : localeOrigin;
export const host = live ? liveHost : localeHost;
