import {
  Client,
  Account,
  Teams,
  Functions,
  Databases,
  Storage,
  Messaging,
  Locale,
  Avatars,
  Users,
} from "node-appwrite";
import { cookies } from "next/headers";
import { projectId, endpoint, apiKeySsr, cookieName } from "./appwriteConfig";

export const createSessionClient = async ({ selfSigned, locale }) => {
  const client = new Client()
    .setEndpoint(projectId)
    .setProject(endpoint)
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
    get account() {
      return new Account(client);
    },
    get teams() {
      return new Teams(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get functions() {
      return new Functions(client);
    },
    get messaging() {
      return new Messaging(client);
    },
    get locale() {
      return new Locale(client);
    },
    get avatars() {
      return new Avatars(client);
    },
    get users() {
      return new Users(client);
    },
  };
};

export async function createAdminClient({ selfSigned, locale }) {
  const client = new Client()
    .setEndpoint(projectId)
    .setProject(endpoint)
    .setSelfSigned(selfSigned)
    .setLocale(locale)
    .setKey(apiKeySsr);

  return {
    get account() {
      return new Account(client);
    },
    get teams() {
      return new Teams(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get functions() {
      return new Functions(client);
    },
    get messaging() {
      return new Messaging(client);
    },
    get locale() {
      return new Locale(client);
    },
    get avatars() {
      return new Avatars(client);
    },
    get users() {
      return new Users(client);
    },
  };
}
