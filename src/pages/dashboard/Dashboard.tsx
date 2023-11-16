import StoreIcon from '@mui/icons-material/Store';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import ForumIcon from '@mui/icons-material/Forum';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import { Grid } from "@mui/material";
import { useEffect, useState } from 'react';
import { getImprestProduct } from '../../services/imprestProduct.svc';
import "./dashboard.css";

const Dashboard: React.FC = () => {
  const [totalAvailableStock, setTotalAvailableStock] = useState<number>(0);
  const [outOfStock, setOutOfStock] = useState<number>(0);
  const [closeToMin, setCloseToMin] = useState<number>(0);

  useEffect(() => {
    fetchImprestProduct()
  }, [])

  const fetchImprestProduct = async () => {
    try {
      const Products = await getImprestProduct();

      if (Products != null && Products.length > 0) {

        let threshold = 10

        const totalStockCount = Products.filter((product : any) => product.available_stock > product.min_stock).length;
        setTotalAvailableStock(totalStockCount);

        const outOfStockCount = Products.filter((product: any) => product.available_stock < product.min_stock).length;
        setOutOfStock(outOfStockCount);

        const closeToMinCount = Products.filter((product: any) => product.min_stock < product.available_stock && product.available_stock <= product.min_stock + threshold).length;
        setCloseToMin(closeToMinCount);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  return (
    <>
      <div className="tittle_dashboard">
        <h3>Dashboard</h3>
      </div>
      <div className="main_container">
        <Grid container className="container_inner" spacing={1}>

          {/* First Column */}

          <Grid item xs={12} sm={6} md={4.5} className="first_column">
            <div className="imprestprod_main_div">
              <div>
                <StoreIcon />Imprest Product
              </div>
              <div className="main_stock">
                <div className="inner_box">
                  <div>
                    <h5>In Stock</h5>
                  </div>
                  <div className="values">
                    <h4 className='instock'>{totalAvailableStock - closeToMin}</h4>
                  </div>
                </div>
                <div className="inner_box">
                  <div>
                    <h5>Out of Stock</h5>
                  </div>
                  <div className="values">
                    <h4 className='outofstock'>{outOfStock}</h4>
                  </div>
                </div>
                <div className="inner_box">
                  <div>
                    <h5>Close to Min</h5>
                  </div>
                  <div className="values">
                    <h4 className='closetomin'>{closeToMin}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="imprest_main_graph">
              <div className="imprest_graph">
                {/* <LineChart data={chartData} options={chartOptions} /> */}
              </div>
            </div>
            <div className="po_main_div">
              <div>
                <RequestQuoteIcon />Purchase Order
              </div>
              <div className="main_po">
                <div className="inner_pobox1">
                  <div>
                    <p>initiated</p>
                  </div>
                  <div className="values">
                    <p>54</p>
                    <div className='icons'>
                      <MarkEmailReadIcon />
                    </div>
                  </div>
                </div>
                <div className="inner_pobox2">
                  <div>
                    <p>Received</p>
                  </div>
                  <div className="values">
                    <p>4</p>
                    <div className='icons'>
                      <UnsubscribeIcon />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Grid>

          {/* second column */}

          <Grid item xs={12} sm={6} md={4.5} className="second_column">
            <div className="notification_main_div">
              <div>
                <NotificationsActiveIcon />Notifications
              </div>
              <div className="main_po">
                <div className="notification_success">
                  <div>
                    <p>Email Success</p>
                  </div><div className="values">
                    <p>8</p>
                    <div className='icons'>
                      <MarkEmailReadIcon />
                    </div>
                  </div>
                </div>
                <div className="notification_bounce">
                  <div>
                    <p>Email Bounce</p>
                  </div><div className="values">
                    <p>4</p>
                    <div className='icons'>
                      <UnsubscribeIcon />
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="imprest_graph">
              <div>Line Chart</div>
            </div>
            <div className="main_camstatus">
              <div>
                <MarkUnreadChatAltIcon />Camera Status
              </div>
              <div className="main_po">
                <div className="camera_good">
                  <div>
                    <p>Status</p>
                  </div>
                  <div className="values">
                    <p>Good</p>
                  </div>
                </div>
                <div className="camera_action">
                  <div>
                    <p>Status</p>
                  </div>
                  <div className="values">
                    <p>Action Needed</p>
                  </div>
                </div>
              </div>

            </div>
          </Grid>

          {/* Third column */}

          <Grid item xs={12} sm={6} md={3} className="third_column">
            <div>
              <ForumIcon />Meraki Events
            </div>
            <div className="main_meraki_div">
              <div className="meraki_graphs">
                Graph 1
              </div>
              <div className="meraki_graphs">
                Graph 2
              </div>
              <div className="meraki_graphs">
                Graph 3
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Dashboard