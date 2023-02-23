import { useState, useEffect } from "react";
import { Box, Backdrop, CircularProgress } from "@mui/material";
import "./App.css";
import {
  getAdminMeta,
  getOrders,
  getSettings,
  saveSettings,
  setStarred,
  setUnStarred,
} from "./services/modalService";

import pluginData from "./services/pluginData";
import FrontendView from "./pages/FrontendView";

const { context, settings } = pluginData;

function App() {
  const [Orders, setOrders] = useState([]);
  const [Meta, setMeta] = useState([]);
  //  const [pluginSettings, setPluginSettings] = useLocalStorage(
  //    "wooconvo_settings",
  //    {}
  //  );
  const [isWorking, setIsWorking] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [MenuChecked, setMenuChecked] = useState(null);

  const IsAdminView = context === "wp_admin" ? true : false;
  // console.log(context, IsAdminView);

  useEffect(() => {
    const loadData = async () => {
      setIsWorking(true);
      var { data: meta } = await getAdminMeta();
      const { success, data } = meta;
      if (!success) return alert("Error while loading admin settings");
      setMeta(JSON.parse(data));

      let { data: orders } = await getOrders();
      orders = orders.data;
      setOrders(orders);
      setMenuChecked("orders");

      // plugin settings
      // const { data: settings } = await getSettings();
      // setPluginSettings(settings.data);
      // console.log(JSON.parse(data));

      // setPluginSettings(settings);
      setIsWorking(false);
    };
    loadData();
  },);

  const handleStarred = async (order_id, is_starred) => {
    setIsWorking(true);
    var { data: order } = is_starred
      ? await setUnStarred(order_id)
      : await setStarred(order_id);
    const orders = [...Orders];
    const found = orders.find((order) => order.order_id === order_id);
    const index = orders.indexOf(found);
    orders[index] = order.data;
    setOrders(orders);
    setIsWorking(false);
  };

  const handleMenuChange = (menu) => {
    setShowAlert(false);
    setMenuChecked(menu);
  };

  const handleSettingSave = async (settings) => {
    setIsWorking(true);
    setShowAlert(false);
    const { data: resp } = await saveSettings(settings);
    // setPluginSettings(resp.data);
    setShowAlert(true);
    setIsWorking(false);
  };
  return (
    <div className="wooconvo-admin-wrapper">
      {/* <Admin Meta={Meta} /> */}
      {/* <Admin_react /> */}

      <Box sx={{ flexGrow: 1 }} className="wooconvo-admin-wrapper">
         {!IsAdminView && (
          <FrontendView Orders={Orders} onStarred={handleStarred} />
        )} 
         {/* {IsAdminView && (
          <AdminView
            Meta={Meta}
            Orders={Orders}
            showAlert={showAlert}
            MenuChecked={MenuChecked}
            onCloseAlert={() => setShowAlert(false)}
            onSettingSave={handleSettingSave}
            onStarred={handleStarred}
            onMenuChange={handleMenuChange}
            pluginSettings={pluginSettings}
          />
        )}  */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isWorking}
          onClick={() => setIsWorking(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </div>
  );
}

export default App;
