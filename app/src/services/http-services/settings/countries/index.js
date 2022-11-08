import apiClient from '../../../axios';

export async function getCountriesWithPagination(perPage = 20, sort = 'name', direction = 'desc' , page) {
    return apiClient
        .get(`/countries?per_page=${perPage}&sort=${sort}&direction=${direction}&page=${page}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}

export async function getCountries() {
    return apiClient
        .get('/countries/all')
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function getSingleCountry(countryId) {
    return apiClient
        .get(`/countries/${countryId}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function addCountry(reqBody) {
    return apiClient
        .post('/countries', reqBody)
        .then(response => {
            return response
        })
        .catch(err => err && err);
}
  
export async function editCountry(countryId, reqBody) {
    return apiClient
        .put(`/countries/${countryId}`, reqBody)
        .then(response => {
            return response
        })
        .catch(err => err && err);
}
  
export async function deleteCountry(countryId) {
    return apiClient
        .delete(`/countries/${countryId}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}