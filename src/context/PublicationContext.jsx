// src/context/PublicationContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { publicationService } from '../services/publicationService';
import { useAuth } from '../hooks/useAuth';

const PublicationContext = createContext(null);

const PublicationProvider = ({ children }) => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const getPublications = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await publicationService.getPublications(token);
      setPublications(data);
      setError(null);
    } catch (err) {
      console.error('Gagal fetch publikasi:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPublications();
  }, [token]);

  const getPublicationById = async (id) => {
    if (!token) return null;
    try {
      return await publicationService.getPublicationById(id, token);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const addPublication = async (newPub) => {
    try {
      const added = await publicationService.addPublication(newPub, token);
      setPublications((prev) => [added, ...prev]);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const editPublication = async (id, updatedPub) => {
    try {
      const updated = await publicationService.updatePublication(id, updatedPub, token);
      setPublications((prev) =>
        prev.map((pub) => (pub.id === id ? updated : pub))
      );
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deletePublication = async (id) => {
    try {
      await publicationService.deletePublication(id, token);
      setPublications((prev) => prev.filter((pub) => pub.id !== id));
      setError(null);
    } catch (err) {
      console.error('Gagal hapus publikasi:', err);
      setError(err.message);
      throw err;
    }
  };

  return (
    <PublicationContext.Provider
      value={{
        publications,
        loading,
        error,
        addPublication,
        editPublication,
        deletePublication,
        getPublications,
        getPublicationById,
      }}
    >
      {children}
    </PublicationContext.Provider>
  );
};

const usePublications = () => useContext(PublicationContext);

export { PublicationContext, PublicationProvider, usePublications };