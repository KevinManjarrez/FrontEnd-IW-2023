import React, { useMemo, useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
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
  const contextData = useOrdenesContext() || {};
  const {
    ordenSel,
    loadingTable,
    showToastExito,
    fetchDataOrdenSelect,
    fetchDataOrden,
  } = contextData;

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [infoAdSel, setInfoAdSel] = useState(null);
  const [idRowSel, setIdRowSel] = useState(null);

  useEffect(() => {
    if (!ordenSel) {
      console.error("ordenSel es undefined");
    }
  }, [ordenSel]);

  const handleReload = async () => {
    await fetchDataOrden?.();
    await fetchDataOrdenSelect?.(ordenSel?.IdOrdenOK);
    setIdRowSel(null);
    setInfoAdSel(null);
  };

  const handleDelete = async () => {
    if (!ordenSel || idRowSel === null) {
      console.error("ordenSel es undefined o idRowSel es null");
      return;
    }

    const res = await showMensajeConfirm(
      `La Info Adicional #${Number(idRowSel) + 1} será eliminada, ¿Desea continuar?`
    );

    if (res) {
      try {
        const infoAd = [...ordenSel.InfoAdModel];
        infoAd.splice(idRowSel, 1);
        const dataToUpdate = {
          InfoAdModel: infoAd,
        };
        await updateProduct?.(ordenSel.IdOrdenOK, dataToUpdate);
        showToastExito("Info Ad Eliminado");
        handleReload();
      } catch (e) {
        console.error("handleDelete", e);
        showMensajeError(`No se pudo Eliminar el Info Ad`);
      }
    }
  };

  const InfoAdColumns = [
    {
      accessorKey: "IdEtiquetaOK",
      header: "Id Etiqueta OK",
      size: 30,
    },
    {
      accessorKey: "IdEtiqueta",
      header: "Id Etiqueta",
      size: 30,
    },
    {
      accessorKey: "Etiqueta",
      header: "Etiqueta",
      size: 150,
    },
    {
      accessorKey: "Valor",
      header: "Valor",
      size: 50,
    },
    {
      accessorKey: "IdTipoSeccionOK",
      header: "Tipo seccion",
      size: 30,
    },
    {
      accessorKey: "Secuencia",
      header: "Secuencia",
      size: 150,
    },
  ];

  return (
    <Box>
      <Box className="box-tables">
        <MaterialReactTable
          columns={InfoAdColumns}
          data={ordenSel?.InfoAdModel || []}
          state={{ isLoading: loadingTable }}
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
              handleBtnAdd={() => setOpenModalAdd(true)}
              handleBtnUpdate={() => setOpenModalUpdate(true)}
              handleBtnDelete={() => handleDelete()}
              handleBtnDetails={() => console.log("clic handleBtnDetails")}
              handleBtnReload={() => handleReload()}
              isItemSelected={!!infoAdSel}
            />
          )}
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => {
              setInfoAdSel(row.original);
              setIdRowSel(row.id);
            },
            sx: {
              cursor: loadingTable ? "not-allowed" : "pointer",
              backgroundColor:
                idRowSel === row.id ? darken("#EFF999", 0.01) : "inherit",
            },
          })}
        />
      </Box>

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
