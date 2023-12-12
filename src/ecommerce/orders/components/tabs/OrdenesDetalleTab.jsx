import { Box } from "@mui/material";
import OrdenesDetalleTable from "../tables/OrdenesDetalleTable";
import OrdenesDetalleNavTab from "./OrdenesDetalleNavTab";
import React, { useState } from 'react';

export default function OrdenesTab() {
  //FIC: indicamos que al iniciar no hay ningun Instituto seleccionado.
  const [currentRowDetalleInOrdenesDetalleTab, setCurrentRowInOrdenesDetalleTab] = useState(0);

  //FIC: indicamos que el estado inicial del tab page principal por default sera INSTITUTOS.
  const [currentNameTabInOrdenesDetalleTab, setCurrentNameTabInOrdenesDetalleTab] =
    useState("ORDENES_DETALLE");
  return (
    <Box>
      <OrdenesDetalleNavTab
        currentRowDetalleInOrdenesDetalleTab={currentRowDetalleInOrdenesDetalleTab}
        setCurrentNameTabInOrdenesDetalleTab={setCurrentNameTabInOrdenesDetalleTab}
      />
      {console.log(currentNameTabInOrdenesDetalleTab)}
      {/* {currentNameTabInBusinessTab == "NEGOCIOS" && <BusinessTab />} */}

      {currentNameTabInOrdenesDetalleTab == "Detalle F" /*&& <InfoAdTab />*/}
      {currentNameTabInOrdenesDetalleTab == "Detalle V" /*&& <FilesTab />*/}
      {currentNameTabInOrdenesDetalleTab == "Detalle U" /*&& <PhonsTab />*/}
      {currentNameTabInOrdenesDetalleTab == "Detalle P" /*&& <WebAddressesTab />*/}
      {currentNameTabInOrdenesDetalleTab == "Detalle INFO AD" /*&& <AddressesTab />*/}
      {currentNameTabInOrdenesDetalleTab == "Detalle PS PAQ" /*&& <AddressesTab />*/}
      <OrdenesDetalleTable></OrdenesDetalleTable>
    </Box>
  );
}
