import axios from 'axios';

export const img_url = 'http://localhost:3001';
// URL de l'API pour les appels à l'API
const API_URL = 'http://localhost:3001/api'; // URL de l'API

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/client/tous`);
    console.log('apicalls getAllUsers :', response);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    throw error;
  }
};

export const inscription = async (user) => {
  try {
    console.log('inscription :', user);
    const response = await axios.post(`${API_URL}/client/add`, user);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    throw error;
  }
};

export const tousProduits = async () => {
  try {
    const response = await axios.get(`${API_URL}/produits/`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits :', error);
    throw error;
  }
};

export const formulaireContact = async (formulaire) => {
  try {
    const response = await axios.post(`${API_URL}/contact`, formulaire);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire de contact :", error);
    throw error;
  }
};

export const modulesListe = async () => {
  try {
    const response = await axios.get(`${API_URL}/modules/`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des modules :', error);
    throw error;
  }
};

export const modulesChanger = async (id, status) => {
  try {
    const response = await axios.put(`${API_URL}/modules/:${id}`, status);
    return response.data;
  } catch (error) {
    console.error("Erreur lors du changement d'état du module :", error);
    throw error;
  }
};

export const histoReservations = async (req, res) => {
  try {
    res = await axios.get(`${API_URL}/reservations/search`, req.data);
    return res;
  } catch (error) {
    console.error('Erreur lors de la récupération des historiques des réservations :', error);
    throw error;
  }
};

export const prestaListe = async (params) => {
  try {
    console.log('params front', params);
    const response = await axios.get(`${API_URL}/produits/search`, { params });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des prestations :', error);
    throw error;
  }
};

export const prestaModif = async (data) => {
  try {
    console.log('prestaModif data:', data);
    const response = await axios.put(`${API_URL}/produits/update/${data.ID_Produit}`, data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des prestations :', error);
    throw error;
  }
};

export const prestaSupprime = async (id) => {
  try {
    await axios.delete(`${API_URL}/produits/delete/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression d'une prestation :", error);
    throw error;
  }
  return true;
};

export const prestaAjout = async (data) => {
  try {
    console.log('prestaAjout data:', data);
    const response = await axios.post(`${API_URL}/produits/add`, data);
    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'une prestation :', error);
    throw error;
  }
};

