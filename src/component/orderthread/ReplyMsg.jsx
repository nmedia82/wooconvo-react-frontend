import * as React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { common } from "@mui/material/colors";
import Attachments from "./Attachments";
import { DeleteOutline, SendOutlined } from "@mui/icons-material";
import QuickReplyPopup from "./QuickReply";
import { get_setting, wooconvo_makeid } from "../../services/helper";
import AudioAttachment from "./AudioAttachment";

export default function ReplyMsg({ onReplySend, context }) {
  const [ReplyText, setReplyText] = useState("");
  const [Files, setFiles] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState(null);

  const validateSelectedFiles = (files_selected) => {
    let msg = "";
    const max_files_allowed = Number(get_setting("max_files_allowed", 1));
    const max_file_size = Number(get_setting("max_file_size", 100));
    let file_types_allowed = get_setting("file_types_allowed", "jpg,png,pdf");
    file_types_allowed = file_types_allowed.split(",");

    const wrong_found = Object.keys(files_selected).find(
      (f) =>
        !file_types_allowed.includes(files_selected[f].name.split(".").pop())
    );
    if (wrong_found) msg += `Filetypes allowed ${file_types_allowed.join(",")}`;

    if (files_selected.length + Files.length > max_files_allowed)
      msg += `\nMax files limit is ${max_files_allowed}`;

    const found = Object.keys(files_selected).find(
      (f) => files_selected[f].size > max_file_size * 1024
    );
    if (found) msg += `\nMax filesize limit is ${max_file_size}KB`;

    if (msg) alert(msg);
    return msg === "";
  };

  const handleFileSelected = (event) => {
    let fileUploaded = event.target.files;

    if (!validateSelectedFiles(fileUploaded)) return;

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

  const handleAudioSelected = (file) => {
    setSelectedAudio(file);
  };

  const removeAudioAttachment = () => {
    setSelectedAudio(null);
  };

  const handleReplySend = () => {
    onReplySend(ReplyText, Files, selectedAudio);
    setReplyText("");
    setFiles([]);
    setSelectedAudio(null);
  };

  const validateAttachments = () => {
    const attachment_enabled = get_setting("enable_file_attachments");
    if (!attachment_enabled) return false;
    const attach_required = get_setting("attachments_required");
    if (attach_required && !Files.length) return true;
    return false;
  };

  const getThumbSize = () => {
    const thum_size = get_setting("thumb_size", 150);
    return thum_size;
  };

  return (
    <Box>
      <Paper
        className="reply"
        component="div"
        sx={{ p: "2px 4px", display: "flex", bgcolor: common }}
      >
        {get_setting("enable_audio_recording") && (
          <AudioAttachment onAudioSelected={handleAudioSelected} />
        )}

        {get_setting("enable_file_attachments") && (
          <Attachments onFileSelected={handleFileSelected} />
        )}

        <TextField
          value={ReplyText}
          onChange={(e) => setReplyText(e.target.value)}
          fullWidth
          id="standard-basic"
          variant="standard"
          multiline={get_setting("show_textarea_reply", false)}
          rows={4}
        />

        <Divider sx={{ height: "auto" }} orientation="vertical" />

        <IconButton
          sx={{ p: 1, color: get_setting("icon_color_send_button") }}
          aria-label="Send"
          onClick={handleReplySend}
          disabled={ReplyText === "" || validateAttachments()}
        >
          <SendOutlined />
        </IconButton>
      </Paper>

      {/* Attachments Display */}
      <Box sx={{ p: 3, display: "flex", flexWrap: "wrap", gap: 2 }}>
        {validateAttachments() && (
          <Typography color="red" textAlign="center">
            Attachments are required
          </Typography>
        )}

        {Files.map((file) => (
          <Box className="preview-thumb" key={file.name}>
            <img
              className="preview-thumb-img"
              height={getThumbSize()}
              width={getThumbSize()}
              id={`preview-${file.name}`}
              alt={file.name}
            />
            <p className="preview-thumb-tool">
              <IconButton
                color="primary"
                sx={{ p: 1 }}
                onClick={() => hanldeImageRemove(file.name)}
              >
                <DeleteOutline />
              </IconButton>
              <Typography variant="body2">{file.name}</Typography>
            </p>
          </Box>
        ))}

        {selectedAudio && (
          <Box
            className="audio-preview"
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <audio controls src={URL.createObjectURL(selectedAudio)} />
            <IconButton color="error" onClick={removeAudioAttachment}>
              <DeleteOutline />
            </IconButton>
            <Typography variant="body2">{selectedAudio.name}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
