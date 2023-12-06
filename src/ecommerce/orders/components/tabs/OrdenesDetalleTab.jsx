import { Box } from "@mui/material";
import { useState } from "react";
//FIC:
import OrdenesDetalleNavTab from "./OrdenesDetalleNavTab";
import OrdenesDetalleSubTab from "./OrdenesDetalleSubTab";
import InfoAdTab from "./InfoAdTab";
//Faltan tablas

export default function OrdenesDetalleTab() {
 
  //FIC: indicamos que al iniciar no hay ningun Instituto seleccionado.
  const [currentRowDetalleInBusinessTab, setCurrentRowDetalleInBusinessTab] = useState(0);   
 
  //FIC: indicamos que el estado inicial del tab page principal por default sera INSTITUTOS.

  const [currentDetalleTabInBusinessTab, setCurrentDetalleTabInBusinessTab] = useState("ORDENES_DETALLES");
 
  return (
      <Box> 
            <OrdenesDetalleNavTab
                currentRowDetalleInBusinessTab={currentRowDetalleInBusinessTab} 
                setCurrentDetalleTabInBusinessTab={setCurrentDetalleTabInBusinessTab} 
            />

            {/* <h2>Tab con la tabla del subdocumento de Negocios de la coleccion de Institutos</h2>
            <h2>Este debera abrir otro NAVTAB DE NEGOCIOS porque tiene subdocumentos no es un objeto final</h2> */}
           
            {console.log(currentDetalleTabInBusinessTab)}
            {/* {currentNameTabInBusinessTab == "NEGOCIOS" && <BusinessTab />} */}
           
           
            {currentDetalleTabInBusinessTab == "Orden Detalle" && <OrdenesDetalleSubTab />}
            {currentDetalleTabInBusinessTab == "INFO AD" && <InfoAdTab />}
      </Box>
    );
  }
  