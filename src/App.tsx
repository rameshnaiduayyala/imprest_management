import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import User from "./pages/user/User";
import Sidebar from "./components/sidebar/Sidebar";
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
import AddImprest from "./pages/imprest/AddImprest";
import EditImprest from "./pages/imprest/EditImprest";
import ImprestList from "./pages/imprest/ImprestList";
import ImprestProductList from "./pages/imprestProduct/ImprestProductList";
import AddImprestProduct from "./pages/imprestProduct/AddImprestProduct";
import EditImprestProduct from "./pages/imprestProduct/EditImprestProduct";
import { Role } from "./models/role.model";
import LocalStorageService from './services/localStorage.svc'


function App() {
  const localStorageService = LocalStorageService.getInstance();


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PrivateRoute = ({ children }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const roles: any = localStorageService.getItem("roles") ?? []
    const authed: boolean = (roles?.filter((val: Role) => val?.name?.toLowerCase() === "admin"))?.length > 0;
    return authed ? children : <Navigate to="/dashboard" />;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/*"
            element={
              localStorage?.getItem("token") ?
                <Sidebar>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/productlist" element={<ProductList />} />
                    <Route path="/editproduct/:id" element={<EditProduct />} />
                    <Route path="/addproduct" element={<AddProduct />} />
                    <Route path="/imprestlist" element={<ImprestList />} />
                    <Route
                      path="/imprestproductlist"
                      element={<ImprestProductList />}
                    />
                    <Route
                      path="/addimprestproduct"
                      element={<AddImprestProduct />}
                    />
                    <Route
                      path="/editimprestproduct/:id"
                      element={<EditImprestProduct />}
                    />

                    <Route path="/users" element={
                      <PrivateRoute>
                        <User />
                      </PrivateRoute>
                    } />
                    <Route path="/addrole"
                      element={
                        <PrivateRoute>
                          <AddRole />
                        </PrivateRoute>
                      } />
                    <Route path="/rolelist"
                      element={
                        <PrivateRoute>
                          <RoleList />
                        </PrivateRoute>
                      } />
                    <Route path="/editrole/:id"
                      element={
                        <PrivateRoute>
                          <EditRole />
                        </PrivateRoute>
                      } />
                    <Route
                      path="/adduser"
                      element={
                        <PrivateRoute>
                          <AddUser />
                        </PrivateRoute>
                      }
                    />
                    <Route path="/edituser/:id"
                      element={
                        <PrivateRoute>
                          <EditUser />
                        </PrivateRoute>
                      } />
                    <Route path="/userrole"
                      element={
                        <PrivateRoute>
                          <UserRole />
                        </PrivateRoute>
                      } />
                    <Route path="/addroleuser"
                      element={
                        <PrivateRoute>
                          <AddUserRole />
                        </PrivateRoute>
                      } />
                    <Route path="/editroleuser/:id"
                      element={
                        <PrivateRoute>
                          <EditUserRole />
                        </PrivateRoute>
                      } />
                    <Route path="/addimprest"
                      element={
                        <PrivateRoute>
                          <AddImprest />
                        </PrivateRoute>
                      } />

                    <Route path="/editimprest/:id"
                      element={
                        <PrivateRoute>
                          <EditImprest />
                        </PrivateRoute>
                      } />
                  </Routes>
                </Sidebar>
                :
                <Navigate to="/" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
