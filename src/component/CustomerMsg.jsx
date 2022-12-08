import React from "react";
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
import InfoIcon from "@mui/icons-material/Info";
import { blue } from "@mui/material/colors";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function CustomerMsg({ message }) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <Avatar
            alt="Travis Howard"
            sx={{ bgcolor: blue[500] }}
            icon={<InfoIcon />}
          />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                variant="h6"
                color="text.primary"
              >
                {message.user_name}
              </Typography>
              <Typography
                sx={{ display: "inline", ml: 2 }}
                variant="body2"
                color="text.primary"
              >
                {message.date}
              </Typography>
            </React.Fragment>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ListItemButton sx={{ pl: 4 }}>
          <Divider orientation="vertical" flexItem sx={{ mr: 4 }}></Divider>
          <Grid item xs>
            <Typography variant="body1" gutterBottom>
              {message.message}
            </Typography>
          </Grid>
        </ListItemButton>
      </Collapse>
    </div>
  );
}
