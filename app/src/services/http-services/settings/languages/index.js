import apiClient from '../../../axios';

export async function getLanguagesWithPagination(perPage = 20, sort = 'name', direction = 'desc' , page) {
    return apiClient
        .get(`/languages?per_page=${perPage}&sort=${sort}&direction=${direction}&page=${page}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}

export async function getLanguages() {
    return apiClient
        .get('/languages/all')
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function getSingleLanguage(languageId) {
    return apiClient
        .get(`/languages/${languageId}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function addLanguage(reqBody) {
    return apiClient
        .post('/languages', reqBody)
        .then(response => {
            return response
        })
        .catch(err => err && err);
}
  
export async function editLaanguage(languageId, reqBody) {
    return apiClient
        .put(`/languages/${languageId}`, reqBody)
        .then(response => {
            return response
        })
        .catch(err => err && err);
}
  
export async function deleteLanguage(languageId) {
    return apiClient
        .delete(`/languages/${languageId}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}