import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

const Navigator = (props) => {
  const [scName, setScName] = useState(props.screenName);
  return (
    <Stack
      sx={{
        backgroundColor: "#323584",
        position: "absolute",
        bottom: { md: 30, xs: 10 },
        p: 2,
        width: 200,
        borderRadius: 5,
        border: 2,
        borderColor: "#444784",
        left: "50%",
        transform: "translate(-50%)",
      }}
    >
      <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Stack sx={{ alignItems: "center" }}>
          <Link to={"/"}>
            <LibraryMusicIcon
            titleAccess="Home"
              sx={{ color: scName == "home" ? "#f9990f" : "#8e92ff" }}
            />
          </Link>
        </Stack>

        <Stack sx={{ alignItems: "center" }}>
          <Link to={"/search"}>
            <SearchIcon
            titleAccess="search"
              sx={{ color: scName == "search" ? "#f9990f" : "#8e92ff" }}
            />
          </Link>
        </Stack>

        <Stack sx={{ alignItems: "center" }}>
          <Link to={"/profile"}>
            <AccountCircleIcon
            titleAccess="profile"
              sx={{ color: scName == "profile" ? "#f9990f" : "#8e92ff" }}
            />
          </Link>
        </Stack>

        
      


      </Stack>
    </Stack>
  );
};

export default Navigator;
