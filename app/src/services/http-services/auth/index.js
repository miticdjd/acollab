import apiClient from '../../axios'

export async function login(email, password) {
  return apiClient
    .post('/auth/login', {
      email,
      password,
    })
    .then(response => {
      if (response) {
        const { token } = response.data.data;

        if (token) {
          document.cookie = `accessToken=${token}; max-age=86400; path=/;`;
        }
        return response
      }
      return false
    })
    .catch(err => err && err);
}

export async function forgotPassword(email) {
  return apiClient
    .post('/auth/password/forgotten', { email })
    .then(response => {
      return response
    })
    .catch(err => err && err);
}

export async function resetPassword(token, password, passwordConfirmation) {
  return apiClient
    .post('/auth/password/reset', {
      token,
      password,
      password_confirmation: passwordConfirmation
    })
    .then(response => {
      return response
    })
    .catch(err => err && err);
}

export async function logout() {
  return apiClient
    .get('/auth/logout')
    .then(() => {
      document.cookie = `accessToken=; max-age=-86400; path=/;`;
      return true
    })
    .catch(err => err && err)
}

export async function fetchWho() {
  return apiClient
    .get('/auth/who')
    .then(response => {
      return response
    })
    .catch(err => err && err);
}

