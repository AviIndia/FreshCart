import api from "./api"

export const addWishList = async (payload)=>{
    const token = localStorage.getItem("token")
    const res = await api.post("/wishlist/addWishlist.php",payload,
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data;
}

export const getWishList = async ()=>{
    const token = localStorage.getItem("token")
    const res = await api.get("/wishlist/getWishlist.php",
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data;
}

export const deleteWishList = async (payload)=>{
    const token = localStorage.getItem("token")
    const res = await api.post("/wishlist/removeWishlist.php",payload,
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data;
}