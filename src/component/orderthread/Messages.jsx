import { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import NoticeMsg from "./NoticeMsg";
import CustomerMsg from "./CustomerMsg";
import { get_setting } from "../../services/helper";

function MessagesBody({ Thread, showMore, onDownload }) {
  const order_reverse = get_setting("reverse_message_display_order");
  var thread = [...Thread];

  // hot fix, if user data is not present remove those messages
  thread = thread.filter((t) => t.user_id);
  console.log(thread);
  if (order_reverse) {
    thread.reverse();
  }
  return (
    <div>
      {thread.map((msg, index) => (
        <div key={index}>
          {/* Notice Message */}
          {(msg.type === "order_note" ||
            msg.type === "order_status_change" ||
            msg.type === "order_created") &&
            get_setting("enable_order_notices") && (
              <>
                <NoticeMsg message={msg} />
                <Divider variant="inset" component="h2" />
              </>
            )}

          {/* Customer Message */}
          {msg.type === "message" && (
            <CustomerMsg
              message={msg}
              showMore={showMore}
              onDownload={onDownload}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default MessagesBody;
