import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Evaluation from "./pages/Evaluation";
import Dashboard from "./pages/Dashboard";
import SelectedTeacher from "./pages/SelectedTeacher";
import PageNotFound from "./pages/PageNotFound";
import Schedule from "./pages/Schedule";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to={"/home"} />,
    errorElement: <PageNotFound />,
  },
  { path: "/home", element: <Home />, errorElement: <PageNotFound /> },

  {
    path: "/evaluate-tools",
    element: <Evaluation />,
    errorElement: <PageNotFound />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/dashboard/:id",
    element: <SelectedTeacher />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/evaluation/:id",
    element: <Evaluation />,
    errorElement: <PageNotFound />,
  },
  { path: "/schedule", element: <Schedule />, errorElement: <PageNotFound /> },
  { path: "*", element: <PageNotFound />, errorElement: <PageNotFound /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
