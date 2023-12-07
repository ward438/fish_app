import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Replace with your Django API base URL

export const fetchFishDataFromAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/catches/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const fetchWaterDataFromAPI = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/water_systems_conditions/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  export const fetchWaterSourceFromAPI = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/water_systems/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };


export const fetchFlyDataFromAPI = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/flies/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
};

export const postFlyDataToDjangoAPI = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/flies/`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    return null;
  }
};

export const postFishDataToDjangoAPI = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/catches/`, data);
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return null;
    }
};

export const postWaterDataToDjangoAPI = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/water_systems_conditions/`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    return null;
  }
};

export const postWaterBodyToDjangoAPI = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/water_systems/`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    return null;
  }
};

export const deleteFishDataToDjangoAPI = async (fishId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/catches/${fishId}`, {
      method: 'DELETE',
      headers: {
        // 'Authorization': 'Bearer YOUR_TOKEN',
        'Content-Type': 'application/json' 
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // return response.json(); // Return response if needed
  } catch (error) {
    throw new Error('Error during deletion:', error);
  }
};
  
