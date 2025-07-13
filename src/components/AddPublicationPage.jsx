// src/pages/AddPublicationPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePublications } from '../context/PublicationContext';
import { uploadImageToCloudinary } from '../services/publicationService';

export default function AddPublicationPage() {
  const { addPublication } = usePublications();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [coverFile, setCoverFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !releaseDate) {
      alert('Judul dan Tanggal Rilis harus diisi!');
      return;
    }

    let coverUrl = '';
    if (coverFile) {
      try {
        coverUrl = await uploadImageToCloudinary(coverFile);
      } catch (err) {
        alert('Gagal upload gambar: ' + err.message);
        return;
      }
    } else {
      coverUrl = `https://placehold.co/200x280/7f8c8d/ffffff?text=${encodeURIComponent(title)}`;
    }

    const newPublication = {
      title,
      releaseDate,
      description,
      coverUrl,
    };

    try {
      await addPublication(newPublication);
      navigate('/publications');
      setTitle('');
      setReleaseDate('');
      setDescription('');
      setCoverFile(null);
    } catch (err) {
      alert('Gagal menambah publikasi: ' + err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Form Tambah Publikasi Baru</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Contoh: Statistik Air Bersih 2025"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
            placeholder="Deskripsi publikasi..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sampul (Gambar)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files[0])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {coverFile && (
            <img
              src={URL.createObjectURL(coverFile)}
              alt="Preview"
              className="h-32 mt-3 rounded shadow"
            />
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
          >
            Tambah
          </button>
        </div>
      </form>
    </div>
  );
}
