import requestAxios from "./index";

/**
 * 로그인
 * @param {string} url login
 * @param {string} params 인가코드
 */
export function getLoginToken(url: string, authorizationCode: string) {
  return requestAxios.post(`/auth/${url}`, { code: authorizationCode });
}

/**
 * 로그아웃
 * @param {string} url logout
 * @param {string} token jwt토큰
 */
export function getLogout(url: string, token: string) {
  return requestAxios.post(`/auth/${url}`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
