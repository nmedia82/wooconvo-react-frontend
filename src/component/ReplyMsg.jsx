import * as React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Tooltip,
  Chip,
  Button,
} from "@mui/material";
import { useState } from "react";
import { common } from "@mui/material/colors";
import Attachments from "./Attachment";
import { DeleteOutline, SendOutlined } from "@mui/icons-material";
import { display } from "@mui/system";
import { wooconvo_makeid } from "../services/helper";
import { uploadFiles } from "../services/modalService";
import pluginData from "../services/pluginData";
import httpService from "../services/httpService";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

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

  // upload to server
  const handleFileUpload = async () => {
    const files = [...Files];
    files.forEach((file) => uploadFile(file));
  };

  const uploadFile = async (file) => {
    console.log(file);
    const { api_url, user_id, order_id } = pluginData;
    const url = `${api_url}/upload-file`;
    const data = new FormData();
    data.append("file", file);
    data.append("order_id", order_id);
    const response = await fetch(url, { method: "POST", body: data });
    let data2 = await response.json();
    console.log(data2);
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
          onClick={() => onReplySend(ReplyText)}
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
      <Box sx={{ textAlign: "center" }}>
        <Button variant="contained" startIcon={<CloudUploadOutlinedIcon />}>
          Upload File
        </Button>
      </Box>
    </Box>
  );
}
