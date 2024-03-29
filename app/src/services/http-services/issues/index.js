import apiClient from '../../axios'

export async function getIssuesWithFilters(perPage = 20, sort = 'name', direction = 'desc', page, filters) {
  return apiClient
    .post(`/issues/filter?per_page=${perPage}&sort=${sort}&direction=${direction}&page=${page}`, filters)
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}

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

export async function getIssuesByProject(projectId) {
  return apiClient
      .get(`/issues/all/by/project/${projectId}`)
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

export async function deleteAttachment(attachmentId) {
  return apiClient
    .delete(`/issues/attachments/${attachmentId}`)
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}

export async function updateStatus(issueId, status) {
  return apiClient
  .put(`/issues/${issueId}/status`, { status })
  .then(response => {
    return response
  })
  .catch(err => err && err);
}