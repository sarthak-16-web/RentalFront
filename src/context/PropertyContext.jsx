import { createContext, useContext, useEffect, useState } from "react";
import { getAllProperties } from "../api/propertyApi";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperties();
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Failed to load properties");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const featured = properties.filter((p) => p.isFeatured);

  return (
    <PropertyContext.Provider value={{ properties, featured, loading, error }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => useContext(PropertyContext);