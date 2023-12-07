// Assuming postFishDataToDjangoAPI and postWaterDataToDjangoAPI are functions that make API calls
// Also, assuming these functions handle setting the correct headers and converting data to JSON

import { useState } from 'react';
import { postFishDataToDjangoAPI, postWaterDataToDjangoAPI } from '../utils/api';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


const FishPostComponent = ({ setPosted }) => {
  const [fishFormData, setFishFormData] = useState({
    fish_type: '',
    fish_size: null,
    date_caught: '',
    time_of_day: '',
  });

  const [waterSystemData, setWaterSystemData] = useState({
    water_system: '',
    color: '',
    conditions: '',
    temp: null,
    cfs: null,
    air_temp: null,
  });

  const handleFishSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make sure 'id' and other required fields are present in the request
      const response = await postFishDataToDjangoAPI({
        landed_fly_id: /* Provide a valid ID here */,
        water_system_condition_id: /* Provide a valid ID here */,
        fish_type: fishFormData.fish_type,
        date_caught: fishFormData.date_caught,
        time_of_day: fishFormData.time_of_day,
        // Include other fish form fields as needed
      });

      console.log('Fish data submitted successfully:', response);
      setPosted(true);
    } catch (error) {
      console.error('Error posting fish data:', error);
    }
  };

  const handleWaterSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make sure 'id' and other required fields are present in the request
      const response = await postWaterDataToDjangoAPI({
        // Include water system form fields
      });

      console.log('Water system data submitted successfully:', response);

      // Assuming you want to submit fish data after water data is submitted
      await handleFishSubmit(e);
    } catch (error) {
      console.error('Error posting water system data:', error);
    }
  };

  const handleChange = (e, setDataFunction) => {
    setDataFunction({
      ...setDataFunction,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleWaterSubmit}>
      <Box sx={{ columnCount: 5, gap: '20px' }}>
        <div>Fish Type: </div>
        <input
          type="text"
          name="fish_type"
          value={fishFormData.fish_type}
          onChange={(e) => handleChange(e, setFishFormData)}
        />
        {/* Other fish form fields go here */}
        <div>Water Name: </div>
        <input
          type="text"
          name="water_system"
          value={waterSystemData.water_system}
          onChange={(e) => handleChange(e, setWaterSystemData)}
        />
        {/* Other water form fields go here */}
      </Box>
      <button style={{}} type="submit">
        Submit Data
      </button>
    </form>
  );
};

export default FishPostComponent;
