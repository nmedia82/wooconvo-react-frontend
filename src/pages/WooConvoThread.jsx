import { useState } from "react";
import {Divider,Chip, Backdrop, CircularProgress,Collapse,IconButton } from "@mui/material";
import NoticeMsg from "../component/NoticeMsg";
import CustomerMsg from "../component/CustomerMsg";
import ReplyMsg from "../component/ReplyMsg";
import { addMessage } from "../services/modalService";
import SearchBar from "../component/SearchBar";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

export default function WooConvoThread({ Thread }) {
  const [isWorking, setIsWorking] = useState(false);
 const [maincollap, setmaincollap] = useState(true);
  
  const handletoggle = () =>{
    setmaincollap(!maincollap);
  };

  const handleReplySend = async (reply_text) => {
    setIsWorking(true);
    const { data: response } = await addMessage(reply_text);
    setIsWorking(false);
    console.log(response);
  };
  return (
    <div className="App">
      <div style={{display:'flex'}}>
          <Chip label="#55 - December 2" color="primary" sx={{mr: 5}} />
          <Chip label={`Total Messages ${Thread.length}`} color="primary" />
          
          {/*search bar  */}
          <SearchBar />

          {/* Collapse Icon */}
          <IconButton
          onClick={handletoggle}
          color="primary"
          sx={{ ml: 47 }}
          aria-label="Unfold/More"
        >
          {maincollap ? <UnfoldMoreIcon />: <UnfoldMoreIcon  />} 
         </IconButton>      
       </div>
      <Collapse in={maincollap} timeout="auto" unmountOnExit>
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

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isWorking}
        onClick={() => setIsWorking(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      </Collapse>
    </div>
  );
}
