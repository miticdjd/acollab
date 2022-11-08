import apiClient from '../../../axios';

export async function getCitiesWithPagination(perPage = 20, sort = 'name', direction = 'desc' , page) {
    return apiClient
        .get(`/cities?per_page=${perPage}&sort=${sort}&direction=${direction}&page=${page}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}

export async function getCities() {
    return apiClient
        .get('/cities/all')
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function getSingleCity(cityId) {
    return apiClient
        .get(`/cities/${cityId}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function addCity(reqBody) {
    return apiClient
        .post('/cities', reqBody)
        .then(response => {
            return response
        })
        .catch(err => err && err);
}
  
export async function editCity(cityId, reqBody) {
    return apiClient
        .put(`/cities/${cityId}`, reqBody)
        .then(response => {
            return response
        })
        .catch(err => err && err);
}
  
export async function deleteCity(cityId) {
    return apiClient
        .delete(`/cities/${cityId}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}