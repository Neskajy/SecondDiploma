import web_design_icon from "../../../../assets/imgs/vector/directions/web_design_icon.svg";
import web_frontend_icon from "../../../../assets/imgs/vector/directions/web_frontend_icon.svg";
import web_backend_icon from "../../../../assets/imgs/vector/directions/web_backend_icon.svg";

import s from "./About.module.scss";

export default function About() {
    return (
        <>
            <section className={s.About}>
                <div className={s.container}>
                    <div className={s.text__info}>
                        <h3>О программе</h3>
                        <p>Этот место для объединения профессионалов и начинающих веб-разработчиков! Если у вас есть желание развивать себя, то мы рады видеть вас на программе по второму диплому! </p>
                    </div>
                    <div className={s.cards__grid}>
                        <div className={s.card}>
                            <div className={s.main__info}>
                                <div className={s.img}>
                                    <img src={web_design_icon} alt="" />
                                </div>
                                <h4>Веб-дизайн</h4>
                            </div>
                            <p>Стек: figma</p>
                        </div>
                        <div className={s.card}>
                            <div className={s.main__info}>
                                <div className={s.img}>
                                    <img src={web_frontend_icon} alt="" />
                                </div>
                                <h4>Фронтенд разработка</h4>
                            </div>
                            <p>Стек: html, css, js, react</p>
                        </div>
                        <div className={s.card}>
                            <div className={s.main__info}>
                                <div className={s.img}>
                                    <img src={web_backend_icon} alt="" />
                                </div>
                                <h4>Бэкенд разработка</h4>
                            </div>
                            <p>Стек: php, laravel</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}