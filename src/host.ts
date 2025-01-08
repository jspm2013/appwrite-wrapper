export const port = process.env.PORT || 3000;
export const localeOrigin = `localhost:${port}`;
export const localeHost = `http://${localeOrigin}:${port}`;

export const liveOrigin = process.env.APP_DOMAIN;
export const liveHost = `https://${liveOrigin}`;

export const live = !!process.env.COOLIFY_URL;
export const host = live ? liveHost : localeHost;
