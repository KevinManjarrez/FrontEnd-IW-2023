import axios from "axios";

export function updateProduct(id, dataToUpdate) {
  return new Promise((resolve, reject) => {
    axios.patch(`http://127.0.0.1:3020/api/pwa/orders?IdInstitutoOK=9001&IdNegocioOK=1101&IdOrdenOK=${id}`, dataToUpdate)
      .then((response) => {
        const data = response.data;
        
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición <<updateProduct>>", data);
          reject(data);
        } else {
          console.log(`Producto con ID ${id} actualizado exitosamente`);
          resolve(data); // Puedes resolver con algún mensaje o datos adicionales si es necesario
        }
      })
      .catch((error) => {
        console.error("Error en <<updateProduct>>", error);
        reject(error);
      });
  });
}