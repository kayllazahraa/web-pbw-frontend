// src/components/PublicationDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePublications } from '../context/PublicationContext';

export default function PublicationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPublicationById } = usePublications();

  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getPublicationById(parseInt(id));
        setPublication(data);
      } catch (error) {
        console.error("Gagal memuat detail:", error);
        alert("Gagal memuat detail publikasi.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id, getPublicationById]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Memuat...</p>;
  }

  if (!publication) {
    return <p className="text-center text-red-500 mt-10">Publikasi tidak ditemukan.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img
            src={publication.coverUrl}
            alt={`Sampul ${publication.title}`}
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{publication.title}</h1>
          <p className="text-md text-gray-500 mb-6">
            Tanggal Rilis: {new Date(publication.releaseDate).toLocaleDateString('id-ID', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </p>
          <div className="prose max-w-none text-gray-700">
            <p>{publication.description || 'Tidak ada deskripsi.'}</p>
          </div>
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => navigate('/publications')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
            >
              Kembali
            </button>
            <button
              onClick={() => navigate(`/publications/edit/${publication.id}`)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}