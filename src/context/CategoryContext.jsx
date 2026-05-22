import { createContext, useEffect, useState } from "react";
import { getCategory } from "../services/Category";

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {

   

  const [categories, setCategories] = useState([]);

const fetchCategories = async () => {

  

  try {

    const response = await getCategory();

    

    if (response.status) {

     

      setCategories(response.data.categories);

     

    } else {

      console.log("Status False");

    }

  } catch (error) {

    console.log("Catch Error => ", error);

  }
};
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;