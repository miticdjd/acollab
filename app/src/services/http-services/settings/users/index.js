import apiClient from '../../../axios'

export async function getUsersWithPagination(perPage = 20, sort = 'name', direction = 'desc' , page) {
  return apiClient
    .get(`/users?per_page=${perPage}&sort=${sort}&direction=${direction}&page=${page}`)
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}

export async function getUsers() {
  return apiClient
      .get('/users/all')
      .then(response => {
          return response;
      })
      .catch(err => err && err);
}

export async function getSingleUser(userId) {
  return apiClient
    .get(`/users/${userId}`)
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}

export async function addUser(reqBody) {
  return apiClient
    .post('/users', reqBody)
    .then(response => {
        return response
    })
    .catch(err => err && err);
}

export async function editUser(userId, reqBody) {
  return apiClient
    .put(`/users/${userId}`, reqBody)
    .then(response => {
      return response
    })
    .catch(err => err && err);
}

export async function deleteUser(userId) {
  return apiClient
    .delete(`/users/${userId}`)
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}