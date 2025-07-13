// src/pages/PublicationListPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePublications } from '../context/PublicationContext';

export default function PublicationListPage() {
  const { publications } = usePublications();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-8 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Daftar Publikasi Badan Pusat Statistik
        </h1>
        <p className="text-gray-500 mt-1">Sumber data publikasi terkini</p>
      </header>

      {publications.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada publikasi yang tersedia.</p>
      ) : (
        <div className="relative overflow-x-auto shadow-xl rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-white uppercase bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-center w-16">No</th>
                <th className="px-6 py-3">Judul</th>
                <th className="px-6 py-3">Tanggal Rilis</th>
                <th className="px-6 py-3 text-center">Sampul</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {publications.map((pub, idx) => (
                <tr key={pub.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-center">{idx + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{pub.title}</td>
                  <td className="px-6 py-4 text-gray-600">{pub.releaseDate}</td>
                  <td className="px-6 py-4 text-center">
                    <img
                      src={pub.coverUrl}
                      alt={`Sampul ${pub.title}`}
                      className="h-24 mx-auto rounded shadow"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/100x140?text=Error';
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => navigate(`/publications/edit/${pub.id}`)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded font-semibold"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
