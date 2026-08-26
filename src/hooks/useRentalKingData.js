import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../lib/apiClient";

// =======================
// Properties
// =======================

export const useProperties = () =>
  useQuery({
    queryKey: ["properties"],

    queryFn: async () => {
      const { data } = await apiClient.get("/property/get-all");
      return data.properties ?? [];
    },
  });

// =======================
// Property Schema
// =======================

export const usePropertySchema = () =>
  useQuery({
    queryKey: ["propertySchema"],

    queryFn: async () => {
      const { data } = await apiClient.get("/property/schema");
      return data;
    },

    staleTime: 5 * 60 * 1000,
  });

// =======================
// Single Property
// =======================

export const useProperty = (id) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["property", id],

    queryFn: async () => {
      // First try global cache
      const cachedProperties =
        queryClient.getQueryData(["properties"]) ?? [];

      const cachedProperty = cachedProperties.find(
        (property) => property._id === id
      );

      if (cachedProperty) {
        return cachedProperty;
      }

      // Direct URL access fallback
      const { data } = await apiClient.get(`/property/${id}`);

      return data.property;
    },

    enabled: !!id,
  });
};

// =======================
// Projects
// =======================

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],

    queryFn: async () => {
      const { data } = await apiClient.get("/project/get-all");
      return data.projects ?? [];
    },
  });

// =======================
// Testimonials
// =======================

export const useTestimonials = () =>
  useQuery({
    queryKey: ["testimonials"],

    queryFn: async () => {
      const { data } = await apiClient.get("/testimonial/get-all");
      return data.testimonials ?? [];
    },
  });

// =======================
// Team
// =======================

export const useTeam = () =>
  useQuery({
    queryKey: ["team"],

    queryFn: async () => {
      const { data } = await apiClient.get("/team/get-all");
      return data.members ?? [];
    },
  });

// =======================
// Partners
// =======================

export const usePartners = () =>
  useQuery({
    queryKey: ["partners"],

    queryFn: async () => {
      const { data } = await apiClient.get("/partner/get-all");
      return data.partners ?? [];
    },
  });