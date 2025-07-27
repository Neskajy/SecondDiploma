import logo from "../../assets/imgs/vector/logo.svg";
import Vk from "../../assets/imgs/vector/social/vk.svg?react";
import Tg from "../../assets/imgs/vector/social/tg.svg?react";
import Mail from "../../assets/imgs/vector/social/mail.svg?react";
import s from "./Footer.module.scss";
import { useLocation } from "react-router-dom";


export default function Footer() {
    const path = useLocation().pathname;

    const lowSpaceAblePaths = ["/reg", "/auth", "/forgetPassword"];
    return (
        <footer className={`${s.Footer} ${lowSpaceAblePaths.includes(path) ? s.low__space : ""}`}>
            <div className={s.container}>
                <div className={s.column__main}>
                    <div className={s.upper}>
                        <div className={s.logo}><img src={logo} alt="" /></div>
                        <div className={s.text}>
                            <span>Второй диплом</span>
                            <p className={s.super__brief}>
                                онлайн-платформа отчетности для преподавателей
                            </p>
                        </div>
                    </div>
                    <p className={s.brief}>Будь <span>с нами!</span> Будь в <span>центре событий!</span></p>
                </div>
                <div className={s.nav__columns__grid}>
                    <nav className={`${s.column} ${s.menu}`}>
                        <div className={s.nav__header}>Меню</div>
                        <ul>
                            <li>Главная</li>
                            <li>Контакты</li>
                            <li>Преподаватели</li>
                        </ul>
                    </nav>
                    <nav className={`${s.column} ${s.client}`}>
                        <div className={s.nav__header}>Клиенту</div>
                        <ul>
                            <li>Подать заявку</li>
                            <li>Политика конфидициальности</li>
                        </ul>
                    </nav>
                    <nav className={`${s.column} ${s.contacts}`}>
                        <div className={s.nav__header}>Контакты</div>
                        <ul className={s.social}>
                            <li><a href=""><Vk alt="" className={s.icon} /></a></li>
                            <li><a href=""><Tg alt="" className={s.icon} /></a></li>
                            <li><a href=""><Mail alt="" className={s.icon} /></a></li>
                        </ul>
                        <ul className={s.another}>
                            <li><a href="">+7 (927) 045-12-23</a></li>
                            <li>г.Казань, ул.Бари Галеева, 3а</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    )
}