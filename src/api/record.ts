import axios from "axios";

/**
 * 기록하기
 * @param {string} url record
 * @param {string} params 
 * {
    "recordedDate" : "",
    "recordContent" : "",
    "recordTitle" : "", 
    "todaySolution" : ""
}
 */

// 토큰을 컴포넌트에서 불러와서 매개변수로 전달해야함
export function createRecord(url: string, params: object, token: string) {
  return axios.post(`/api/${url}`, params, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/**
 * 기록 상세조회
 * @param {string} url record
 * @param {string} id recordId
 */
export function getRecordDetail(url: string, id: string, token: string) {
  return axios.get(`/api/${url}?recordId=${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/**
 * 기록수정
 * @param {string} url record
 * @param {string} params 
 * {
    "recordedDate" : "",
    "recordContent" : "",
    "recordTitle" : "", 
    "recordId" : ""
}
 */
export function editRecord(url: string, params: object, token: string) {
  return axios.patch(`/api/${url}`, params, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/**
 * 기록리스트 조회
 * @param {string} url record/list
 */
export function getRecordList(url: string, token: string) {
  return axios.get(`/api/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/**
 * 기록삭제
 * @param {string} url record
 * @param {string} url recordId
 */
export function deleteRecord(url: string, id: string, token: string) {
  return axios.delete(`/api/${url}?recordId=${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
