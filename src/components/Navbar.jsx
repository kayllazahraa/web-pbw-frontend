import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { id: 'publications', label: 'Daftar Publikasi', path: '/publications' },
  { id: 'add', label: 'Tambah Publikasi', path: '/publications/add' }, // ✅ path disesuaikan
];

function BpsLogo() {
  return (
    <img
      src="https://i.postimg.cc/dVwcbSWF/bps-logo.png"
      alt="BPS Logo"
      className="h-12 w-12"
    />
  );
}

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const confirmed = confirm('Apakah Anda yakin ingin logout?');
    if (!confirmed) return;

    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch('http://localhost:8000/api/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
      } catch (err) {
        console.error('Gagal logout:', err);
      }

      localStorage.removeItem('token');
    }

    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-[#0369A1] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo dan Judul */}
          <div className="flex items-center space-x-3">
            <BpsLogo />
            <span className="text-white text-base md:text-lg font-bold tracking-wider hidden sm:block">
              BADAN PUSAT STATISTIK
            </span>
          </div>

          {/* Navigasi dan Logout */}
          {isLoggedIn && (
            <div className="flex items-center space-x-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-300 border border-transparent ${
                      isActive
                        ? 'bg-slate-200 text-sky-900 shadow-inner'
                        : 'text-sky-100 hover:bg-sky-700 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-semibold transition-all duration-300 border border-transparent text-sky-100 hover:bg-sky-700 hover:text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
