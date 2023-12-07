import { Box, Tab, Tabs, Stack } from "@mui/material";
import React, { useState } from "react";

const OrdenesDetalleTabs = [
  "Orden Detalle",
  "Detalle_ps_estatus_f",
  "Detalle_ps_estatus_v",
  "Detalle_ps_estatus_u",
  "Detalle_ps_estatus_p",
  "Detalle_ps_info_ad",
  "Detalle_ps_paq",
];

const OrdenesDetalleNavTab = ({
  currentRowDetalleInBusinessTab,
  setCurrentDetalleTabInBusinessTab,
}) => {
  const [currenTabIndex, setCurrentTabIndex] = useState(0);

  //FIC: Evento Change
  const handleChange = (e) => {
    setCurrentDetalleTabInBusinessTab(e.target.innerText.toUpperCase());
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
              disabled={currentRowDetalleInBusinessTab === null}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default OrdenesDetalleNavTab;
