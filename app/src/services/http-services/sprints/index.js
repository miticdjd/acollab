import apiClient from '../../axios'

export async function getSprintsWithPagination(perPage = 20, sort = 'name', direction = 'desc' , page) {
  return apiClient
    .get(`/sprints?per_page=${perPage}&sort=${sort}&direction=${direction}&page=${page}`)
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}

export async function getSprints() {
  return apiClient
      .get('/sprints/all')
      .then(response => {
          return response;
      })
      .catch(err => err && err);
}

export async function getSingleSprint(sprintId) {
  return apiClient
    .get(`/sprints/${sprintId}`)
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}

export async function addSprint(reqBody) {
  return apiClient
    .post('/sprints', reqBody)
    .then(response => {
        return response
    })
    .catch(err => err && err);
}

export async function editSprint(sprintId, reqBody) {
  return apiClient
    .put(`/sprints/${sprintId}`, reqBody)
    .then(response => {
      return response
    })
    .catch(err => err && err);
}

export async function deleteSprint(sprintId) {
  return apiClient
    .delete(`/sprints/${sprintId}`)
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}

export async function finishSprint(sprintId) {
  return apiClient
    .put(`/sprints/finish/${sprintId}`)
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}