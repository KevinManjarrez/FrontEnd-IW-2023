import { useState, useEffect } from 'react';
import { GetAllLabels } from '../../../labels/services/remote/get/GetAllLabels';
function useEtiquetas({IdEtiquetaOK,IdInstitutoOK: IdOrdenOK }) {
  const [etiquetas, setEtiquetas] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const etiquetasData = await GetAllLabels();
          console.log("etiquetasData",etiquetasData)
        setEtiquetas(etiquetasData);
      } catch (error) {
        console.error("useEtiquetas():", error);
      }
    }
    fetchData();
  }, []);
let etiquetaEspecifica = null
  if(IdEtiquetaOK && IdOrdenOK){ //Si recibe IdInstitutoOK
  etiquetaEspecifica= etiquetas.find(etiqueta => etiqueta.IdEtiquetaOK === IdEtiquetaOK && etiqueta.IdOrdenOK === IdOrdenOK) ;
}else if(IdEtiquetaOK && !IdOrdenOK){//Si NO recibe IdInstitutoOK
  etiquetaEspecifica= etiquetas.find(etiqueta => etiqueta.IdEtiquetaOK === IdEtiquetaOK)
}
 
  return { etiquetas, etiquetaEspecifica };
}
export default useEtiquetas;