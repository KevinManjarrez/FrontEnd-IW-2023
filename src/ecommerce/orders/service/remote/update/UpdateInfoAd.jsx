import axios from "axios";
export function updateProduct(id,dataToUpdate) {
  console.log("[ejecución] updateProduct()",dataToUpdate)
  return new Promise((resolve, reject) => {
    axios.patch(`${import.meta.env.VITE_CAT_PROD_SERV_URL}${id}`, dataToUpdate)
      .then((response) => {
        console.log("[response] updateProduct()",dataToUpdate)
        const data = response.data;
        if (!data.success) { 
          console.error("No se pudo realizar correctamente la petición updateProduct():", data);
          reject(data);
        } else if (data.success) {
          resolve(data);
        }
      })
      .catch((error) => {
        console.error("Error en updateProduct():", error);
        reject(error);
      });
     
  });
}