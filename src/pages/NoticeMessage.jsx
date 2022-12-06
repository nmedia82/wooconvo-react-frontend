import * as React from "react";
//import Button from '@mui/material/Button';
//import { styled } from '@mui/material/styles';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Chip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import InfoIcon from '@mui/icons-material/Info';
import Divider from "@mui/material/Divider";
import { pink, green, blue } from "@mui/material/colors";

export default function NoticeMessage() {
   
  return (
    <div className="App">
    <Chip label="December 2" color="primary" />
  <List sx={{ width: '100%', bgcolor: 'background.paper' ,pt:0, pb:0 }}> 

    <ListItem alignItems="flex-start">

    <Grid>
      <ListItemAvatar>
         <Avatar sx={{bgcolor: pink[500]}}>
            <InfoIcon />
          </Avatar>
      </ListItemAvatar>
      {/* <Divider orientation="vertical" flexItem sx={{ ml:-2, mt:-1  }}>|</Divider> */}
       </Grid>    
        <ListItemText
        secondary={
          <React.Fragment>
            <span>
            <Typography
              sx={{ display: 'inline'}}
              variant="h6"
              color="text.primary">
              Najeeb Ahmad
            </Typography>
            <Typography
              sx={{ display: 'inline' , ml:2}}
              variant="body2"
              color="text.primary">
              Monday, 7 March 2022.
            </Typography>
             </span>
          </React.Fragment>
        }
      />
    </ListItem>
    <Divider variant="inset" component="h2" />
    
    
    
  </List>
  <List sx={{ width: '100%', bgcolor: 'background.paper' ,pt:0, pb:0}}> 

    <ListItem alignItems="flex-start">

    <Grid>
      <ListItemAvatar>
      
         <Avatar sx={{bgcolor: pink[500]}}>
            <InfoIcon />
          </Avatar>
      </ListItemAvatar>
      <Divider  orientation="vertical" sx={{bgcolor: pink[500]}} />
      
      </Grid>
      
        <ListItemText
        secondary={
          <React.Fragment>
            <span>
            <Typography
              sx={{ display: 'inline'}}
              variant="h6"
              color="text.primary">
              Ali Connors
            </Typography>
            <Typography
              sx={{ display: 'inline' , ml:2}}
              variant="body2"
              color="text.primary">
              Friday, 2 Decemeber 2022
            </Typography>
             </span>
          </React.Fragment>
        }
      />
    </ListItem>
    <Divider variant="inset" component="h2" /> 
  </List>
  <List sx={{ width: '100%', bgcolor: 'background.paper'}}> 

    <ListItem alignItems="flex-start">

    <Grid>
              <ListItemAvatar>
                <Avatar sx={{bgcolor: pink[500]}}>
                    <InfoIcon />
                  </Avatar>
              </ListItemAvatar>
            <Divider  orientation="vertical" sx={{bgcolor: pink[500]}} />
      </Grid>
        <ListItemText
        secondary={
          <React.Fragment>
            <span>
            <Typography
              sx={{ display: 'inline'}}
              variant="h6"
              color="text.primary">
              Basil Ahmad
            </Typography>
            <Typography
              sx={{ display: 'inline' , ml:2}}
              variant="body2"
              color="text.primary">
              Friday, 12 October 2022.
            </Typography>
             </span>
          </React.Fragment>
        }
      />
    </ListItem>
    <Divider variant="inset" component="h2" />
  </List>
  </div>        
  )
}
