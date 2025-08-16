import logo from "../../assets/imgs/vector/logo.svg";
import { Link } from "react-router-dom";
import s from "./Header.module.scss";
import BurgerButton from "../BurgerButton/BurgerButton.jsx";
import { useLocation } from "react-router-dom";

export default function Header() {
    const path = useLocation().pathname;

    return (
        <header className={s.Header}>
            <div className={s.container}>
                <div className={s.logo}>
                    <img src={logo} alt="" />
                    <p>Второй диплом</p>
                </div>
                <div className={s.nav}>
                    <ul>
                        <li>
                            <Link to="/" className={`${path === "/" ? s.active : ""}`}>Главная</Link>
                        </li>
                        <li>
                            <Link to="/diploma/profile">Админ панель</Link>
                        </li>
                        <li>
                            <Link to="/appeal" className={`${path === "/appeal" ? s.active : ""}`}>Подать заявку</Link>
                        </li>
                        <li>
                            <Link to="/contacts" className={`${path === "/contacts" ? s.active : ""}`}>Контакты</Link>
                        </li>
                    </ul>
                </div>
                <Link to="/auth">
                    <button className={s.login}>
                        Авторизация
                    </button>
                </Link>
                <BurgerButton />
            </div>
        </header>
    )
}