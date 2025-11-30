import { createContext, useContext, useEffect, useState } from "react";

const ProgramContext = createContext();

export const ProgramProvider = ({ children }) => {
  const [programs, setPrograms] = useState([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/get-programs");
        const data = await res.json();
        setPrograms(data || []);
      } catch (error) {
        console.error("Failed to load programs:", error);
      } finally {
        setLoadingPrograms(false);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <ProgramContext.Provider value={{ programs, loadingPrograms }}>
      {children}
    </ProgramContext.Provider>
  );
};

export const usePrograms = () => useContext(ProgramContext);
