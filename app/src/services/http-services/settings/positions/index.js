import apiClient from '../../../axios';

export async function getPositionsWithPagination(perPage = 20, sort = 'name', direction = 'desc' , page) {
    return apiClient
        .get(`/positions?per_page=${perPage}&sort=${sort}&direction=${direction}&page=${page}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}

export async function getPositions() {
    return apiClient
        .get('/positions/all')
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function getSinglePosition(positionId) {
    return apiClient
        .get(`/positions/${positionId}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function addPosition(reqBody) {
    return apiClient
        .post('/positions', reqBody)
        .then(response => {
            return response
        })
        .catch(err => err && err);
}
  
export async function editPosition(positionId, reqBody) {
    return apiClient
        .put(`/positions/${positionId}`, reqBody)
        .then(response => {
            return response
        })
        .catch(err => err && err);
}
  
export async function deletePosition(positionId) {
    return apiClient
        .delete(`/positions/${positionId}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}