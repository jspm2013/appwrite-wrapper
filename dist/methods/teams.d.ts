import { Models } from "node-appwrite";
/**
 * Parameters for listing teams, allowing optional queries and search functionality.
 */
export type ListTeamsParams = {
    queries?: string[];
    search?: string;
};
/**
 * Lists all teams for the current user, optionally filtered by queries or search terms.
 */
declare const listTeams: ({ queries, search, }: ListTeamsParams) => Promise<Models.TeamList<Models.Preferences>>;
/**
 * Parameters for creating a team, including optional roles.
 */
export type CreateTeamParams = {
    teamId: string;
    name: string;
    roles?: string[];
};
/**
 * Creates a new team with the specified ID, name, and optional roles.
 */
declare const createTeam: ({ teamId, name, roles, }: CreateTeamParams) => Promise<Models.Team<Models.Preferences>>;
/**
 * Parameters for fetching a specific team by its ID.
 */
export type GetTeamParams = {
    teamId: string;
};
/**
 * Retrieves details of a specific team by its unique ID.
 */
declare const getTeam: ({ teamId, }: GetTeamParams) => Promise<Models.Team<Models.Preferences>>;
/**
 * Parameters for updating a team's name.
 */
export type UpdateTeamNameParams = {
    teamId: string;
    name: string;
};
/**
 * Updates the name of a specific team by its ID.
 */
declare const updateTeamName: ({ teamId, name, }: UpdateTeamNameParams) => Promise<Models.Preferences>;
/**
 * Parameters for deleting a team by its ID.
 */
export type DeleteTeamParams = {
    teamId: string;
};
/**
 * Deletes a team using its unique ID.
 */
declare const deleteTeam: ({ teamId }: DeleteTeamParams) => Promise<void>;
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
declare const listTeamMemberships: ({ teamId, queries, search, }: ListTeamMembershipsParams) => Promise<Models.MembershipList>;
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
declare const createTeamMembership: ({ teamId, roles, email, userId, phone, url, name, }: CreateTeamMembershipParams) => Promise<Models.Membership>;
/**
 * Parameters for fetching a specific team membership by ID.
 */
export type GetTeamMembershipParams = {
    teamId: string;
    membershipId: string;
};
/**
 * Retrieves details of a specific team membership by its unique ID.
 */
declare const getTeamMembership: ({ teamId, membershipId, }: GetTeamMembershipParams) => Promise<Models.Membership>;
/**
 * Parameters for updating a team membership's roles.
 */
export type UpdateTeamMembershipParams = {
    teamId: string;
    membershipId: string;
    roles: string[];
};
/**
 * Updates the roles of a specific team membership.
 */
declare const updateTeamMembership: ({ teamId, membershipId, roles, }: UpdateTeamMembershipParams) => Promise<Models.Membership>;
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
declare const deleteTeamMembership: ({ teamId, membershipId, }: DeleteTeamMembershipParams) => Promise<void>;
/**
 * Parameters for updating the status of a team membership.
 */
export type UpdateTeamMembershipStatusParams = {
    teamId: string;
    membershipId: string;
    userId: string;
    secret: string;
};
/**
 * Updates the status of a specific team membership, allowing the user to accept an invitation.
 */
declare const updateTeamMembershipStatus: ({ teamId, membershipId, userId, secret, }: UpdateTeamMembershipStatusParams) => Promise<Models.Membership>;
/**
 * Parameters for fetching a team's shared preferences.
 */
export type GetTeamPreferencesParams = {
    teamId: string;
};
/**
 * Retrieves the shared preferences for a specific team by its unique ID.
 */
declare const getTeamPreferences: ({ teamId, }: GetTeamPreferencesParams) => Promise<Models.Preferences>;
/**
 * Parameters for updating a team's shared preferences.
 */
export type UpdateTeamPreferencesParams = {
    teamId: string;
    prefs: object;
};
/**
 * Updates the shared preferences of a team, replacing any previous values.
 */
declare const updateTeamPreferences: ({ teamId, prefs, }: UpdateTeamPreferencesParams) => Promise<Models.Preferences>;
export type TeamsFunctionTypes = {
    createTeam: typeof createTeam;
    createTeamMembership: typeof createTeamMembership;
    deleteTeam: typeof deleteTeam;
    deleteTeamMembership: typeof deleteTeamMembership;
    getTeam: typeof getTeam;
    getTeamMembership: typeof getTeamMembership;
    getTeamPreferences: typeof getTeamPreferences;
    listTeamMemberships: typeof listTeamMemberships;
    listTeams: typeof listTeams;
    updateTeamMembership: typeof updateTeamMembership;
    updateTeamMembershipStatus: typeof updateTeamMembershipStatus;
    updateTeamName: typeof updateTeamName;
    updateTeamPreferences: typeof updateTeamPreferences;
};
export { createTeam, createTeamMembership, deleteTeam, deleteTeamMembership, getTeam, getTeamMembership, getTeamPreferences, listTeamMemberships, listTeams, updateTeamMembership, updateTeamMembershipStatus, updateTeamName, updateTeamPreferences, };
//# sourceMappingURL=teams.d.ts.map