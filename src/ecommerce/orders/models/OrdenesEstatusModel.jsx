import { getDetailRow } from "../helpers/Utils";
export function OrdenesModel() {
    let ordenes_estatus = {
          IdTipoEstatusOK: { type: String },
          Actual: { type: String },
          Observacion: { type: String },
          detail_row: getDetailRow(),
          _id: false,
    };
    return ordenes_estatus
};