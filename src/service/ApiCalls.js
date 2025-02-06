import axios from 'axios';

export const img_url = 'http://localhost:3001'
// URL de l'API pour les appels à l'API
const API_URL = 'http://localhost:3001/api'; // URL de l'API

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/client/tous`);
    console.log('apicalls getAllUsers :',response)
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
