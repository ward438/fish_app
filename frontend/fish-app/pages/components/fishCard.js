import { useEffect } from 'react';
import { fetchFishDataFromAPI} from '../../utils/api';
import DeleteComponent from '../deleteItem'
import DeleteConfModal from './deleteConfModal'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MoreInfo  from './moreInfo';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';


function FishCard({setCardCount, setDeleteTrue, fishData, cardData, setCardData, handleDeleteReload}) {  
    const CardMap = () => {
        return <Box sx={{display: 'flex', flexWrap: 'wrap' , gap: '20px'}}>
            {fishData?.map((item, index) => {
                    return <Card key={index} sx={{minWidth: '300px', color: 'black', padding: '10px', textTransform: 'uppercase'}} >
                        {item.fish_type.toUpperCase() === 'brown'.toUpperCase() ? <CardMedia
                        sx={{ height: 140 }}
                        image="https://www.ndow.org/wp-content/uploads/2021/10/salmo_trutta-scaled.jpeg"                        
                        title={item.fish_type}
                    /> : ''}
        
                        {item.fish_type.toUpperCase() === 'rainbow'.toUpperCase() ? <CardMedia
                        sx={{ height: 140 }}
                        image="https://www.bobwhitestudio.com/store/wp-content/uploads/2016/11/Rainbow-Trout-Print.jpg"
                        title={item.fish_type}
                    /> : ''}
        
                        {item.fish_type.toUpperCase() === 'cutbow'.toUpperCase() ? <CardMedia
                        sx={{ height: 140 }}
                        image="https://ascentflyfishing.com/product_images/uploaded_images/cutbow.jpg"
                        title={item.fish_type}
                    /> : ''}
        
                        {item.fish_type.toUpperCase() === 'cutthroat'.toUpperCase() ? <CardMedia
                        sx={{ height: 140 }}
                        image="https://i0.wp.com/coloradooutdoorsmag.com/wp-content/uploads/2022/11/cutthroat-trout-in-full-spawning-colors-1.jpg?ssl=1"
                        title={item?.fish_type}
                    /> : ''}
                   
                    <CardContent>
                        <Typography gutterBottom variant="h7" component="div">
                            <Box sx={{display: 'flex', flexWrap: 'wrap' , justifyContent: 'space-between'}}>
                                <Box>
                                    {item.fish_type}
                                </Box>
                                <Box sx={{fontStyle: 'italic'}}>
                                    {`${item?.date_caught}`}
                                </Box>
                            </Box>                        
                        </Typography>
                        <Typography variant="body2" color="text.primary" fontStyle="italic">
                            <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                                <Box sx={{transform: 'rotate(29deg)', marginTop: '22px'}}>
                                    <img src='/../../yellowRuler.png' title='ruler' style={{maxHeight: '25px'}}/>                          
                                </Box>
                                <Box sx={{fontSize: '27px', position: 'absolute', marginLeft: '0px'}}>
                                    {`${item?.fish_size}"`}                            
                                </Box>
                            </Box>
                        </Typography>
                        <Typography variant="body2" color="text.primary" fontStyle="italic">
                            <Box sx={{}}>
                            {`#${item?.landed_fly?.size}`}  {`${item?.landed_fly?.name}`}                     
                            </Box>       
                            <Box>
                                {item?.landed_fly?.nymph_fly == true ? <span style={{color: 'red'}}>Nymph</span> : item?.landed_fly?.dry_fly ? <span style={{color: 'red'}}>Dry</span> : item?.landed_fly?.streamer_fly ? <span style={{color: 'red'}}>Streamer</span> : ''}
                            </Box>
                            <Tooltip title={item?.landed_fly.description} placement="top-start">
                                <Button sx={{marginLeft: '-10px', fontSize: '10px', color:'#1976d2d1'}}>Fly Description</Button>
                            </Tooltip>             
                        </Typography>
                    </CardContent>                        
                    <CardActions>
                        <Box sx={{display: 'flex', flexWrap: 'wrap' , gap: '20px'}}>
                            <MoreInfo water_system_condition={item?.water_system_condition}/>
                            <DeleteConfModal DeleteComponent={DeleteComponent} setDeleteTrue={setDeleteTrue} handleDeleteReload={handleDeleteReload} item={item}/>                
                        </Box>
                    </CardActions>
                    </Card>               
                })}
        </Box>
    }
    
    useEffect(() => {
        const fetchFishData = async () => {
            const fishResult = await fetchFishDataFromAPI();
            setCardData([{ fishData: fishResult }]);
        };
    
        fetchFishData();
    }, [setCardData]);

    useEffect(() => {
        if (cardData[0]?.fishData) {
            setCardCount(cardData[0].fishData.length);
        }
    }, [cardData, setCardCount]);


  return <CardMap/>
  };


export default FishCard;
