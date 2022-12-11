import { useState } from "react";
import {
  Chip,
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
} from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { ArrowBack, UnfoldLess } from "@mui/icons-material";

function NavBar({
  TotalCount,
  onCollapsed,
  showMore,
  onSearchThread,
  SearchText,
}) {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "15ch",
        "&:focus": {
          width: "25ch",
        },
      },
    },
  }));
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
          <Chip label="#55 - December 2" variant="outlined" sx={{ mr: 5 }} />
          <Chip label={`Total Messages ${TotalCount}`} variant="outlined" />
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Search onChange={onSearchThread}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
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
