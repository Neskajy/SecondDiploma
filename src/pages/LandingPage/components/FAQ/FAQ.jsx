import expand from "../../assets/imgs/vector/expand.svg";
import s from "./FAQ.module.scss";



export default function FAQ() {
    return (
        <>
            <section className={s.FAQ}>
                <div className={s.container}>
                    <h3>Часто задаваемые вопросы</h3>
                    <div className={s.FAQ__item}>
                        <div className={s.question}></div>
                        <div className={s.answer}></div>
                        <img src={expand} alt="" />
                    </div>
                    <div className={s.FAQ__item}>
                        <div className={s.question}></div>
                        <div className={s.answer}></div>
                        <img src={expand} alt="" />
                    </div>
                    <div className={s.FAQ__item}>
                        <div className={s.question}></div>
                        <div className={s.answer}></div>
                        <img src={expand} alt="" />
                    </div>
                </div>
            </section>
        </>
    )
}