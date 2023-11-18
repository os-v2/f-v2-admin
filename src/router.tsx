import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RouteLayout from "./layouts/RouteLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MakersManagePage from "./pages/MakersManagePage";
import ItemManagePage from "./pages/ItemManagePage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouteLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="makers"  >
        <Route path="manage" element={<MakersManagePage />} />
        <Route path="item" element={<ItemManagePage />} />
      </Route>
    </Route>
  )
);