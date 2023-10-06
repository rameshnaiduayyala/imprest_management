import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/login/Login";
import User from "./pages/user/User";
import Navbar from "./components/navbar/Navbar";
import AddRole from "./pages/role/AddRole";
import RoleList from "./pages/role/RoleList";
import EditRole from "./pages/role/EditRole";
import AddUser from "./pages/user/AddUser";
import EditUser from "./pages/user/EditUser";
import UserRole from "./pages/userRoles/UserRoles";
import AddUserRole from "./pages/userRoles/AddUserRole";
import EditUserRole from "./pages/userRoles/EditUserRole";
import ProductList from "./pages/product/ProductList";
import EditProduct from "./pages/product/EditProduct";
import AddProduct from "./pages/product/AddProduct";

function NavbarWrapper() {
  const location = useLocation();
  const shouldShowNavbar = () => {
    return location.pathname !== "/";
  };
  return shouldShowNavbar() ? <Navbar /> : null;
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavbarWrapper />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<User />} />
          <Route path="/addrole" element={<AddRole />} />
          <Route path="/rolelist" element={<RoleList />} />
          <Route path="/editrole/:id" element={<EditRole />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/edituser/:id" element={<EditUser />} />
          <Route path="/userrole" element={<UserRole />} />
          <Route path="/addroleuser" element={<AddUserRole />} />
          <Route path="/editroleuser/:id" element={<EditUserRole />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;