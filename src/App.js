import { useState, useEffect } from "react";
import WooConvoThread from "./pages/WooConvoThread";
import { getOrderDetail } from "./services/modalService";
import { addMessage } from "./services/modalService";
import { Backdrop, CircularProgress } from "@mui/material";

window.WOOCONVO_Data = {
  api_url: "https://code.najeebmedia.com/wp-json/wooconvo/v1",
  user_id: 1,
  order_id: 33,
};

function App(props) {
  const [Thread, setThread] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [SearchText, setSearchText] = useState("");
  useEffect(() => {
    const loadThread = async () => {
      const { data: order } = await getOrderDetail(
        window.WOOCONVO_Data.order_id
      );
      console.log(order);
      setThread(order.data.thread);
    };

    loadThread();
  }, []);

  const handleReplySend = async (reply_text) => {
    setIsWorking(true);
    const { data: response } = await addMessage(reply_text);
    const { success, data: thread } = response;
    setIsWorking(false);
    if (success) setThread(thread);
    console.log(response);
  };

  return (
    <>
      <WooConvoThread
        Thread={Thread}
        onReplySend={handleReplySend}
        SearchText={SearchText}
      />
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

export default App;
