import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import { TextField,Tooltip } from "@mui/material";
import { useState } from "react";
import Picker from "emoji-picker-react";
import {blue} from "@mui/material/colors";

export default function ReplyMessage() {
    
    //Emoji
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [files, setFiles] = useState([]);

  const onEmojiClick = (event, emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };
  return (
    <Paper className="reply"
      component="form"
      sx={{ p: '2px 4px', display: 'flex'}}
    >  

        {/*File Upload */}

      <input accept="image/*" id="icon-button-file"
        type="file" style={{ display: 'none' }} value={files}
        onChange={setFiles} />
      
      <Tooltip title="Attach File">
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture"
        component="span">
          <AttachFileIcon />
        </IconButton>
      </label>      
      </Tooltip>
      
      {/* Select Emoji */}
      <Tooltip title="Select Emoji">
      <IconButton aria-label="menu">
        <EmojiEmotionsIcon onClick={() => setShowPicker((val) => !val)} sx={{color:blue[800]}} />
      </IconButton>
      </Tooltip>

      {showPicker && (
          <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
        )}
      <TextField type="text" value={inputStr}
          onChange={(e) => setInputStr(e.target.value)} fullWidth id="standard-basic" variant="standard" />
      
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      
      <IconButton color="primary" sx={{ p: '11px'}} aria-label="Send">
        <SendIcon />
      </IconButton>
      
    </Paper>
  );
}