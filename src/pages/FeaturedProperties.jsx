import { useMemo } from "react";
import { useProperties } from "../hooks/useRentalKingData";
import PropertyCard from "../components/PropertyCard";
import "./FeaturedPropert.css";

const FeaturedProperties = () => {
  const {
    data: properties = [],
    isLoading,
    isError,
  } = useProperties();

  const featuredProperties = useMemo(
    () => properties.filter((p) => p.isFeatured),
    [properties]
  );

  if (isLoading) {
    return (
      <div className="rk-properties">
        <div className="rk-properties__body">
          <h3>Loading featured properties...</h3>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rk-properties">
        <div className="rk-properties__body">
          <h3>Failed to load featured properties.</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="rk-properties">
      <div className="rk-properties__header">
        <div className="rk-properties__header-inner">
          <p className="rk-properties__eyebrow">
            Handpicked by RK Builders
          </p>

          <h1>Featured Properties</h1>

          <p className="rk-properties__intro">
            Showcasing the finest homes, villas, commercial spaces, and
            investment opportunities from our portfolio. Explore properties
            that define excellence, quality, and timeless value.
          </p>
        </div>
      </div>

      <div className="rk-properties__body">
        {/* Uncomment if you want the count */}
        {/* 
        <p className="rk-properties__count">
          {featuredProperties.length}{" "}
          {featuredProperties.length === 1
            ? "featured property"
            : "featured properties"}
        </p>
        */}

        {featuredProperties.length === 0 ? (
          <div className="rk-properties__empty">
            No featured properties available.
          </div>
        ) : (
          <div className="rk-properties__grid">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProperties;