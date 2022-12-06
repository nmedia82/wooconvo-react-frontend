import React from 'react'
import { ListItem, Typography, Grid, ListItemAvatar,ListItemText, Avatar, List} from "@mui/material";
import { pink } from "@mui/material/colors";
import InfoIcon from "@mui/icons-material/Info";

export default function Notice() {
  return (
    <div> 
        <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader">
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
      </List>
    </div>
  )
}
