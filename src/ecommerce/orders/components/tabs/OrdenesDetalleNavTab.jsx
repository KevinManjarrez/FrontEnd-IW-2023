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
  setCurrentDetalleTabInOrdenesDetalleTab,
}) => {
  const [currenTabIndex, setCurrentTabIndex] = useState(0);

  //FIC: Evento Change
  const handleChange = (e) => {
    setCurrentDetalleTabInOrdenesDetalleTab(e.target.innerText.toUpperCase());
    switch (e.target.innerText.toUpperCase()) {
      case "Orden Detalle":
        setCurrentTabIndex(0);
        break;
      case "Detalle F":
        setCurrentTabIndex(1);
        break;
      case "Detalle V":
        setCurrentTabIndex(2);
        break;
      case "Detalle U":
        setCurrentTabIndex(3);
        break;
      case "Detalle P":
        setCurrentTabIndex(4);
        break;
      case "Detalle INFO AD":
        setCurrentTabIndex(5);
        break;
      case "Detalle PS PAQ":
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
