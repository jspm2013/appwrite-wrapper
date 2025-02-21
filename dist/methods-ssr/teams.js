"use server";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeamPreferences = exports.updateTeamName = exports.updateTeamMembershipStatus = exports.updateTeamMembership = exports.listTeams = exports.listTeamMemberships = exports.getTeamPreferences = exports.getTeamMembership = exports.getTeam = exports.deleteTeamMembership = exports.deleteTeam = exports.createTeamMembership = exports.createTeam = void 0;
const exceptions_1 = require("../exceptions");
const appwriteClients_1 = require("../appwriteClients");
/**
 * Creates a new team with the specified ID, name, and optional roles.
 */
const createTeam = async ({ teamId, name, roles = [], }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const data = await teams.create(teamId, name, roles);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createTeam = createTeam;
/**
 * Creates a new membership for a team, optionally inviting a user via email or phone.
 */
const createTeamMembership = async ({ teamId, roles, email, userId, phone, url, name, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const data = await teams.createMembership(teamId, roles, email, userId, phone, url, name);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.createTeamMembership = createTeamMembership;
/**
 * Deletes a team using its unique ID.
 */
const deleteTeam = async ({ teamId, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        await teams.delete(teamId);
        return { data: null, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.deleteTeam = deleteTeam;
/**
 * Deletes a team membership by its unique ID.
 */
const deleteTeamMembership = async ({ teamId, membershipId, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        await teams.deleteMembership(teamId, membershipId);
        return { data: null, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.deleteTeamMembership = deleteTeamMembership;
/**
 * Retrieves details of a specific team by its unique ID.
 */
const getTeam = async ({ teamId, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const data = await teams.get(teamId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.getTeam = getTeam;
/**
 * Retrieves details of a specific team membership by its unique ID.
 */
const getTeamMembership = async ({ teamId, membershipId, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const data = await teams.getMembership(teamId, membershipId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.getTeamMembership = getTeamMembership;
/**
 * Retrieves the shared preferences for a specific team by its unique ID.
 */
const getTeamPreferences = async ({ teamId, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const data = await teams.getPrefs(teamId);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.getTeamPreferences = getTeamPreferences;
/**
 * Lists all memberships for a specific team, optionally filtered by queries or search terms.
 */
const listTeamMemberships = async ({ teamId, queries = [], search, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const data = await teams.listMemberships(teamId, queries, search);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.listTeamMemberships = listTeamMemberships;
const listTeams = async ({ queries = [], search, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const data = await teams.list(queries, search);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.listTeams = listTeams;
const updateTeamMembership = async ({ teamId, membershipId, roles, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const data = await teams.updateMembership(teamId, membershipId, roles);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateTeamMembership = updateTeamMembership;
const updateTeamMembershipStatus = async ({ teamId, membershipId, userId, secret, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const data = await teams.updateMembershipStatus(teamId, membershipId, userId, secret);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateTeamMembershipStatus = updateTeamMembershipStatus;
const updateTeamName = async ({ teamId, name, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const data = await teams.updateName(teamId, name);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateTeamName = updateTeamName;
const updateTeamPreferences = async ({ teamId, prefs, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const data = await teams.updatePrefs(teamId, prefs);
        return { data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error: await (0, exceptions_1.handleApwError)({ error }),
        };
    }
};
exports.updateTeamPreferences = updateTeamPreferences;
