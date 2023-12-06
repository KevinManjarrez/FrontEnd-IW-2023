//FIC: React
import React, { useEffect, useMemo, useState } from "react";
//FIC: Material UI
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
//FIC: DB
//import InstitutesStaticData from '../../../../../db/security/json/institutes/InstitutesData';
import { getAllOrdenes} from '../../service/remote/get/GetAllOrdenes';
//FIC: Modals
import AddOrdenesModal from "../modals/AddOrdenesModal";
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
      accessorKey: "IdTipoOrdenOK",
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
    return (
        <Box>
          <Box>
            <MaterialReactTable
              columns={OdenesColumns}
              data={OrdenesData}
              state={{isLoading: loadingTable}}
              initialState={{ density: "compact", showGlobalFilter: true }}
              renderTopToolbarCustomActions={({ table }) => (
                  <>
                    {/* ------- BARRA DE ACCIONES ------ */}
                    <Stack direction="row" sx={{ m: 1 }}>
                      <Box>
                        <Tooltip title="Agregar">
                          <IconButton
                            onClick={() => AddOrdenesShowModal(true)}
                          >
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
              onClose={() => AddOrdenesShowModal(false)}
            />
          </Dialog>
        </Box>
      );
  };
  export default OrdenesTable;