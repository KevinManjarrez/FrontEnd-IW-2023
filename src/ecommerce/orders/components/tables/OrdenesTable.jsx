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
import { useDispatch } from "react-redux";
import AddOrdenesModal from "../modals/AddOrdenesModal";
import { SET_SELECTED_ORDENES_DATA } from "../../redux/silices/ordenesSlice";

//FIC: Columns Table Definition.
const OdenesColumns = [
  {
    accessorKey: "IdInstitutoOK",
    header: "ID OK",
    size: 30, //small column
  },
  {
    accessorKey: "IdNegocioOK",
    header: "ID BK",
    size: 30, //small column
  },
  {
    accessorKey: "IdOrdenOK",
    header: "ID Orden OK",
    size: 150, //small column
  },
  {
    accessorKey: "IdOrdenBK",
    header: "ID Orden BK",
    size: 50, //small column
  },
  {
    accessorKey: "IdTipoOrdenOK",
    header: "ID Tipo Orden OK",
    size: 150, //small column
  },
  {
    accessorKey: "IdRolOK",
    header: "ID ROL OK",
    size: 50, //small column
  },
  {
    accessorKey: "IdPersonaOK",
    header: "ID Persona OK ",
    size: 50, //small column
  },
];
//FIC: Table - FrontEnd.
const OrdenesTable = () => {
  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);

  //FIC: controlar el estado de la data de Institutos.
  const [OrdenesData, setOrdenesData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
  const [AddOrdenesShowModal, setAddOrdenesShowModal] = useState(false);

  //PARA CONTROLAR LO DE GUARDAR O ACTUALIZAR
  const [isEditMode, setIsEditMode] = useState(false); //Para determinar si la modal está en modo de edicion/agregar (true=editar || false=agregar)
  const [editData, setEditData] = useState(false); //Para saber si hay que rellenar los textfield con datos en caso de estar en modo de edición
  const [isDeleteMode, setIsDeleteMode] = useState(false); //Para saber si está en modo de eliminación o no
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); //Para saber cual es la fila y pasarla para el color de la tabla

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const AllOrdenesData = await getAllOrdenes();
        setOrdenesData(AllOrdenesData);
        //setInstitutesData(InstitutesStaticData);
        setLoadingTable(false);
      } catch (error) {
        console.error("Error al obtener las ordenes ", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleRowClick = (index) => {
      const clickedRow = OrdenesData[index];
      if (clickedRow) {
        console.log("<<ID DEL DOCUMENTO SELECCIONADO>>:", clickedRow.IdOrdenOK);
        setIsEditMode(true);
        setEditData(clickedRow);
        console.log("INDICE SELECCIONADO", index);
        setSelectedRowIndex(index);
        dispatch(SET_SELECTED_ORDENES_DATA(clickedRow));
      }
    };

    const rows = document.querySelectorAll(".MuiTableRow-root");

    rows.forEach((row, index) => {
      row.addEventListener("click", () => handleRowClick(index - 1));
    });

    return () => {
      rows.forEach((row, index) => {
        row.addEventListener("click", () => handleRowClick(index - 1));
      });
    };
  }, [OrdenesData]);

  //PARA LA FUNCIÓN OrdenesData en AddShippingsModal.jsx
  const handleUpdateOrdenesData = async () => {
    try {
      const updatedOrdenesData = await getAllOrdenes();
      setOrdenesData(updatedOrdenesData);
      console.log("DATA EN EL editData RAAAH", editData); //Para saber que datos tiene almacenados editData
    } catch (error) {
      console.error("Error updating shipping data:", error);
    }
  };

  return (
    <Box>
      <Box>
        <MaterialReactTable
          columns={OdenesColumns}
          data={OrdenesData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  <Tooltip title="Agregar">
                    <IconButton
                      onClick={() => {
                        //AddOrdenesShowModal(true);
                        setAddOrdenesShowModal(true);
                        setIsEditMode(false); //Poner modo de edición en falso porque vamos a agregar no editar
                        setEditData(null); //Poner la edición de data en nulo porque no tiene que haber nada en los textfield
                        setIsDeleteMode(false);
                      }}
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton
                      onClick={() => {
                        setAddOrdenesShowModal(true);
                        setIsDeleteMode(false);
                      }}
                    >
                      {" "}
                      {/*Para que se abra la modal de actualizar SOLO despues de dar clic al boton */}
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      onClick={() => {
                        setIsDeleteMode(true);
                        setIsEditMode(false);
                        setAddOrdenesShowModal(true);
                      }}
                    >
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
              {/* ------- BARRA DE ACCIONES FIN ------ */}
            </>
          )}
        />
      </Box>
      {/* M O D A L E S */}
      <Dialog open={AddOrdenesShowModal}>
        <AddOrdenesModal
          AddOrdenesShowModal={AddOrdenesShowModal}
          SetAddOrdenesShowModal={AddOrdenesShowModal}
          onUpdateShippingData={handleUpdateOrdenesData} //PARTE DE LA FUNCION handleUpdateShippingData
          isEditMode={isEditMode}
          isDeleteMode={isDeleteMode}
          initialData={isEditMode || isDeleteMode ? editData : null} //Para que en ambos modales de eliminar y
          row={isEditMode || isDeleteMode ? editData : null}
          onClose={() => {
            AddOrdenesShowModal(false);
            setAddOrdenesShowModal(false); //Cerrar la modal
            setIsEditMode(false); //Resetear el modo de edición
            setEditData(null);
          }}
        />
      </Dialog>
    </Box>
  );
};
export default OrdenesTable;
