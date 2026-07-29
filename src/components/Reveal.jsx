import { useEffect, useRef, useState } from "react";
import "./Reveal.css";

/**
 * Wraps any content and fades/slides it in once it scrolls into view.
 * Usage: <Reveal><YourSection /></Reveal>
 * Usage with stagger: <Reveal delay={150}>...</Reveal>
 */
const Reveal = ({ children, delay = 0, direction = "up", className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node); // animate once, not every scroll pass
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`rk-reveal rk-reveal--${direction} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;