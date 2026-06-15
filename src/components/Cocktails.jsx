import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { cocktailLists, mockTailLists } from "../../constants";

gsap.registerPlugin(ScrollTrigger);

const DrinkList = ({ title, items, className = "" }) => (
  <div className={`space-y-8 ${className}`}>
    <h2 className="text-sm uppercase tracking-[0.35em] text-white/60">
      {title}
    </h2>

    <ul className="space-y-6">
      {items.map((item) => (
        <li
          key={item.name}
          className="drink-row flex items-start justify-between gap-8 border-b border-white/10 pb-5"
        >
          <div>
            <h3 className="font-modern-negra text-3xl text-yellow md:text-4xl">
              {item.name}
            </h3>
            <p className="mt-1 text-sm uppercase tracking-[0.18em] text-white/50">
              {item.country} / {item.detail}
            </p>
          </div>

          <span className="text-xl font-semibold text-white">
            {item.price}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const Cocktails = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leftLeafRef = useRef(null);
  const rightLeafRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".drink-row", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cocktail-list",
          start: "top 75%",
        },
      });

      gsap.to(leftLeafRef.current, {
        y: 120,
        rotate: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to(rightLeafRef.current, {
        y: -120,
        rotate: 8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cocktails"
      className="relative z-20 min-h-screen overflow-hidden bg-black/55 px-5 py-28 text-white backdrop-blur-[1px] md:py-36"
    >
      <img
        ref={leftLeafRef}
        src="/images/cocktail-left-leaf.png"
        alt=""
        className="pointer-events-none absolute -left-10 top-10 w-40 will-change-transform md:bottom-0 md:top-auto md:w-72"
      />

      <img
        ref={rightLeafRef}
        src="/images/cocktail-right-leaf.png"
        alt=""
        className="pointer-events-none absolute -right-12 top-0 w-44 will-change-transform md:bottom-0 md:top-auto md:w-80"
      />

      <div className="container relative z-10 mx-auto">
        <div ref={headingRef} className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow">
            Signature menu
          </p>
          <h2 className="mt-5 font-modern-negra text-6xl leading-none md:text-8xl">
            Cocktails made for golden hours.
          </h2>
          <a
            href="#work"
            data-animated-button
            className="mt-8 inline-flex rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
          >
            See The Art
          </a>
        </div>

        <div className="cocktail-list mt-20 grid gap-16 md:grid-cols-2 md:gap-24">
          <DrinkList title="Most Popular" items={cocktailLists} />
          <DrinkList title="Most Loved" items={mockTailLists} />
        </div>
      </div>
    </section>
  );
};

export default Cocktails;
