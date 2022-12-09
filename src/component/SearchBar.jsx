import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const SearchBar = ({setSearchQuery}) => (
  <form style={{
    marginLeft: 300,
  }}>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Search Here"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </form>
);

const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.toLowerCase().includes(query));
    }
  };

  const data = [
    // "Paris",
    // "London",
    // "New York",
    // "Tokyo",
    // "Berlin",
    // "Buenos Aires",
    // "Cairo",
    // "Canberra",
    // "Rio de Janeiro",
    // "Dublin"
  ];

  export default function SearchBars() {
    const [searchQuery, setSearchQuery] = useState("");
    const dataFiltered = filterData(searchQuery, data);
  
    return (
      <div
>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div style={{ padding: 3 }}>
          {dataFiltered.map((d) => (
            <div
              className="text"
              key={d.id}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
    );
  }  