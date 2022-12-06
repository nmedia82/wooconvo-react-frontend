import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InfoIcon from "@mui/icons-material/Info";
import { pink, green, blue } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Divider, Typography, Grid } from "@mui/material";

export default function CustomerMessage() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="customer">
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemAvatar>
            <Avatar
              alt="Travis Howard"
              sx={{ bgcolor: blue[500] }}
              icon={<AccountCircleIcon />}
            />
          </ListItemAvatar>
          <ListItemText
            secondary={
              <React.Fragment>
                <span>
                  <Typography
                    sx={{ display: "inline" }}
                    variant="h6"
                    color="text.primary"
                  >
                    Buttercup Raiko
                  </Typography>
                  <Typography
                    sx={{ display: "inline", ml: 2 }}
                    variant="body2"
                    color="text.primary"
                  >
                    Monday, 7 March 2022.
                  </Typography>
                </span>
              </React.Fragment>
            }
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <Divider orientation="vertical" flexItem sx={{ mr: 4 }}></Divider>
              <Grid item xs>
                <Typography variant="body1" gutterBottom>
                  To write 160 characters or not to write 160 characters? That
                  is the question. My advice? Given that a tweaked for SEO meta
                  description does not help your site rank higher in the SERPs,
                  feel free to use 160 characters for your meta descriptions,
                  but don’t obsess over it. For example, if your description is
                  161 characters, don’t waste time trimming it. Instead, focus
                  on these tips: Stick to your brand voice and tone, but also
                  keep it conversational. Include your primary keyword if you
                  can do so naturally, to tick the minimum of requirements for
                  an SEO meta description. Make sure you convey value to the
                  reader. Include a call-to-action, i.e. “Learn more here.”
                  Write in active voice. Make sure your descriptions match your
                  content – don’t trick the user into clicking your link. Keep
                  in mind that meta descriptions might be truncated when
                  displayed in search, so use the first 120 character to
                  communicate your most important message. Ensure every page on
                  your site has a unique meta description – don’t use the same
                  description on several pages. Once you have your text figured
                  out, you can set the meta description in WordPress by
                  following this guide.
                </Typography>
              </Grid>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );
}
