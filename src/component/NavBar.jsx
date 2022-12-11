import { useState } from "react";
import {
  Chip,
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  TextField,
} from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { ArrowBack, UnfoldLess } from "@mui/icons-material";

function NavBar({
  TotalCount,
  onCollapsed,
  showMore,
  onSearchThread,
  OrderID,
  OrderDate,
}) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <ArrowBack />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          <Chip
            label={`#${OrderID} - ${OrderDate}`}
            variant="outlined"
            sx={{ mr: 5 }}
          />
          <Chip label={`Total Messages ${TotalCount}`} variant="outlined" />
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <TextField
            label="Search"
            color="primary"
            size="small"
            variant="outlined"
            id="margin-none"
            onChange={(e) => onSearchThread(e.target.value)}
          />

          <IconButton
            onClick={() => onCollapsed(!showMore)}
            size="small"
            edge="end"
            color="inherit"
            aria-label="open drawer"
            sx={{ ml: 3 }}
          >
            {showMore ? <UnfoldLess /> : <UnfoldMoreIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
