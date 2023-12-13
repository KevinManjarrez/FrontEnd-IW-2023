import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Dialog
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import AddCircleIcon from "@mui/icons-material/AddCircle";
//import InfoIcon from "@mui/icons-material/Info";
//import { Componente } from "@mui/material"; // Sustituye "Componente" por el nombre del componente que desees importar

import OrdenesDetalleFModal from "../modals/OrdenesDetalleFModal"; 
import { OrdenesDetalleFModel } from "../../models/OrdenesDetalleFModel";
import { useSelector } from "react-redux";
const OrdenesDetalleFTable = () => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [OrdenesDetalleData, setOrdenesDetalleData] = useState([]);
  const [pedidosDetalleEstatusF, setPedidosDetalleEstatusF] = useState([]);
  const [showModal, setShowModal] = useState(false);
    //Con redux sacar la data que se envió del otro archivo (ShippingsTable)
    const selectedOrdenesData = useSelector((state) => state.ordenesReducer.selectedOrdenesData);

  useEffect(() => {
    async function fetchData() {
      try {
        setOrdenesDetalleData(selectedOrdenesData.pedidos_detalle_ps_estatus_f); //Se ponen los datos en el useState pero solo los del subdocumento info_ad
        setLoadingTable(false);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }
    fetchData();
  }, []);

  const OrdenesDetalleColumn = [
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

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Box>
      <MaterialReactTable
        columns={OrdenesDetalleColumn}
        data={OrdenesDetalleData}
        state={{ isLoading: loadingTable }}
        // Otras props de tu tabla...
      />

      {pedidosDetalleEstatusF && (
        <div>
          {/* Renderiza los detalles de pedidos estatus F */}
        </div>
      )}

      {/* Botón para abrir modal */}
      <Tooltip title="Agregar">
        <IconButton onClick={handleModalOpen}>
          <AddCircleIcon />
        </IconButton>
      </Tooltip>

      {/* Modal para la vista detallada */}
      <Dialog open={showModal} onClose={handleModalClose}>
        <OrdenesDetalleFModal
          open={showModal}
          onClose={handleModalClose}
          // ...otros props necesarios
        />
      </Dialog>
    </Box>
  );
};

export default OrdenesDetalleFTable;
