import { useContext } from "react";
import { QuickViewContext } from "../context/quickViewContextObject";

export const useQuickView = () => useContext(QuickViewContext);
