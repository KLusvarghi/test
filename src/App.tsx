import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { SystemGenericProvider } from "./provider/SystemGenericProvider";
import useSystemThemeProviderContext from "./hooks/useSystemThemeProviderContext";

function App() {
  const { theme } = useSystemThemeProviderContext();

  return (
    <SystemGenericProvider company={theme}>
      <RouterProvider router={router} />
    </SystemGenericProvider>
  );
}

export default App;
