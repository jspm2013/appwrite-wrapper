"use server";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeamPreferences = exports.updateTeamName = exports.updateTeamMembershipStatus = exports.updateTeamMembership = exports.listTeams = exports.listTeamMemberships = exports.getTeamPreferences = exports.getTeamMembership = exports.getTeam = exports.deleteTeamMembership = exports.deleteTeam = exports.createTeamMembership = exports.createTeam = void 0;
const appwriteClients_1 = require("../appwriteClients");
/**
 * Lists all teams for the current user, optionally filtered by queries or search terms.
 */
const listTeams = async ({ queries = [], search, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const result = await teams.list(queries, search);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/teams): Error executing listTeams():", err);
        throw err;
    }
};
exports.listTeams = listTeams;
/**
 * Creates a new team with the specified ID, name, and optional roles.
 */
const createTeam = async ({ teamId, name, roles = [], }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const result = await teams.create(teamId, name, roles);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/teams): Error executing createTeam():", err);
        throw err;
    }
};
exports.createTeam = createTeam;
/**
 * Retrieves details of a specific team by its unique ID.
 */
const getTeam = async ({ teamId, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const result = await teams.get(teamId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/teams): Error executing getTeam():", err);
        throw err;
    }
};
exports.getTeam = getTeam;
/**
 * Updates the name of a specific team by its ID.
 */
const updateTeamName = async ({ teamId, name, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const result = await teams.updateName(teamId, name);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/teams): Error executing updateTeamName():", err);
        throw err;
    }
};
exports.updateTeamName = updateTeamName;
/**
 * Deletes a team using its unique ID.
 */
const deleteTeam = async ({ teamId }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        await teams.delete(teamId);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/teams): Error executing deleteTeam():", err);
        throw err;
    }
};
exports.deleteTeam = deleteTeam;
/**
 * Lists all memberships for a specific team, optionally filtered by queries or search terms.
 */
const listTeamMemberships = async ({ teamId, queries = [], search, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const result = await teams.listMemberships(teamId, queries, search);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/teams): Error executing listTeamMemberships():", err);
        throw err;
    }
};
exports.listTeamMemberships = listTeamMemberships;
/**
 * Creates a new membership for a team, optionally inviting a user via email or phone.
 */
const createTeamMembership = async ({ teamId, roles, email, userId, phone, url, name, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const result = await teams.createMembership(teamId, roles, email, userId, phone, url, name);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/teams): Error executing createTeamMembership():", err);
        throw err;
    }
};
exports.createTeamMembership = createTeamMembership;
/**
 * Retrieves details of a specific team membership by its unique ID.
 */
const getTeamMembership = async ({ teamId, membershipId, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const result = await teams.getMembership(teamId, membershipId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/teams): Error executing getTeamMembership():", err);
        throw err;
    }
};
exports.getTeamMembership = getTeamMembership;
/**
 * Updates the roles of a specific team membership.
 */
const updateTeamMembership = async ({ teamId, membershipId, roles, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const result = await teams.updateMembership(teamId, membershipId, roles);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/teams): Error executing updateTeamMembership():", err);
        throw err;
    }
};
exports.updateTeamMembership = updateTeamMembership;
/**
 * Deletes a team membership by its unique ID.
 */
const deleteTeamMembership = async ({ teamId, membershipId, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        await teams.deleteMembership(teamId, membershipId);
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/teams): Error executing deleteTeamMembership():", err);
        throw err;
    }
};
exports.deleteTeamMembership = deleteTeamMembership;
/**
 * Updates the status of a specific team membership, allowing the user to accept an invitation.
 */
const updateTeamMembershipStatus = async ({ teamId, membershipId, userId, secret, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const result = await teams.updateMembershipStatus(teamId, membershipId, userId, secret);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/teams): Error executing updateTeamMembershipStatus():", err);
        throw err;
    }
};
exports.updateTeamMembershipStatus = updateTeamMembershipStatus;
/**
 * Retrieves the shared preferences for a specific team by its unique ID.
 */
const getTeamPreferences = async ({ teamId, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const result = await teams.getPrefs(teamId);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/teams): Error executing getTeamPreferences():", err);
        throw err;
    }
};
exports.getTeamPreferences = getTeamPreferences;
/**
 * Updates the shared preferences of a team, replacing any previous values.
 */
const updateTeamPreferences = async ({ teamId, prefs, }) => {
    try {
        const { teams } = await (0, appwriteClients_1.createAdminClient)();
        const result = await teams.updatePrefs(teamId, prefs);
        return result;
    }
    catch (err) {
        console.error("APW-WRAPPER - Error (methods/teams): Error executing updateTeamPreferences():", err);
        throw err;
    }
};
exports.updateTeamPreferences = updateTeamPreferences;
