import { Box, Tab, Tabs, Stack } from "@mui/material";
import React, { useState } from "react";

const BusinessTabs = [
  "Negocios",
  "Info Adicional",
  "Archivos",
  "Telefonos",
  "Dir Webs",
  "Domicilios",
];

const OrdenesStatusNavTab = ({
  currentRowInOrdenesStatusTab,
  setCurrentNameTabInOrdenesStatusTab,
}) => {
  const [currenTabIndex, setCurrentTabIndex] = useState(0);

  //FIC: Evento Change
  const handleChange = (e) => {
    setCurrentNameTabInOrdenesStatusTab(e.target.innerText.toUpperCase());
    switch (e.target.innerText.toUpperCase()) {
      case "NEGOCIOS":
        setCurrentTabIndex(0);
        break;
      case "INFO ADICIONAL":
        setCurrentTabIndex(1);
        break;
      case "ARCHIVOS":
        setCurrentTabIndex(2);
        break;
      case "TELEFONOS":
        setCurrentTabIndex(3);
        break;
      case "DIR WEBS":
        setCurrentTabIndex(4);
        break;
      case "DOMICILIOS":
        setCurrentTabIndex(5);
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
        {BusinessTabs.map((tab) => {
          return (
            <Tab
              key={tab}
              label={tab}
              disabled={currentRowInOrdenesStatusTab === null}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default OrdenesStatusNavTab;
