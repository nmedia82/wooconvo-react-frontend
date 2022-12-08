import { useState, useEffect } from "react";
import WooConvoThread from "./pages/WooConvoThread";
import { getOrderDetail } from "./services/modalService";

window.WOOCONVO_Data = {
  api_url: "https://code.najeebmedia.com/wp-json/wooconvo/v1",
  user_id: 1,
  order_id: 33,
};

function App(props) {
  const [Thread, setThread] = useState([]);

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

  return (
    <>
      <WooConvoThread Thread={Thread} />
    </>
  );
}

export default App;
