"use server";

import { Models } from "node-appwrite";
import { createAdminClient } from "../appwriteClients";

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
const listTeams = async ({
  queries = [],
  search,
}: ListTeamsParams): Promise<Models.TeamList<Models.Preferences>> => {
  try {
    const { teams } = await createAdminClient();
    const result = await teams.list(queries, search);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/teams): Error executing listTeams():",
      err
    );
    throw err;
  }
};

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
const createTeam = async ({
  teamId,
  name,
  roles = [],
}: CreateTeamParams): Promise<Models.Team<Models.Preferences>> => {
  try {
    const { teams } = await createAdminClient();
    const result = await teams.create(teamId, name, roles);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/teams): Error executing createTeam():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for fetching a specific team by its ID.
 */
export type GetTeamParams = {
  teamId: string;
};
/**
 * Retrieves details of a specific team by its unique ID.
 */
const getTeam = async ({
  teamId,
}: GetTeamParams): Promise<Models.Team<Models.Preferences>> => {
  try {
    const { teams } = await createAdminClient();
    const result = await teams.get(teamId);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/teams): Error executing getTeam():",
      err
    );
    throw err;
  }
};

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
const updateTeamName = async ({
  teamId,
  name,
}: UpdateTeamNameParams): Promise<Models.Preferences> => {
  try {
    const { teams } = await createAdminClient();
    const result = await teams.updateName(teamId, name);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/teams): Error executing updateTeamName():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for deleting a team by its ID.
 */
export type DeleteTeamParams = {
  teamId: string;
};
/**
 * Deletes a team using its unique ID.
 */
const deleteTeam = async ({ teamId }: DeleteTeamParams): Promise<void> => {
  try {
    const { teams } = await createAdminClient();
    await teams.delete(teamId);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/teams): Error executing deleteTeam():",
      err
    );
    throw err;
  }
};

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
const listTeamMemberships = async ({
  teamId,
  queries = [],
  search,
}: ListTeamMembershipsParams): Promise<Models.MembershipList> => {
  try {
    const { teams } = await createAdminClient();
    const result = await teams.listMemberships(teamId, queries, search);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/teams): Error executing listTeamMemberships():",
      err
    );
    throw err;
  }
};

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
const createTeamMembership = async ({
  teamId,
  roles,
  email,
  userId,
  phone,
  url,
  name,
}: CreateTeamMembershipParams): Promise<Models.Membership> => {
  try {
    const { teams } = await createAdminClient();
    const result = await teams.createMembership(
      teamId,
      roles,
      email,
      userId,
      phone,
      url,
      name
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/teams): Error executing createTeamMembership():",
      err
    );
    throw err;
  }
};

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
const getTeamMembership = async ({
  teamId,
  membershipId,
}: GetTeamMembershipParams): Promise<Models.Membership> => {
  try {
    const { teams } = await createAdminClient();
    const result = await teams.getMembership(teamId, membershipId);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/teams): Error executing getTeamMembership():",
      err
    );
    throw err;
  }
};

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
const updateTeamMembership = async ({
  teamId,
  membershipId,
  roles,
}: UpdateTeamMembershipParams): Promise<Models.Membership> => {
  try {
    const { teams } = await createAdminClient();
    const result = await teams.updateMembership(teamId, membershipId, roles);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/teams): Error executing updateTeamMembership():",
      err
    );
    throw err;
  }
};

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
const deleteTeamMembership = async ({
  teamId,
  membershipId,
}: DeleteTeamMembershipParams): Promise<void> => {
  try {
    const { teams } = await createAdminClient();
    await teams.deleteMembership(teamId, membershipId);
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/teams): Error executing deleteTeamMembership():",
      err
    );
    throw err;
  }
};

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
const updateTeamMembershipStatus = async ({
  teamId,
  membershipId,
  userId,
  secret,
}: UpdateTeamMembershipStatusParams): Promise<Models.Membership> => {
  try {
    const { teams } = await createAdminClient();
    const result = await teams.updateMembershipStatus(
      teamId,
      membershipId,
      userId,
      secret
    );
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/teams): Error executing updateTeamMembershipStatus():",
      err
    );
    throw err;
  }
};

/**
 * Parameters for fetching a team's shared preferences.
 */
export type GetTeamPreferencesParams = {
  teamId: string;
};
/**
 * Retrieves the shared preferences for a specific team by its unique ID.
 */
const getTeamPreferences = async ({
  teamId,
}: GetTeamPreferencesParams): Promise<Models.Preferences> => {
  try {
    const { teams } = await createAdminClient();
    const result = await teams.getPrefs(teamId);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/teams): Error executing getTeamPreferences():",
      err
    );
    throw err;
  }
};

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
const updateTeamPreferences = async ({
  teamId,
  prefs,
}: UpdateTeamPreferencesParams): Promise<Models.Preferences> => {
  try {
    const { teams } = await createAdminClient();
    const result = await teams.updatePrefs(teamId, prefs);
    return result;
  } catch (err) {
    console.error(
      "APW-WRAPPER - Error (methods/teams): Error executing updateTeamPreferences():",
      err
    );
    throw err;
  }
};

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

export {
  createTeam,
  createTeamMembership,
  deleteTeam,
  deleteTeamMembership,
  getTeam,
  getTeamMembership,
  getTeamPreferences,
  listTeamMemberships,
  listTeams,
  updateTeamMembership,
  updateTeamMembershipStatus,
  updateTeamName,
  updateTeamPreferences,
};
