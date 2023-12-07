//FIC: React
import React, { useEffect, useMemo, useState } from "react";
//FIC: Material UI
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
//FIC: DB
//import InstitutesStaticData from '../../../../../db/security/json/institutes/InstitutesData';
import { getAllOrdenes } from "../../service/remote/get/GetAllOrdenes";
//FIC: Modals
import AddOrdenesModal from "../modals/OrdenesEstatusModal";
//REDUX
import { useSelector } from "react-redux";
import { SET_SELECTED_ORDENES_DATA } from "../../redux/silices/ordenesSlice";

//FIC: Columns Table Definition.
const OrdenesEstatus = [
  {
    accessorKey: "IdTipoEstatusOK",
    header: "Id Tipo Estatus OK",
    size: 30, //small column
  },
  {
    accessorKey: "Actual",
    header: "Actual",
    size: 30, //small column
  },
  {
    accessorKey: "Observacion",
    header: "Observacion",
    size: 150, //small column
  },
];

//FIC: Table - FrontEnd.
const InfoAdTable = ({}) => {
  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);
  //FIC: controlar el estado de la data de InfoAd.
  const [InfoAdData, setInfoAdData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo InfoAd.
  const [InfoAdShowModal, setInfoAdShowModal] = useState(false);

  //Con redux sacar la data que se envió del otro archivo (ShippingsTable)
  const selectedOrdenesData = useSelector(
    (state) => state.shippingsReducer.selectedOrdenesData
  );
  // console.log(selectedShippingData);

  useEffect(() => {
    async function fetchData() {
      try {
        setInfoAdData(selectedOrdenesData.info_ad); //Se ponen los datos en el useState pero solo los del subdocumento info_ad
        setLoadingTable(false);
      } catch (error) {
        console.error("Error al obtener info_ad:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Box>
      <Box>
        <MaterialReactTable
          columns={OrdenesEstatus}
          data={InfoAdData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- ACTIONS TOOLBAR INIT ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => setInfoAdShowModal(true)}>
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Detalles ">
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
              {/* ------- ACTIONS TOOLBAR END ------ */}
            </>
          )}
        />
      </Box>

      {/* M O D A L E S */}
      <Dialog open={InfoAdShowModal}>
        <InfoAdModal
          InfoAdShowModal={InfoAdShowModal}
          setInfoAdShowModal={setInfoAdShowModal}
          selectedShippingData={selectedOrdenesData} //Pasar como prop los datos que sacamos de redux desde ShippingsTable para
          onClose={() => setInfoAdShowModal(false)} //usarlos en InfoAdModal y consecuentemente en formik.
        />
      </Dialog>
    </Box>
  );
};

export default InfoAdTable;