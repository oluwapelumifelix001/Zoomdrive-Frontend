import React from 'react'

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/dashboard.jsx'
import FleetPage from './Components/Fleet.jsx'
import AdminLandingPage from './Components/AdminLandingPage.jsx'
import UltimateAdminSignupPage from './pages/AdminSignup.jsx'
import UltimateAdminLoginPage from './pages/AdminLogin.jsx'
import SuperAdminSignup from './pages/SuperAdminSignup.jsx'
import PaymentPage from './pages/Payment.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Browse from './pages/Browse.jsx'
import AddCar from './pages/AdminAddCar.jsx'
import SettingsPage from './pages/Settings.jsx'
import AboutUsPage from './pages/About.jsx'
import AdminProfile from './pages/AdminProfile.jsx'
import SuperAdminLogin from './pages/SuperAdminLogin.jsx'
import SuperAdminDashboard from './pages/SuperAdminDashboard.jsx'
import NotFound from './pages/NotFound.jsx'
import ScrolltoTop from './Components/ScrolltoTop.jsx'
import PWAProvider from './Components/PWAHandler.jsx'
import { Scroll } from 'lucide-react'

const App = () => {
  return (
    <>
      <PWAProvider>
        <ScrolltoTop>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/fleet" element={<FleetPage />} />
        <Route path="/admin/home" element={<AdminLandingPage />} />
        <Route path="/admin/signup" element={<UltimateAdminSignupPage />} />
        <Route path="/admin/login" element={<UltimateAdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/addCar" element={<AddCar />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/payment" element={<PaymentPage />} />
        {/* <Route path="/superadmin/signup" element={<SuperAdminSignup />} /> */}
        <Route path="/superadmin/login" element={<SuperAdminLogin />} />
        <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </ScrolltoTop>
</PWAProvider>

    </>
  )
}

export default App