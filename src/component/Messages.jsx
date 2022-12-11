import { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import NoticeMsg from "./NoticeMsg";
import CustomerMsg from "./CustomerMsg";

function MessagesBody({ Thread, showMore }) {
  return (
    <>
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
          {msg.type === "message" && (
            <CustomerMsg message={msg} showMore={showMore} />
          )}
        </div>
      ))}
    </>
  );
}

export default MessagesBody;
