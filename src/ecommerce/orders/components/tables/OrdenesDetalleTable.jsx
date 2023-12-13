//FIC: React
import React, { useEffect, useMemo, useState } from "react";
//FIC: Material UI
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import BarActionsTable from "../../../../share/components/elements/bars/BarActionsTable";

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
              enableColumnActions={false}
              localization={MRT_Localization_ES}
              enableStickyHeader
              muiTableContainerProps={{
                sx: {
                  "&::-webkit-scrollbar": { display: "none" },
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                  overflow: "auto",
                  width: "parent",
                },
              }}
              positionToolbarAlertBanner="bottom"
              renderTopToolbarCustomActions={({ table }) => (
                <BarActionsTable
                handleBtnAdd={() => setOrdenesDetalleShowModal(true)}
                handleBtnDetails={() => console.log("clic handleBtnDetails")}
                handleBtnReload={() => handleReload()}
              />
              )}
              muiTableBodyRowProps={({ row }) => ({
                onClick: () => {
                  setSelectedRowIndex(row.original);
                  setSelectedRowIndex(row.id);
                },
              })}
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