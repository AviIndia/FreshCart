import api from './api';
export const productBycategory = async (id)=>{

    try {
        const res = await api.get(`product/getProductsByCategory.php?category_id=${id}`);
        return res.data;
    } catch (error) {
      console.log(error)  
    }
}