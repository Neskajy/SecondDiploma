import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword.jsx";
import BurgerWindow from "../../components/BurgerWindow/BurgerWindow.jsx";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";

import { uriHistoryContext } from "../../Contexts.jsx";

export default function ForgetPasswordPage() {
    const path = useLocation().pathname;

    const {uriHistory, setUriHistory} = useContext(uriHistoryContext);

    useEffect(() => {
        setUriHistory([...uriHistory, path]);
        console.log(uriHistory);
    }, [])
    return (
        <>
            <div style={{minHeight: "100vh"}}>
                <Header />
                <BurgerWindow />
                <ForgetPassword />
                <Footer />
            </div>
        </>
    )
}