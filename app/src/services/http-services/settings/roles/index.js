import apiClient from '../../../axios'

export async function getAllPermissions() {
  return apiClient
    .get('/permissions/all')
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}

export async function getAllRoles() {
  return apiClient
    .get('/roles/all')
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}

export async function getRolesWithPagination(perPage = 20, sort = 'name', direction = 'desc' , page) {
  return apiClient
    .get(`/roles?per_page=${perPage}&sort=${sort}&direction=${direction}&page=${page}`)
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}

export async function getSingleRole(roleId) {
  return apiClient
    .get(`/roles/${roleId}`)
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}

export async function addRole(reqBody) {
  return apiClient
    .post('/roles', reqBody)
    .then(response => {
        return response
    })
    .catch(err => err && err);
}

export async function editRole(id, reqBody) {
  return apiClient
    .put(`/roles/${id}`, reqBody)
    .then(response => {
      return response
    })
    .catch(err => err && err);
}

export async function deleteRole(roleId) {
  return apiClient
    .delete(`/roles/${roleId}`)
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}
