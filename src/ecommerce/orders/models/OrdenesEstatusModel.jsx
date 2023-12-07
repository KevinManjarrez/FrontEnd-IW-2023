import { getDetailRow } from "../helpers/Utils";
export function OrdenesEstatusModel() {
    let ordenes_estatus = {
          IdTipoEstatusOK: { type: String },
          Actual: { type: String },
          Observacion: { type: String },
          detail_row: getDetailRow(),
    };
    return ordenes_estatus
};