import s from "./SideBar.module.scss";
import logo from "../../../../assets/imgs/vector/logo.svg";
import Exit from "../../../../assets/imgs/vector/exit.svg?react"

import { useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import { BurgerContext } from "../../../../Contexts.jsx";


import profile from "../../../../assets/imgs/vector/aside__icons/profile.svg?react";
import calendar from "../../../../assets/imgs/vector/aside__icons/calendar.svg?react";
import groups from "../../../../assets/imgs/vector/aside__icons/groups.svg?react";
import lessons from "../../../../assets/imgs/vector/aside__icons/lessons.svg?react";
import articles from "../../../../assets/imgs/vector/aside__icons/articles.svg?react";
import appeals from "../../../../assets/imgs/vector/aside__icons/appeals.svg?react";
import admin from "../../../../assets/imgs/vector/aside__icons/admin.svg?react";

export const Items = [
    {
        id: 1,
        category: "Меню",
        menu__items: [
            {
                id: 1,
                icon: profile,
                text: "Профиль",
                page: "profile"
            },
            {
                id: 2,
                icon: calendar,
                text: "Календарь",
                page: "calendar"
            },
            {
                id: 3,
                icon: groups,
                text: "Группы",
                page: "groups"
            },
            {
                id: 4,
                icon: lessons,
                text: "Занятия",
                page: "lessons"
            },
            {
                id: 5,
                icon: articles,
                text: "Статьи",
                page: "articles"
            },
            {
                id: 6,
                icon: appeals,
                text: "Обращения",
                page: "appeals"
            },
            {
                id: 7,
                icon: admin,
                text: "Админу",
                page: "reallyadmin",
                innerMenu: [
                    {
                        id: 1,
                        icon: admin,
                        text: "Админу",
                        page: "reallyadmin",
                    },
                    {
                        id: 2,
                        icon: admin,
                        text: "Админу",
                        page: "reallyadmin",
                    },
                    {
                        id: 3,
                        icon: admin,
                        text: "Админу",
                        page: "reallyadmin",
                    }
                ]
            },
        ]
    }
];


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
                    <p>Диплом</p>
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
                                                        <span>{item.text}</span>
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
                            <span>Выйти</span>
                        </Link>
                    </div>
                </menu>
            </aside>
        </>
    )
}