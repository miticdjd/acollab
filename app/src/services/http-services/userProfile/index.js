import apiClient from '../../axios'

export async function updateUserProfile(data) {
  return apiClient
    .post('/auth/profile', data)
    .then(response => {
      if (response) {
        return response
      }
      return false
    })
    .catch(err => err && err);
}

export async function updateUserPassword(data) {
  return apiClient
    .post('/auth/profile/password/update', data)
    .then(response => {
      if (response) {
        return response
      }
      return false
    })
    .catch(err => err && err);
}