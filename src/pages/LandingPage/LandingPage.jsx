import Header from "../../components/Header/Header.jsx";
import Banner from "./components/Banner/Banner.jsx";
import About from "./components/About/About.jsx";
import Teachers from "./components/Teachers/Teachers.jsx";
import Advantages from "./components/Advantages/Advantage.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import BurgerWindow from "../../components/BurgerWindow/BurgerWindow.jsx";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useContext } from "react";
import { uriHistoryContext } from "../../Contexts.jsx";

export default function LandingPage() {
    const path = useLocation().pathname;
    const { uriHistory, setUriHistory } = useContext(uriHistoryContext);
    const navigate = useNavigate();

    const bannerRef = useRef(null);
    const aboutRef = useRef(null);
    const teachersRef = useRef(null);
    const advantagesRef = useRef(null);
    const footerRef = useRef(null);

    const sectionRefs = [
        bannerRef,
        aboutRef,
        teachersRef,
        advantagesRef,
        footerRef,
    ];

    const hiddenStyle = {
        opacity: 0,
        transform: "translateY(50px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
    };

    const visibleStyle = {
        opacity: 1,
        transform: "translateY(0)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
    };

    const threshold = 100;

    useEffect(() => {
        const handleScroll = () => {
            sectionRefs.forEach(ref => {
                if (!ref.current) return;
                const rect = ref.current.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight - 100 && rect.bottom > 100;
                Object.assign(ref.current.style, isInView ? visibleStyle : hiddenStyle);
            });
        };

        sectionRefs.forEach(ref => {
            if (ref.current) {
                Object.assign(ref.current.style, hiddenStyle);
            }
        });

        const timer = setTimeout(() => {
            handleScroll();
        }, 50);

        const handleClick = (e) => {
            const target = e.target.closest("a");
            if (!target || !target.href) return;

            const href = target.getAttribute("href");
            const url = new URL(target.href, window.location.origin);

            if (url.origin === window.location.origin && href.startsWith("/")) {
                e.preventDefault();
                navigate(href);
            }
        };

        document.addEventListener("click", handleClick);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("click", handleClick);
            clearTimeout(timer);
        };
    }, [path, navigate]);

    return (
        <>
            <Header />
            <div ref={bannerRef} style={hiddenStyle}>
                <Banner />
            </div>
            <div ref={aboutRef} style={hiddenStyle}>
                <About />
            </div>
            <div ref={teachersRef} style={hiddenStyle}>
                <Teachers />
            </div>
            <div ref={advantagesRef} style={hiddenStyle}>
                <Advantages />
            </div>
            <div ref={footerRef} style={hiddenStyle}>
                <Footer />
            </div>
            <BurgerWindow />
        </>
    );
}