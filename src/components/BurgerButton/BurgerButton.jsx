import s from "./BurgerButton.module.scss";
import { useContext } from "react";

import { BurgerContext } from "../../Contexts";

export default function BurgerButton() {
    const {isActiveBurger, setIsActiveBurger} = useContext(BurgerContext);

    function clickOnBurgerButton() {
        setIsActiveBurger(!isActiveBurger);
    }
    
    return (
        <>
            <div className={`${s.BurgerButton} ${isActiveBurger ? s.active : ""}`} onClick={clickOnBurgerButton}>
                <div className={s.inner}>
                    <div className={s.top}></div>
                    <div className={s.center}></div>
                    <div className={s.bottom}></div>
                </div>
            </div>

        </>
    )
}