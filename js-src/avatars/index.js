"use server";

import { createAdminClient } from "../../src/appwriteClients";

/*
 *
 * Functions based on
 *
 * > > > createAvatarsClient < < <
 *
 */
const getFlag = async ({ isoCode, width, height, quality }) => {
  // width/height: 0-2000, default: 100
  // quality: 0-100, default: 100
  try {
    const { avatars } = await createAdminClient();
    const arrayBuffer = await avatars.getFlag(isoCode, width, height, quality);
    const base64Logo = Buffer.from(arrayBuffer).toString("base64");
    return base64Logo;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing getFlag():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const getImageFromUrl = async ({ url, width, height }) => {
  // width/height: 0-2000, default: 400
  try {
    const { avatars } = await createAdminClient();
    const arrayBuffer = await avatars.getImage(url, width, height);
    const base64Logo = Buffer.from(arrayBuffer).toString("base64");
    return base64Logo;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing getImageFromUrl():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const getUserInitials = async ({ name, width, height, background }) => {
  // width/height: 0-2000, default: 100
  // background: hex string
  try {
    const { avatars } = await createAdminClient();
    const arrayBuffer = await avatars.getInitials(
      name,
      width,
      height,
      background
    );
    const base64Logo = Buffer.from(arrayBuffer).toString("base64");
    return base64Logo;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing getUserInitials():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const getQrCodeFromString = async ({ text, size, margin, download }) => {
  // size: 0-1000, default: 400
  // margin: 0-10, default: 1
  // download: boolean, default: false
  try {
    const { avatars } = await createAdminClient();
    const arrayBuffer = await avatars.getQR(text, size, margin, download);
    const base64Logo = Buffer.from(arrayBuffer).toString("base64");
    return base64Logo;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing getQrCodeFromString():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

export { getFlag, getImageFromUrl, getQrCodeFromString, getUserInitials };
