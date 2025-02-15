import { useEffect, useState } from "react";
import {
  Typography,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Collapse,
  ListItemButton,
  Box,
} from "@mui/material";
import { green } from "@mui/material/colors";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { get_setting, nl2br, orderconvo_date } from "../../services/helper";

export default function CustomerMsg({ message, showMore }) {
  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}`,
    };
  }

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(showMore);
  }, [showMore]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <Avatar
            sx={{
              bgcolor: green[600],
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
                {orderconvo_date(message.date)}
              </Typography>
            </>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <ListItemText
          sx={{ backgroundColor: get_setting("bg_color_order_messages"), p: 2 }}
        >
          <Typography variant="body1" gutterBottom>
            <div dangerouslySetInnerHTML={{ __html: nl2br(message.message) }} />
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {message.attachments &&
              message.attachments.map((att, index) => (
                <Box key={index}>
                  {/* Render image preview if the attachment is an image */}
                  {!att.is_audio && (
                    <img
                      src={att.thumbnail}
                      className="preview-thumb-img-upload"
                      height="50"
                      width="100"
                      alt={att.filename}
                    />
                  )}

                  {/* Render audio player if the attachment is an audio file */}
                  {att.is_audio && (
                    <Box>
                      <audio controls src={att.url} style={{ width: "100%" }}>
                        Your browser does not support the audio element.
                      </audio>
                    </Box>
                  )}
                </Box>
              ))}
          </Box>
        </ListItemText>
      </Collapse>
    </div>
  );
}
