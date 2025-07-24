import hero__img from "../../assets/imgs/vector/hero__img.svg";
import s from "./Banner.module.scss";


export default function Banner() {
    return (
        <>
            <section className={s.Banner}>
                <div className={s.container}>
                    <div className={s.hero__text}>
                        <div className={s.text__info}>
                            <h1>Второй диплом</h1>
                            <p>Набор на курсы профессиональной переподготовки по программе “Второй диплом”</p>
                        </div>
                        <button className={s.appeal}>Подать заявку</button>
                    </div>
                    <div className={s.hero__img}>
                        <img src={hero__img} alt="" />
                    </div>
                </div>
            </section>
        </>
    )
}