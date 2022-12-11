import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Collapse,
  ListItemButton,
  Divider,
} from "@mui/material";
//import InfoIcon from "@mui/icons-material/Info";
import { blue, green } from "@mui/material/colors";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

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
        </ListItemText>
      </Collapse>
    </div>
  );
}
