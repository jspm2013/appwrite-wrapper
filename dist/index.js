import * as avatars from "./methods/avatars";
import * as account from "./methods/account";
import { OAuthProvider } from "./methods/account";
import * as databases from "./methods/databases";
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
export { avatars, account, databases, 
//functions,
//locale,
//messaging,
//storage,
//teams,
users, };
// Exporting OAuthProvider explicitly for easier access
export { OAuthProvider };
