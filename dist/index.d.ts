import * as avatars from "./methods/avatars";
import { AvatarFunctions } from "./methods/avatars";
import * as account from "./methods/account";
import { AccountFunctions } from "./methods/account";
import { OAuthProvider } from "./methods/account";
import * as databases from "./methods/databases";
import { DatabaseFunctions } from "./methods/databases";
import * as users from "./methods/users";
import { UserFunctions } from "./methods/users";
export { avatars, account, databases, users, };
export { OAuthProvider };
export type Methods = {
    avatars: AvatarFunctions;
    account: AccountFunctions;
    databases: DatabaseFunctions;
    users: UserFunctions;
};
//# sourceMappingURL=index.d.ts.map