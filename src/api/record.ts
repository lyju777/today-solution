import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("access_token");

const header = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

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
export function createRecord(url: string, params: object) {
  return axios.post(`/api/${url}`, params, header);
}

/**
 * 기록 상세조회
 * @param {string} url record
 * @param {string} id recordId
 */
export function getRecordDetail(url: string, id: string) {
  return axios.get(`/api/${url}?recordId=${id}`, header);
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
export function editRecord(url: string, params: object) {
  return axios.patch(`/api/${url}`, params, header);
}

/**
 * 기록리스트 조회
 * @param {string} url record/list
 */
export function getRecordList(url: string) {
  return axios.get(`/api/${url}`, header);
}

/**
 * 기록삭제
 * @param {string} url record
 * @param {string} url recordId
 */
export function deleteRecord(url: string, id: string) {
  return axios.delete(`/api/${url}?recordId=${id}`, header);
}
