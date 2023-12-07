//FIC: React
import React, { useEffect, useState } from "react";
//FIC: Material UI
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
//FEAK: MODALS
import InfoAdModal from "../modals/InfoAdModal";

//REDUX
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { SET_SELECTED_ORDENES_DATA } from "../../redux/silices/ordenesSlice";

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

//FIC: Table - FrontEnd.
const InfoAdTable = ({}) => {
  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);
  //FIC: controlar el estado de la data de InfoAd.
  const [InfoAdData, setInfoAdData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo InfoAd.
  const [InfoAdShowModal, setInfoAdShowModal] = useState(false);

    //Con redux sacar la data que se envió del otro archivo (ShippingsTable)
    const selectedOrdenesData = useSelector((state) => state.ordenesReducer.selectedOrdenesData);

    //PARA CONTROLAR LO DE GUARDAR O ACTUALIZAR
  const [isEditMode, setIsEditMode] = useState(false); //Para determinar si la modal está en modo de edicion/agregar (true=editar || false=agregar)
  const [editData, setEditData] = useState(false); //Para saber si hay que rellenar los textfield con datos en caso de estar en modo de edición
  const [isDeleteMode, setIsDeleteMode] = useState(false); //Para saber si está en modo de eliminación o no
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); //Para saber cual es la fila y pasarla para el color de la tabla

  const dispatch = useDispatch();

    useEffect(() => {
      async function fetchData() {
        try {
          setInfoAdData(selectedOrdenesData.ordenes_info_ad); //Se ponen los datos en el useState pero solo los del subdocumento info_ad
          setLoadingTable(false);
        } catch (error) {
          console.error("Error al obtener ordenes_info_ad:", error);
        }
      }
      fetchData();
    }, []);

    useEffect(() => {
      const handleRowClick = (index) => {
        if (index >= 0) {
          const clickedRow = InfoAdData[index];
        if (clickedRow) {
          console.log("<<ID DEL DOCUMENTO SELECCIONADO>>:", clickedRow.IdEtiquetaOK);
          setIsEditMode(true);
          setEditData(clickedRow);
          console.log("INDICE SELECCIONADO", index);
          setSelectedRowIndex(index);
          dispatch(SET_SELECTED_ORDENES_DATA(clickedRow));
        }
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
    }, [InfoAdData]);

  return (
    <Box>
      <Box>
        <MaterialReactTable
          columns={InfoAdColumns}
          data={InfoAdData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          onRowClick={(rowData, index) => handleRowClick(index)}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- ACTIONS TOOLBAR INIT ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => {
                    setInfoAdShowModal(true);
                    //setIsEditMode(false); //Poner modo de edición en falso porque vamos a agregar no editar
                    //setEditData(null); //Poner la edición de data en nulo porque no tiene que haber nada en los textfield
                    //setIsDeleteMode(false);
                  }}>
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                  <IconButton
                      /*onClick={() => {
                        setInfoAdShowModal(true)
                        setIsDeleteMode(false);
                      }}*/
                    >
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
              selectedOrdenesData={selectedOrdenesData} //Pasar como prop los datos que sacamos de redux desde latabla
              /*isEditMode={isEditMode}
              isDeleteMode={isDeleteMode}
              initialData={isEditMode || isDeleteMode ? editData : null} //Para que en ambos modales de eliminar y
              row={isEditMode || isDeleteMode ? editData : null}*/
              onClose={() => {setInfoAdShowModal(false)
                //setIsEditMode(false); //Resetear el modo de edición
                //setEditData(null);
              }}   //usarlos en InfoAdModal y consecuentemente en formik.
            />
          </Dialog>

        </Box>
      );
  };

  export default InfoAdTable;