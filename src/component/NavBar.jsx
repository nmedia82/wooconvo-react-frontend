import { useState } from "react";
import { alpha, styled } from "@mui/material/styles";

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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import "../style.css";
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
  },
});

function NavBar({
  TotalCount,
  onCollapsed,
  showMore,
  onSearchThread,
  OrderID,
  OrderDate,
  Context,
}) {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            {Context === "vendor_view" && (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                >
                  <ArrowBack />
                </IconButton>
                <Chip
                  label={`#${OrderID} - ${OrderDate}`}
                  variant="outlined"
                  sx={{ mr: 5, color: "#fff" }}
                />
              </>
            )}
            <Chip
              label={`Total Messages ${TotalCount}`}
              variant="outlined"
              sx={{ color: "white" }}
            />
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <TextField
              sx={{ bgcolor: "white" }}
              label="Search"
              size="small"
              variant="filled"
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
    </ThemeProvider>
  );
}

export default NavBar;
