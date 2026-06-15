import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
  const sectionRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const bodyRef = useRef(null);
  const overlayRef = useRef(null);
  const leftLeafRef = useRef(null);
  const rightLeafRef = useRef(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.set(
        [
          videoWrapperRef.current,
          bodyRef.current,
          leftLeafRef.current,
          rightLeafRef.current,
        ],
        {
          force3D: true,
          willChange: "transform",
        }
      );

      gsap.set(videoWrapperRef.current, {
        opacity: 1,
        filter: "blur(0px) saturate(1)",
      });

      if (!prefersReducedMotion) {
        const titleSplit = new SplitText(titleRef.current, {
          type: "chars, words",
        });

        const subtitleSplit = new SplitText(subtitleRef.current, {
          type: "chars, words",
        });

        gsap.from(titleSplit.chars, {
          yPercent: 110,
          opacity: 0,
          duration: 1.1,
          stagger: 0.035,
          ease: "expo.out",
        });

        gsap.from(subtitleSplit.chars, {
          yPercent: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.02,
          delay: 0.35,
          ease: "power3.out",
        });
      }

      const scaleValue = isMobile ? 0.94 : isTablet ? 0.82 : 0.68;
      const yValue = isMobile ? -24 : isTablet ? -70 : -110;
      const radiusValue = isMobile ? "20px" : "36px";

      gsap
        .timeline({
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
        .to(
          videoWrapperRef.current,
          {
            scale: scaleValue,
            y: yValue,
            borderRadius: radiusValue,
            ease: "none",
          },
          0
        )
        .to(
          videoWrapperRef.current,
          {
            scale: isMobile ? 1.05 : 1.12,
            y: 0,
            opacity: 0.38,
            borderRadius: "0px",
            filter: "blur(2px) saturate(0.8)",
            ease: "none",
          },
          0.28
        )
        .to(
          overlayRef.current,
          {
            opacity: 0.72,
            ease: "none",
          },
          0
        );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        })
        .to(
          titleRef.current,
          {
            y: isMobile ? -60 : -110,
            opacity: 0.25,
            ease: "none",
          },
          0
        )
        .to(
          bodyRef.current,
          {
            y: 55,
            opacity: 0.75,
            ease: "none",
          },
          0
        )
        .to(
          leftLeafRef.current,
          {
            y: isMobile ? 70 : 120,
            rotate: isMobile ? -4 : -8,
            ease: "none",
          },
          0
        )
        .to(
          rightLeafRef.current,
          {
            y: isMobile ? -70 : -120,
            rotate: isMobile ? 4 : 8,
            ease: "none",
          },
          0
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, isTablet]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 h-screen min-h-[700px] overflow-hidden bg-transparent"
    >
      <div
        ref={videoWrapperRef}
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden will-change-transform"
      >
        <video
          src="/videos/input.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-center"
        />

        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/20"
        />
      </div>

      <h1
        ref={titleRef}
        className="absolute left-1/2 top-24 z-20 -translate-x-1/2 overflow-hidden text-center font-modern-negra text-7xl leading-none text-white sm:text-8xl md:top-28 md:text-[14vw] lg:top-24 lg:text-[10rem]"
      >
        MOJITO
      </h1>

      <img
        ref={leftLeafRef}
        src="/images/slider-left-leaf.png"
        alt=""
        className="absolute left-0 top-1/2 z-10 w-28 -translate-y-1/2 will-change-transform sm:w-36 md:w-48 lg:w-60"
      />

      <img
        ref={rightLeafRef}
        src="/images/slider-right-leaf.png"
        alt=""
        className="absolute right-0 top-1/2 z-10 w-28 -translate-y-1/2 will-change-transform sm:w-36 md:w-48 lg:w-60"
      />

      <div ref={bodyRef} className="relative z-20 h-full will-change-transform">
        <div className="container mx-auto flex h-full px-6 md:px-10 lg:px-16">
          <div className="flex w-full flex-col justify-end pb-12 md:pb-20 lg:pb-24">
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <div className="text-center text-white md:text-left">
                <p className="text-xs uppercase tracking-[0.3em] md:text-sm">
                  Cool. Crisp. Classic.
                </p>

                <h2
                  ref={subtitleRef}
                  className="mt-4 overflow-hidden text-4xl font-light leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
                >
                  Sip the Spirit
                  <br />
                  of Summer
                </h2>
              </div>

              <div className="max-w-md text-center text-white md:text-right">
                <p className="text-sm leading-relaxed md:text-base">
                  Experience handcrafted cocktails made with premium
                  ingredients, bold flavors, and modern creativity.
                </p>

                <a
                  href="#cocktails"
                  data-animated-button
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-sm transition-all duration-300 hover:bg-white hover:text-black md:text-base"
                >
                  View Cocktails
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
