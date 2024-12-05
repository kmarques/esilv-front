import { Outlet, Route, Routes } from "react-router";
import "./App.css";
import AlertProvider from "./contexts/AlertProvider";
import UserProvider from "./contexts/UserProvider";
import ProductProvider from "./contexts/ProductProvider";
import ThemeProvider from "./contexts/ThemeProvider";

import FrontLayout from "./layouts/FrontLayout";
import Home from "./views/Home";
import Contact from "./views/Contact";

import BackLayout from "./layouts/BackLayout";
import UserList from "./views/Admin/Users/List";
import ProductList from "./views/Admin/Product/List";
import UserCreate from "./views/Admin/Users/Create";
import ProductCreate from "./views/Admin/Product/Create";

function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <ProductProvider>
          <Routes>
            <Route path="/" element={<FrontLayout />}>
              <Route index element={<Home />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            <Route path="/admin" element={<BackLayout />}>
              <Route
                path="users"
                element={
                  <UserProvider>
                    <Outlet />
                  </UserProvider>
                }
              >
                <Route index element={<UserList />} />
                <Route path="create" element={<UserCreate />} />
              </Route>
              <Route path="products" element={<Outlet />}>
                <Route index element={<ProductList />} />
                <Route path="create" element={<ProductCreate />} />
              </Route>
            </Route>
          </Routes>
        </ProductProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
