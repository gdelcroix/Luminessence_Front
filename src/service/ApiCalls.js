import axios from 'axios';

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
