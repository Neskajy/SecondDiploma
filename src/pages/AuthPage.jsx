import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Auth from "../components/Auth/Auth.jsx";
import { useEffect, useRef } from "react";

import footerStyles from "../components/Footer/Footer.module.scss";
import BurgerWindow from "../components/BurgerWindow/BurgerWindow.jsx";



export default function AuthPage() {
    return (
        <>
            <div className="AuthPage" style={{minHeight: "100vh"}}>
                <Header />
                <BurgerWindow />
                <Auth />
                <Footer/>
            </div>
        </>
    )
}