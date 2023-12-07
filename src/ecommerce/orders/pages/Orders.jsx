import { Box } from "@mui/material";
import { useState } from "react";
import OrdenesNavTab from "../components/tabs/OrdenesNavTab";
import OrdenesTab from "../components/tabs/OrdenesTab";
import BusinessTab from "../components/tabs/BusinessTab";
//import OrdenesDetalleNavTap from "../components/tabs/OrdenesDetalleNavTab"
import OrdenesDetalleTap from "../components/tabs/OrdenesDetalleTab";
import OrdenesStatusTab from "../components/tabs/OrdenesStatusTab";
import InfoAdModal from "../components/tabs/InfoAdTab";


const Ordenes = () => {

    //FIC: indicamos que al iniciar no hay ningun Instituto seleccionado.
    const [currentRowInOrdenesTab, setCurrentRowInOrdenesTab] = useState(0);
   
    //FIC: indicamos que el estado inicial del tab page principal por default sera INSTITUTOS.
    const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("ORDENES");
    const [currentTabInPrincipalTaba, setBusinessTabInPrincipalTabIsSelected] = useState(false);
    const [currentTabInPrincipalTabe, setOrdenesDetalleTabInPricipalTabIsSelected] = useState(false);

    //const InstitutosAllData = useSelector((state) => state.institutesReducer);
    return (
        <Box>

            {/* FIC: llamada intrinsica (props) */}

            <OrdenesNavTab
                setCurrentRowInOrdenesTab={setCurrentRowInOrdenesTab}
                setCurrentTabInPrincipalTab={setCurrentTabInPrincipalTab}
                setBusinessTabInPrincipalTabIsSelected={setBusinessTabInPrincipalTabIsSelected}
                setOrdenesDetalleTabInPricipalTabIsSelected={setOrdenesDetalleTabInPricipalTabIsSelected}
            />
           
            {/* FIC: si en el tap principal esta seleccionado es el tab de INSTITUTOS
            manda llamar la pagina que va dentro del tab de Institutos. */}
            {currentTabInPrincipalTab == "ORDENES" && <OrdenesTab />}


            {currentTabInPrincipalTab == "ORDENES_STATUS" && <OrdenesStatusTab />}

            {currentTabInPrincipalTab == "ORDENES_INFO" && <InfoAdModal />}

            {/* FIC: si en el tap principal esta seleccionado el tab de NEGOCIOS
            manda llamar la pagina que va dentro del tab de Business. */}
            {/*currentTabInPrincipalTab == "ORDENES_STATUS" && <BusinessTab />*/}  

            {/*currentTabInPrincipalTab == "ORDENES_DETALLES" && <OrdenesDetalleTap/>*/} 

        </Box>
    );
};

export default Ordenes;
