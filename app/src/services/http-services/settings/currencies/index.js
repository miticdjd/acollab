import apiClient from '../../../axios';

export async function getCurrenciesWithPagination(perPage = 20, sort = 'name', direction = 'desc' , page) {
    return apiClient
        .get(`/currencies?per_page=${perPage}&sort=${sort}&direction=${direction}&page=${page}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}

export async function getCurrencies() {
    return apiClient
        .get('/currencies/all')
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function getSingleCurrency(curencyId) {
    return apiClient
        .get(`/currencies/${curencyId}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function addCurrency(reqBody) {
    return apiClient
        .post('/currencies', reqBody)
        .then(response => {
            return response
        })
        .catch(err => err && err);
}
  
export async function editCurrency(curencyId, reqBody) {
    return apiClient
        .put(`/currencies/${curencyId}`, reqBody)
        .then(response => {
            return response
        })
        .catch(err => err && err);
}
  
export async function deleteCurrency(curencyId) {
    return apiClient
        .delete(`/currencies/${curencyId}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}