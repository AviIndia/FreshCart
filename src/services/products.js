import api from './api';
export const productBycategory = async ( id,page = 1,sort = "latest",limit = 12)=>{

    try {
        const res = await api.get(`product/getProductsByCategory.php?category_id=${id}?page=${page}&sort=${sort}&limit=${limit}`);
        return res.data;
    } catch (error) {
      console.log(error)  
    }
}

export const productSingle = async (id)=>{
    try {
        const res = await api.get(`product/getProductDetails.php?id=${id}`);
        return res.data;

    } catch (error) {
        console.log(error)
    }
}

export const getAllProducts = async ()=>{
    try {
        const res = await api.get(`product/getProducts.php`);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getHomeProducts = async ()=>{
    try {
        const res = await api.get(`product/getHomeProducts.php`);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

/* ============ SEARCH PRODUCT ================= */
export const searchProduct = async (keyword) => {

   const res = await api.get(
      `/product/search.php?q=${keyword}`
   );

   return res.data;
};