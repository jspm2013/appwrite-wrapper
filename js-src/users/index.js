"use server";

import { ID } from "node-appwrite";
import { createAdminClient } from "../../src/appwriteClients";

/*
 *
 * Functions based on
 *
 * > > > createAdminClient < < <
 *
 */
const createSessionForUserId = async ({ userId = ID.unique() }) => {
  try {
    const { users } = await createAdminClient();
    const session = await users.createSession(userId);
    return session;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing createSessionForUserId():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const createToken = async ({ userId, length = 32, expire = 60 * 3 }) => {
  // expire: in seconds
  try {
    const { users } = await createAdminClient();
    const token = await users.createToken(userId, length, expire);
    return token;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing createToken():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const deleteSessionForUserId = async ({ userId, sessionId }) => {
  // Deletes a specified session for a given/passed userId
  try {
    const { users } = await createAdminClient();
    await users.deleteSessions(userId, sessionId);
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing deleteSessionForUserId():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const deleteSessionsForUserId = async ({ userId }) => {
  // Deletes all sessions on all clients for a given/passed userId
  try {
    const { users } = await createAdminClient();
    await users.deleteSessions(userId);
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing deleteSessionsForUserId():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const getUserForUserId = async ({ userId }) => {
  try {
    const { users } = await createUsersClient();
    const user = await users.get(userId);
    return user;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing getUserForUserId():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const listUsers = async ({ queries, search }) => {
  // Deletes a specified session for a given/passed userId
  try {
    const { users } = await createAdminClient();
    const userList = await users.list(queries, search);
    return userList;
  } catch (err) {
    console.log("APW-LIB ERROR: Error executing listUsers():");
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

const updateEmailVerificationForUserId = async ({ userId, status }) => {
  try {
    if (status === true || status === false) {
      const { users } = await createAdminClient();
      const user = await users.updateEmailVerification(userId, status);
      return user;
    } else {
      throw new Error("Invalid param 'status'");
    }
  } catch (err) {
    console.log(
      "APW-LIB ERROR: Error executing updateEmailVerificationForUserId():"
    );
    console.log(err);
    return JSON.parse(JSON.stringify(err));
  }
};

export {
  createSessionForUserId,
  createToken,
  deleteSessionForUserId,
  deleteSessionsForUserId,
  getUserForUserId,
  listUsers,
  updateEmailVerificationForUserId,
};
