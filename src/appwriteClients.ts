"use server";

import {
  Client,
  Account,
  Teams,
  Functions,
  Databases,
  Storage,
  Messaging,
  Locale,
  Users,
  Avatars,
} from "node-appwrite";
import { cookies } from "next/headers";
import { projectId, endpoint, apiKeySsr, cookieName } from "./appwriteConfig";

type CreateClientParams = {
  selfSigned?: boolean;
  locale?: string;
};

/**
 * Creates a session client for the current user.
 */
export async function createSessionClient(
  params: CreateClientParams = {}
): Promise<{
  account: Account;
  teams: Teams;
  databases: Databases;
  storage: Storage;
  functions: Functions;
  messaging: Messaging;
  locale: Locale;
  avatars: Avatars;
  users: Users;
}> {
  const { selfSigned = false, locale = "" } = params;

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setSelfSigned(selfSigned)
    .setLocale(locale);

  const cookiesList = await cookies();
  const session = cookiesList.get(cookieName);
  if (!session || !session.value) {
    throw new Error(
      "APW-LIB ERROR: No session found in cookies while calling createSessionClient()"
    );
  }

  client.setSession(session.value);

  return {
    account: new Account(client),
    teams: new Teams(client),
    databases: new Databases(client),
    storage: new Storage(client),
    functions: new Functions(client),
    messaging: new Messaging(client),
    locale: new Locale(client),
    avatars: new Avatars(client),
    users: new Users(client),
  };
}

/**
 * Creates an admin client with elevated privileges.
 */
export async function createAdminClient(
  params: CreateClientParams = {}
): Promise<{
  account: Account;
  teams: Teams;
  databases: Databases;
  storage: Storage;
  functions: Functions;
  messaging: Messaging;
  locale: Locale;
  avatars: Avatars;
  users: Users;
}> {
  const { selfSigned = false, locale = "" } = params;

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setSelfSigned(selfSigned)
    .setLocale(locale)
    .setKey(apiKeySsr);

  return {
    account: new Account(client),
    teams: new Teams(client),
    databases: new Databases(client),
    storage: new Storage(client),
    functions: new Functions(client),
    messaging: new Messaging(client),
    locale: new Locale(client),
    avatars: new Avatars(client),
    users: new Users(client),
  };
}
