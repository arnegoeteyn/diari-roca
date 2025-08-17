import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";

import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useRoutesStore } from "./hooks/use-store";
import { load } from "./lib/routes/db";
import DiariRocaRouter from "./router";

function App() {
  const setState = useRoutesStore((state) => state.setStore);

  useEffect(() => {
    const loadAndSet = async () => {
      const state = await load();
      setState(state);
    };
    loadAndSet();
  }, [setState]);

  return (
    <MantineProvider>
      <BrowserRouter>
        <DiariRocaRouter />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
