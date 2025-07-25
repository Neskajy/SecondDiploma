import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ForgetPassword from "../components/ForgetPassword/ForgetPassword.jsx";
import BurgerWindow from "../components/BurgerWindow/BurgerWindow.jsx";


export default function ForgetPasswordPage() {
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