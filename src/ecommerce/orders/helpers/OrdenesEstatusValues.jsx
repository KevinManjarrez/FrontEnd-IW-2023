import { OrdenesEstatusModel } from "../models/OrdenesEstatusModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const OrdenesEstatusValues = (values) => {
  let OrdenesEstatus = OrdenesEstatusModel();
  OrdenesEstatus.ordenes_estatus[0].IdTipoEstatusOK = values.IdTipoEstatusOK;
  OrdenesEstatus.ordenes_estatus[0].Actual = values.Actual;
  OrdenesEstatus.ordenes_estatus[0].Observacion = values.Observacion;

  // Asegúrate de incluir los demás campos si son necesarios

  return OrdenesEstatus;
};
