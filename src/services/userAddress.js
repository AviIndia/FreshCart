import api from "./api";

export const postUserAddress = async () => {
    const token = localStorage.getItem("token");

    try {
        const res = await api.post("/auth/getUserAddress.php",
            {}, // empty body
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return res.data;

    } catch (error) {
        console.log(error);
    }
};



export const getUserAddress = async () => {
    const token = localStorage.getItem("token");

    try {
        const res = await api.get(
            "/auth/getUserAddress.php",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return res.data;

    } catch (error) {
        console.log(error);
    }
};