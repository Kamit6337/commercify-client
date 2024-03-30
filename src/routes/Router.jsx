import { Route, Routes } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import UserLayout from "../layout/UserLayout";
import AdminLayout from "../layout/AdminLayout";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import Home from "../pages/home/Home";
import CategoryProducts from "../pages/category/CategoryProducts";
import SearchProducts from "../pages/search/SearchProducts";
import SingleProduct from "../pages/singleProduct/SingleProduct";
import UserUpdate from "../pages/user/UserUpdate";
import UserOrders from "../pages/user/UserOrders";
import Admin from "../pages/admin/Admin";
import AddProduct from "../pages/admin/AddProduct";
import UpdateProduct from "../pages/admin/UpdateProduct";
import ErrorPage from "../pages/error/ErrorPage";
import Wishlist from "../pages/wishlist/Wishlist";
import Cart from "../pages/cart/Cart";
import CartLayout from "../layout/CartLayout";
import Profile from "../pages/user/Profile";
import Address from "../pages/user/Address";
import AddressInCart from "../pages/cart/AddressInCart";
import Checkout from "../pages/cart/Checkout";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import PaymentCancel from "../pages/payment/PaymentCancel";
import HomeLayout from "../layout/HomeLayout";
import OrderCancel from "../pages/user/OrderCancel";

const Router = () => {
  return (
    <Routes>
      {/* NOTE: AUTH ROUTES */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      {/* NOTE: ERROR ROUTE */}
      <Route path="/error" element={<ErrorPage />} />

      {/* MARK: ROOT LAYOUT */}
      <Route path="/" element={<RootLayout />}>
        {/* NOTE: PRODUCTS ROUTES */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="category/:id" element={<CategoryProducts />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        <Route path="products/:id" element={<SingleProduct />} />
        <Route path="wishlist" element={<Wishlist />} />

        {/* NOTE: CART ROUTES */}
        <Route path="cart" element={<CartLayout />}>
          <Route index element={<Cart />} />
          <Route path="address" element={<AddressInCart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        {/* NOTE: PAYMENT SUCCESS AND FAILURE */}
        <Route path="payment/success" element={<PaymentSuccess />} />
        <Route path="payment/cancel" element={<PaymentCancel />} />

        {/* NOTE: USER ROUTES */}
        <Route path="user" element={<UserLayout />}>
          <Route index element={<Profile />} />
          <Route path="address" element={<Address />} />
          <Route path="update" element={<UserUpdate />} />
          <Route path="orders" element={<UserOrders />} />
        </Route>

        {/* NOTE: USER CANCEL ORDER */}
        <Route path="orders/cancel/:id" element={<OrderCancel />} />

        {/* NOTE: PROTECTED ADMIN ROUTES */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="update" element={<UpdateProduct />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
