import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
//page
import Login from "./pages/Login";
// import UserList from "./pages/UserList";
// import Applicant from "./pages/Applicant";
// import Organization from "./pages/Organization";

//layout
import RouteLayout from "./layouts/RouteLayout";
import MakersPage from "./pages/MakersManagePage";
import Home from "./pages/Home";
import { router } from "./router";



const App = (): JSX.Element => {

  return (
    <RouterProvider router={router} />
  );
};

export default App;