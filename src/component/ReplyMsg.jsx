import * as React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { useState } from "react";
import Picker from "emoji-picker-react";
import { common, lime } from "@mui/material/colors";
import Attachments from "./Attachment";
import {
  DeleteOutline,
  Reply,
  SendAndArchiveOutlined,
  SendOutlined,
} from "@mui/icons-material";

export default function ReplyMsg({ onReplySend }) {
  //Emoji
  const [ReplyText, setReplyText] = useState("");
  const [Files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    const fileUploaded = event.target.files;
    const files = [...Files, ...fileUploaded];
    // console.log(files);
    previewFile(files);
    setFiles(files);
  };

  const previewFile = (files) => {
    files.forEach((file, index) => {
      var reader = new FileReader();
      reader.onloadend = function () {
        document.getElementById(`preview-${index}`).src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const hanldeImageRemove = (del_index) => {
    const files = [...Files];
    const filter = files.filter((file, index) => index !== del_index);
    setFiles(filter);
  };
  return (
    <Box>
      <Paper
        className="reply"
        component="form"
        sx={{ p: "2px 4px", display: "flex", bgcolor: common }}
      >
        <Attachments onFileUpload={handleFileUpload} />

        <TextField
          value={ReplyText}
          onChange={(e) => setReplyText(e.target.value)}
          fullWidth
          id="standard-basic"
          variant="standard"
        />

        <Divider sx={{ height: "auto" }} orientation="vertical" />

        <IconButton
          color="primary"
          sx={{ p: 1 }}
          aria-label="Send"
          onClick={() => onReplySend(ReplyText)}
          disabled={ReplyText === ""}
        >
          <SendOutlined />
        </IconButton>
      </Paper>

      {/* Attachments Display*/}

      <Box sx={{ p: 3 }}>
        {Files.map((file, index) => (
          <Card sx={{ maxWidth: 250 }} key={index}>
            {/* <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          /> */}
            <img
              id={`preview-${index}`}
              alt={file.name}
              style={{ objectFit: true, width: 100, textAlign: "center" }}
            />
            <CardContent>
              <Typography gutterBottom variant="p" component="div">
                {file.name}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                color="primary"
                sx={{ p: 1 }}
                aria-label="Send"
                onClick={() => hanldeImageRemove(index)}
              >
                <DeleteOutline />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
