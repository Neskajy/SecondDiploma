import s from "./Accordion.module.scss";
import Expand from "../../../../../assets/imgs/vector/expand.svg?react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import { useLocation } from "react-router-dom";

import { BurgerContext } from "../../../../../Contexts";

export default function Accordion({item, isActive}) {

    const {isActiveBurger, setIsActiveBurger} = useContext(BurgerContext);

    const [isOpen, setIsOpen] = useState(isActive);
    const Icon = item.icon;

    const maxHeight = item.innerMenu.length * 50;

    const path = useLocation().pathname;
    return (
        <div className={`${s.accordion} ${isOpen ? s.active : ""} ${isActiveBurger ? s.burgerIsActive : ""}`} onClick={() => setIsOpen(!isOpen)}>
            <div className={s.preview}>
                <Icon className={s.icon} />
                <p className={s.text__span}>{item.text}</p>
                <Expand className={s.expand__icon} />
            </div>
            <ul className={s.itemsInner} style={{ height: isOpen ? `${maxHeight}px` : '0px' }}>
                {
                    item.innerMenu.map((itemInner) => {
                        const InnerIcon = itemInner.icon;
                        const isActiveItemInner = path.includes(`/${itemInner.page}`);
                        return (
                            <li key={itemInner.id} className={`${s.itemInner} ${isActiveItemInner ? s.active : ""}`}>
                                <Link to={`/diploma/${itemInner.page}`} className={s.innerLink}>
                                    <InnerIcon className={s.icon__inner} />
                                    <span>{itemInner.text}</span>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}