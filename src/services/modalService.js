// import config from "../config";
import httpService from "./httpService";
import pluginData from "./pluginData";

// get order detail by id
export function getOrderDetail(order_id) {
  const url = `${pluginData.api_url}/get-order-detail?order_id=${order_id}`;
  return httpService.get(url);
}

// add message in order
export function addMessage(message) {
  const { api_url, user_id, order_id } = pluginData;
  const url = `${api_url}/add-message`;
  const data = { message, user_id, order_id };
  return httpService.post(url, data);
}

// upload files to site
export function uploadFiles(file) {
  console.log(file);
  const { api_url, user_id, order_id } = pluginData;
  const url = `${api_url}/upload-file`;
  const data = new FormData();
  data.append("file", file);
  // data.append("order_id", order_id);
  // data.append("user_id", user_id);
  // const data = { order_id, file };
  const headers = { headers: { "content-type": "multipart/form-data" } };
  return httpService.post(url, data, headers);
}
