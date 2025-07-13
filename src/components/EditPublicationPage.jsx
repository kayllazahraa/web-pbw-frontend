// src/pages/EditPublicationPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePublications } from '../context/PublicationContext';

export default function EditPublicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { publications, fetchPublications } = usePublications();

  const publication = publications.find((pub) => pub.id === parseInt(id));

  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [coverFile, setCoverFile] = useState(null);

  useEffect(() => {
    if (publication) {
      setTitle(publication.title);
      setReleaseDate(publication.releaseDate);
    }
  }, [publication]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let coverUrl = publication.coverUrl;
    if (coverFile) {
      coverUrl = URL.createObjectURL(coverFile);
    }

    const updatedPub = {
      title,
      releaseDate,
      description: publication.description || '',
      coverUrl,
    };

    try {
      const res = await fetch(`http://localhost:8000/api/publikasi/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPub),
      });

      if (!res.ok) throw new Error('Gagal update publikasi');
      await fetchPublications();
      navigate('/publications');
    } catch (err) {
      console.error('Update gagal:', err);
      alert('Terjadi kesalahan saat update publikasi.');
    }
  };

  if (!publication) {
    return <p className="text-center text-red-500 mt-10">Publikasi tidak ditemukan.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Publikasi</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Rilis</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sampul</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files[0])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <img
            src={coverFile ? URL.createObjectURL(coverFile) : publication.coverUrl}
            alt="Preview"
            className="h-32 mt-3 rounded shadow"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate('/publications')}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-sky-700 hover:bg-sky-800 text-white px-6 py-2 rounded"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
