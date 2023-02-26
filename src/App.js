import { useState, useEffect } from "react";
import { Box, Backdrop, CircularProgress } from "@mui/material";
import "./App.css";

import pluginData from "./services/pluginData";
import WooConvoThread from "./component/orderthread/OrderThread";
import useLocalStorage from "./services/useLocalStorage";
import { getOrderById } from "./services/modalService";

const { settings, order_id } = pluginData;

function App() {
  const [pluginSettings, setPluginSettings] = useLocalStorage(
    "wooconvo_settings",
    {}
  );
  const [Order, setOrder] = useState(null);
  const [isWorking, setIsWorking] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsWorking(true);
      let { data: order } = await getOrderById(order_id);
      order = order.data;
      console.log(order);
      setOrder(order);
      setIsWorking(false);
    };
    setPluginSettings(settings);
    loadData();
  }, [setPluginSettings]);

  return (
    <Box sx={{ flexGrow: 1 }} className="wooconvo-admin-wrapper">
      {Order && <WooConvoThread Order={Order} />}
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
