import { useEffect } from "react";
import { getMesas } from "./services/mesasService";

function App() {
  useEffect(() => {
    async function probar() {
      const { data, error } = await getMesas();
      console.log("Mesas:", data);
      if (error) console.log("Error:", error);
    }
    probar();
  }, []);

  return <div>Probando Supabase...</div>;
}

export default App;