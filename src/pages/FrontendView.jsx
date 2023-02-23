import { useState } from "react";
// import UnreadOrders from "../components/UnreadOrders";
// import AllOrders from "../components/AllOrders";
// import StarredOrders from "../components/StarredOrders";
import { Box, Tabs, Tab, AppBar, Toolbar, Badge } from "@mui/material";
import { get_setting } from "../services/helper";
import {
  InboxOutlined,
  MarkEmailUnreadOutlined,
  StarRateOutlined,
} from "@mui/icons-material";
import pluginData from "../services/pluginData";

const { context } = pluginData;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function FrontendView({ Orders, onStarred }) {
  const [TabData, setTabData] = useState(0);

  const handleTabChange = (e, newTabData) => {
    setTabData(newTabData);
  };

  const TotalOrders = Orders.length;
  // total undread
  var TotalUnread = 0;
  if (context === "myaccount") {
    TotalUnread = Orders.reduce(
      (accum, item) => accum + item.unread_customer,
      0
    );
  } else {
    TotalUnread = Orders.reduce((accum, item) => accum + item.unread_vendor, 0);
  }
  // total starrted
  const TotalStarred = Orders.reduce(
    (accum, item) => accum + item.is_starred,
    0
  );
  return (
    <Box sx={{ bgcolor: "background.paper", height: "auto", width: "100%" }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: get_setting("bg_color_top_header") }}
      >
        <Toolbar>
          <Tabs
            variant="standard"
            value={TabData}
            onChange={handleTabChange}
            aria-label="basic tabs"
            indicatorColor={{ color: get_setting("bg_color_top_header") }}
            textColor="inherit"
          >
            <Tab
              label="All"
              {...a11yProps(0)}
              icon={
                <Badge badgeContent={TotalOrders} color="secondary">
                  <InboxOutlined />
                </Badge>
              }
              iconPosition="start"
            />

            <Tab
              label="Unread"
              {...a11yProps(1)}
              icon={
                <Badge badgeContent={TotalUnread} color="secondary">
                  <MarkEmailUnreadOutlined />
                </Badge>
              }
              iconPosition="start"
            />
            <Tab
              label="Starred"
              {...a11yProps(2)}
              icon={
                <Badge badgeContent={TotalStarred} color="secondary">
                  <StarRateOutlined />
                </Badge>
              }
              iconPosition="start"
            />
          </Tabs>
        </Toolbar>
      </AppBar>

      <TabPanel value={TabData} index={0}>
        {/* <AllOrders Orders={Orders} onStarred={onStarred} /> */}
      </TabPanel>
      <TabPanel value={TabData} index={1}>
        {/* <UnreadOrders Orders={Orders} onStarred={onStarred} /> */}
      </TabPanel>
      <TabPanel value={TabData} index={2}>
        {/* <StarredOrders Orders={Orders} onStarred={onStarred} /> */}
      </TabPanel>
    </Box>
  );
}

export default FrontendView;
