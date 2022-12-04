import apiClient from '../../axios'

export async function getIssuesWithPagination(perPage = 20, sort = 'name', direction = 'desc' , page) {
  return apiClient
    .get(`/issues?per_page=${perPage}&sort=${sort}&direction=${direction}&page=${page}`)
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}

export async function getIssuesTypes() {
  return apiClient
      .get('/issues/types')
      .then(response => {
          return response;
      })
      .catch(err => err && err);
}

export async function getIssuesStatuses() {
  return apiClient
      .get('/issues/statuses')
      .then(response => {
          return response;
      })
      .catch(err => err && err);
}

export async function getIssues() {
  return apiClient
      .get('/issues/all')
      .then(response => {
          return response;
      })
      .catch(err => err && err);
}

export async function getSingleIssue(issueId) {
  return apiClient
    .get(`/issues/${issueId}`)
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}

export async function addIssue(reqBody) {
  return apiClient
    .post('/issues', reqBody)
    .then(response => {
        return response
    })
    .catch(err => err && err);
}

export async function editIssue(issueId, reqBody) {
  return apiClient
    .put(`/issues/${issueId}`, reqBody)
    .then(response => {
      return response
    })
    .catch(err => err && err);
}

export async function deleteIssue(issueId) {
  return apiClient
    .delete(`/issues/${issueId}`)
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}