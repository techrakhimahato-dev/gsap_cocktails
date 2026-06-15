import React, { useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const Hero = () => {
    useEffect(() => {
        gsap.registerPlugin(SplitText);
        const heroSplit = new SplitText(".title", { type: "chars, words" });
        const paragraphSplit = new SplitText(".subtitle", { type: "chars, words" });
        heroSplit.chars.forEach((char) => char.classList.add("char"));
        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.5,
            ease: "expo.out",
            stagger: 0.06,
        });

        gsap.from(paragraphSplit.chars, {
            opacity: 0,
            yPercent: 100,
            duration: 1.5,
            ease: "expo.out",
            stagger: 0.06,
            delay: 1,
        });
    }, []);

    return (
        <section id="hero" className="noisy">
            <h1 className="title">MOJITO</h1>
            <img src="/images/slider-left-leaf.png" alt="left-leaf" className="left-leaf" />
            <img src="/images/slider-right-leaf.png" alt="right-leaf" className="right-leaf" />
            <div className="body">
                <div className="content">
                    <div className="space-y-5 text-center md:text-left">
                        <p>Cool. Crisp. Classic.</p>
                        <p className="subtitle">Sip the Spirit <br /> of Summer</p>
                    </div>
                    <div className="view-cocktails">
                        <p className="subtitle">Experience handcrafted cocktails made with premium ingredients, bold flavors, and modern creativity.</p>
                        <a href="#cocktails">View Cocktails</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;