        import { useMemo } from "react";
        import { MOCK_PROPERTIES } from "../data/mockProperties";
        import PropertyCard from "../components/PropertyCard";
        import "./FeaturedPropert.css";
        // import "./Properties.css";

        const FeaturedProperties = () => {
        const featuredProperties = useMemo(
            () => MOCK_PROPERTIES.filter((p) => p.isFeatured),
            []
        );

        return (
        <div className="rk-properties">
            <div className="rk-properties__header">
            <div className="rk-properties__header-inner">
                <p className="rk-properties__eyebrow">
                Handpicked by RK Builders
                </p>

                <h1>Featured Properties</h1>

                <p className="rk-properties__intro" >
                Showcasing the finest homes, villas, commercial spaces, and
                investment opportunities from our portfolio. Explore properties
                that define excellence, quality, and timeless value.
                </p>
            </div>
            </div>

            <div className="rk-properties__body">
            {/* <p className="rk-properties__count">
                {featuredProperties.length}{" "}
                {featuredProperties.length === 1
                ? "featured property"
                : "featured properties"}
            </p> */}

            <div className="rk-properties__grid">
                {featuredProperties.map((property) => (
                <PropertyCard
                    key={property._id}
                    property={property}
                />
                ))}
            </div>
            </div>
        </div>
        );
        };

        export default FeaturedProperties;  