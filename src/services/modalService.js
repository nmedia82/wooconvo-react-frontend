// import config from "../config";
import httpService from "./httpService";
import pluginData from "./pluginData";

const { api_url, user_id, order_id, context } = pluginData;

// get order detail by id
export function getOrderDetail(order_id) {
  const user_type = context === "myaccount" ? "customer" : "";

  const url = `${api_url}/get-order-detail?order_id=${order_id}&user_type=${user_type}`;
  return httpService.get(url);
}

// add message in order
export function addMessage(message, attachments = []) {
  const url = `${api_url}/add-message`;
  const data = { message, user_id, order_id, attachments };
  return httpService.post(url, data);
}

// upload files to site
export function uploadFiles(file) {
  const url = `${api_url}/upload-file`;
  const data = new FormData();
  data.append("file", file);
  // data.append("order_id", order_id);
  // data.append("user_id", user_id);
  // const data = { order_id, file };
  const headers = { headers: { "content-type": "multipart/form-data" } };
  return httpService.post(url, data, headers);
}
