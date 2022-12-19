import React from "react";
import { useEffect, useState, useRef } from "react";
import {
  Typography,
  Grid,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Collapse,
  ListItemButton,
  Divider,
  IconButton,
  Tooltip,
  Button,
  Box,
} from "@mui/material";
import { blue, green } from "@mui/material/colors";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

export default function CustomerMsg({ props, message, showMore }) {
  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}`,
    };
  }
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    setOpen(showMore);
  }, [showMore]);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleclick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <Avatar
            sx={{
              bgcolor:
                message.user_type === "customer" ? green[600] : blue[600],
            }}
            {...stringAvatar(message.user_name.toUpperCase())}
          />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <>
              <Typography
                sx={{ display: "inline", fontWeight: "bold" }}
                variant="span"
                color="text.primary"
              >
                {message.user_name}
              </Typography>
              <Typography
                sx={{ display: "inline", ml: 2 }}
                variant="span"
                color="text.primary"
              >
                {message.date}
              </Typography>
            </>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ListItemText sx={{ backgroundColor: "lightgray", p: 2 }}>
          <Typography variant="body1" gutterBottom>
            {message.message}
          </Typography>
          <Tooltip title="Upload File">
            <IconButton
              aria-label=""
              sx={{ mb: 2, backgroundColor: blue[800] }}
            >
              <CloudUploadOutlinedIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
            }}
          >
            <Box className="preview-thumb-upload">
              <img
                src="https://najeebmedia.com/wp-content/uploads/2021/07/cropped-n-media-logo-1-300x300.png"
                className="preview-thumb-img-upload"
                height="50"
                width="100"
                // id={`preview-${file.name}`}
                // alt={file.name}
              />
              <p className="preview-thumb-tool-upload">
                <Typography variant="span" display={"inline"}>
                  {/* {file.name} */}
                  N-Media
                </Typography>
              </p>
            </Box>
            <Box className="preview-thumb-upload">
              <img
                src="https://new.najeebmedia.com/wp-content/uploads/2022/05/1.png"
                className="preview-thumb-img-upload"
                height="50"
                width="100"
                // id={`preview-${file.name}`}
                // alt={file.name}
              />
              <p className="preview-thumb-tool-upload">
                <Typography variant="span" display={"inline"}>
                  {/* {file.name} */}
                  Google Sync
                </Typography>
              </p>
            </Box>
          </Box>
        </ListItemText>
      </Collapse>
    </div>
  );
}
