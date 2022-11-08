import apiClient from '../../../axios'

export async function fetchGeneralSettings() {
  return apiClient
    .get('/setting/general')
    .then(response => {
      return response;
    })
    .catch(err => err && err);
}

export async function updateGenaralSettings(data) {
    
  return apiClient
    .post('/setting/general', data)
    .then(response => {
      if (response) {
        return response;
      }
      return false
    })
    .catch(err => err && err);
}