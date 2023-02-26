export const _to_options = (options) => {
  return Object.keys(options).map((b) => ({
    key: b,
    label: options[b],
  }));
};

export const wooconvo_makeid = (length = 6) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const get_setting = (key, defaultValue = "") => {
  var settings = localStorage.getItem("wooconvo_settings");
  if (!settings) return defaultValue;
  settings = JSON.parse(settings);
  if (!settings[key]) return defaultValue;
  return settings[key];
};

export const is_aws_ready = () => {
  var settings = localStorage.getItem("wooconvo_settings");
  if (!settings) return false;
  const {
    enable_aws,
    aws_accesskey,
    aws_secret,
    aws_bucket,
    aws_region,
    aws_url_expire,
    aws_acl,
  } = JSON.parse(settings);

  if (
    !enable_aws ||
    aws_accesskey === "" ||
    aws_secret === "" ||
    aws_bucket === "" ||
    aws_region === ""
  )
    return false;

  return {
    enable_aws,
    aws_accesskey,
    aws_secret,
    aws_bucket,
    aws_region,
    aws_url_expire,
    aws_acl,
  };
};

export const is_livechat_read = () => {
  var settings = localStorage.getItem("wooconvo_settings");
  if (!settings) return false;
  const {
    enable_livechat,
    pusher_app_id,
    pusher_secret,
    pusher_key,
    pusher_cluster,
  } = JSON.parse(settings);

  if (
    !enable_livechat ||
    pusher_app_id === "" ||
    pusher_secret === "" ||
    pusher_key === "" ||
    pusher_cluster === ""
  )
    return false;

  return {
    enable_livechat,
    pusher_app_id,
    pusher_secret,
    pusher_key,
    pusher_cluster,
  };
};

export const sanitize_filename = (file_name) => {
  return file_name.replace(/[^a-zA-Z0-9\-\.]/gi, "_").toLowerCase();
};
