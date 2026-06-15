import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cocktails from "./components/Cocktails";
import About from "./components/About";
import Art from "./components/Art";
import Contact from "./components/Contact";
import useInteractiveAnimations from "./useInteractiveAnimations";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
    const mainRef = useRef(null);

    useInteractiveAnimations(mainRef);

    return(
        <main ref={mainRef} className="relative overflow-hidden">
            <Navbar />
            <Hero />
            <Cocktails />
            <About />
            <Art />
            <Contact />
        </main>
    )
}

export default App;
