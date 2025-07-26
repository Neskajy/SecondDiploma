import { Items } from "./Items.jsx";
import s from "./SideBar.module.scss";
import logo from "../../../../assets/imgs/vector/logo.svg";
import Exit from "../../../../assets/imgs/vector/exit.svg?react"

import { useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import { BurgerContext } from "../../../../Contexts.jsx";


export default function SideBar () {
    const {isActiveBurger, setIsActiveBurger} = useContext(BurgerContext);
    const path = useLocation().pathname;

    function handleOnMouseEnter() {
        setIsActiveBurger(false);
    }

    function handleOnMouseDown() {
        setIsActiveBurger(true);
    }
    
    return (
        <>
            <aside className={`${s.SideBar} ${isActiveBurger ? s.active : ""}`} onMouseEnter={handleOnMouseEnter}>
                <div className={s.logo}>
                    <img src={logo} alt="" />
                    <p>{isActiveBurger ? "" : "Админка"}</p>
                </div>
                <menu className={s.menu}>
                    {
                        Items.map((category) => (
                            <div key={category.id} className={s.menu__category}>
                                <span className={s.category}>{isActiveBurger ? "..." : category.category}</span>
                                <ul>
                                    {
                                        category.menu__items.map((item) => {
                                            const isActive = path.includes(`/${item.page}`);
                                            const Icon = item.icon;
                                            return (
                                                <li key={item.id} className={isActive ? s.active : ""}>
                                                    <Link to={`/admin/${item.page}`}>
                                                        <Icon alt={item.text} className={s.icon}/>
                                                        <span>{isActiveBurger ? "" : item.text}</span>
                                                    </Link>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        ))
                    }
                    <div className={s.exit}>
                        <Link to={`${path}/exit`}>
                            <Exit className={s.icon}/>
                            <span>{isActiveBurger ? "" : "Выйти"}</span>
                        </Link>
                    </div>
                </menu>
            </aside>
        </>
    )
}