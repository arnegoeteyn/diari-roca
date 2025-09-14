import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Loader, MantineProvider } from "@mantine/core";

import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useRoutesStore } from "@/hooks/store/use-store";
import { load } from "./lib/routes/db";
import DiariRocaRouter from "./router";

function App() {
  const setState = useRoutesStore((state) => state.setStore);

  const initialized = useRoutesStore((store) => store.store.initialized);

  useEffect(() => {
    const loadAndSet = async () => {
      const state = await load();
      setState(state);
    };
    loadAndSet();
  }, [setState]);

  return (
    <MantineProvider>
      {initialized ? (
        <BrowserRouter>
          <DiariRocaRouter />
        </BrowserRouter>
      ) : (
        <Loader />
      )}
    </MantineProvider>
  );
}

export default App;
