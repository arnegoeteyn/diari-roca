import {
  BrowserRouter,
  Route as RouterRoute,
  Routes as RouterRoutes,
} from "react-router-dom";
import "./App.css";
import { lazy } from "react";
import Layout from "./layout/layout";
import { ConfirmationDialogProvider } from "./contexts/dialog-context-provider";

const Routes = lazy(() => import("./pages/routes"));
const Route = lazy(() => import("./pages/route"));
const Areas = lazy(() => import("./pages/areas"));
const Settings = lazy(() => import("./pages/settings"));

function App() {
  return (
    <ConfirmationDialogProvider>
      <BrowserRouter>
        <Layout>
          <RouterRoutes>
            <RouterRoute path="/routes" element={<Routes />}></RouterRoute>
            <RouterRoute
              path="/routes/:routeId"
              element={<Route />}
            ></RouterRoute>
            <RouterRoute path="/areas" element={<Areas />}></RouterRoute>
            <RouterRoute path="/settings" element={<Settings />}></RouterRoute>
          </RouterRoutes>
        </Layout>
      </BrowserRouter>
    </ConfirmationDialogProvider>
  );
}

export default App;
