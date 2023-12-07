import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { postFlyDataToDjangoAPI } from '@/utils/api';

const FlyAddComponent = ({setPosted}) => {
    const [flyValue, setFlyValue] = useState('');
    const [flySize, setFlySize] = useState('');
    const [flyDescription, setFlyDescription] = useState('');
    const [nymphFly, setNymphFly] = useState(false);
    const [dryFly, setDryFly] = useState(false);
    const [streamerFly, setStreamerFly] = useState(false);
    const [flyType, setFlyType] = useState('');
    const flyTypeList = ['nymph', 'dry', 'streamer']
    
    const handleInputChange = (event) => {
        setFlyValue(event.target.value);
    };

    const handleFlySize = (event) => {
        setFlySize(event.target.value)
    }

    const handleFlyDescriptiom =(event) => {
        setFlyDescription(event.target.value)
    }

    const handleFlyType = (flyType) => {
        if (flyType === 'nymph'){
          return (setNymphFly(true), setDryFly(false), setStreamerFly(false))
        } else if(flyType == 'dry'){
          return (setDryFly(true), setNymphFly(false), setStreamerFly(false))
        } else if(flyType == 'streamer') {
          return (setStreamerFly(true), setDryFly(false), setNymphFly(false))
        } else return
      }

      const handleFlyTypeDropDownChange = (e) => {
        setFlyType(e.target.value)
      };
      
    const handleFlySubmit = async (e) => {
        try {
          const response = await postFlyDataToDjangoAPI({
            name: flyValue,
            size: flySize,
            description: flyDescription,
            dry_fly: dryFly,
            nymph_fly: nymphFly,
            streamer_fly: streamerFly
          });
          console.log(response)
        } catch (error) {
          console.error('Error posting water system data:', error);
        }
    };

    React.useEffect(()=> {
        handleFlyType(flyType)
    },[flyType])

  return <>
    <form onSubmit={handleFlySubmit}>
        <FormControl fullWidth>
            <Box
              component="form"
              sx={{'& > :not(style)': { m: 1, width: '25ch' }}}
              noValidate
              autoComplete="off"
            >
              <TextField 
                id="outlined-basic" 
                label="Enter Fly" 
                variant="outlined"
                value={flyValue}
                onChange={handleInputChange}
              />
                <TextField 
                  id="outlined-basic" 
                  label="Fly Size" 
                  variant="outlined"
                  value={flySize}
                  onChange={handleFlySize}
                />
                <TextField 
                  id="outlined-basic" 
                  label="Description" 
                  variant="outlined"
                  value={flyDescription}
                  onChange={handleFlyDescriptiom}
                />
                <FormControl fullWidth>
                  <InputLabel id="fly-type-select-label">Fly Type</InputLabel>
                    <Select
                      labelId="fly-type-select-label"
                      id="fly-type"
                      value={flyType}
                      label="fly_type"
                      onChange={handleFlyTypeDropDownChange}
                    >
                      {flyTypeList.map((type, index) => (<MenuItem key={index} value={type}>{type}</MenuItem>))}
                    </Select>
                </FormControl>                    
            </Box>
        </FormControl>
        <button
            style={{}} 
            type="submit" 
        >
            Submit
      </button>
    </form>
  </>    

};

export default FlyAddComponent;
