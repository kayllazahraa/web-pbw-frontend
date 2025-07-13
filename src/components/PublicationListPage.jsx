import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePublications } from '../context/PublicationContext';

export default function PublicationListPage() {
  const {
    publications,
    getPublications,
    deletePublication
  } = usePublications();

  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`/publications/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/publications/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm('Yakin ingin menghapus publikasi ini?');
    if (!confirmed) return;

    try {
      await deletePublication(id);
      await getPublications();
      alert('Publikasi berhasil dihapus.');
    } catch (err) {
      console.error('Gagal menghapus:', err);
      alert('Terjadi kesalahan saat menghapus.');
    }
  };

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
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => handleDetail(pub.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => handleEdit(pub.id)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pub.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Hapus
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
