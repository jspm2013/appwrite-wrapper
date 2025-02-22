"use server";
import { handleApwError } from "../exceptions";
import { createAdminClient } from "../appwriteClients";
/**
 * Creates a new team with the specified ID, name, and optional roles.
 */
const createTeam = async ({ teamId, name, roles = [], }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.create(teamId, name, roles);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
/**
 * Creates a new membership for a team, optionally inviting a user via email or phone.
 */
const createTeamMembership = async ({ teamId, roles, email, userId, phone, url, name, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.createMembership(teamId, roles, email, userId, phone, url, name);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
/**
 * Deletes a team using its unique ID.
 */
const deleteTeam = async ({ teamId, }) => {
    try {
        const { teams } = await createAdminClient();
        await teams.delete(teamId);
        return { data: null, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
/**
 * Deletes a team membership by its unique ID.
 */
const deleteTeamMembership = async ({ teamId, membershipId, }) => {
    try {
        const { teams } = await createAdminClient();
        await teams.deleteMembership(teamId, membershipId);
        return { data: null, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
/**
 * Retrieves details of a specific team by its unique ID.
 */
const getTeam = async ({ teamId, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.get(teamId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
/**
 * Retrieves details of a specific team membership by its unique ID.
 */
const getTeamMembership = async ({ teamId, membershipId, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.getMembership(teamId, membershipId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
/**
 * Retrieves the shared preferences for a specific team by its unique ID.
 */
const getTeamPreferences = async ({ teamId, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.getPrefs(teamId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
/**
 * Lists all memberships for a specific team, optionally filtered by queries or search terms.
 */
const listTeamMemberships = async ({ teamId, queries = [], search, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.listMemberships(teamId, queries, search);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const listTeams = async ({ queries = [], search, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.list(queries, search);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateTeamMembership = async ({ teamId, membershipId, roles, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.updateMembership(teamId, membershipId, roles);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateTeamMembershipStatus = async ({ teamId, membershipId, userId, secret, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.updateMembershipStatus(teamId, membershipId, userId, secret);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateTeamName = async ({ teamId, name, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.updateName(teamId, name);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
const updateTeamPreferences = async ({ teamId, prefs, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.updatePrefs(teamId, prefs);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await handleApwError({ error }),
        };
    }
};
export { createTeam, createTeamMembership, deleteTeam, deleteTeamMembership, getTeam, getTeamMembership, getTeamPreferences, listTeamMemberships, listTeams, updateTeamMembership, updateTeamMembershipStatus, updateTeamName, updateTeamPreferences, };
