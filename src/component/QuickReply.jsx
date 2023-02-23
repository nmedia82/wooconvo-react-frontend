import * as React from "react";
import {
  ListItemAvatar,
  Avatar,
  ListItemIcon,
  Tooltip,
  Dialog,
  ListItemText,
  ListItem,
  List,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material/";

import CloseIcon from "@mui/icons-material/Close";
import QuickreplyIcon from "@mui/icons-material/Quickreply";
import SendIcon from "@mui/icons-material/Send";
import { get_setting } from "../services/helper";

const quick_replies = get_setting("quick_replies") || [];

export default function QuickReplyPopup({ onQuickReplySend }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleQuickReply = (text) => {
    setOpen(false);
    onQuickReplySend(text);
  };

  return (
    <div>
      <Tooltip title="Quick Reply">
        <IconButton color="primary" sx={{ p: 1 }} onClick={handleClickOpen}>
          <QuickreplyIcon />
        </IconButton>
      </Tooltip>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <AppBar color="secondary" sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Quick Reply's
            </Typography>
          </Toolbar>
        </AppBar>
        <List sx={{ width: "100%", bgcolor: "background.paper", mt: "20px" }}>
          {quick_replies.map((reply, index) => (
            <ListItem key={index}>
              <ListItemText primary={reply} />
              <ListItemIcon>
                <Tooltip title="Send Message" arrow placement="top-start">
                  <IconButton
                    sx={{ color: "#1976d2" }}
                    onClick={() => handleQuickReply(reply)}
                  >
                    <SendIcon />
                  </IconButton>
                </Tooltip>
              </ListItemIcon>
            </ListItem>
          ))}

          <Divider />
        </List>
      </Dialog>
    </div>
  );
}
