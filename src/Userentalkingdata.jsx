import { useQuery } from "@tanstack/react-query";
import apiClient from "./lib/apiClient";

// staleTime: how long cached data is considered "fresh" — no refetch,
// no loading spinner, instant on every page switch within this window.
const FIVE_MINUTES = 5 * 60 * 1000;

export const useProperties = () =>
  useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data } = await apiClient.get("/api/property/get-all");
      return data.properties;
    },
    staleTime: FIVE_MINUTES,
  });

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await apiClient.get("/api/project/get-all");
      return data.projects;
    },
    staleTime: FIVE_MINUTES,
  });

export const useTestimonials = () =>
  useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data } = await apiClient.get("/api/testimonial/get-all");
      return data.testimonials;
    },
    staleTime: FIVE_MINUTES,
  });