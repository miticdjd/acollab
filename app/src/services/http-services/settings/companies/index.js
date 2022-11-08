import apiClient from '../../../axios';

export async function getCompaniesWithPagination(perPage = 20, sort = 'name', direction = 'desc' , page) {
    return apiClient
        .get(`/companies?per_page=${perPage}&sort=${sort}&direction=${direction}&page=${page}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}

export async function getCompanies() {
    return apiClient
        .get('/companies/all')
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function getSingleCompany(companyId) {
    return apiClient
        .get(`/companies/${companyId}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function addCompany(reqBody) {
    return apiClient
        .post('/companies', reqBody)
        .then(response => {
            return response
        })
        .catch(err => err && err);
}
  
export async function editCompany(companyId, reqBody) {
    return apiClient
        .put(`/companies/${companyId}`, reqBody)
        .then(response => {
            return response
        })
        .catch(err => err && err);
}
  
export async function deleteCompany(companyId) {
    return apiClient
        .delete(`/companies/${companyId}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}