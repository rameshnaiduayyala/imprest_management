import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Inventory2Icon from '@mui/icons-material/Inventory2';

const breadcrumbPaths: Record<string, string> = {
  Home: "/dashboard",
  Roles: "/rolelist",
  Users: "/users",
  UserRoles: "/userrole",
  "User Role": "/userrole",
  Product: "/productlist",
};

const breadcrumbIcons: Record<string, JSX.Element> = {
  Home: <HomeIcon />,
  Roles: <CoPresentIcon />,
  Users: <GroupIcon />,
  UserRoles: <GroupAddIcon />,
  Product: <Inventory2Icon />
};

const Menuitems: React.FC = () => {
  const paths = ["Home", "Roles", "Users", "UserRoles", "Product"];

  return (
    <Box
      bgcolor="#eeeeee"
      p={1}
      style={{
        display: "flex",
        justifyContent: "start",
        marginTop: "-7px",
        paddingLeft: "25px",
        marginLeft: "-5px",
      }}
    >
      <Breadcrumbs aria-label="breadcrumb" separator="|">
        {paths.map((path, index) => (
          <Link
            to={breadcrumbPaths[path]}
            key={index}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box display="flex" alignItems="center">
              {breadcrumbIcons[path]}
              <Typography
                sx={{
                  pl: 1,
                  pr: 4,
                  fontSize: "14px",
                  fontFamily: "sans-serif",
                  color: "#373737",
                  fontWeight: "600",
                  textTransform: "uppercase",
                }}
              >
                {path === "UserRoles" ? "User Role" : path}
              </Typography>
            </Box>
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

export default Menuitems;