import { useLayoutEffect } from "react";
import gsap from "gsap";

const createRipple = (button, event) => {
  const rect = button.getBoundingClientRect();
  const ripple = document.createElement("span");
  const size = Math.max(rect.width, rect.height) * 1.8;

  ripple.className = "button-ripple";
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left}px`;
  ripple.style.top = `${event.clientY - rect.top}px`;

  button.appendChild(ripple);

  gsap.fromTo(
    ripple,
    { scale: 0, opacity: 0.42 },
    {
      scale: 1,
      opacity: 0,
      duration: 0.65,
      ease: "power3.out",
      onComplete: () => ripple.remove(),
    }
  );
};

const useInteractiveAnimations = (scopeRef) => {
  useLayoutEffect(() => {
    const scope = scopeRef.current;

    if (!scope) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const buttons = gsap.utils.toArray(
      "[data-animated-button]",
      scope
    );

    if (!buttons.length || prefersReducedMotion) {
      return undefined;
    }

    const cleanups = buttons.map((button) => {
      const moveX = gsap.quickTo(button, "x", {
        duration: 0.35,
        ease: "power3.out",
      });
      const moveY = gsap.quickTo(button, "y", {
        duration: 0.35,
        ease: "power3.out",
      });

      gsap.set(button, {
        transformOrigin: "center",
        force3D: true,
        willChange: "transform",
      });

      const handlePointerMove = (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        moveX(x * 0.16);
        moveY(y * 0.2);
      };

      const handlePointerEnter = () => {
        gsap.to(button, {
          scale: 1.045,
          duration: 0.25,
          ease: "power3.out",
        });
      };

      const handlePointerLeave = () => {
        moveX(0);
        moveY(0);
        gsap.to(button, {
          scale: 1,
          duration: 0.35,
          ease: "elastic.out(1, 0.45)",
        });
      };

      const handlePointerDown = (event) => {
        createRipple(button, event);
        gsap.to(button, {
          scale: 0.94,
          duration: 0.12,
          ease: "power2.out",
        });
      };

      const handlePointerUp = () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.18,
          ease: "back.out(2)",
        });
      };

      button.addEventListener("pointermove", handlePointerMove);
      button.addEventListener("pointerenter", handlePointerEnter);
      button.addEventListener("pointerleave", handlePointerLeave);
      button.addEventListener("pointerdown", handlePointerDown);
      button.addEventListener("pointerup", handlePointerUp);

      return () => {
        button.removeEventListener("pointermove", handlePointerMove);
        button.removeEventListener("pointerenter", handlePointerEnter);
        button.removeEventListener("pointerleave", handlePointerLeave);
        button.removeEventListener("pointerdown", handlePointerDown);
        button.removeEventListener("pointerup", handlePointerUp);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [scopeRef]);
};

export default useInteractiveAnimations;
