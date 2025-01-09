import * as avatars from "./methods/avatars";
import { AvatarFunctions } from "./methods/avatars";

import * as account from "./methods/account";
import { AccountFunctions } from "./methods/account"; // Example: Define this type in account module
import { OAuthProvider } from "./methods/account";

import * as databases from "./methods/databases";
import { DatabaseFunctions } from "./methods/databases"; // Example: Define this type in databases module

//import * as functions from "./ts/functions";
//import { FunctionFunctions } from "./ts/functions"; // Example: Define this type in functions module

//import * as locale from "./ts/locale";
//import { LocaleFunctions } from "./ts/locale"; // Example: Define this type in locale module

//import * as messaging from "./ts/messaging";
//import { MessagingFunctions } from "./ts/messaging"; // Example: Define this type in messaging module

//import * as storage from "./ts/storage";
//import { StorageFunctions } from "./ts/storage"; // Example: Define this type in storage module

//import * as teams from "./ts/teams";
//import { TeamFunctions } from "./ts/teams"; // Example: Define this type in teams module

import * as users from "./methods/users";
import { UserFunctions } from "./methods/users"; // The types already defined in the `users.ts` file

export {
  avatars,
  account,
  databases,
  //functions,
  //locale,
  //messaging,
  //storage,
  //teams,
  users,
};

// Define the type for the entire `Methods` object
export type Methods = {
  avatars: AvatarFunctions;
  account: AccountFunctions;
  databases: DatabaseFunctions;
  //functions: FunctionFunctions;
  //locale: LocaleFunctions;
  //messaging: MessagingFunctions;
  //storage: StorageFunctions;
  //teams: TeamFunctions;
  users: UserFunctions;
};
