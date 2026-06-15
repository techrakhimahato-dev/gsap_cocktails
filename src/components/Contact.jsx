import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { openingHours, socials, storeInfo } from "../../constants";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const drinkRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.to(drinkRef.current, {
        y: -80,
        rotate: -4,
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
      id="contact"
      className="relative z-20 min-h-screen overflow-hidden bg-black/55 px-5 py-28 text-center text-white backdrop-blur-[1px]"
    >
      <div className="absolute inset-0 radial-gradient opacity-45" />

      <img
        src="/images/footer-left-leaf.png"
        alt=""
        className="pointer-events-none absolute bottom-0 left-0 w-40 md:w-72"
      />

      <img
        src="/images/footer-right-leaf.png"
        alt=""
        className="pointer-events-none absolute right-0 top-0 hidden w-72 md:block"
      />

      <img
        ref={drinkRef}
        src="/images/footer-drinks.png"
        alt=""
        className="pointer-events-none absolute bottom-0 right-0 z-10 w-44 will-change-transform md:w-96"
      />

      <div className="container relative z-20 mx-auto flex min-h-[70vh] flex-col justify-between gap-12">
        <div className="contact-reveal">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow">
            Contact
          </p>
          <h2 className="mx-auto mt-5 max-w-4xl font-modern-negra text-6xl leading-none md:text-8xl">
            Ready for your next pour?
          </h2>
          <a
            href={`mailto:${storeInfo.contact.email}`}
            data-animated-button
            className="mt-8 inline-flex rounded-full border border-white/30 bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-yellow"
          >
            Reserve a Tasting
          </a>
        </div>

        <div className="contact-reveal mx-auto grid max-w-5xl gap-10 text-left md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm uppercase tracking-[0.25em] text-white/50">
              Location
            </h3>
            <p className="text-xl leading-8">{storeInfo.address}</p>
          </div>

          <div>
            <h3 className="mb-3 text-sm uppercase tracking-[0.25em] text-white/50">
              Reach Us
            </h3>
            <p className="text-xl leading-8">{storeInfo.contact.phone}</p>
            <p className="text-xl leading-8">{storeInfo.contact.email}</p>
          </div>

          <div>
            <h3 className="mb-3 text-sm uppercase tracking-[0.25em] text-white/50">
              Hours
            </h3>
            <ul className="space-y-2">
              {openingHours.map((item) => (
                <li key={item.day} className="flex justify-between gap-6">
                  <span>{item.day}</span>
                  <span className="text-white/60">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="contact-reveal flex justify-center gap-5">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              aria-label={social.name}
              data-animated-button
              className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white"
            >
              <img src={social.icon} alt="" className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
