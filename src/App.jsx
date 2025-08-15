import { useRef, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import "./App.css";

function IOSSlider({ bgColor, borderColor, fillColor, icon }) {
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const fillHeight = useMotionValue(0);

  const updateHeight = (clientY) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const offsetY = clientY - rect.top;
    const height = rect.height;

    let newHeight = height - offsetY;
    newHeight = Math.max(0, Math.min(newHeight, height));

    animate(fillHeight, newHeight, {
      type: "spring",
      stiffness: 200,
      damping: 25,
    });
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    updateHeight(e.clientY);
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    updateHeight(e.touches[0].clientY);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging.current) updateHeight(e.clientY);
    };
    const handleTouchMove = (e) => {
      if (isDragging.current) updateHeight(e.touches[0].clientY);
    };
    const handleEnd = () => {
      isDragging.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, []);

  return (
    <div
      style={{
        ...styles.slider,
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
      }}
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <motion.div
        style={{
          ...styles.fill,
          backgroundColor: fillColor,
          height: fillHeight,
        }}
      />
      <div style={styles.sunContainer}>{icon}</div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "0px" }}>IOS Slider</h1>
      <p style={{ textAlign: "center", marginTop: "0px" }}>
        Drag the sliders up and down to simulate animation
      </p>

      <div style={styles.sliderContainer}>
        {/* Light Mode Slider */}
        <IOSSlider
          bgColor="#e3e3e3"
          borderColor="#c9c9c9"
          fillColor="white"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          }
        />

        {/* Dark Mode Slider */}
        <IOSSlider
          bgColor="#2c2c2c"
          borderColor="#444"
          fillColor="black"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          }
        />
      </div>
      <p style={styles.footer}>
        Made with{" "} ❤️ by <a href="https://github.com/tauhidpatel">Tauhid</a>
      </p>

    </>
  );
}

const styles = {
  sliderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    padding: "1em",
    flexWrap: "wrap",
  },
  slider: {
    width: "130px",
    height: "260px",
    borderRadius: "40px",
    position: "relative",
    overflow: "hidden",
    touchAction: "none",
    boxShadow: "rgba(0,0,0,0.2) 1px 8px 30px 2px",
  },
  fill: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    borderBottomLeftRadius: "40px",
    borderBottomRightRadius: "40px",
  },
  sunContainer: {
    position: "absolute",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,
  },
  footer: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    padding: "10px",
    backgroundColor: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(5px)",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
  },
};

