import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ImagePopup from "./ImagePopup";

gsap.registerPlugin(ScrollTrigger);

const artImage = {
  src: "/images/under-img.jpg",
  title: "The exact moment flavor becomes theatre.",
  kicker: "The Art",
};

const Art = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (event) => {
    gsap.fromTo(
      event.currentTarget,
      { scale: 0.97 },
      {
        scale: 1,
        duration: 0.45,
        ease: "elastic.out(1, 0.45)",
      }
    );

    setSelectedImage(artImage);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "center 35%",
            scrub: 0.9,
          },
        })
        .from(".art-title", { opacity: 0.25, scale: 0.92, ease: "none" }, 0)
        .from(imageRef.current, { clipPath: "inset(20% 28% round 40px)" }, 0)
        .from(textRef.current, { y: 80, opacity: 0, ease: "none" }, 0.2);

      gsap.to(imageRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative z-20 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black/45 px-5 py-28 text-white backdrop-blur-[1px]"
    >
      <div className="absolute inset-0 radial-gradient opacity-45" />

      <h2 className="art-title relative z-10 text-center font-modern-negra text-8xl leading-none text-white/20 md:text-[18vw]">
        The Art
      </h2>

      <button
        type="button"
        ref={imageRef}
        onClick={openImage}
        className="group relative z-20 -mt-8 h-[52vh] w-full max-w-5xl cursor-pointer overflow-hidden rounded-[2rem] text-left outline-none ring-yellow/60 will-change-transform focus-visible:ring-2 md:-mt-20 md:h-[70vh]"
      >
        <img
          src={artImage.src}
          alt={artImage.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
        <span className="absolute bottom-5 left-5 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black opacity-0 transition group-hover:opacity-100">
          Open
        </span>
      </button>

      <div
        ref={textRef}
        className="relative z-30 mx-auto -mt-20 max-w-3xl text-center will-change-transform"
      >
        <h3 className="font-serif text-3xl leading-tight md:text-5xl">
          We balance flavor, texture, aroma, and garnish into one polished
          moment.
        </h3>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/70">
          From the first shake to the final leaf, every detail is shaped to make
          the drink feel alive before it reaches the table.
        </p>
        <a
          href="#contact"
          data-animated-button
          className="mt-8 inline-flex rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
        >
          Book the Experience
        </a>
      </div>

      {selectedImage && (
        <ImagePopup
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
};

export default Art;
