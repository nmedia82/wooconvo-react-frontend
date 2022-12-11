import { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import NoticeMsg from "../component/NoticeMsg";
import CustomerMsg from "../component/CustomerMsg";
import ReplyMsg from "../component/ReplyMsg";

import { Box } from "@mui/system";
import NavBar from "../component/NavBar";

export default function WooConvoThread({
  Thread,
  onReplySend,
  onSearchThread,
  SearchText,
}) {
  const [showMore, setshowMore] = useState(true);
  const [ThreadLocal, setThreadLocal] = useState([]);

  useEffect(() => {
    setThreadLocal(Thread);
  }, [Thread]);

  const handleSearch = (e) => {
    const str = e.target.value;
    console.log(str);
    var thread = [...ThreadLocal];
    thread = thread.filter((r) => matchSearch(str, r.message));
    setThreadLocal(thread);
  };

  const matchSearch = (text, testwith) => {
    const regex = new RegExp("(?:^|\\s)" + text, "gi");
    // console.log(regex.test(testwith));
    return regex.test(testwith);
  };

  return (
    <Box className="App">
      <NavBar
        TotalCount={0}
        onCollapsed={() => setshowMore(!showMore)}
        showMore={showMore}
        onSearchThread={handleSearch}
      />

      {ThreadLocal.map((msg, index) => (
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

      <Divider variant="inset" component="h2" sx={{ height: 10 }} />

      {/* Reply to --- */}
      <ReplyMsg onReplySend={onReplySend} />
    </Box>
  );
}
