import { useState, useEffect } from "react";
import { Backdrop, CircularProgress, Divider } from "@mui/material";
import ReplyMsg from "./ReplyMsg";
import MessagesBody from "./Messages";
import "./thread.css";
import NavBar from "./NavBar";
import { addMessage, resetUnread } from "../../services/modalService";
import pluginData from "../../services/pluginData";
// import { resetUnread } from "../../common/modalService";
const { api_url, context } = pluginData;

export default function WooConvoThread({ Order }) {
  const [Thread, setThread] = useState([]);

  useEffect(() => {
    const thread = [...Order.thread];
    setFilterThread(thread);
    setThread(thread);

    const markOrderAsRead = async () => {
      const unread_count =
        context === "myaccount" ? Order.unread_customer : Order.unread_vendor;
      if (unread_count > 0) {
        await resetUnread(Order.order_id);
      }
    };

    markOrderAsRead();
  }, [Order]);
  const [showMore, setshowMore] = useState(true);
  const [isWorking, setIsWorking] = useState(false);
  const [FilterThread, setFilterThread] = useState([]);

  const { order_id, order_date } = Order;

  const handleReplySend = async (reply_text, files = []) => {
    setIsWorking(true);
    const attachments = await handleFileUpload(files);
    // console.log(attachments);
    const { data: response } = await addMessage(
      order_id,
      reply_text,
      attachments
    );
    const { success, data: order } = response;
    const { thread } = order;
    // console.log(thread);
    setIsWorking(false);
    if (success) {
      setThread(thread);
      setFilterThread(thread);
    }
  };

  // upload to server
  const handleFileUpload = (files) => {
    var promises = [];
    files.forEach(async (file) => {
      const p = new Promise(async (resolve, reject) => {
        const resp = await uploadFile(file);
        const { data: attachment } = await resp.json();
        resolve(attachment);
      });
      promises.push(p);
    });
    return Promise.all(promises);
  };

  const uploadFile = (file) => {
    // console.log(file);
    const url = `${api_url}/upload-file`;
    const data = new FormData();
    data.append("file", file);
    data.append("order_id", order_id);
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

  const handleDownload = (filename) => {
    const download_url = `${api_url}/download-file?filename=${filename}&order_id=${order_id}`;
    // window.location = download_url;
    window.open(download_url);
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
      />
      <MessagesBody
        Thread={FilterThread}
        showMore={showMore}
        onDownload={handleDownload}
      />

      <Divider variant="inset" component="h2" sx={{ height: 10 }} />

      {/* Reply to --- */}
      <ReplyMsg onReplySend={handleReplySend} />
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
