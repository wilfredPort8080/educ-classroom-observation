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

const router = createBrowserRouter([
  { path: "/", element: <Navigate replace to={"/home"} /> },
  { path: "/home", element: <Home /> },

  { path: "/evaluate-tools", element: <Evaluation /> },

  { path: "/dashboard", element: <Dashboard /> },
  { path: "/dashboard/:id", element: <SelectedTeacher /> },
  { path: "*", element: <PageNotFound /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
