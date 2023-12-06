import {
  RouterProvider,
} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { router } from "./router";



const App = (): JSX.Element => {

  return (
    <RouterProvider router={router} />
  );
};

export default App;