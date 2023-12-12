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
import { getAllOrdenes } from "../../service/remote/get/GetAllOrdenes";

import { useSelector } from "react-redux";

const InfoAdTable = ({
  showToastExito,ordenSel
}) => {
  /*
  const contextData = useOrdenesContext() || {};
  const {
    ordenSel,
    loadingTable,
    showToastExito,
    fetchDataOrdenSelect,
    fetchDataOrden,
  } = contextData;
*/
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [infoAdSel, setInfoAdSel] = useState(null);
  const [infoAdData, setinfoAdEstatusData] = useState([]);
  const [idRowSel, setIdRowSel] = useState(null);
  const [loadingTable, setLoadingTable] = useState(true);
  const [editData, setEditData] = useState(false);     //Para saber si hay que rellenar los textfield con datos en caso de estar en modo de edición


  const selectedOrdenesData = useSelector((state) => state.ordenesReducer.selectedOrdenesData);
/*
  useEffect(() => {
    if (!ordenSel) {
      console.error("ordenSel es undefined");
    }
  }, [ordenSel]);
*/
  useEffect(() => {
    async function fetchData() {
      try {
        setinfoAdEstatusData(selectedOrdenesData.ordenes_info_ad); //Se ponen los datos en el useState pero solo los del subdocumento info_ad
        setLoadingTable(false);
      } catch (error) {
        console.error("Error al obtener ordenes_info_ad:", error);
      }
    }
    fetchData();
  }, []);

  const handleReload = async () => {
    const AllOrdenesData = await getAllOrdenes();
    setOrdenesData(AllOrdenesData);
    setSelectedRowIndex(null);
    //setInfoAdSel(null);
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
        await UpdateInfoAd?.(ordenSel.IdOrdenOK, dataToUpdate);
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

  //Este es el metodo para seleccionar la orden de la tabla 
  useEffect(() => {
    const handleRowClick = (index) => {
      const clickedRow = selectedOrdenesData.ordenes_info_ad[index];
      if (clickedRow) {
        console.log("<<ID DEL DOCUMENTO SELECCIONADO>>:", clickedRow.IdEtiqueta);
        setIdRowSel(clickedRow.IdEtiquetaOK);
        //setSelectedRowIndex(index);
        setEditData(clickedRow);
        //dispatch(SET_SELECTED_ORDENES_DATA(clickedRow));
      }
    };

    //Delimita el rango de selecion en la tabla
    const rows = document.querySelectorAll(".MuiTableRow-root");

    rows.forEach((row, index) => {
      row.addEventListener("click", () => handleRowClick(index - 1));
    });
  }, [selectedOrdenesData.ordenes_info_ad]);


  return (
    <Box>
      <Box className="box-tables">
        <MaterialReactTable
          columns={InfoAdColumns}
          data={//ordenSel?.InfoAdModel || []
            infoAdData
          }
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

      <Dialog open={openModalAdd} onClose={() => openModalAdd(false)}>
        <InfoAdModal
          productSel={editData}
          openModalAdd={openModalAdd}
          setOpenModalAdd={setOpenModalAdd}
          //handleReload={handleReload}
          onClose={() => setOpenModalAdd(false)}
        />
      </Dialog>

      <Dialog open={openModalUpdate}>
        <UpdateInfoAd
          idRowSel={idRowSel}
          infoAdSel={infoAdSel}
          productSel={editData}
          openModalUpdate={openModalUpdate}
          //handleReload={handleReload}
          setOpenModalUpdate={setOpenModalUpdate}
          onClose={() => setOpenModalUpdate(false)}
        />
        </Dialog>
    </Box>
  );
};

export default InfoAdTable;
