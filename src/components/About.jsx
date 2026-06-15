import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { featureLists, goodLists, profileLists } from "../../constants";
import ImagePopup from "./ImagePopup";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    src: "/images/abt1.png",
    title: "Fresh prep before the first pour.",
    kicker: "Ingredient Story",
  },
  {
    src: "/images/abt2.png",
    title: "A bar built around rhythm and precision.",
    kicker: "Behind The Bar",
  },
  {
    src: "/images/abt3.png",
    title: "Color, texture, and garnish in balance.",
    kicker: "Signature Detail",
  },
  {
    src: "/images/abt4.png",
    title: "Every glass is finished by hand.",
    kicker: "Craft Finish",
  },
  {
    src: "/images/abt5.png",
    title: "A velvet mood from first sip to last.",
    kicker: "Velvet Pour",
  },
];

const About = () => {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (event, image) => {
    gsap.fromTo(
      event.currentTarget,
      { scale: 0.96 },
      {
        scale: 1,
        duration: 0.45,
        ease: "elastic.out(1, 0.45)",
      }
    );

    setSelectedImage(image);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-copy", {
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      gsap.from(".about-card", {
        y: 90,
        opacity: 0,
        scale: 0.96,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 75%",
        },
      });

      gsap.to(".about-card img", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: galleryRef.current,
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
      id="about"
      className="container relative z-20 mx-auto min-h-screen bg-black/55 px-5 py-28 text-white backdrop-blur-[1px]"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="about-copy lg:col-span-7">
          <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-black">
            About Us
          </span>
          <h2 className="mt-8 max-w-3xl font-modern-negra text-6xl leading-none md:text-8xl">
            Every pour has a little theatre.
          </h2>
        </div>

        <div className="about-copy space-y-7 lg:col-span-5">
          <p className="text-lg leading-8 text-white/70">
            Velvet Pour brings fresh ingredients, bold spirits, and precise
            technique together for cocktails that look beautiful and taste even
            better.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {[featureLists, goodLists].map((list, index) => (
              <ul key={index} className="space-y-3">
                {list.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <img src="/images/check.png" alt="" className="size-5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {profileLists.map((profile) => (
              <img
                key={profile.imgPath}
                src={profile.imgPath}
                alt=""
                className="-ml-2 size-12 rounded-full border-2 border-black first:ml-0"
              />
            ))}
            <p className="text-sm text-white/50">Trusted by cocktail lovers.</p>
          </div>

          <a
            href="#contact"
            data-animated-button
            className="inline-flex rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
          >
            Plan a Visit
          </a>
        </div>
      </div>

      <div
        ref={galleryRef}
        className="mt-16 grid gap-5 md:grid-cols-12"
      >
        {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={(event) => openImage(event, image)}
              className={`about-card h-72 overflow-hidden rounded-3xl ${
                index === 0 || index === 4
                  ? "md:col-span-5"
                  : index === 2
                  ? "md:col-span-4"
                  : "md:col-span-3"
              } group relative cursor-pointer text-left outline-none ring-yellow/60 transition focus-visible:ring-2`}
            >
              <img
                src={image.src}
                alt={image.title}
                className="h-[115%] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/25" />
              <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black opacity-0 transition group-hover:opacity-100">
                Open
              </span>
            </button>
          ))}
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

export default About;
