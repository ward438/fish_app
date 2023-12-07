import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';

import TextField from '@mui/material/TextField';
import {postWaterBodyToDjangoAPI} from '../../utils/api'

const WaterAddComponent = ({setPosted}) => {

  const [waterSystemName, setWaterSystemName] = React.useState('');
  const [waterBodySize, setWaterBodySize] = React.useState('');
  const [waterType, setWaterType] = React.useState('');
  const waterSizesList = ['Small', 'Medium', 'Large']
  const waterTypeList = ['River', 'Stream', 'Lake', 'Pond']
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ];
  
  const [city ,setCity] = React.useState('')
  const [county, setCounty] = React.useState('')
  const [state, setState] = React.useState('')
  const [access, setAccess] = React.useState('')

  const handleWaterName =(event) => {
    setWaterSystemName(event.target.value)
  }

  const handleWaterSize =(event) => {
    setWaterBodySize(event.target.value)
  }

  const handleWaterType =(event) => {
    setWaterType(event.target.value)
  }

  const handleCity = (event) => {
    setCity(event.target.value)
  }

  const handleCounty = (event) => {
    setCounty(event.target.value)
  }

  const handleStateInput = (event) => {
    setState(event.target.value)
  }

  const handleWaterAccess = (event) => {
    setAccess(event.target.value)
  }

  const handleWaterSubmit = async (e) => {
    try {
      const response = await postWaterBodyToDjangoAPI({
        name: waterSystemName,
        size: waterBodySize,
        type: waterType,
        city: city,
        county: county,
        state: state,
        access: access
      });
      console.log(response)
    } catch (error) {
      console.error('Error posting water system data:', error);
    }
};

  return <>
     <form onSubmit={handleWaterSubmit}>
        <FormControl fullWidth>
            <Box
              component="form"
              sx={{'& > :not(style)': { m: 1, width: '25ch' }}}
              noValidate
              autoComplete="off"
            >
              <TextField 
                id="outlined-basic" 
                label="Enter Water System" 
                variant="outlined"
                value={waterSystemName}
                onChange={handleWaterName}
              />
              <FormControl fullWidth>
                <InputLabel id="water-body-size-select-label">Water Size</InputLabel>
                  <Select
                    labelId="water-body-size-select-label"
                    id="water-body-size"
                    value={waterBodySize}
                    label="water_body_size"
                    onChange={handleWaterSize}
                  >
                    {waterSizesList?.map((size, index) => (<MenuItem key={index} value={size}>{size}</MenuItem>))}
                  </Select>
              </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="fly-type-select-label">Water Type</InputLabel>
                    <Select
                      labelId="water-type-select-label"
                      id="water-type"
                      value={waterType}
                      label="water_type"
                      onChange={handleWaterType}
                    >
                      {waterTypeList?.map((type, index) => (<MenuItem key={index} value={type}>{type}</MenuItem>))}
                    </Select>
                </FormControl>  
              <TextField 
                id="outlined-basic" 
                label="City" 
                variant="outlined"
                value={city}
                onChange={handleCity}
              /> 
              <TextField 
                id="outlined-basic" 
                label="County" 
                variant="outlined"
                value={county}
                onChange={handleCounty}
              /> 
              <FormControl fullWidth>
                  <InputLabel id="fly-type-select-label">State</InputLabel>
                    <Select
                      labelId="water-type-select-label"
                      id="water-type"
                      value={state}
                      label="water_type"
                      onChange={handleStateInput}
                    >
                      {states?.map((state, index) => (<MenuItem key={index} value={state}>{state}</MenuItem>))}
                    </Select>
                </FormControl> 
              <TextField 
                id="outlined-basic" 
                label="Access" 
                variant="outlined"
                value={access}
                onChange={handleWaterAccess}
              />                  
            </Box>
        </FormControl>
        <button
            style={{}} 
            type="submit" 
        >
            Submit Data
      </button>
    </form>
  </>    

};

export default WaterAddComponent;
