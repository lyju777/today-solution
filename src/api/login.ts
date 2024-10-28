import axios from "axios";

export function getLoginToken(url: string, code: string) {
  return axios.post(`/api/${url}`, { code: code });
}

export function getLoginUserData(url: string, token: string) {
  return axios.get(`/api/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getLogout(url: string, token: string) {
  return axios.post(`/api/${url}`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
