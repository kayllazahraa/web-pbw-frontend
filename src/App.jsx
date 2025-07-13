// src/App.jsx
import React from "react";
import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import PublicationListPage from "./components/PublicationListPage";
import AddPublicationPage from "./components/AddPublicationPage";
import EditPublicationPage from "./components/EditPublicationPage";
import PublicationDetailPage from "./components/PublicationDetailPage";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";


export default function App() {
    return (
        <div className="bg-brand-light min-h-screen font-sans text-text-primary">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <Routes>
                    {/* Public Route */}
                    <Route path="/login" element={<LoginPage />} />
                    {/* Protected Routes */}
                    <Route path="/publications" element={<ProtectedRoute><PublicationListPage /></ProtectedRoute>} />
                    <Route path="/publications/add" element={<ProtectedRoute><AddPublicationPage /></ProtectedRoute>} />
                    <Route path="/publications/edit/:id" element={<ProtectedRoute><EditPublicationPage /></ProtectedRoute>} />
                    <Route path="/publications/:id" element={<ProtectedRoute><PublicationDetailPage /></ProtectedRoute>} />
                    {/* Redirect Routes */}
                    <Route path="/" element={<Navigate to="/publications" replace />} />
                    <Route path="*" element={<Navigate to="/publications" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}