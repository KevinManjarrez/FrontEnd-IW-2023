import axios from "axios";

export function UpdatePatchOneOrder(id, updateData) {
  return new Promise((resolve, reject) => {
    // Puedes ajustar la URL según tu API
    axios.patch(`http://127.0.0.1:3020/api/pwa/orders?IdInstitutoOK=9001&IdNegocioOK=1101&IdOrdenOK=${id}`, updateData)
      .then((response) => {
        const data = response.data;
        
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición <<updateOrdenById - Services>>", data);
          reject(data);
        } else {
          console.log(`Orden con ID ${id} actualizada exitosamente`);
          resolve(data); // Puedes resolver con algún mensaje o datos adicionales si es necesario
        }
      })
      .catch((error) => {
        console.error("Error en <<updateOrdenById - Services>>", error);
        reject(error);
      });
  });
}