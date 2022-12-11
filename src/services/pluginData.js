// window.WOOCONVO_Data = JSON.stringify({
//   api_url: "https://code.najeebmedia.com/wp-json/wooconvo/v1",
//   user_id: 1,
//   order_id: 33,
//   order_date: new Date(),
//   context: "order_wc",
// });

const { order_id, user_id, order_date, api_url, context } = JSON.parse(
  window.WOOCONVO_Data
);

export default {
  order_date,
  order_id,
  user_id,
  api_url,
  context,
};
