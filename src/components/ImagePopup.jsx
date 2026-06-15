import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const ImagePopup = ({ image, onClose }) => {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const closingRef = useRef(false);

  const closePopup = () => {
    if (closingRef.current) return;

    closingRef.current = true;

    gsap
      .timeline({ onComplete: onClose })
      .to(panelRef.current, {
        y: 40,
        scale: 0.94,
        opacity: 0,
        duration: 0.28,
        ease: "power2.in",
      })
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.24,
          ease: "power2.in",
        },
        0
      );
  };

  useLayoutEffect(() => {
    gsap
      .timeline()
      .fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      )
      .fromTo(
        panelRef.current,
        { y: 80, scale: 0.92, opacity: 0, rotateX: 8 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          rotateX: 0,
          duration: 0.65,
          ease: "expo.out",
        },
        0.05
      );
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closePopup();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 px-5 backdrop-blur-md"
      onClick={(event) => {
        if (event.target === event.currentTarget) closePopup();
      }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/15 bg-black/80 shadow-2xl"
      >
        <button
          type="button"
          onClick={closePopup}
          className="absolute right-4 top-4 z-20 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow"
        >
          Close
        </button>

        <img
          src={image.src}
          alt={image.title}
          className="max-h-[78vh] w-full object-cover"
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/65 to-transparent p-6 text-white md:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow">
            {image.kicker}
          </p>
          <h3 className="mt-3 font-serif text-3xl md:text-5xl">
            {image.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
