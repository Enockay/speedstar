// App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/adminLogin';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import PartnerManagement from './pages/PartnerManagement';
import BookingManagement from './pages/BookingManagement';
import PaymentManagement from './pages/PaymentManagement';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import AdminLogs from './pages/AdminLogs';
import Hotels from "./pages/Hotels";
import DashboardHome from './pages/Dashboard';

function App() {
  return (
    <Router basename="/">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin Dashboard and Nested Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="partners" element={<PartnerManagement />} />
          <Route path="bookings" element={<BookingManagement />} />
          <Route path="payments" element={<PaymentManagement />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
          <Route path="logs" element={<AdminLogs />} />
          <Route path="hotel" element={<Hotels />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
