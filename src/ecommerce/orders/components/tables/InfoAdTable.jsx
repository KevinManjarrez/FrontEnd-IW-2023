//FIC: React
import React, {useMemo, useEffect, useState } from "react";
import {MaterialReactTable} from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, darken, Dialog } from "@mui/material";
import InfoAdModal from "../modals/InfoAdModal";


import { useOrdenesContext } from "../../pages/ProductsProvider";
import BarActionsTable from "../../../../components/elements/bars/BarActionsTable";
import UpdateInfoAd from "../modals/UpdateInfoAd";
import {
  showMensajeConfirm,
  showMensajeError,
} from "../../../../components/elements/messages/MySwalAlerts";
import { updateProduct } from "../../service/remote/update/UpdateInfoAd";

const InfoAdTable = () => {
  const {
    ordenSel,
    loadingTable,
    showToastExito,
    fetchDataOrdenSelect,
    fetchDataOrden,
  } = useOrdenesContext();
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [infoAdSel, setInfoAdSel] = useState(null);
  const [idRowSel, setIdRowSel] = useState(null);
//FIC: Columns Table Definition.
const InfoAdColumns = [
    {
      accessorKey: "IdEtiquetaOK",
      header: "Id Etiqueta OK",
      size: 30, //small column
    },
    {
      accessorKey: "IdEtiqueta",
      header: "Id Etiqueta",
      size: 30, //small column
    },
    {
      accessorKey: "Etiqueta",
      header: "Etiqueta",
      size: 150, //small column
    },
    {
      accessorKey: "Valor",
      header: "Valor",
      size: 50, //small column
    },
    {
      accessorKey: "IdTipoSeccionOK",
      header: "Tipo seccion",
      size: 30, //small column
    },
    {
      accessorKey: "Secuencia",
      header: "Secuencia",
      size: 150, //small column
    },
  ];

  const handleReload = async () => {
    await fetchDataOrden();
    await fetchDataOrdenSelect(ordenSel.IdOrdenOK);
    setIdRowSel(null);
    setInfoAdSel(null);
  };

  const handleDelete = async () => {
    const res = await showMensajeConfirm(
      `La Info Adicional #${
        Number(idRowSel) + 1
      } será eliminada, ¿Desea continuar?`
    );
    if (res) {
      try {
        let infoAd = ordenSel.InfoAdModel;
        const indexToDelete = idRowSel;
        infoAd.splice(indexToDelete, 1);
        const dataToUpdate = {
          InfoAdModel: infoAd,
        };
        await updateProduct(ordenSel.IdOrdenOK, dataToUpdate);
        showToastExito("Info Ad Eliminado");
        handleReload();
      } catch (e) {
        console.error("handleDelete", e);
        showMensajeError(`No se pudo Eliminar el Info Ad`);
      }
    }
  };

  return (
    <Box>
      <Box className="box-tables">
        <MaterialReactTable
          columns={InfoAdColumns}
          data={ordenSel.InfoAdModel}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          enableColumnActions={false}
          localization={MRT_Localization_ES}
          enableStickyHeader
          enableStickyFooter
          muiTableContainerProps={{
            sx: {
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              overflow: "auto",
              width: "parent",
            },
          }}
          //enableRowSelection
          positionToolbarAlertBanner="bottom" //show selected rows count on bottom toolbar
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
              <BarActionsTable
                handleBtnAdd={() => setOpenModalAdd(true)}
                handleBtnUpdate={() => setOpenModalUpdate(true)}
                handleBtnDelete={() => handleDelete()}
                handleBtnDetails={() => console.log("clic handleBtnDetails")}
                handleBtnReload={() => handleReload()}
                isItemSelected={!!infoAdSel}
              />
            </>
          )}
          muiTableBodyRowProps={({ row }) => ({
            onClick: (event) => {
              //Si esta cargando no puedes dar clic
              console.log(row.id, row.original);
              setInfoAdSel(row.original);
              setIdRowSel(row.id);
            },
            sx: {
              cursor: loadingTable ? "not-allowed" : "pointer", //si esta cargando no debes dar clic aun
              backgroundColor:
                idRowSel === row.id ? darken("#EFF999", 0.01) : "inherit",
            },
          })}
        />
      </Box>

          {/* M O D A L E S */}   
          <Dialog open={openModalAdd}>
            <InfoAdModal
              productSel={ordenSel}
              openModalAdd={openModalAdd}
              setOpenModalAdd={setOpenModalAdd}
              handleReload={handleReload}
              onClose={() => setOpenModalAdd(false)}
            />
          </Dialog>
          <Dialog open={openModalUpdate}>
            <UpdateInfoAd
              idRowSel={idRowSel}
              infoAdSel={infoAdSel}
              productSel={ordenSel}
              openModalUpdate={openModalUpdate}
              handleReload={handleReload}
              setOpenModalUpdate={setOpenModalUpdate}
              onClose={() => setOpenModalUpdate(false)}
            />
          </Dialog>
        </Box>
      );
  };

  export default InfoAdTable;