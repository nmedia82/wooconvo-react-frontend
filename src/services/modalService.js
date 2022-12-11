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
  const url = `${pluginData.api_url}/add-message`;
  const data = { message, user_id, order_id };
  return httpService.post(url, data);
}
