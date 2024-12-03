import { SystemGenericContext } from "@/context/SystemGenericContext";
import { useContext } from "react";

// Hook para exportar o contexto e ter acesso a ele com praticidade
function useSystemGenericProviderContext() {
  return useContext(SystemGenericContext);
}

export default useSystemGenericProviderContext;
