import { createBrowserRouter } from "react-router-dom";
import Home from "../security/home/pages/Home";
import Labels from "../security/labels/pages/Labels";
import Institutes from "../security/institutes/pages/Institutes";
import Usuarios from "../security/users/pages/Users";
import Periodos from "../security/periods/pages/Periods";
import Error from "../share/errors/pages/Error";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
      children: [
        {
          path: "/institutes",
          element: <Institutes />,
        },
        {
          path: "/labels",
          element: <Labels />,
        },
        {
          path: "/periods",
          element: <Periodos />,
        },
        {
            path: "/users",
            element: <Usuarios />,
        },
      ],
    },
  ]);
  export default router;