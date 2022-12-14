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
import { DownloadOutlined } from "@mui/icons-material";

export default function CustomerMsg({ message, showMore }) {
  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}`,
    };
  }
  const [open, setOpen] = useState(false);
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

          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
            }}
          >
            {message.attachments &&
              message.attachments.map((att) => (
                <Box className="preview-thumb-upload">
                  <img
                    src={att.thumbnail}
                    className="preview-thumb-img-upload"
                    height="50"
                    width="100"
                    alt={att.filename}
                  />
                  <p className="preview-thumb-tool-upload">
                    <IconButton>
                      <DownloadOutlined />
                    </IconButton>
                  </p>
                </Box>
              ))}
          </Box>
        </ListItemText>
      </Collapse>
    </div>
  );
}
