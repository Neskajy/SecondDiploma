import { Link } from "react-router-dom";
import s from "./BurgerWindow.module.scss";
import { useContext, useState, useEffect, useRef } from "react";
import { BurgerContext } from "../../Contexts.jsx";
import { useLocation } from "react-router-dom";
import { uriHistoryContext } from "../../Contexts.jsx";

export default function BurgerWindow() {
    const {isActiveBurger, setIsActiveBurger} = useContext(BurgerContext);
    const path = useLocation().pathname;
    const {uriHistory, setUriHistory} = useContext(uriHistoryContext);
    
    useEffect(() => {
        if (uriHistory.at(-1) != path) {
            setUriHistory([...uriHistory, path]);
            setIsActiveBurger(false);
        } else {
            console.log("Первая страница");
        }
    }, []);
    
    let [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return (
        <>
            <div className={`${s.BurgerWindow} ${isActiveBurger && windowWidth <= 1200 ? s.active : ""}`}>
                <div className={s.container}>
                    <nav className={s.nav}>
                        <ul>
                            <li className={path == "/" ? s.active : ""}>
                                <Link to="/">Главная</Link>
                            </li>
                            <li className={path == "/carpark" ? `${s.active}` : ""}>
                                <Link to="/carpark">Преподаватели</Link>
                            </li>
                            <li className={path === "/map" ? `${s.active}` : ""}>
                                <Link to="/map">Подать заявку</Link>
                            </li>
                            <li className={path === "/contacts" ? `${s.active}` : ""}>
                                <Link to="/contacts">Контакты</Link>
                            </li>
                        </ul>
                    </nav>
                    <Link to="/auth">
                        <button className={s.login}>
                            Авторизация
                        </button> 
                    </Link>
                    <div className={s.copyright}>© 2025 Паутина. Все права защищены.</div>
                </div>
            </div>
        </>
    )
}