import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import {
  BrowserRouter,
  Route as RouterRoute,
  Routes as RouterRoutes,
} from "react-router-dom";
import { lazy } from "react";
import { ConfirmationDialogProvider } from "./contexts/dialog-context-provider";
import { CollapseLayout } from "./layout/collapse-layout";

const Routes = lazy(() => import("./pages/routes"));
const Route = lazy(() => import("./pages/route"));
const Areas = lazy(() => import("./pages/areas"));
const Area = lazy(() => import("./pages/area"));
const Settings = lazy(() => import("./pages/settings"));

function App() {
  return (
    <MantineProvider>
      <ConfirmationDialogProvider>
        <BrowserRouter>
          <CollapseLayout>
            <RouterRoutes>
              <RouterRoute path="/routes" element={<Routes />}></RouterRoute>
              <RouterRoute
                path="/routes/:routeId"
                element={<Route />}
              ></RouterRoute>
              <RouterRoute path="/areas" element={<Areas />}></RouterRoute>
              <RouterRoute
                path="/areas/:areaId"
                element={<Area />}
              ></RouterRoute>
              <RouterRoute
                path="/settings"
                element={<Settings />}
              ></RouterRoute>
            </RouterRoutes>
          </CollapseLayout>
        </BrowserRouter>
      </ConfirmationDialogProvider>
    </MantineProvider>
  );
}

export default App;
