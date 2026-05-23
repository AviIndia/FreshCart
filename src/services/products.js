import api from './api';
export const productBycategory = async ( id,page = 1,sort = "latest",limit = 12)=>{

    try {
        const res = await api.get(`product/getProductsByCategory.php?category_id=${id}?page=${page}&sort=${sort}&limit=${limit}`);
        return res.data;
    } catch (error) {
      console.log(error)  
    }
}