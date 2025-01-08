export const live = !!process.env.LIVE;
export const port = process.env.PORT || 3000;

export const localeOrigin = `localhost:${port}`;
export const localeHost = `http://${localeOrigin}:${port}`;

export const liveOrigin = process.env.LIVE_DOMAIN;
export const liveHost = `https://${liveOrigin}`;

export const host = live ? liveHost : localeHost;
