import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import {
  Navigate,
  Route as RouterRoute,
  Routes as RouterRoutes,
} from "react-router-dom";
import { lazy, useEffect } from "react";
import { useRoutesStore } from "@/hooks/store/use-store";
import { load } from "./lib/routes/db";
import { CollapseLayout } from "./layout/collapse-layout";

const Routes = lazy(() => import("./pages/routes"));
const Route = lazy(() => import("./pages/route"));
const Areas = lazy(() => import("./pages/areas"));
const Area = lazy(() => import("./pages/area"));
const Sector = lazy(() => import("./pages/sector"));
const Settings = lazy(() => import("./pages/settings"));
const Ascents = lazy(() => import("./pages/ascents"));

function DiariRocaRouter() {
  const setState = useRoutesStore((state) => state.setStore);

  useEffect(() => {
    const loadAndSet = async () => {
      const state = await load();
      setState(state);
    };
    loadAndSet();
  }, [setState]);

  return (
    <RouterRoutes>
      <RouterRoute element={<CollapseLayout />}>
        <RouterRoute path="/" element={<Navigate to="/routes" replace />} />
        <RouterRoute path="/routes" element={<Routes />}></RouterRoute>
        <RouterRoute path="/routes/:routeId" element={<Route />}></RouterRoute>
        <RouterRoute path="/ascents" element={<Ascents />}></RouterRoute>
        <RouterRoute path="/areas" element={<Areas />}></RouterRoute>
        <RouterRoute path="/areas/:areaId" element={<Area />}></RouterRoute>
        <RouterRoute
          path="/sectors/:sectorId"
          element={<Sector />}
        ></RouterRoute>
        <RouterRoute path="/settings" element={<Settings />}></RouterRoute>
      </RouterRoute>
    </RouterRoutes>
  );
}

export default DiariRocaRouter;
