import { useState, useEffect } from "react";
import WooConvoThread from "./pages/WooConvoThread";
import { getOrderDetail } from "./services/modalService";
import { addMessage } from "./services/modalService";
import { Box } from "@mui/system";
import NavBar from "./component/NavBar";
import pluginData from "./services/pluginData";

import { Backdrop, CircularProgress } from "@mui/material";
function App() {
  const [Thread, setThread] = useState([]);
  const [FilterThread, setFilterThread] = useState([]);
  const [showMore, setshowMore] = useState(true);
  const [isWorking, setIsWorking] = useState(false);

  const { api_url, order_date, order_id, context } = pluginData;

  useEffect(() => {
    const loadThread = async () => {
      const { data: order } = await getOrderDetail(order_id);
      const threads = [...order.data.thread];
      // console.log(order);
      setIsWorking(false);
      setThread(threads);
      setFilterThread(threads);
    };

    setIsWorking(true);
    loadThread();
  }, [order_id]);

  const handleReplySend = async (reply_text, files = []) => {
    setIsWorking(true);
    const attachments = await handleFileUpload(files);
    console.log(attachments);
    const { data: response } = await addMessage(reply_text, attachments);
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
    // return response.json(); // console.log(attachment);

    // console.log(attachments);
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

  return (
    <Box id="wooconvo-front-wrapper">
      <NavBar
        TotalCount={FilterThread.length}
        OrderID={order_id}
        OrderDate={order_date}
        Context={context}
        onCollapsed={() => setshowMore(!showMore)}
        showMore={showMore}
        onSearchThread={handleSearch}
      />
      <WooConvoThread
        Thread={FilterThread}
        onReplySend={handleReplySend}
        showMore={showMore}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isWorking}
        onClick={() => setIsWorking(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default App;
