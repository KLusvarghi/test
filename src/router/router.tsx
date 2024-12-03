import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import BaseLayout from "@/pages/BaseLayout/BaseLayout";
import DesempenhoComercial from "@/pages/Graphics/DesempenhoComercial";
import AnaliseProgressaoMetas from "@/pages/Graphics/AnaliseProgressaoMetas";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <BaseLayout />,
      children: [
        {
          path: "",
          element: <Navigate to="/mamba/desempenho-comercial" replace />,
        },
        {
          path: "mamba",
          element: <Outlet />,
          children: [
            {
              path: "desempenho-comercial",
              element: <DesempenhoComercial />,
            },
            {
              path: "analise-progressao-metas",
              element: <AnaliseProgressaoMetas/>,
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    } as any,
  },
);
