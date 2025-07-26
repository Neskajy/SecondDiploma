// import Header from "../components/Header/Header.jsx";
// import Footer from "../components/Footer/Footer.jsx";
// import Reg from "../components/Reg/Reg.jsx";
// import { useEffect, useRef } from "react";

// import footerStyles from "../components/Footer/Footer.module.scss";
// import BurgerWindow from "../components/BurgerWindow/BurgerWindow.jsx";

// import { useLocation } from "react-router-dom";
// import { useContext } from "react";

// export default function RegPage() {
//     const path = useLocation().pathname;

//     const {uriHistory, setUriHistory} = useContext(uriHistoryContext);

//     useEffect(() => {
//         setUriHistory([...uriHistory, path]);
//     }, [])
//     return (
//         <>
//             <div className="RegPage" style={{minHeight: "100vh"}}>
//                 <Header />
//                 <BurgerWindow />
//                 <Reg />
//                 <Footer/>
//             </div>
//         </>
//     )
// }