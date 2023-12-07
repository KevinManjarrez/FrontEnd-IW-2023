import { Box } from "@mui/material";
import { useState } from "react";
//FIC:
import OrdenesStatusTabNavTab from "./OrdenesStatusTabNavTab";
import InfoAdTab from "./InfoAdTab.jsx";
import FilesTab from "./FilesTab.jsx";
import PhonsTab from "./PhonesTab.jsx";
import AddressesTab from "./AddressesTab.jsx";
import WebAddressesTab from "./WebAddressesTab.jsx";

export default function OrdenesStatusTab() {
  //FIC: indicamos que al iniciar no hay ningun Instituto seleccionado.
  const [currentRowInOrdenesStatusTab, setCurrentRowInOrdenesStatusTab] =
    useState(0);

  //FIC: indicamos que el estado inicial del tab page principal por default sera INSTITUTOS.

  const [
    currentNameTabInOrdenesStatusTab,
    setCurrentNameTabInOrdenesStatusTab,
  ] = useState("ORDENES_STATUS");

  return (
    <Box>
      <BusinessNavTab
        currentRowInOrdenesStatusTab={currentRowInOrdenesStatusTab}
        setCurrentNameTabInOrdenesStatusTab={
          setCurrentNameTabInOrdenesStatusTab
        }
      />

      {/* <h2>Tab con la tabla del subdocumento de Negocios de la coleccion de Institutos</h2>
            <h2>Este debera abrir otro NAVTAB DE NEGOCIOS porque tiene subdocumentos no es un objeto final</h2> */}

      {console.log(currentNameTabInOrdenesStatusTab)}
      {/* {currentNameTabInBusinessTab == "NEGOCIOS" && <BusinessTab />} */}

      {currentNameTabInBusinessTab == "INFO ADICIONAL" && <InfoAdTab />}
      {currentNameTabInBusinessTab == "ARCHIVOS" && <FilesTab />}
      {currentNameTabInBusinessTab == "TELEFONOS" && <PhonsTab />}
      {currentNameTabInBusinessTab == "DIR WEBS" && <WebAddressesTab />}
      {currentNameTabInBusinessTab == "DOMICILIOS" && <AddressesTab />}
    </Box>
  );
}