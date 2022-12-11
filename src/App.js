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

  const { order_date, order_id } = pluginData;

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
  }, []);

  const handleReplySend = async (reply_text) => {
    setIsWorking(true);
    const { data: response } = await addMessage(reply_text);
    const { success, data: thread } = response;
    setIsWorking(false);
    if (success) {
      setThread(thread);
      setFilterThread(thread);
    }
    console.log(response);
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
    <Box className="App">
      <NavBar
        TotalCount={FilterThread.length}
        OrderID={order_id}
        OrderDate={order_date}
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