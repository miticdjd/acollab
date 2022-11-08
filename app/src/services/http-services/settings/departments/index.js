import apiClient from '../../../axios';

export async function getDepartmentsWithPagination(perPage = 20, sort = 'name', direction = 'desc' , page) {
    return apiClient
        .get(`/departments?per_page=${perPage}&sort=${sort}&direction=${direction}&page=${page}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}

export async function getDepartments() {
    return apiClient
        .get('/departments/all')
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function getSingleDepartment(departmentId) {
    return apiClient
        .get(`/departments/${departmentId}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function addDepartment(reqBody) {
    return apiClient
        .post('/departments', reqBody)
        .then(response => {
            return response
        })
        .catch(err => err && err);
}
  
export async function editDepartment(departmentId, reqBody) {
    return apiClient
        .put(`/departments/${departmentId}`, reqBody)
        .then(response => {
            return response
        })
        .catch(err => err && err);
}
  
export async function deleteDepartment(departmentId) {
    return apiClient
        .delete(`/departments/${departmentId}`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}