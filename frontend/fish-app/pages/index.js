import { useState } from 'react';
import * as React from 'react';
import MainMenu from './components/header';
import FishCard from './components/fishCard'
import Box from '@mui/material/Box';
import FishPostComponent from './postData'
import FlyAddComponent from './components/flyAdd'
import WaterAddComponent from './components/waterAdd';
import {fetchFlyDataFromAPI, fetchWaterDataFromAPI, fetchFishDataFromAPI} from '../utils/api'

const Home = () => {
    const [deleteTrue, setDeleteTrue] = useState(false)
    const [showNewPage, setShowNewPage] = useState(false);
    const [showPostPage, setShowPostPage] = useState(false);
    const [posted, setPosted] = useState(false);
    const [postedLength, setPostedLength] = useState(null);
    const [flyAddOpen, setAddFlyOpen] = useState(false);
    const [waterAddOpen, setWaterAddOpen] = useState(false);
    const [flyData, setFlyData] = React.useState([]);
    const [waterData, setWaterData] = React.useState([]);
    const [cardCount, setCardCount ] = useState(null)
    const [fishData, setFishData] = useState(null)
    const [cardData, setCardData] = React.useState([{fishData : null}])


    const getFlies = async () => {
        const fetchReturn = await fetchFlyDataFromAPI();            
            return setFlyData(fetchReturn)
      }

    const getWater = async () => {
        const fetchReturn = await fetchWaterDataFromAPI();
            return setWaterData(fetchReturn)
    }

    const fetchFishData = async () => {
        const fishResult = await fetchFishDataFromAPI();
        setCardData([{fishData : fishResult}])
        setCardCount(cardData[0]?.fishData?.length);    
        setFishData(cardData[0]?.fishData)    
    };

    const handlePostReload = async () => {
        setPosted(false)
        setCardCount((prevCardCount) => prevCardCount + 1)
        if (posted && postedLength > 0){
            const fetchReturn = await fetchFishDataFromAPI();
            return fetchReturn
        }
    }

    const handleDeleteReload = async () => {        
        setCardCount((prevCardCount) => prevCardCount - 1)
        if (deleteTrue){
            const fetchReturn = await fetchFishDataFromAPI();            
            return fetchReturn
        }
    }   


    React.useEffect(() => {
        getFlies();
        getWater();
    },[])    

    React.useEffect(() => {
        fetchFishData();  
    },[cardCount])

    React.useEffect(() => {
        handlePostReload();
    },[posted])

    return (
        <Box>
            <Box>
                <MainMenu setShowNewPage={setShowNewPage} setShowPostPage={setShowPostPage} postedLength={postedLength} showNewPage={showNewPage} showPostPage={showPostPage} flyAddOpen={flyAddOpen} setAddFlyOpen={setAddFlyOpen} waterAddOpen={waterAddOpen} setWaterAddOpen={setWaterAddOpen}/>
            </Box>
            <Box>
                {showPostPage == !false ?                
                    <FishPostComponent posted={posted} setPosted={setPosted} setPostedLength={setPostedLength} getFlies={getFlies} flyData={flyData} waterData={waterData}/>                 
                : ''}
                {flyAddOpen == !false ?
                    <FlyAddComponent/> : ''}
                {waterAddOpen == !false ?
                    <WaterAddComponent/> : ''    
                }

                {showNewPage == !false ?  
                <Box>                       
                    <FishCard posted={posted} postedLength={postedLength} setPosted={setPosted} cardCount={cardCount} setCardCount={setCardCount} deleteTrue={deleteTrue} setDeleteTrue={setDeleteTrue} fishData={fishData} setFishData={setFishData} cardData={cardData} setCardData={setCardData} handleDeleteReload={handleDeleteReload}/>                        
                </Box>
                : ''}          
            </Box>
        </Box>
  );
};

export default Home;
