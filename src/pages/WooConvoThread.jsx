import { Divider } from "@mui/material";
import ReplyMsg from "../component/ReplyMsg";
import MessagesBody from "../component/Messages";

export default function WooConvoThread({ Thread, showMore, onReplySend }) {
  return (
    <>
      {console.log("rending")}

      <MessagesBody Thread={Thread} showMore={showMore} />

      <Divider variant="inset" component="h2" sx={{ height: 10 }} />

      {/* Reply to --- */}
      <ReplyMsg onReplySend={onReplySend} />
    </>
  );
}
