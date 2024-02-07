import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { apiSlice } from "./api/apiSlice.ts";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { NextUIProvider } from "@nextui-org/react"; 

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.global = globalThis;

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <ApiProvider api={apiSlice}>
         <NextUIProvider>
            <App />
         </NextUIProvider>
      </ApiProvider>
   </React.StrictMode>
);
