import { SystemGeneralContext } from "@/context/SystemGeneralContext";
import { useContext } from "react";

// Hook para exportar o contexto e ter acesso a ele com praticidade
function useSystemGeneralProviderContext() {
  return useContext(SystemGeneralContext);
}

export default useSystemGeneralProviderContext;
