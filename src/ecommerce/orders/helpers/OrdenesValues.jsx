import { OrdenesModel } from "../models/OrdenesModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const OrdenesValues = (values)=>{
  let Ordenes =  OrdenesModel()
  Ordenes.IdInstitutoOK=values.IdInstitutoOK,
  Ordenes.IdInstitutoBK=values.IdInstitutoBK,
  Ordenes.DesInstituto=values.DesInstituto,
  Ordenes.Alias=values.Alias,
  Ordenes.Matriz=values.Matriz,
  Ordenes.IdTipoGiroOK=values.IdTipoGiroOK,
  Ordenes.IdInstitutoSupOK=values.IdInstitutoSupOK
  return Ordenes
}