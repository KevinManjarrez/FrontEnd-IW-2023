import { createBrowserRouter } from "react-router-dom";
import Home from "../education/home/pages/Home";
import Carreras from "../education/courses/pages/Courses"
import Grupos from "../education/groups/pages/Groups";
import Cursos from "../education/courses/pages/Courses"
import Error from "../share/errors/pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "/carreras",
        element: <Carreras />,
      },
      {
        path: "/grupos",
        element: <Grupos />,
      },
      {
        path: "/cursos",
        element: <Cursos />,
      },
    ],
  },
]);

export default router;