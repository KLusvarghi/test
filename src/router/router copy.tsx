import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import React from "react";
import BaseLayout from "@/pages/BaseLayout/BaseLayout";
import Metas from "@/pages/Graphics/DesempenhoComercial/MambaContent";
// import Closer from "@/pages/Graphics/analise-progressao-metas";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <BaseLayout />,
      children: [
        {
          path: "",
          element: <Navigate to="/mamba" replace />,
          // element: <h1>Hellow world</h1>,
        },
        {
          path: "mamba",
          element: <Outlet />,
          children: [
            {
              path: "desempenho-comercial",
              element: <h1>Hellow</h1>,
            },
            // {
            //   path: "analise-progressao-metas",
            //   element: <Closer />,
            // },
          ],
        },
        // {
        //   path: "metodo12p",
        //   element: <Outlet />,
        //   children: [
        //     {
        //       path: "desempenho-comercial",
        //       element: <Metas />,
        //     },
        //     {
        //       path: "analise-progressao-metas",
        //       element: <Closer />,
        //     },
        //   ],
        // },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    } as any,
  },
);
