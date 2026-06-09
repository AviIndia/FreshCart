import { createContext, useEffect, useState, useContext } from "react"
import { addWishList, getWishList } from "../services/wishlist";
import Swal from "sweetalert2";
export const WishlistContext = createContext()
export const WishlistProvider = ({ children }) => {
    const [wishlistItem, setWishlistItem] = useState([]);

    const [wishCount, setWishCount] = useState(0);

    const loadWishListItems = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const res = await getWishList();
                if (res.status) {
                    setWishlistItem(res.data.wishlist);
                    setWishCount(res.data.pagination.total_items);

                }
            }
            else {
                const guestWish = JSON.parse(localStorage.getItem("guestWish")) || [];
                setWishlistItem(guestWish);
                setWishCount(guestWish.length);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadWishListItems()
    }, [])

    const addWishListData = async (product) => {
        const token = localStorage.getItem("token")
        try {
            if (token) {
                const payload = {
                    product_id: product.id,
                }
                console.log("AAAA",payload)
                const res = await addWishList(payload);
                if (res.status) {
                    await loadWishListItems();
                      Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Product Added to Wishlist",
                    });
                    
                }
            }
            else {
                const guestWish = JSON.parse(localStorage.getItem("guestWish")) || [];

                const exists = guestWish.find(
                    item => item.id === product.id
                );

                if (!exists) {
                    guestWish.push(product);

                    localStorage.setItem("guestWish",JSON.stringify(guestWish));

                    setWishlistItem(guestWish);
                    setWishCount(guestWish.length);

                     Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Product Added to Guest Wishlist",
                    });
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const syncGuestWishlist = async () => {
        const token = localStorage.getItem("token");

        if (!token) return;

        const guestWish =
            JSON.parse(localStorage.getItem("guestWish")) || [];

        if (!guestWish.length) return;

        try {

            for (const item of guestWish) {

                await addWishList({
                    product_id: item.id
                });

            }

            localStorage.removeItem("guestWish");

            await loadWishListItems();

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <WishlistContext.Provider
            value={{
                wishlistItem,
                wishCount,
                addWishListData,
                loadWishListItems,
                syncGuestWishlist,
                setWishlistItem
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = () => useContext(WishlistContext);