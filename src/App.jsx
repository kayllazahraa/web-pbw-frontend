// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import PublicationListPage from "./components/PublicationListPage";
import AddPublicationPage from "./components/AddPublicationPage";
import EditPublicationPage from "./components/EditPublicationPage";
import PublicationDetailPage from "./components/PublicationDetailPage"; // Pastikan komponen ini ada
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";

export default function App() {
    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <Routes>
                    {/* Rute Publik */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Rute Terlindungi */}
                    <Route path="/publications" element={<ProtectedRoute><PublicationListPage /></ProtectedRoute>} />
                    <Route path="/publications/add" element={<ProtectedRoute><AddPublicationPage /></ProtectedRoute>} />
                    <Route path="/publications/edit/:id" element={<ProtectedRoute><EditPublicationPage /></ProtectedRoute>} />
                    <Route path="/publications/:id" element={<ProtectedRoute><PublicationDetailPage /></ProtectedRoute>} />

                    {/* Rute Pengalihan */}
                    <Route path="/" element={<Navigate to="/publications" replace />} />
                    <Route path="*" element={<Navigate to="/publications" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}