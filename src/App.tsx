// import From from "./components/From"
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import StockTable from "./components/SkuTable";
import SkuTable from "./components/SkuTable";
import StockForm from "./components/StockForm";
import Navbar from "./components/Navbar";
import NoPage from "./pages/NoPage";
import Dashboard from "./pages/dashboard/Dashboard";
import Purchase from "./pages/purchaseOrder/Purchase";
import Users from "./pages/users/Users";
import Login from "./pages/Login";
import StockUpdate from "./components/StockUpdate";
import Notifications from "./pages/notifications/Notifications";
import Alerts from "./pages/alerts/Alerts";
import Imprest from "./pages/imprests/Imprest";
import Categories from "./pages/categories/Categories";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          {/* Move the useLocation hook inside BrowserRouter */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/*"
              element={
                <>
                  {/* Render Navbar */}
                  <Navbar />
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/purchase" element={<Purchase />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/alerts" element={<Alerts />} />
                    {/* <Route path="/imprest" element={<Imprest />} /> */}
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/imprest" element={<SkuTable />} />
                    <Route path="/stockform" element={<StockForm />} />
                    <Route path="/stockupdate/:id" element={<StockUpdate />} />
                    {/* Add more routes here */}
                  </Routes>
                  {/* Render Footer */}
                  
                </>
              }
            />
            <Route path="/nopage" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;




// const App = () => {
//   return (
//     <div>
//       <From />
//     </div>
//   )
// }

// export default App
