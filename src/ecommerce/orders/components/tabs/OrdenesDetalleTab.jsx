import { Box } from "@mui/material";
import OrdenesDetalleTable from "../tables/OrdenesDetalleTable";
import OrdenesDetalleNavTab from "./OrdenesDetalleNavTab";
import React, { useState } from 'react';
import OrdenesDetalleF from "./OrdenesDetalleF";
import OrdenesDetalleV from "./OrdenesDetalleV";
import OrdenesDetalleU from "./OrdenesDetalleU";
import OrdenesDetalleAD from "./OrdenesDetalleAD";
import OrdenesDetallePAQ from "./OrdenesDetallePAQ";
import OrdenesDetalleP from "./OrdenesDetalleP";

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
      {currentNameTabInOrdenesDetalleTab == "DETALLE V" && <OrdenesDetalleV/>}
      {currentNameTabInOrdenesDetalleTab == "DETALLE U" && <OrdenesDetalleU/>}
      {currentNameTabInOrdenesDetalleTab == "DETALLE P" && <OrdenesDetalleP/>}
      {currentNameTabInOrdenesDetalleTab == "DETALLE INFO AD" && <OrdenesDetalleAD/>}
      {currentNameTabInOrdenesDetalleTab == "DETALLE PS PAQ" && <OrdenesDetallePAQ/>}
      
      {currentNameTabInOrdenesDetalleTab === "ORDEN DETALLE" && <OrdenesDetalleTable />}
    </Box>
  );
}

