import { navLinks } from '../../constants'
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Navbar = () => {
    useEffect(() => {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Create animation
        gsap.to("nav", {
            backgroundColor: "rgba(0, 0, 0, 0.31)",
            backdropFilter: "blur(10px)",
            duration: 0.5,
            scrollTrigger: {
                trigger: "nav",
                start: "top center",
                markers: false, // Set to true for debugging
            }
        });
    }, []); // Empty dependency array = runs once on mount
    
    return (
        <nav>
            <div>
                <a href="#home" className="flex items-center gap-2">
                    <img src="/images/logo.png" alt="logo" />
                    <p>Velvet Pour</p>
                </a>

                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;