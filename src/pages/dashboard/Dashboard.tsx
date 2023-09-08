import DashboardIcon from '@mui/icons-material/Dashboard';
import { Typography, Button, } from '@mui/material';
import { useStyles } from '../../styles/dashboard';
import { Grid, Card, CardContent, Link, Breadcrumbs } from '@mui/material';
import { CustomBreadcrumb } from '../../styles/dashboard';
import StoreIcon from '@mui/icons-material/Store';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import camera from "../../images/camera.png";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Separator = () => (
  <Typography variant="h3" style={{ padding: '0 5px' }}>
    |
  </Typography>
);

const Dashboard = () => {
  const classes = useStyles()
  const array = ['Critical', 'High', 'Green']
  const instockcount = localStorage.getItem('instockcount')
   const outcount = localStorage.getItem('outcount')
   const thresholdcount = localStorage.getItem('thresholdcount')
  return (
    <div className={classes.container}>
      <div className={classes.icon}>
        <DashboardIcon style={{ paddingRight: '5px', marginTop: '3px' }} />
        <Typography variant='h6' className='page_main_title'>Dashboard</Typography>
      </div>
      <div className="dashboard_blocks_row">
        <Grid container spacing={2} >
          <Grid item xs={4.5} >
            <Card className='dashboard_block_item'>
              <CardContent className={`${classes.cards}`} >
                <div className={classes.cirle}>
                  <StoreIcon className={classes.iconsize} />
                  <Typography variant='h6'>Imprest Summary</Typography>
                </div>
                <div className={classes.itemsDirection} style={{marginTop:"1.2rem"}}>          
                <CustomBreadcrumb style={{ backgroundColor: "#c3d2f8" }} className='block_circle_content'>
                  <Link  href="/imprest">
                    <Typography variant="h6" >
                      InStock
                    </Typography>
                    <Typography variant="h5" className={classes.countPosition}>{instockcount}</Typography>
                  </Link>
                </CustomBreadcrumb >
                  <Separator />
                  <CustomBreadcrumb style={{ backgroundColor: '#f9c8cd' }} className='block_circle_content'>

                    <Link  href="/imprest">
                    <Typography variant="h6" >
                        Threshold
                      </Typography>
                      <Typography variant="h5" className={classes.countPosition}>{thresholdcount}</Typography>

                    </Link>
                  </CustomBreadcrumb>
                  <Separator />
                  <div className={classes.po}>

                    <CustomBreadcrumb style={{ backgroundColor: '#fc5959' }} className='block_circle_content'>

                      <Link color="inherit" href="/imprest">
                      <Typography variant="h6" >
                          Out Of Stock
                        </Typography>
                        <Typography variant="h5" className={classes.countPosition} >{outcount}</Typography>

                      </Link>
                    </CustomBreadcrumb>

                  </div>


                </div>

              </CardContent>
            </Card>

          </Grid>
          <Grid item xs={4.5}>
            <Card className='cards_notifications'>
              <CardContent className={classes.cards} >
                <div style={{ padding: '1px' }}>

                  <div className={classes.cardtitles}>
                    <CircleNotificationsIcon className={classes.iconsize} />
                    <Typography variant="h6">Notifications</Typography>
                  </div>

                  <div className={classes.names} style={{marginTop:"1.2rem"}}>
                    {
                      array.map((item) => {
                        return (
                          <Typography className={classes.typegrophy}>{item}</Typography>
                        )
                      })
                    }


                  </div>
                  <div className={classes.cardtitles}>
                    <Button
                      variant="contained"
                      className={classes.critical}
                      href="/notifications"
                    >
                      <Typography className='card_notification_value_red'>0</Typography>
                    </Button>
                    <Separator />
                    <Button
                      variant="contained"
                      className={classes.high}
                      href="/stock"
                    >
                      <Typography className='card_notification_value_orrange'>10</Typography>
                    </Button>
                    <Separator />
                    <Button
                      variant="contained"
                      className={classes.green}
                      href="/stock"
                    >
                      <Typography className='card_notification_value_green'>3</Typography>
                    </Button>
                  </div>
                </div>

              </CardContent>
            </Card>

          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent className={classes.cards}>
                <div className={classes.cardtitles}>
                  <CircleNotificationsIcon className={classes.iconsize} />
                  <Typography variant='h6'>Alerts</Typography>
                </div>

                <div>
                  <Breadcrumbs className={classes.cameraicon}>
                    <Link color="inherit" href="/Notification" className={classes.link} style={{textDecoration:"none"}}>
                      <Typography variant="h6" className={classes.countPosition} style={{fontSize:"0.89rem"}}>Camera</Typography>
                    </Link>
                  </Breadcrumbs>
                </div>
                <div className={classes.cameraicon}>
                  <img src={camera} alt="name" width='50px' height='50px' />
                </div>
                <Typography className={classes.cameraicon} style={{fontSize:"2.2rem", fontWeight:"600"}}>755</Typography>
              </CardContent>
            </Card>

          </Grid>
        </Grid>


      
      <div className={classes.secondgrid}>

        <Grid container spacing={2} >
          <Grid item xs={9} >
            <Card className='po_cards_content'>
              <CardContent className={classes.cards} >
                <div className={classes.po}>
                  <ShoppingBagIcon className={classes.iconsize} />
                  <Typography variant='h6'>Purchase Orders Summary</Typography>
                </div>
                <div className={classes.po}>
                  <Button
                    variant="contained"
                    href="/purchase"
                    className={classes.purchase}
                  >
                    <div className={classes.divdirection}>
                      <div className={classes.buttonTitle}>
                        <PanToolAltIcon />
                        <Typography variant='h6'>Initiated</Typography>
                      </div>

                      <div className={classes.po}>

                        <Typography className='h6' margin='auto'>24</Typography>
                      </div>
                    </div>
                  </Button>
                  <Separator />
                  <Button
                    variant="contained"
                    href="/purchase"
                    className={classes.purchase}
                  >
                    <div className={classes.divdirection }>
                      <div className={classes.buttonTitle}>
                        <ThumbUpIcon />
                        <Typography variant='h6'>Approved</Typography>
                      </div>

                      <div className={classes.po}>

                        <Typography className='h6' margin='auto'>16</Typography>
                      </div>
                    </div>

                  </Button>
                  <Separator />
                  <Button
                    variant="contained"
                    href="/purchase"
                    className={classes.purchase}
                  >
                    <div className={classes.divdirection}>
                      <div className={classes.buttonTitle}>
                        <LocalShippingIcon />
                        <Typography variant='h6'>In-tranist</Typography>
                      </div>

                      <div className={classes.po}>

                        <Typography className='h6' margin='auto'>10</Typography>
                      </div>
                    </div>

                  </Button>
                  <Separator />

                  <Button
                    variant="contained"
                    href="/purchase"
                    className={classes.purchase}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div className={classes.buttonTitle}>
                        <VolunteerActivismIcon />
                        <Typography variant='h6'>Received</Typography>
                      </div>

                      <div className={classes.po}>

                        <Typography className='h6' margin='auto'>6</Typography>
                      </div>
                    </div>

                  </Button>

                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card >
              <CardContent className={classes.cards} >
                <div className={classes.po}>
                  <AssignmentIcon style={{ color: '#3f70ed', fontSize: '40px' }} />
                  <Typography variant='h6'>TBD</Typography>
                  <div className={classes.empty}>

                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      </div>

    </div>

  )
}

export default Dashboard
















