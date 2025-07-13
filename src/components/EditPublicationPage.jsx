// src/components/EditPublicationPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePublications } from '../context/PublicationContext';
import { uploadImageToCloudinary } from '../services/publicationService';

export default function EditPublicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPublicationById, editPublication } = usePublications();

  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [currentCoverUrl, setCurrentCoverUrl] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        setLoading(true);
        const pub = await getPublicationById(parseInt(id));
        if (pub) {
          setTitle(pub.title);
          setReleaseDate(pub.releaseDate);
          setDescription(pub.description || '');
          setCurrentCoverUrl(pub.coverUrl);
        }
      } catch (err) {
        console.error('Gagal mengambil data publikasi:', err);
        alert('Gagal mengambil data publikasi.');
      } finally {
        setLoading(false);
      }
    };
    fetchPublication();
  }, [id, getPublicationById]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let coverUrl = currentCoverUrl;
    if (coverFile) {
      try {
        coverUrl = await uploadImageToCloudinary(coverFile);
      } catch (err) {
        alert('Gagal upload gambar: ' + err.message);
        return;
      }
    }

    const updatedPub = { title, releaseDate, description, coverUrl };

    try {
      await editPublication(parseInt(id), updatedPub);
      alert('Publikasi berhasil diperbarui.');
      navigate('/publications');
    } catch (err) {
      console.error('Update gagal:', err);
      alert('Terjadi kesalahan saat update publikasi.');
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Memuat data...</p>;
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ganti Sampul</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files[0])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <p className="text-xs text-gray-500 mt-1">Biarkan kosong jika tidak ingin mengganti sampul.</p>
          <img
            src={coverFile ? URL.createObjectURL(coverFile) : currentCoverUrl}
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