import { port, appDomain, liveEnvVarName } from "./appwriteConfig.js";
export const localeOrigin = `localhost:${port}`;
export const localeHost = `http://${localeOrigin}`;
export const liveOrigin = appDomain;
export const liveHost = `https://${liveOrigin}`;
export const live = !!process.env[liveEnvVarName];
export const originInternal = localeOrigin;
export const originExternal = live ? liveOrigin : localeOrigin;
export const hostInternal = localeHost;
export const hostExternal = live ? liveHost : localeHost;
// Test for prod
console.log(`port: ${port}`);
console.log(`live: ${live}`);
console.log(`liveEnvVarName: ${liveEnvVarName}`);
console.log(`process.env[liveEnvVarName!]: ${process.env[liveEnvVarName]}`);
console.log(`!!process.env[liveEnvVarName!]: ${!!process.env[liveEnvVarName]}`);
