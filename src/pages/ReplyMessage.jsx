import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from "@mui/material";
import { useState } from "react";
import Picker from "emoji-picker-react";
import { common, lime } from "@mui/material/colors";

export default function ReplyMessage() {
    
    //Emoji
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };
  return (
    <Paper className="reply"
      component="form"
      sx={{ p: '2px 4px', display: 'flex' ,bgcolor:common}}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <EmojiEmotionsIcon onClick={() => setShowPicker((val) => !val)} />
      </IconButton>
      {showPicker && (
          <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
        )}
      <TextField value={inputStr}
          onChange={(e) => setInputStr(e.target.value)} fullWidth id="standard-basic" variant="standard" />
      
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      
      <IconButton color="primary" sx={{ p: '11px'}} aria-label="Send">
        <SendIcon />
      </IconButton>
      
    </Paper>
  );
}