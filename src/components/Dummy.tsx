import React from "react";
import { Breadcrumbs, Typography, Box, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import StorefrontIcon from "@mui/icons-material/Storefront";

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

const Dummy: React.FC = () => {
  const paths = ["Home", "Purchase", "Stock", "Imprest", "Notifications", "Alerts", "Categories", "Users"];

  return (
    <Box bgcolor="#eeeeee" p={1}>
      <Breadcrumbs aria-label="breadcrumb" separator="|">
        {paths.map((path, index) => (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              // Handle the button click, you can navigate or perform any other action here
              window.location.href = breadcrumbPaths[path];
            }}
            key={index}
            sx={{
              borderRadius: "50%",
              width: "48px", // Set the width and height to create a circular button
              height: "48px",
              padding: 8, // Remove padding to make it a perfect circle
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box display="flex" alignItems="center">
              {breadcrumbIcons[path]}
              <Typography variant="body1" sx={{ pl: 1 }}>
                {path}
              </Typography>
            </Box>
          </Button>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

export default Dummy;
