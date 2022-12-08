// import config from "../config";
import httpService from "./httpService";

// get order detail by id
export function getOrderDetail(order_id) {
  const { api_url } = window.WOOCONVO_Data;
  const url = `${api_url}/get-order-detail?order_id=${order_id}`;
  return httpService.get(url);
}

// add message in order
export function addMessage(message) {
  const { api_url, user_id, order_id } = window.WOOCONVO_Data;
  const url = `${api_url}/add-message`;
  const data = { message, user_id, order_id };
  return httpService.post(url, data);
}
