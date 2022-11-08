import apiClient from '../../../axios';

export async function getCompanyTypesWithPagination(perPage = 20, sort = 'name', direction = 'desc' , page) {
    return apiClient
        .get(`/company-types?per_page=${perPage}&sort=${sort}&direction=${direction}&page=${page}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}

export async function getCompanyTypes() {
    return apiClient
        .get('/company-types/all')
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function getSingleCompanyType(companyId) {
    return apiClient
        .get(`/company-types/${companyId}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function addCompanyType(reqBody) {
    return apiClient
        .post('/company-types', reqBody)
        .then(response => {
            return response
        })
        .catch(err => err && err);
}
  
export async function editCompanyType(companyId, reqBody) {
    return apiClient
        .put(`/company-types/${companyId}`, reqBody)
        .then(response => {
            return response
        })
        .catch(err => err && err);
}
  
export async function deleteCompanyType(companyId) {
    return apiClient
        .delete(`/company-types/${companyId}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}