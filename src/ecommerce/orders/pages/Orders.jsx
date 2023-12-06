import { Box } from "@mui/material";
import { useState } from "react";
import OrdenesNavTab from "../components/tabs/OrdenesNavTab";
import OrdenesTab from "../components/tabs/OrdenesTab";
import BusinessTab from "../components/tabs/BusinessTab";

const Ordenes = () => {

    //FIC: indicamos que al iniciar no hay ningun Instituto seleccionado.
    const [currentRowInOrdenesTab, setCurrentRowInOrdenesTab] = useState(0);
   
    //FIC: indicamos que el estado inicial del tab page principal por default sera INSTITUTOS.
    const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("ORDENES");
    const [currentTabInPrincipalTaba, setBusinessTabInPrincipalTabIsSelected] = useState(false);

    //const InstitutosAllData = useSelector((state) => state.institutesReducer);
    return (
        <Box>

            {/* FIC: llamada intrinsica (props) */}

            <OrdenesNavTab
                setCurrentRowInOrdenesTab={setCurrentRowInOrdenesTab}
                setCurrentTabInPrincipalTab={setCurrentTabInPrincipalTab}
                setBusinessTabInPrincipalTabIsSelected={setBusinessTabInPrincipalTabIsSelected}
            />
           
            {/* FIC: si en el tap principal esta seleccionado es el tab de INSTITUTOS
            manda llamar la pagina que va dentro del tab de Institutos. */}
            {currentTabInPrincipalTab == "ORDENES" && <OrdenesTab />}

            {/* FIC: si en el tap principal esta seleccionado el tab de NEGOCIOS
            manda llamar la pagina que va dentro del tab de Business. */}
            {currentTabInPrincipalTab == "ORDENES_STATUS" && <BusinessTab />}   

        </Box>
    );
};

export default Ordenes;
