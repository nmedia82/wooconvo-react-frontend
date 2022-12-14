import * as React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { common } from "@mui/material/colors";
import Attachments from "./Attachment";
import { DeleteOutline, SendOutlined } from "@mui/icons-material";

import { wooconvo_makeid } from "../services/helper";

export default function ReplyMsg({ onReplySend }) {
  //Emoji
  const [ReplyText, setReplyText] = useState("");
  const [Files, setFiles] = useState([]);

  const handleFileSelected = (event) => {
    let fileUploaded = event.target.files;
    fileUploaded = Object.keys(fileUploaded).map((f) => {
      fileUploaded[f].id = wooconvo_makeid();
      return fileUploaded[f];
    });
    const files = [...Files, ...fileUploaded];
    previewFile(files);
    setFiles(files);
  };

  const previewFile = (files) => {
    files.forEach((file) => {
      var reader = new FileReader();
      reader.onloadend = function () {
        document.getElementById(`preview-${file.name}`).src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const hanldeImageRemove = (file_id) => {
    const files = [...Files];
    const filter = files.filter((file) => file.name !== file_id);
    setFiles(filter);
  };

  return (
    <Box>
      <Paper
        className="reply"
        component="form"
        sx={{ p: "2px 4px", display: "flex", bgcolor: common }}
      >
        <Attachments onFileSelected={handleFileSelected} />

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
          onClick={() => onReplySend(ReplyText, Files)}
          disabled={ReplyText === ""}
        >
          <SendOutlined />
        </IconButton>
      </Paper>

      {/* Attachments Display*/}

      <Box
        sx={{ p: 3, flexDirection: "row", display: "flex", flexWrap: "wrap" }}
      >
        {Files.map((file) => (
          <Box className="preview-thumb" key={file.name}>
            <img
              className="preview-thumb-img"
              height="100"
              width="150"
              id={`preview-${file.name}`}
              alt={file.name}
            />
            <p className="preview-thumb-tool">
              <IconButton
                color="primary"
                sx={{ p: 1 }}
                aria-label="Send"
                onClick={() => hanldeImageRemove(file.name)}
              >
                <DeleteOutline />
              </IconButton>
              <Typography variant="span" display={"block"}>
                {file.name}
              </Typography>
            </p>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
