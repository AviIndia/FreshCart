import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollFix() {

   const location = useLocation();

   useEffect(() => {

      document.body.style.overflow = "auto";
      document.body.classList.remove("modal-open");

      document
         .querySelectorAll(".modal-backdrop")
         .forEach(el => el.remove());

   }, [location.pathname]);

   return null;
}

export default ScrollFix