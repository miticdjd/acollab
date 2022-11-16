import apiClient from '../../axios'

export async function getProjectsWithPagination(perPage = 20, sort = 'name', direction = 'desc' , page) {
  return apiClient
    .get(`/projects?per_page=${perPage}&sort=${sort}&direction=${direction}&page=${page}`)
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}

export async function getProjects() {
  return apiClient
      .get('/projects/all')
      .then(response => {
          return response;
      })
      .catch(err => err && err);
}

export async function getSingleProject(projectId) {
  return apiClient
    .get(`/projects/${projectId}`)
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}

export async function addProject(reqBody) {
  return apiClient
    .post('/projects', reqBody)
    .then(response => {
        return response
    })
    .catch(err => err && err);
}

export async function editProject(projectId, reqBody) {
  return apiClient
    .put(`/projects/${projectId}`, reqBody)
    .then(response => {
      return response
    })
    .catch(err => err && err);
}

export async function deleteProject(projectId) {
  return apiClient
    .delete(`/projects/${projectId}`)
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}