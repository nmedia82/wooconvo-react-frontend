import axios from "axios";
// import { token } from "./auth";
const { wp_nonce } = JSON.parse(window.WOOCONVO_Data);

// New axio interceptor syntax from
// source: https://stackoverflow.com/questions/68714143/how-can-i-use-axios-interceptors-to-add-some-headers-to-responses
axios.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('auth_token');
    // if (token) {
    //   config.headers["Authorization"] = "Basic " + token;
    // }
    config.headers["Content-Type"] = "application/json";
    if (wp_nonce) config.headers["X-WP-Nonce"] = wp_nonce;
    // Check if the request is a GET request
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(null, (error) => {
  //   console.log("Error", error);
  const expectedErrors =
    error.response && error.respons.status >= 400 && error.respons.status < 500;

  if (!expectedErrors) {
    alert("An unexpected error occurred!");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
