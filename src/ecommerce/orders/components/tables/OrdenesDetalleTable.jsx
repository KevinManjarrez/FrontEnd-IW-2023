//FIC: React
import React, { useEffect, useMemo, useState } from "react";
//FIC: Material UI
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
//FIC: Modals
import OrdenesDetalleModal from "../modals/OrdenesDetalleModal";
//REDUX
import { useSelector } from "react-redux";

//FIC: Columns Table Definition.
const OrdenesDetalleColumn = [
    {
      accessorKey: "IdProdServOK",
      header: "Id Producto/Servicio OK",
      size: 30,
    },
    {
      accessorKey: "IdPresentaOK",
      header: "Id Presentación OK",
      size: 30,
    },
    {
      accessorKey: "DesPresentaPS",
      header: "Descripción Presentación",
      size: 150,
    },
    {
      accessorKey: "Cantidad",
      header: "Cantidad",
      size: 30,
    },
    {
      accessorKey: "PrecioUniSinIVA",
      header: "Precio Unitario sin IVA",
      size: 50,
    },
    {
      accessorKey: "PrecioUniConIVA",
      header: "Precio Unitario con IVA",
      size: 50,
    },
    {
      accessorKey: "PorcentajeIVA",
      header: "Porcentaje IVA",
      size: 30,
    },
    {
      accessorKey: "MontoUniIVA",
      header: "Monto Unitario IVA",
      size: 40,
    },
    {
      accessorKey: "SubTotalSinIVA",
      header: "Subtotal sin IVA",
      size: 50,
    },
    {
      accessorKey: "SubTotalConIVA",
      header: "Subtotal con IVA",
      size: 50,
    },
  ];
  
  //FIC: Table - FrontEnd.
  const OrdenesDetalleTable = ({ }) => {

    //FIC: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);
    //FIC: controlar el estado de la data de InfoAd.
    const [OrdenesDetalleData, setOrdenesDetalleData] = useState([]);
    //FIC: controlar el estado que muesta u oculta la modal de nuevo InfoAd.
    const [OrdenesDetalleShowModal, setOrdenesDetalleShowModal] = useState(false);

    //Con redux sacar la data que se envió del otro archivo (ShippingsTable)
    const selectedOrdenesData = useSelector((state) => state.ordenesReducer.selectedOrdenesData);
    // console.log(selectedShippingData);

    useEffect(() => {
      async function fetchData() {
        try {
          setOrdenesDetalleData(selectedOrdenesData.ordenes_detalle); //Se ponen los datos en el useState pero solo los del subdocumento info_ad
          setLoadingTable(false);
        } catch (error) {
          console.error("Error al obtener ordenes_estatus:", error);
        }
      }
      fetchData();
    }, []);

    return (
        <Box>
          <Box>
            <MaterialReactTable
              columns={OrdenesDetalleColumn}
              data={OrdenesDetalleData}
              state={{isLoading: loadingTable}}
              initialState={{ density: "compact", showGlobalFilter: true }}
              renderTopToolbarCustomActions={({ table }) => (
                  <>
                    {/* ------- ACTIONS TOOLBAR INIT ------ */}
                    <Stack direction="row" sx={{ m: 1 }}>
                      <Box>
                        <Tooltip title="Agregar">
                          <IconButton 
                          onClick={() => setOrdenesDetalleShowModal(true)}
                          >
                            <AddCircleIcon />
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
          <Dialog open={OrdenesDetalleShowModal}>
            <OrdenesDetalleModal
              OrdenesDetalleShowModal={OrdenesDetalleShowModal}
              setOrdenesDetalleShowModal={setOrdenesDetalleShowModal}
              selectedOrdenesData={selectedOrdenesData} //Pasar como prop los datos que sacamos de redux desde ordentable para 
              onClose={() => setOrdenesDetalleShowModal(false)}   //usarlos en InfoAdModal y consecuentemente en formik.
            />
          </Dialog>

        </Box>
      );
  };

  export default OrdenesDetalleTable;