import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Auth from "./components/Auth/Auth.jsx";
import { useContext, useEffect } from "react";

import BurgerWindow from "../../components/BurgerWindow/BurgerWindow.jsx";
import { uriHistoryContext } from "../../Contexts.jsx";
import { useLocation } from "react-router-dom";


export default function AuthPage() {
    const path = useLocation().pathname;

    const {uriHistory, setUriHistory} = useContext(uriHistoryContext);

    useEffect(() => {
        setUriHistory([...uriHistory, path]);
        console.log(uriHistory);
    }, [])

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