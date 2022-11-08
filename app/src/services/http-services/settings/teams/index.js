import apiClient from '../../../axios';

export async function getTeamsWithPagination(perPage = 20, sort = 'name', direction = 'desc' , page) {
    return apiClient
        .get(`/teams?per_page=${perPage}&sort=${sort}&direction=${direction}&page=${page}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}

export async function getTeams() {
    return apiClient
        .get('/teams/all')
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function getSingleTeam(teamId) {
    return apiClient
        .get(`/teams/${teamId}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function addTeam(reqBody) {
    return apiClient
        .post('/teams', reqBody)
        .then(response => {
            return response
        })
        .catch(err => err && err);
}
  
export async function editTeam(teamId, reqBody) {
    return apiClient
        .put(`/teams/${teamId}`, reqBody)
        .then(response => {
            return response
        })
        .catch(err => err && err);
}
  
export async function deleteTeam(teamId) {
    return apiClient
        .delete(`/teams/${teamId}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
