import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from '@mui/icons-material/Group';
import StorefrontIcon from '@mui/icons-material/Storefront';

const breadcrumbPaths: Record<string, string> = {
  Home: "/dashboard",
  Purchase: "/purchase",
  Stock: "/stock",
  Imprest: "/imprest",
  Notifications: "/notifications",
  Alerts: "/alerts",
  Categories: "/categories",
  Users: "/users",
};

const breadcrumbIcons: Record<string, JSX.Element> = {
  Home: <HomeIcon />,
  Purchase: <ShoppingBasketIcon />,
  Stock: <StorefrontIcon />,
  Imprest: <AssignmentIcon />,
  Notifications: <NotificationsIcon />,
  Alerts: <ReportProblemIcon />,
  Categories: <CategoryIcon />,
  Users: <GroupIcon />,
};

const ListofItems: React.FC = () => {
  const paths = ["Home", "Purchase", "Stock", "Imprest", "Notifications", "Alerts", "Categories", "Users"];

  return (
    <Box bgcolor="#eeeeee" p={1} style={{ display: 'flex', justifyContent: 'center' }}>
      <Breadcrumbs aria-label="breadcrumb" separator="|">
        {paths.map((path, index) => (
          <Link to={breadcrumbPaths[path]} key={index} style={{ textDecoration: "none", color: "inherit" }}>
            <Box display="flex" alignItems="center">
              {breadcrumbIcons[path]}
              <Typography variant="h1" sx={{ pl: 2, pr: 4, fontSize: '16px', fontFamily: 'sans-serif' }}>
                {path}
              </Typography>
            </Box>
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

export default ListofItems;
