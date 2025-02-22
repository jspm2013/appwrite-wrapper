"use server";

import { Models } from "node-appwrite";
import { handleApwError } from "../exceptions";
import { createAdminClient } from "../appwriteClients";

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
const createTeam = async ({
  teamId,
  name,
  roles = [],
}: CreateTeamParams): Promise<
  ReturnObject<Models.Team<Models.Preferences>>
> => {
  try {
    const { teams } = await createAdminClient();
    const data = await teams.create(teamId, name, roles);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
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
}: CreateTeamMembershipParams): Promise<ReturnObject<Models.Membership>> => {
  try {
    const { teams } = await createAdminClient();
    const data = await teams.createMembership(
      teamId,
      roles,
      email,
      userId,
      phone,
      url,
      name
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Parameters for deleting a team.
 */
export type DeleteTeamParams = {
  teamId: string;
};
/**
 * Deletes a team using its unique ID.
 */
const deleteTeam = async ({
  teamId,
}: DeleteTeamParams): Promise<ReturnObject<void>> => {
  try {
    const { teams } = await createAdminClient();
    await teams.delete(teamId);
    return { data: null, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
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
}: DeleteTeamMembershipParams): Promise<ReturnObject<void>> => {
  try {
    const { teams } = await createAdminClient();
    await teams.deleteMembership(teamId, membershipId);
    return { data: null, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Parameters for fetching a specific team.
 */
export type GetTeamParams = {
  teamId: string;
};
/**
 * Retrieves details of a specific team by its unique ID.
 */
const getTeam = async ({
  teamId,
}: GetTeamParams): Promise<ReturnObject<Models.Team<Models.Preferences>>> => {
  try {
    const { teams } = await createAdminClient();
    const data = await teams.get(teamId);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

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
const getTeamMembership = async ({
  teamId,
  membershipId,
}: GetTeamMembershipParams): Promise<ReturnObject<Models.Membership>> => {
  try {
    const { teams } = await createAdminClient();
    const data = await teams.getMembership(teamId, membershipId);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Parameters for retrieving a team's shared preferences.
 */
export type GetTeamPreferencesParams = {
  teamId: string;
};
/**
 * Retrieves the shared preferences for a specific team by its unique ID.
 */
const getTeamPreferences = async ({
  teamId,
}: GetTeamPreferencesParams): Promise<ReturnObject<Models.Preferences>> => {
  try {
    const { teams } = await createAdminClient();
    const data = await teams.getPrefs(teamId);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
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
}: ListTeamMembershipsParams): Promise<ReturnObject<Models.MembershipList>> => {
  try {
    const { teams } = await createAdminClient();
    const data = await teams.listMemberships(teamId, queries, search);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Lists all teams for the current user, optionally filtered by queries or search terms.
 */
export type ListTeamsParams = {
  queries?: string[];
  search?: string;
};
const listTeams = async ({
  queries = [],
  search,
}: ListTeamsParams): Promise<
  ReturnObject<Models.TeamList<Models.Preferences>>
> => {
  try {
    const { teams } = await createAdminClient();
    const data = await teams.list(queries, search);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Updates the roles of a specific team membership.
 */
export type UpdateTeamMembershipParams = {
  teamId: string;
  membershipId: string;
  roles: string[];
};
const updateTeamMembership = async ({
  teamId,
  membershipId,
  roles,
}: UpdateTeamMembershipParams): Promise<ReturnObject<Models.Membership>> => {
  try {
    const { teams } = await createAdminClient();
    const data = await teams.updateMembership(teamId, membershipId, roles);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Updates the status of a specific team membership, allowing the user to accept an invitation.
 */
export type UpdateTeamMembershipStatusParams = {
  teamId: string;
  membershipId: string;
  userId: string;
  secret: string;
};
const updateTeamMembershipStatus = async ({
  teamId,
  membershipId,
  userId,
  secret,
}: UpdateTeamMembershipStatusParams): Promise<
  ReturnObject<Models.Membership>
> => {
  try {
    const { teams } = await createAdminClient();
    const data = await teams.updateMembershipStatus(
      teamId,
      membershipId,
      userId,
      secret
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Updates the name of a specific team by its ID.
 */
export type UpdateTeamNameParams = {
  teamId: string;
  name: string;
};
const updateTeamName = async ({
  teamId,
  name,
}: UpdateTeamNameParams): Promise<ReturnObject<Models.Preferences>> => {
  try {
    const { teams } = await createAdminClient();
    const data = await teams.updateName(teamId, name);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
};

/**
 * Updates the shared preferences of a team, replacing any previous values.
 */
export type UpdateTeamPreferencesParams = {
  teamId: string;
  prefs: object;
};
const updateTeamPreferences = async ({
  teamId,
  prefs,
}: UpdateTeamPreferencesParams): Promise<ReturnObject<Models.Preferences>> => {
  try {
    const { teams } = await createAdminClient();
    const data = await teams.updatePrefs(teamId, prefs);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: await handleApwError({ error }),
    };
  }
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
