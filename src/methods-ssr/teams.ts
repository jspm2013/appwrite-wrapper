"use server";

import { Models } from "node-appwrite";
import { live } from "../host";
import { createAdminClient } from "../appwriteClients";

const admin: boolean = !live;
const errMsg = (fn: string) =>
  admin ? `ApwWrapper Error (methods/teams): ${fn}()` : "Team Error";

interface ErrorObject {
  message: string;
  description: string;
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createTeam"),
        description: JSON.stringify(err),
      },
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("createTeamMembership"),
        description: JSON.stringify(err),
      },
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("deleteTeam"),
        description: JSON.stringify(err),
      },
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("deleteTeamMembership"),
        description: JSON.stringify(err),
      },
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getTeam"),
        description: JSON.stringify(err),
      },
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getTeamMembership"),
        description: JSON.stringify(err),
      },
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("getTeamPreferences"),
        description: JSON.stringify(err),
      },
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("listTeamMemberships"),
        description: JSON.stringify(err),
      },
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("listTeams"),
        description: JSON.stringify(err),
      },
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateTeamMembership"),
        description: JSON.stringify(err),
      },
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateTeamMembershipStatus"),
        description: JSON.stringify(err),
      },
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateTeamName"),
        description: JSON.stringify(err),
      },
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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: errMsg("updateTeamPreferences"),
        description: JSON.stringify(err),
      },
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
