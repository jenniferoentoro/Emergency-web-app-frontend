import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "../store";

import { SidebarProvider } from "./pages/inside/admin/test/context/sidebarContext";

import { ChakraProvider, theme } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <ChakraProvider theme={theme}> */}
      <SidebarProvider>
        <App />
      </SidebarProvider>
      {/* </ChakraProvider> */}
    </React.StrictMode>
  </Provider>
);
