import * as React from "react";

import { Chip } from "@mui/material";
import Grid from "@mui/material/Grid";
import InfoIcon from "@mui/icons-material/Info";
import Divider from "@mui/material/Divider";

import Notice_Item from "../component/Notice_Item";
import Customer_Item from "../component/Customer_Item";
import ReplyMessage from '../pages/ReplyMessage';

export default function NoticeMessage() {
  
  return (
    <div className="App">
      <Chip label="December 2" color="primary" />
        
        {/* Notice Message */}
        <Notice_Item />
       
        <Divider variant="inset" component="h2" />
        
        {/* Customer Message */}
        <Customer_Item />
        
        <Divider variant="inset" component="h2"  sx={{height: 10}} />
        
        {/* Reply to --- */}
        <ReplyMessage />
    </div>
  );
}
