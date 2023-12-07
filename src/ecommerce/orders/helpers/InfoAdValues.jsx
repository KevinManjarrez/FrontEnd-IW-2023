import { OrdenesEstatusValues } from "../models/OrdenesEstatusModel"

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const OrdenesEstatusValues = (values)=>{
  let InfoAd =  InfoAdModel()
  InfoAd.IdEtiquetaOK=values.IdEtiquetaOK,
  InfoAd.IdEtiqueta=values.IdEtiqueta,
  InfoAd.Etiqueta=values.Etiqueta,
  InfoAd.Valor=values.Valor,
  InfoAd.IdTipoSeccionOK=values.IdTipoSeccionOK,
  InfoAd.Secuencia=values.Secuencia
  return InfoAd
}
