import DashboardIcon from "@mui/icons-material/Dashboard";
import { Typography, Button } from "@mui/material";
import { useStyles } from "../../styles/dashboard";
import { Grid, Card, CardContent, Link, Breadcrumbs } from "@mui/material";
import { CustomBreadcrumb } from "../../styles/dashboard";
import StoreIcon from "@mui/icons-material/Store";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import camera from "../../images/camera.png";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AssignmentIcon from "@mui/icons-material/Assignment";
const critical = {
  borderRadius: "15%",
  width: "150px",
  height: "80px",
  backgroundColor: "white",
  boxShadow: "0px 4px 4px rgba(255, 0, 0, 1)",
};

const high = {
  borderRadius: "15%",
  width: "150px",
  height: "80px",
  backgroundColor: "white",
  boxShadow: "0px 4px 4px rgb(255,69,0.4) ",
  color: "black",
};

const green = {
  borderRadius: "15%",
  width: "150px",
  height: "80px",
  backgroundColor: "white",
  boxShadow: "0px 4px 4px rgb(0,255,0.5) ",
  color: "black",
};

const purchase = {
  borderRadius: "15%",
  width: "190px",
  height: "80px",
  backgroundColor: "white",
  color: "black",
};

const Separator = () => (
  <Typography variant="h3" style={{ padding: "0 5px" }}>
    |
  </Typography>
);

const Dashboard = () => {
  const classes = useStyles();
  const array = ["Critical", "High", "Green"];
  // const stock=localStorage.getItem('avilablestock')
  return (
    <div className={classes.container}>
      <div className={classes.icon}>
        <DashboardIcon style={{ paddingRight: "5px", marginTop: "3px" }} />
        <Typography variant="h6">Dashboard</Typography>
      </div>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={4.5}>
            <Card variant="outlined">
              <CardContent className={classes.cards}>
                <div className={classes.cirle}>
                  <StoreIcon style={{ color: "#3f70ed", fontSize: 40 }} />
                  <Typography variant="h6">Item Stocks Details</Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  <CustomBreadcrumb style={{ backgroundColor: "#c3d2f8" }}>
                    <Link color="inherit" href="/stock">
                      <Typography variant="h5">Instock</Typography>
                      <Typography
                        variant="h5"
                        style={{ textAlign: "center" }}
                      ></Typography>
                    </Link>
                  </CustomBreadcrumb>
                  <Separator />
                  <CustomBreadcrumb style={{ backgroundColor: "#f9c8cd" }}>
                    <Link color="inherit" href="/stock">
                      <Typography variant="h5">OutStock</Typography>
                      <Typography variant="h5" style={{ textAlign: "center" }}>
                        455
                      </Typography>
                    </Link>
                  </CustomBreadcrumb>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4.5}>
            <Card variant="outlined">
              <CardContent className={classes.cards}>
                <div style={{ padding: "1px" }}>
                  <div className={classes.cardtitles}>
                    <CircleNotificationsIcon
                      style={{ color: "#3f70ed", fontSize: 40 }}
                    />
                    <Typography variant="h6">Notifations</Typography>
                  </div>

                  <div className={classes.names}>
                    {array.map((item) => {
                      return (
                        <Typography className={classes.typegrophy}>
                          {item}
                        </Typography>
                      );
                    })}
                  </div>
                  <div className={classes.cardtitles}>
                    <Button
                      variant="contained"
                      style={critical}
                      href="/notifications"
                    >
                      <Typography style={{ color: "black" }}>277</Typography>
                    </Button>
                    <Separator />
                    <Button variant="contained" style={high} href="/stock">
                      <Typography style={{ color: "black" }}>277</Typography>
                    </Button>
                    <Separator />
                    <Button variant="contained" style={green} href="/stock">
                      <Typography style={{ color: "black" }}>277</Typography>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card variant="outlined">
              <CardContent className={classes.cards}>
                <div className={classes.cardtitles}>
                  <CircleNotificationsIcon
                    style={{ color: "#3f70ed", fontSize: "40px" }}
                  />
                  <Typography variant="h6">Alrets</Typography>
                </div>

                <div>
                  <Breadcrumbs className={classes.cameraicon}>
                    <Link
                      color="inherit"
                      href="/Notification"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="h6" textAlign="center">
                        Camera
                      </Typography>
                    </Link>
                  </Breadcrumbs>
                </div>
                <div className={classes.cameraicon}>
                  <img src={camera} alt="name" width="50px" height="50px" />
                </div>
                <Typography className={classes.cameraicon}>755</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div className={classes.secondgrid}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Card variant="outlined">
              <CardContent className={classes.cards}>
                <div className={classes.po}>
                  <ShoppingBagIcon
                    style={{ color: "#3f70ed", fontSize: "40px" }}
                  />
                  <Typography variant="h6">Purchase Orders</Typography>
                </div>
                <div className={classes.po}>
                  <Button variant="contained" href="/purchase" style={purchase}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div className={classes.buttonTitle}>
                        <PanToolAltIcon />
                        <Typography variant="h6">Intiated</Typography>
                      </div>

                      <div className={classes.po}>
                        <Typography className="h6" margin="auto">
                          057
                        </Typography>
                      </div>
                    </div>
                  </Button>
                  <Separator />
                  <Button variant="contained" href="/purchase" style={purchase}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div className={classes.buttonTitle}>
                        <ThumbUpIcon />
                        <Typography variant="h6">Approved</Typography>
                      </div>

                      <div className={classes.po}>
                        <Typography className="h6" margin="auto">
                          077
                        </Typography>
                      </div>
                    </div>
                  </Button>
                  <Separator />
                  <Button variant="contained" href="/purchase" style={purchase}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div className={classes.buttonTitle}>
                        <LocalShippingIcon />
                        <Typography variant="h6">Intranist</Typography>
                      </div>

                      <div className={classes.po}>
                        <Typography className="h6" margin="auto">
                          077
                        </Typography>
                      </div>
                    </div>
                  </Button>
                  <Separator />

                  <Button variant="contained" href="/purchase" style={purchase}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div className={classes.buttonTitle}>
                        <VolunteerActivismIcon />
                        <Typography variant="h6">Received</Typography>
                      </div>

                      <div className={classes.po}>
                        <Typography className="h6" margin="auto">
                          077
                        </Typography>
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card variant="outlined">
              <CardContent className={classes.cards}>
                <div className={classes.po}>
                  <AssignmentIcon
                    style={{ color: "#3f70ed", fontSize: "40px" }}
                  />
                  <Typography>Summary</Typography>
                  <div className={classes.empty}></div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
