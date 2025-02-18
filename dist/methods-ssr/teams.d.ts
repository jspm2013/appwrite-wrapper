import { Models } from "node-appwrite";
interface ErrorObject {
    appwrite: boolean;
    header: string;
    type: string;
    code: number;
    variant: string;
    description: string;
    error?: object;
}
interface ReturnObject<T> {
    error: ErrorObject | null;
    data: T | null;
}
/**
 * Parameters for creating a team.
 */
export type CreateTeamParams = {
    teamId: string;
    name: string;
    roles?: string[];
};
/**
 * Creates a new team with the specified ID, name, and optional roles.
 */
declare const createTeam: ({ teamId, name, roles, }: CreateTeamParams) => Promise<ReturnObject<Models.Team<Models.Preferences>>>;
/**
 * Parameters for creating a team membership.
 */
export type CreateTeamMembershipParams = {
    teamId: string;
    roles: string[];
    email?: string;
    userId?: string;
    phone?: string;
    url?: string;
    name?: string;
};
/**
 * Creates a new membership for a team, optionally inviting a user via email or phone.
 */
declare const createTeamMembership: ({ teamId, roles, email, userId, phone, url, name, }: CreateTeamMembershipParams) => Promise<ReturnObject<Models.Membership>>;
/**
 * Parameters for deleting a team.
 */
export type DeleteTeamParams = {
    teamId: string;
};
/**
 * Deletes a team using its unique ID.
 */
declare const deleteTeam: ({ teamId, }: DeleteTeamParams) => Promise<ReturnObject<void>>;
/**
 * Parameters for deleting a specific team membership.
 */
export type DeleteTeamMembershipParams = {
    teamId: string;
    membershipId: string;
};
/**
 * Deletes a team membership by its unique ID.
 */
declare const deleteTeamMembership: ({ teamId, membershipId, }: DeleteTeamMembershipParams) => Promise<ReturnObject<void>>;
/**
 * Parameters for fetching a specific team.
 */
export type GetTeamParams = {
    teamId: string;
};
/**
 * Retrieves details of a specific team by its unique ID.
 */
declare const getTeam: ({ teamId, }: GetTeamParams) => Promise<ReturnObject<Models.Team<Models.Preferences>>>;
/**
 * Parameters for fetching a specific team membership.
 */
export type GetTeamMembershipParams = {
    teamId: string;
    membershipId: string;
};
/**
 * Retrieves details of a specific team membership by its unique ID.
 */
declare const getTeamMembership: ({ teamId, membershipId, }: GetTeamMembershipParams) => Promise<ReturnObject<Models.Membership>>;
/**
 * Parameters for retrieving a team's shared preferences.
 */
export type GetTeamPreferencesParams = {
    teamId: string;
};
/**
 * Retrieves the shared preferences for a specific team by its unique ID.
 */
declare const getTeamPreferences: ({ teamId, }: GetTeamPreferencesParams) => Promise<ReturnObject<Models.Preferences>>;
/**
 * Parameters for listing memberships of a team.
 */
export type ListTeamMembershipsParams = {
    teamId: string;
    queries?: string[];
    search?: string;
};
/**
 * Lists all memberships for a specific team, optionally filtered by queries or search terms.
 */
declare const listTeamMemberships: ({ teamId, queries, search, }: ListTeamMembershipsParams) => Promise<ReturnObject<Models.MembershipList>>;
/**
 * Lists all teams for the current user, optionally filtered by queries or search terms.
 */
export type ListTeamsParams = {
    queries?: string[];
    search?: string;
};
declare const listTeams: ({ queries, search, }: ListTeamsParams) => Promise<ReturnObject<Models.TeamList<Models.Preferences>>>;
/**
 * Updates the roles of a specific team membership.
 */
export type UpdateTeamMembershipParams = {
    teamId: string;
    membershipId: string;
    roles: string[];
};
declare const updateTeamMembership: ({ teamId, membershipId, roles, }: UpdateTeamMembershipParams) => Promise<ReturnObject<Models.Membership>>;
/**
 * Updates the status of a specific team membership, allowing the user to accept an invitation.
 */
export type UpdateTeamMembershipStatusParams = {
    teamId: string;
    membershipId: string;
    userId: string;
    secret: string;
};
declare const updateTeamMembershipStatus: ({ teamId, membershipId, userId, secret, }: UpdateTeamMembershipStatusParams) => Promise<ReturnObject<Models.Membership>>;
/**
 * Updates the name of a specific team by its ID.
 */
export type UpdateTeamNameParams = {
    teamId: string;
    name: string;
};
declare const updateTeamName: ({ teamId, name, }: UpdateTeamNameParams) => Promise<ReturnObject<Models.Preferences>>;
/**
 * Updates the shared preferences of a team, replacing any previous values.
 */
export type UpdateTeamPreferencesParams = {
    teamId: string;
    prefs: object;
};
declare const updateTeamPreferences: ({ teamId, prefs, }: UpdateTeamPreferencesParams) => Promise<ReturnObject<Models.Preferences>>;
export { createTeam, createTeamMembership, deleteTeam, deleteTeamMembership, getTeam, getTeamMembership, getTeamPreferences, listTeamMemberships, listTeams, updateTeamMembership, updateTeamMembershipStatus, updateTeamName, updateTeamPreferences, };
//# sourceMappingURL=teams.d.ts.map