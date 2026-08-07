import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import apiClient from "../lib/apiClient";

const preloadImage = (src) => {
  if (!src) return;

  const img = new Image();
  img.src = src;
};

const AppPreloader = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const preloadEverything = async () => {
      try {
        // ============================
        // PROPERTIES
        // ============================

        const properties = await queryClient.ensureQueryData({
          queryKey: ["properties"],
          queryFn: async () => {
            const { data } = await apiClient.get("/api/property/get-all");
            return data.properties ?? [];
          },
        });

        properties.forEach((property) => {
          preloadImage(property.coverImage);

          if (property.images?.length) {
            property.images.forEach(preloadImage);
          }
        });

        // ============================
        // PROJECTS
        // ============================

        const projects = await queryClient.ensureQueryData({
          queryKey: ["projects"],
          queryFn: async () => {
            const { data } = await apiClient.get("/api/project/get-all");
            return data.projects ?? [];
          },
        });

        projects.forEach((project) => {
          preloadImage(project.image);
        });

        // ============================
        // TESTIMONIALS
        // ============================

        const testimonials = await queryClient.ensureQueryData({
          queryKey: ["testimonials"],
          queryFn: async () => {
            const { data } = await apiClient.get("/api/testimonial/get-all");
            return data.testimonials ?? [];
          },
        });

        testimonials.forEach((testimonial) => {
          preloadImage(testimonial.image);
        });

        console.log("✅ RentalKing preloading complete");
      } catch (err) {
        console.error("Preloading failed", err);
      }
    };

    preloadEverything();
  }, [queryClient]);

  return null;
};

export default AppPreloader;