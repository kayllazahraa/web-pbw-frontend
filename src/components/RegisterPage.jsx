// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !name || !password) {
      setErrorMsg('Semua kolom wajib diisi!');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || 'Registrasi gagal. Email mungkin sudah digunakan.');
        return;
      }

      setSuccessMsg(`Akun ${data.user.name} berhasil didaftarkan!`);
      setTimeout(() => navigate('/login'), 2000); // ✅ pakai route
    } catch (err) {
      setErrorMsg('Gagal terhubung ke server.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white shadow-lg p-8 rounded-xl border">
      <h2 className="text-2xl font-bold text-center text-sky-800 mb-6">Daftar Akun Baru</h2>

      {errorMsg && (
        <div className="mb-4 text-red-600 text-sm text-center font-medium">{errorMsg}</div>
      )}
      {successMsg && (
        <div className="mb-4 text-green-600 text-sm text-center font-medium">{successMsg}</div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Masukkan nama"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Masukkan email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Masukkan password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sky-800 hover:bg-sky-900 text-white py-2 rounded font-semibold"
        >
          Daftar
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-gray-600">
        Sudah punya akun?{' '}
        <button
          onClick={() => navigate('/login')}
          className="text-sky-700 hover:text-blue-900"
        >
          Masuk di sini
        </button>
      </p>
    </div>
  );
}
