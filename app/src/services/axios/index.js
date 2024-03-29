import axios from 'axios';
import { toast } from 'react-toastify';

export const getUrl = () => process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_PROD_API_URL
  : process.env.REACT_APP_DEV_API_URL;

function getAccessToken() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; accessToken=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const apiClient = axios.create({
  baseURL: getUrl(),
});

apiClient.interceptors.request.use(request => {
  const accessToken = getAccessToken();

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }

  request.headers.Accept = 'application/json';
  axios.defaults.withCredentials = true;

  return request
});

apiClient.interceptors.response.use(undefined, error => {
  // Errors handling
  const { response } = error;
  const { data } = response;

  if (response.status === 400 || response.status === 422) {
    toast.error(data.message);
  }

  if (response.error === 500) {
    toast.error('An unexpected error occurred, please contact administrators');
  }

  return Promise.reject(response)
});

export default apiClient
