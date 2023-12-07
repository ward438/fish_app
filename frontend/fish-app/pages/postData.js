import * as React from 'react';
import { useState } from 'react';
import { postFishDataToDjangoAPI, postWaterDataToDjangoAPI, postFlyDataToDjangoAPI, fetchWaterSourceFromAPI } from '../utils/api';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

const FishPostComponent = ({setPosted, flyData}) => {
  const numberRange = Array.from({ length: 30 }, (_, index) => index + 1);
  const temperatureRange = Array.from({ length: 41 }, (_, index) => index + 30);
  const airTempRange = Array.from({ length: 106   }, (_, index) => index);
  const waterConditionsColor = ['clear', 'stained', 'brown', 'chocolate milk']  
  const [fishes, setFishes] = React.useState('');
  const [fishSize, setFishSize] = React.useState(1);
  const [calValue, setCalValue] = React.useState('');
  const [newCalValue, setNewCalValue] = React.useState('');
  const [waterID, setWaterID] = React.useState('');
  const [flySize, setFlySize] = React.useState(null);
  const dateString = `${calValue?.$d }`;
  const [flyLanded, setFlyLanded] = React.useState('');
  const [waterCFS, setWaterCFS] = React.useState('')
  const [waterSystemData, setWaterSystemData] = useState({
    water_system_id: null,
    color: '',
    conditions: '',
    temp: null,
    cfs: null,
    air_temp: null,
  });
  const [waterTemp, setWaterTemp] = React.useState('')
  const [waterSource, setWaterSource] = React.useState([])
  const [waterColor, setWaterColor] = React.useState('')
  const [airTemp, setAirTemp] = React.useState('')

  const formatDate = (dateString) => {
    const date = new Date(dateString);    
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();    
    return setNewCalValue(`${year}-${month}-${day}`);
  };

  const timeOfDayOverride = (newCalValue) => {
    return (`${newCalValue} 00:00:00`)
  };
  
 
  const handleFishSubmit = async ({water_system_condition_id}) => {

    try {
      const response = await postFishDataToDjangoAPI({
        landed_fly_id: flyLanded,
        water_system_condition_id: water_system_condition_id,
        fish_type: fishes,
        date_caught: newCalValue,
        time_of_day: timeOfDayOverride(newCalValue),
        fish_size: fishSize
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
      const response = await postWaterDataToDjangoAPI({
        water_system_id: waterID,
        color: waterColor,
        conditions: waterSystemData.conditions,
        temp: waterTemp,
        cfs: waterCFS,
        air_temp: airTemp
      }).then(async (response)=>{
        console.log('Water system data submitted successfully:', response);
        await handleFishSubmit({water_system_condition_id: response.id});
      })   
    } catch (error) {
      console.error('Error posting water system data:', error);
    }
  };

  const getWaters = async (e) => {
    const fetchReturn = await fetchWaterSourceFromAPI();
    return setWaterSource(fetchReturn)
  }

  const handleChange = (e, setDataFunction) => {
    setDataFunction(prev=>({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCFSChange = (event) => {
    setWaterCFS(event.target.value)
  }

  const handleFishDropDownChange = (event) => {
    setFishes(event.target.value);
  };
  const handleFishSizeDropDownChange = (e) => {
    setFishSize(e.target.value);
  };

  const handleWaterTempDropDownChange = (event) => {
    setWaterTemp(event.target.value)
  }

  const handleWateColorDropDownChange = (event) => {
    setWaterColor(event.target.value)
  }

  const handleAirTempDropDownChange = (event) => {
    setAirTemp(event.target.value)
  }
  const handleFlyLandedDropDownChange = (event) => {
    setFlyLanded(event.target.value);
  };
  const handleWaterSystemIdDropDownChange = (event) => {
    setWaterID(event.target.value);
  };

  React.useEffect(() => {
    formatDate(dateString);
    getWaters();
  },[dateString])



  return (
    <form onSubmit={handleWaterSubmit}>  
      <Box sx={{columnCount: 5, gap: '20px'}}>
        {/* fish size */}
        <FormControl fullWidth>
          <InputLabel id="fish-select-select-label">Fish Type</InputLabel>
          <Select
            labelId="fish-select-select-label"
            id="fish-select"
            value={fishes}
            label="fish_type"
            onChange={(e) => handleFishDropDownChange(e, setFishes)}
          >
            <MenuItem value={'Rainbow'}>Rainbow</MenuItem>
            <MenuItem value={'Cutthroat'}>Cutthroat</MenuItem>
            <MenuItem value={'Cutbow'}>Cutbow</MenuItem>
            <MenuItem value={'Brown'}>Brown</MenuItem>
          </Select>
        </FormControl>
        {/* fish size */}
        <FormControl fullWidth>
          <InputLabel id="fish-size-select-label">Fish Size</InputLabel>
          <Select
            labelId="fish-size-select-label"
            id="fish-size"
            value={fishSize}
            label="fish_size"
            onChange={handleFishSizeDropDownChange}
          >
            {numberRange.map((number) => (<MenuItem key={number} value={number}>
                {number}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* calendar */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            value={newCalValue} 
            onChange={(newValue) => (setCalValue(newValue))}
            TextField={(params) => <TextField {...params.inputProps} />}
          />
        </LocalizationProvider>
        {/* fly selection */}
        <FormControl fullWidth>
          <InputLabel id="fly-landed-select-label">Fly Landed</InputLabel>
          <Select
            labelId="fly-landed-select-label"
            id="fly-landed"
            value={flyLanded}
            label="fly_landed"
            onChange={handleFlyLandedDropDownChange}
          >
            {flyData?.map((fly, index) => {
              {flySize == null ? setFlySize(fly?.size) : ''}
              return (
                <MenuItem key={index} value={fly?.id}>                  
                  #{fly?.size}  {fly?.name} <span style={{color: 'red'}}>{fly.nymph_fly == true ? 'nymph' : fly.dry_fly == true ? 'dry' : fly.streamer_fly == true ? 'streamer' : ''}</span>
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        {/* water selection */}        
        <FormControl fullWidth>
          <InputLabel id="water-id-select-label">Water System</InputLabel>
          <Select
            labelId="water-id-select-label"
            id="water-id"
            value={waterID}
            label="water_id"
            onChange={handleWaterSystemIdDropDownChange}
          >
            {waterSource?.map((item, index) => {
              return (
                <MenuItem key={item?.id} value={item?.id}>
                  {item?.name} - {item?.size} - {item?.type} - {item?.city} -  {item?.state} - {item?.water_system?.access}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="water-id-select-label">Water Temp</InputLabel>
          <Select
            labelId="water-temp-select-label"
            id="water-temp"
            value={waterTemp}
            label="water_temp"
            onChange={handleWaterTempDropDownChange}
          >
            {temperatureRange?.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              )
            })}
          </Select>
          </FormControl>
            <FormControl fullWidth>
          <InputLabel id="water-color-select-label">Water Color</InputLabel>
          <Select
            labelId="water-color-select-label"
            id="water-color"
            value={waterColor}
            label="water_color"
            onChange={handleWateColorDropDownChange}
          >
            {waterConditionsColor?.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              )
            })}
          </Select>
          </FormControl>                   
          <FormControl fullWidth>
          <InputLabel id="air-temp-select-label">Air Temp</InputLabel>
          <Select
            labelId="air-temp-select-label"
            id="air-temp"
            value={airTemp}
            label="air_temp"
            onChange={handleAirTempDropDownChange}
          >
            {airTempRange?.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              )
            })}
          </Select>
          </FormControl>
          <div>Water conditions: </div>
          <input 
            type="text" 
            name="conditions" 
            value={waterSystemData?.conditions} 
            onChange={(e) => handleChange(e, setWaterSystemData)}/>  
          <div>Water CFS: </div>
          <input 
            type="text" 
            name="conditions" 
            value={waterCFS} 
            onChange={handleCFSChange}/>         
        
      </Box>
      <button
        style={{}} 
        type="submit" 
      >
        Submit Data
      </button>
    </form>      
    
  );
};

export default FishPostComponent;
