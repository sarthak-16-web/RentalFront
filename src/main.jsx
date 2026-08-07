import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// Production-ready Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data stays fresh for 30 minutes
      staleTime: 30 * 60 * 1000,

      // Cache stays in memory for 1 hour
      gcTime: 60 * 60 * 1000,

      // Never refetch automatically
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,

      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);