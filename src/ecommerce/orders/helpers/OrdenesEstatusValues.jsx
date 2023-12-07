import { OrdenesEstatusModel } from "../models/OrdenesEstatusModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const OrdenesEstatusValues = (values)=>{
  let OrdenesEstatus =  OrdenesEstatusModel()
  OrdenesEstatus.IdTipoEstatusOK=values.IdTipoEstatusOK,
  OrdenesEstatus.Actual=values.Actual,
  OrdenesEstatus.Observacion=values.Observacion
  return Ordenes
}