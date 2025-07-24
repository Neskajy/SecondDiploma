import { Link } from "react-router-dom";
import s from "./BurgerWindow.module.scss";
import { useContext, useState, useEffect } from "react";
import { BurgerContext } from "../../Contexts.jsx";

import { useLocation } from "react-router-dom";

export default function BurgerWindow() {
    const {isActiveBurger} = useContext(BurgerContext);

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

    const path = useLocation();

    return (
        <>
            <div className={`${s.BurgerWindow} ${isActiveBurger && windowWidth <= 1200 ? s.active : ""}`}>
                <div className={s.container}>
                    <nav className={s.nav}>
                        <ul>
                            <li className={path.pathname == "/" ? `${s.active}` : ""}>
                                <Link to="/">Главная</Link>
                            </li>
                            <li className={path.pathname == "/carpark" ? `${s.active}` : ""}>
                                <Link to="/carpark">Преподаватели</Link>
                            </li>
                            <li className={path.pathname === "/map" ? `${s.active}` : ""}>
                                <Link to="/map">Подать заявку</Link>
                            </li>
                            <li className={path.pathname === "/contacts" ? `${s.active}` : ""}>
                                <Link to="/contacts">Контакты</Link>
                            </li>
                        </ul>
                    </nav>
                    <button className={s.login}>
                        Авторизация
                    </button>
                    <div className={s.copyright}>© 2025 Паутина. Все права защищены.</div>
                </div>
            </div>
        </>
    )
}