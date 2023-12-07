import { deleteFishDataToDjangoAPI } from '../utils/api';

const DeleteComponent = (fish_id) => {
    const handleDelete = async (fishId) => {
    try {
      const response = await deleteFishDataToDjangoAPI(fishId);
      return response;
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  
  return handleDelete(fish_id)
};

export default DeleteComponent;
