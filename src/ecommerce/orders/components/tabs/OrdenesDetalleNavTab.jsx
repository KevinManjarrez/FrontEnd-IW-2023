import { Box, Tab, Tabs, Stack } from "@mui/material";
import React, { useState } from "react";

const OrdenesDetalleTabs = [
  "Orden Detalle",
  "Detalle F",
  "Detalle V",
  "Detalle U",
  "Detalle P",
  "Detalle INFO AD",
  "Detalle PS PAQ",
];

const OrdenesDetalleNavTab = ({
  currentRowDetalleInOrdenesDetalleTab,
  setCurrentNameTabInOrdenesDetalleTab,
}) => {
  const [currenTabIndex, setCurrentTabIndex] = useState(0);

  //FIC: Evento Change
  const handleChange = (e) => {
    setCurrentNameTabInOrdenesDetalleTab(e.target.innerText.toUpperCase());
    switch (e.target.innerText.toUpperCase()) {
      case "ORDEN DETALLE":
        setCurrentTabIndex(0);
        break;
      case "DETALLE F":
        setCurrentTabIndex(1);
        break;
      case "DETALLE V":
        setCurrentTabIndex(2);
        break;
      case "DETALLE U":
        setCurrentTabIndex(3);
        break;
      case "DETALLE P":
        setCurrentTabIndex(4);
        break;
      case "DETALLE INFO AD":
        setCurrentTabIndex(5);
        break;
      case "DETALLE PS PAQ":
        setCurrentTabIndex(6);
        break;
    }
  };
  return (
    <Box
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        mx: 1,
        padding: 0.5,
      }}
    >
      <Tabs
        value={currenTabIndex}
        variant={"fullWidth"}
        onChange={handleChange}
        aria-label="icon tabs example"
        textColor="primary"
      >
        {OrdenesDetalleTabs.map((tab) => {
          return (
            <Tab
              key={tab}
              label={tab}
              disabled={currentRowDetalleInOrdenesDetalleTab === null}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default OrdenesDetalleNavTab;
