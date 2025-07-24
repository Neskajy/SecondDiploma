import Header from "../components/Header/Header.jsx";
import Banner from "../components/Banner/Banner.jsx";
import About from "../components/About/About.jsx";
import Teachers from "../components/Teachers/Teachers.jsx";
import Advantages from "../components/Advantages/Advantage.jsx";
import Footer from "../components/Footer/Footer.jsx";
import BurgerWindow from "../components/BurgerWindow/BurgerWindow.jsx";

export default function LandingPage() {
    return (
        <>
            <Header />
            <Banner />
            <About />
            <Teachers />
            <Advantages />
            <Footer />
            <BurgerWindow />
        </>
    )
}