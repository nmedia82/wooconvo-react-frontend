import { useState } from "react";

import { Chip } from "@mui/material";
import Grid from "@mui/material/Grid";
import InfoIcon from "@mui/icons-material/Info";
import Divider from "@mui/material/Divider";

import NoticeMsg from "../component/NoticeMsg";
import CustomerMsg from "../component/CustomerMsg";
import ReplyMsg from "../component/ReplyMsg";
import { addMessage } from "../services/modalService";

export default function WooConvoThread({ Thread }) {
  const handleReplySend = async (reply_text) => {
    const { data: response } = await addMessage(reply_text);
    console.log(response);
  };
  return (
    <div className="App">
      <Chip label="December 2" color="primary" />

      {Thread.map((msg, index) => (
        <div key={index}>
          {/* Notice Message */}
          {(msg.type === "order_note" || msg.type === "order_change") && (
            <>
              <NoticeMsg message={msg} />
              <Divider variant="inset" component="h2" />
            </>
          )}

          {/* Customer Message */}
          {msg.type === "message" && <CustomerMsg message={msg} />}
        </div>
      ))}

      <Divider variant="inset" component="h2" sx={{ height: 10 }} />

      {/* Reply to --- */}
      <ReplyMsg onReplySend={handleReplySend} />
    </div>
  );
}
