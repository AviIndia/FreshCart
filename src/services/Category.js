import api from "./api"

export const getCategory = async ()=>{
    try {
        const res = await api.get("/category/getCategories.php");
        return res.data;
    } catch (error) {
        console.log(error)
    }
}