import { Box } from "@mui/material";
import OrdenesDetalleTable from "../tables/OrdenesDetalleTable";
import OrdenesDetalleNavTab from "./OrdenesDetalleNavTab";
import React, { useState } from 'react';
import OrdenesDetalleF from "./OrdenesDetalleF";

export default function OrdenesTab() {
  const [currentRowDetalleInOrdenesDetalleTab, setCurrentRowInOrdenesDetalleTab] = useState(0);
  const [currentNameTabInOrdenesDetalleTab, setCurrentNameTabInOrdenesDetalleTab] =
    useState("ORDEN DETALLE");

  return (
    <Box>
      <OrdenesDetalleNavTab
        currentRowDetalleInOrdenesDetalleTab={currentRowDetalleInOrdenesDetalleTab}
        setCurrentNameTabInOrdenesDetalleTab={setCurrentNameTabInOrdenesDetalleTab}
      />
      {console.log(currentNameTabInOrdenesDetalleTab)}

      {currentNameTabInOrdenesDetalleTab == "DETALLE F" && <OrdenesDetalleF/>}
      {currentNameTabInOrdenesDetalleTab == "DETALLE V" /*&& <FilesTab />*/}
      {currentNameTabInOrdenesDetalleTab == "DETALLE U" /*&& <PhonsTab />*/}
      {currentNameTabInOrdenesDetalleTab == "DETALLE P" /*&& <WebAddressesTab />*/}
      {currentNameTabInOrdenesDetalleTab == "DETALLE INFO AD" /*&& <AddressesTab />*/}
      {currentNameTabInOrdenesDetalleTab == "DETALLE PS PAQ" /*&& <AddressesTab />*/}
      
      {currentNameTabInOrdenesDetalleTab === "ORDEN DETALLE" && <OrdenesDetalleTable />}
    </Box>
  );
}

