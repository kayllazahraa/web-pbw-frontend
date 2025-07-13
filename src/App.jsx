// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PublicationListPage from './components/PublicationListPage';
import AddPublicationPage from './components/AddPublicationPage';
import EditPublicationPage from './components/EditPublicationPage';
import ProtectedRoute from './components/ProtectedRoute'; // ✅

export default function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const hideNavbarRoutes = ['/login', '/register'];
  const shouldShowNavbar = token && !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {shouldShowNavbar && <Navbar isLoggedIn={!!token} setIsLoggedIn={() => {}} />}

      <main className="p-4 sm:p-6 lg:p-8">
        <Routes>
          {/* ✅ Halaman login dan register tidak perlu login */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ✅ Semua route ini wajib login */}
          <Route
            path="/publications"
            element={
              <ProtectedRoute>
                <PublicationListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/publications/add"
            element={
              <ProtectedRoute>
                <AddPublicationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/publications/edit/:id"
            element={
              <ProtectedRoute>
                <EditPublicationPage />
              </ProtectedRoute>
            }
          />

          {/* Redirect default */}
          <Route path="/" element={<Navigate to="/publications" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
