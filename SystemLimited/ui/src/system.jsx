import React from 'react'
import "./css/system.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Single from './screeens/Single'
import Home from './screeens/Home'
import AddProduct from './screeens/Addproduct'
import Signup from './screeens/authentication/Signup'
import ForgetPassword from './screeens/authentication/ForgetPassword'
import Login from './screeens/authentication/login'
import ActivateAcount from './screeens/authentication/ActivateAcount'
import ChangePassword from './screeens/authentication/ChangePassword'
import ResetPassword from './screeens/authentication/ResetPassword'

import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar'

import Profile from './screeens/Dashboard/Profile'
import Users from './screeens/Dashboard/Users'
import Products from './screeens/Dashboard/Products'
import Orders from './screeens/Dashboard/Orders'

import DashboardLayout from './components/layout/DashboardLayout'
import ProtectedRoute from './routes/ProtectedRoute'
import Auth from './context/Auth'
import EditProduct from './screeens/Dashboard/EditProduct'
import EditUser from './screeens/Dashboard/EditUser'
import Cart from './screeens/Cart'

const system = () => {
  return (
    <Auth>
      <Router>
        <ToastContainer />
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Single />} />


          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/auth/activate/:token" element={<ActivateAcount />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Profile />} />       {/* /dashboard */}
              <Route path="users" element={<Users />} />  {/* /dashboard/users */}
              <Route path="users/edit/:id" element={<EditUser />} />

              <Route path="products">
                <Route index element={<Products />} />            {/* /dashboard/products */}
                <Route path="addproduct" element={<AddProduct />} />    {/* /dashboard/products/add */}
                <Route path="edit/:id" element={<EditProduct />} /> {/* /dashboard/products/edit/:id */}
              </Route>

              <Route path="orders" element={<Orders />} />      {/* /dashboard/orders */}
            </Route>
          </Route>


        </Routes>
      </Router>
    </Auth>
  )
}

export default system











// import React from 'react'
// import "./css/system.css"
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
// import Single from './screeens/Single'
// import Home from './screeens/Home'
// import AddProduct from './screeens/Addproduct'
// import Signup from './screeens/authentication/Signup'
// import ForgetPassword from './screeens/authentication/ForgetPassword'
// import Login from './screeens/authentication/login'
// import ActivateAcount from './screeens/authentication/ActivateAcount'
// import ChangePassword from './screeens/authentication/ChangePassword'
// import { ToastContainer } from 'react-toastify';
// import Navbar from './components/Navbar'
// import ResetPassword from './screeens/authentication/ResetPassword'
// import Profile from './screeens/Dashboard/Profile'
// import Dashboard from './screeens/Dashboard/Dashboard'
// import Auth from './context/Auth'


// const system = () => {

//   return (
//       <Auth>
//     <Router>
//       <ToastContainer />
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/addproduct" element={<AddProduct />} />
//         <Route path="products/:id" element={<Single />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/forget-password" element={<ForgetPassword />} />
//         <Route path="/auth/activate/:token" element={<ActivateAcount />} />
//         <Route path="/change-password" element={<ChangePassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//       </Routes>
//     </Router>

//     </Auth>

//     // </div>
//   )
// }

// export default system
