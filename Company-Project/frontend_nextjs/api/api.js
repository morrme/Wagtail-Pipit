import { keysToCamelFromSnake } from '../utils/caseconverters';

const API_URL = process.env.WAGTAIL_API_URL


export async function getPagePreview(contentType, token) {
  const headers = { 'Content-Type': 'application/json' }
  const url = API_URL + `/api/v2/page_preview/?content_type=${contentType}&token=${token}`;
  const res = await fetch(url, headers);
  const json = await res.json();
  return keysToCamelFromSnake(json);
}

export async function getPage(path) {
  const headers = { 'Content-Type': 'application/json' }
  const url = API_URL + "/" + path + "?format=json";
  const res = await fetch(url, headers);
  const json = await res.json();
  return keysToCamelFromSnake(json);
}

export async function getAllPages() {
  const headers = { 'Content-Type': 'application/json' }
  const url = API_URL + "/api/v2/pages/";
  const res = await fetch(url, headers);
  const json = await res.json();
  return keysToCamelFromSnake(json);
}
