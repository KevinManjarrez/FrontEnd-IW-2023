import { getDetailRow } from "../helpers/Utils";
export function OrdenesModel() {
    let Ordenes = {
        IdInstitutoOK : { type: String },
        IdNegocioOK : { type: String },
        IdOrdenOK: { type: String },
        IdOrdenBK: { type: String },
        IdTipoOrdenOK: { type: String },
        IdRolOK: { type: String },
        IdPersonaOK: { type: String },
        ordenes_estatus: [],
        ordenes_info_ad: [],
        ordenes_detalle: [],
        detail_row: getDetailRow(),
    };
    return Ordenes
};