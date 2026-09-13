import { useState } from "react";
import { QuickViewContext } from "./quickViewContextObject";

export const QuickViewProvider = ({ children }) => {
  const [property, setProperty] = useState(null);

  return (
    <QuickViewContext.Provider
      value={{ property, open: setProperty, close: () => setProperty(null) }}
    >
      {children}
    </QuickViewContext.Provider>
  );
};
