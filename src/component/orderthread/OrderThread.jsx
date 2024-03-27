import { useState, useEffect } from "react";
import { Backdrop, CircularProgress, Divider } from "@mui/material";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Pusher from "pusher-js";
import ReplyMsg from "./ReplyMsg";
import MessagesBody from "./Messages";
import RevisionsAddon from "./RevisionsAddons";
import "./thread.css";
import NavBar from "./NavBar";
import {
  addMessage,
  getOrderById,
  resetUnread,
} from "../../services/modalService";
import pluginData from "../../services/pluginData";
import {
  get_setting,
  is_aws_ready,
  is_livechat_read,
  sanitize_filename,
} from "../../services/helper";
// check is AWS Addon is ready to use
const IsAWSReady = is_aws_ready();
// check LiveChat Addon is ready
const isLiveChatReady = is_livechat_read();
// import { resetUnread } from "../../common/modalService";
const { order_id, order_date, api_url, context, wp_nonce } = pluginData;

export default function WooConvoThread({ Order }) {
  const [Thread, setThread] = useState([]);
  const [RevisionLimit, setRevisionLimit] = useState(0);
  const [showMore, setshowMore] = useState(true);
  const [isWorking, setIsWorking] = useState(false);
  const [FilterThread, setFilterThread] = useState([]);

  useEffect(() => {
    const thread = [...Order.thread];
    setFilterThread(thread);
    setThread(thread);

    const revisions_limit_order = Order.revisions_limit;
    const revisions_limit_global = get_setting("revisions_limit");
    if (revisions_limit_order > 0) {
      setRevisionLimit(revisions_limit_order);
    } else if (revisions_limit_global > 0) {
      setRevisionLimit(revisions_limit_global);
    }

    const markOrderAsRead = async () => {
      const unread_count =
        context === "myaccount" ? Order.unread_customer : Order.unread_vendor;
      if (unread_count > 0) {
        await resetUnread(Order.order_id);
      }
    };

    markOrderAsRead();
    isLiveChatReady !== false && OnLiveChatReceived(Order);
  }, [Order]);

  // when message sent successfully
  const OnLiveChatReceived = async (order) => {
    const { pusher_key, pusher_cluster } = isLiveChatReady;
    const pusher = new Pusher(pusher_key, {
      cluster: pusher_cluster,
      encrypted: true,
    });

    const channel = pusher.subscribe(`channel-order-${order.order_id}`);
    channel.bind("on-reply", async (data) => {
      const { order_id } = data;
      if (order_id !== order.order_id) return;
      const { data: response } = await getOrderById(order.order_id);
      const { success, data: order_fresh } = response;
      if (!success)
        return alert(
          "Error while receiving the live chat, please contact admin"
        );
      const order_thread = [...order_fresh.thread];
      setFilterThread(order_thread);
      setThread(order_thread);
    });
  };

  const handleReplySend = async (reply_text, files = []) => {
    setIsWorking(true);
    var attachments = [];
    // console.log(IsAWSReady);

    try {
      if (IsAWSReady === false) {
        attachments = await handleFileUpload(files);
      } else {
        attachments = await handleFileUploadAWS(files);
      }
      const { data: response } = await addMessage(
        order_id,
        reply_text,
        attachments
      );
      const { success, data: order } = response;
      // console.log(isLiveChatReady);
      const { thread } = order;
      setIsWorking(false);
      if (success && isLiveChatReady === false) {
        setThread(thread);
        setFilterThread(thread);
      }
    } catch (error) {
      alert(`Error : ${error.message}`);
      setIsWorking(false);
      console.log(error);
    }
  };
  // upload to aws
  const handleFileUploadAWS = async (files) => {
    var promises = [];
    const { aws_accesskey, aws_secret, aws_bucket, aws_region } = IsAWSReady;
    const credentials = {
      accessKeyId: aws_accesskey,
      secretAccessKey: aws_secret,
    };
    const client = new S3Client({ region: aws_region, credentials });

    files.forEach(async (file) => {
      const safe_filename = sanitize_filename(file.name);
      const p = new Promise(async (resolve, reject) => {
        let params = {
          Bucket: aws_bucket,
          Body: file,
          Key: safe_filename,
        };
        // console.log(params);
        const command = new PutObjectCommand(params);
        const aws_response = await client.send(command);
        let reader = new FileReader();
        reader.onload = async () => {
          const resp = await uploadFileAWS(safe_filename, reader.result);
          const { data: attachment } = await resp.json();
          resolve(attachment);
        };
        reader.readAsDataURL(file);
      });
      promises.push(p);
    });
    return Promise.all(promises);
  };

  // upload to server
  const handleFileUpload = async (files) => {
    try {
      const promises = files.map(async (file) => {
        const resp = await uploadFile(file);
        const { data } = await resp.json();
        if (data.status && data.status === 403) {
          throw new Error("Error while uploading the file");
        }
        return data;
      });
      return Promise.all(promises);
    } catch (error) {
      throw error; // Re-throw the error to be caught by the caller
    }
  };

  // upload to local server
  const uploadFile = (file) => {
    // console.log(file);
    const url = `${api_url}/upload-file`;
    const data = new FormData();
    data.append("file", file);
    data.append("order_id", order_id);
    // Create headers object with the nonce included
    const headers = new Headers();
    headers.append("X-WP-Nonce", wp_nonce);

    return fetch(url, { method: "POST", body: data, headers });
  };

  // upload to aws server
  const uploadFileAWS = (file_name, file_data) => {
    // console.log(file_data);
    const { aws_bucket, aws_region, aws_acl } = IsAWSReady;
    const url = `${api_url}/upload-images-thumb`;
    const data = new FormData();
    data.append("file_data", file_data);
    data.append("file_name", file_name);
    data.append("order_id", order_id);
    data.append("key", file_name);
    data.append("bucket", aws_bucket);
    data.append("region", aws_region);
    return fetch(url, { method: "POST", body: data });
  };

  const handleSearch = (str) => {
    let thread = [...Thread];
    thread = thread.filter((r) => matchSearch(str, r.message));
    console.log(thread);
    setFilterThread(thread);
  };

  const matchSearch = (text, testwith) => {
    const regex = new RegExp("(?:^|\\s)" + text, "gi");
    return regex.test(testwith);
  };

  const handleDownload = async (file) => {
    const { filename, location, bucket, key, region } = file;
    console.log(IsAWSReady);
    if (location === "aws") {
      const { aws_accesskey, aws_secret, aws_bucket, aws_region } = IsAWSReady;
      const credentials = {
        accessKeyId: aws_accesskey,
        secretAccessKey: aws_secret,
      };
      const client = new S3Client({ region: aws_region, credentials });
      const params = { Bucket: bucket, Key: key };
      const command = new GetObjectCommand(params);

      const url = await getSignedUrl(client, command, { expiresIn: 3600 });
      window.open(url);
      return;
    }

    const download_url = `${api_url}/download-file?filename=${filename}&order_id=${order_id}`;
    window.open(download_url);
  };

  const totalCustomerMessages = Thread.filter(
    (msg) => msg.type === "message" && msg.context === "myaccount"
  ).length;

  const canReply = () => {
    let can_reply = true;
    // if order status is cancelled
    if (Order.status === "cancelled") return false;
    const disable_on_complete = get_setting("disable_on_completed");
    can_reply =
      disable_on_complete && Order.status === "completed" ? false : true;
    const enable_revisions = get_setting("enable_revisions");
    if (enable_revisions) {
      can_reply = RevisionLimit > totalCustomerMessages;
    }
    return can_reply;
  };

  const canRevise = () => {
    const enable_revisions = get_setting("enable_revisions");
    return canReply() && enable_revisions;
  };

  return (
    <>
      <NavBar
        TotalCount={
          FilterThread.filter((thread) => thread.type === "message").length
        }
        OrderID={order_id}
        OrderDate={order_date}
        Context={context}
        onCollapsed={() => setshowMore(!showMore)}
        showMore={showMore}
        onSearchThread={handleSearch}
        RevisionLimit={RevisionLimit}
      />
      <MessagesBody
        Thread={FilterThread}
        showMore={showMore}
        onDownload={handleDownload}
      />

      <Divider variant="inset" component="h2" sx={{ height: 10 }} />

      {/* Reply to --- */}
      {canReply() && (
        <ReplyMsg onReplySend={handleReplySend} context={context} />
      )}

      {/* Revision Addons */}
      {canRevise() && (
        <RevisionsAddon
          RevisionsLimit={RevisionLimit}
          totalCustomerMessages={totalCustomerMessages}
        />
      )}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isWorking}
        onClick={() => setIsWorking(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
