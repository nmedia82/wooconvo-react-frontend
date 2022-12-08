import { useState, useRef } from "react";
import { Box, IconButton, Divider } from "@mui/material";
import { AttachFileOutlined } from "@mui/icons-material";
function Attachments({ onFileUpload }) {
  const hiddenFileInput = useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <Box>
      <input
        multiple
        type="file"
        ref={hiddenFileInput}
        onChange={onFileUpload}
        style={{ display: "none" }}
      />
      <IconButton
        color="secondary"
        sx={{ p: 1 }}
        aria-label="Send"
        onClick={handleClick}
      >
        <AttachFileOutlined />
      </IconButton>
      <Divider sx={{ height: "auto" }} orientation="vertical" />
    </Box>
  );
}

export default Attachments;
