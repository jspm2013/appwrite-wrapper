"use server";
import { live } from "../host";
import { createAdminClient } from "../appwriteClients";
const admin = !live;
const errMsg = (fn) => admin ? `ApwWrapper Error (methods/teams): ${fn}()` : "Team Error";
/**
 * Creates a new team with the specified ID, name, and optional roles.
 */
const createTeam = async ({ teamId, name, roles = [], }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.create(teamId, name, roles);
        return { data, error: null };
    }
    catch (err) {
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
 * Creates a new membership for a team, optionally inviting a user via email or phone.
 */
const createTeamMembership = async ({ teamId, roles, email, userId, phone, url, name, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.createMembership(teamId, roles, email, userId, phone, url, name);
        return { data, error: null };
    }
    catch (err) {
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
 * Deletes a team using its unique ID.
 */
const deleteTeam = async ({ teamId, }) => {
    try {
        const { teams } = await createAdminClient();
        await teams.delete(teamId);
        return { data: null, error: null };
    }
    catch (err) {
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
 * Deletes a team membership by its unique ID.
 */
const deleteTeamMembership = async ({ teamId, membershipId, }) => {
    try {
        const { teams } = await createAdminClient();
        await teams.deleteMembership(teamId, membershipId);
        return { data: null, error: null };
    }
    catch (err) {
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
 * Retrieves details of a specific team by its unique ID.
 */
const getTeam = async ({ teamId, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.get(teamId);
        return { data, error: null };
    }
    catch (err) {
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
 * Retrieves details of a specific team membership by its unique ID.
 */
const getTeamMembership = async ({ teamId, membershipId, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.getMembership(teamId, membershipId);
        return { data, error: null };
    }
    catch (err) {
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
 * Retrieves the shared preferences for a specific team by its unique ID.
 */
const getTeamPreferences = async ({ teamId, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.getPrefs(teamId);
        return { data, error: null };
    }
    catch (err) {
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
 * Lists all memberships for a specific team, optionally filtered by queries or search terms.
 */
const listTeamMemberships = async ({ teamId, queries = [], search, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.listMemberships(teamId, queries, search);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("listTeamMemberships"),
                description: JSON.stringify(err),
            },
        };
    }
};
const listTeams = async ({ queries = [], search, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.list(queries, search);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("listTeams"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateTeamMembership = async ({ teamId, membershipId, roles, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.updateMembership(teamId, membershipId, roles);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateTeamMembership"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateTeamMembershipStatus = async ({ teamId, membershipId, userId, secret, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.updateMembershipStatus(teamId, membershipId, userId, secret);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateTeamMembershipStatus"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateTeamName = async ({ teamId, name, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.updateName(teamId, name);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateTeamName"),
                description: JSON.stringify(err),
            },
        };
    }
};
const updateTeamPreferences = async ({ teamId, prefs, }) => {
    try {
        const { teams } = await createAdminClient();
        const data = await teams.updatePrefs(teamId, prefs);
        return { data, error: null };
    }
    catch (err) {
        return {
            data: null,
            error: {
                message: errMsg("updateTeamPreferences"),
                description: JSON.stringify(err),
            },
        };
    }
};
export { createTeam, createTeamMembership, deleteTeam, deleteTeamMembership, getTeam, getTeamMembership, getTeamPreferences, listTeamMemberships, listTeams, updateTeamMembership, updateTeamMembershipStatus, updateTeamName, updateTeamPreferences, };
