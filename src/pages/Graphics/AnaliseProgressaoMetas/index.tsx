import useSystemGenericProviderContext from "@/hooks/useSystemGenericProviderContext";
import MambaContent from "./MambaContent";
import Metodo12PContent from "./Metodo12pContent";

const AnaliseProgressaoMetas = () => {
  const { activeCompany } = useSystemGenericProviderContext();

  if (activeCompany === "mamba") {
    return <MambaContent />;
  } else {
    return <Metodo12PContent />;
  }
};

export default AnaliseProgressaoMetas;
