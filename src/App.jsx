import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Certifications from "./pages/Certifications";

import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ContactsPage from "./admin/ContactsPage";
import CareersPage from "./admin/CareersPage";
import ServicesPage from "./admin/ServicesPage";
import SubscribersPage from "./admin/SubscribersPage";
import ProtectedRoute from "./admin/ProtectedRoute";
import LeadsPage from "./admin/LeadsPage";
import InvoicesPage from "./admin/InvoicesPage";

import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && (
        <div className="fixed top-0 left-0 w-full z-50">
          <TopBar />
          <Navbar />
        </div>
      )}

      <Toast />

      <div className={!isAdmin ? "pt-[64px] md:pt-[108px]" : ""}>
        <Routes>
          {/* MAIN SITE */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/certifications" element={<Certifications />} />

          {/* ADMIN LOGIN */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* ADMIN (WITH SIDEBAR LAYOUT) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="careers" element={<CareersPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="subscribers" element={<SubscribersPage />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="invoices" element={<InvoicesPage />} />
          </Route>
        </Routes>
      </div>

      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}