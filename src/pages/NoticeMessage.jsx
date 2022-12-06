import * as React from "react";
//import Button from '@mui/material/Button';
//import { styled } from '@mui/material/styles';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Chip, Typography, Collapse, ListItemButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import InfoIcon from "@mui/icons-material/Info";
import Divider from "@mui/material/Divider";
import { pink, green, blue } from "@mui/material/colors";

export default function NoticeMessage() {
  return (
    <div className="App">
      <Chip label="December 2" color="primary" />
      <List sx={{ width: "100%", bgcolor: "background.paper", pt: 0, pb: 0 }}>
        <ListItem alignItems="flex-start">
          <Grid>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: pink[500] }}>
                <InfoIcon />
              </Avatar>
            </ListItemAvatar>
            {/* <Divider orientation="vertical" flexItem sx={{ ml:-2, mt:-1  }}>|</Divider> */}
          </Grid>
          <ListItemText
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  variant="h6"
                  color="text.primary"
                >
                  Najeeb Ahmad
                </Typography>
                <Typography
                  sx={{ display: "inline", ml: 2 }}
                  variant="body2"
                  color="text.primary"
                >
                  Monday, 7 March 2022.
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="h2" />
        <ListItem alignItems="flex-start">
          <Grid>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: pink[500] }}>
                <InfoIcon />
              </Avatar>
            </ListItemAvatar>
            {/* <Divider orientation="vertical" flexItem sx={{ ml:-2, mt:-1  }}>|</Divider> */}
          </Grid>
          <Collapse timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ mr: 4 }}
                ></Divider>
                <Grid item xs>
                  <Typography variant="body1" gutterBottom>
                    To write 160 characters or not to write 160 characters? That
                    is the question. My advice? Given that a tweaked for SEO
                    meta description does not help your site rank higher in the
                    SERPs, feel free to use 160 characters for your meta
                    descriptions, but don’t obsess over it. For example, if your
                    description is 161 characters, don’t waste time trimming it.
                    Instead, focus on these tips: Stick to your brand voice and
                    tone, but also keep it conversational. Include your primary
                    keyword if you can do so naturally, to tick the minimum of
                    requirements for an SEO meta description. Make sure you
                    convey value to the reader. Include a call-to-action, i.e.
                    “Learn more here.” Write in active voice. Make sure your
                    descriptions match your content – don’t trick the user into
                    clicking your link. Keep in mind that meta descriptions
                    might be truncated when displayed in search, so use the
                    first 120 character to communicate your most important
                    message. Ensure every page on your site has a unique meta
                    description – don’t use the same description on several
                    pages. Once you have your text figured out, you can set the
                    meta description in WordPress by following this guide.
                  </Typography>
                </Grid>
              </ListItemButton>
            </List>
          </Collapse>
        </ListItem>
      </List>
    </div>
  );
}
