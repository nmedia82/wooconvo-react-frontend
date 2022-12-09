import React from "react";
import {
  ListItem,
  Typography,
  Grid,
  ListItemAvatar,
  ListItemText,
  Avatar,
  List,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import InfoIcon from "@mui/icons-material/Info";

export default function NoticeMsg({ message }) {
  return (
    <div>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
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
                  variant="body1"
                  color="text.primary"
                >
                  {message.message}
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
        </ListItem>
      </List>
    </div>
  );
}
