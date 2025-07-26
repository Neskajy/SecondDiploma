import money from "../../../../assets/imgs/vector/advantages/money.svg";
import strong from "../../../../assets/imgs/vector/advantages/strong.svg";
import web_dev_icon from "../../../../assets/imgs/vector/advantages/web_dev_icon.svg";
import itInBrain from "../../../../assets/imgs/vector/advantages/itInBrain.svg";

import s from "./Advantage.module.scss";

export default function Advantages() {
    return (
        <>
            <section className={s.Advantages}>
                <div className={s.container}>
                    <h3>Преимущества</h3>
                    <div className={s.grid}>
                        <div className={s.card}>
                            <img src={money} alt="" />
                            <div className={s.text__card}>
                                <h6>Востребовано</h6>
                                <p className={s.brief__description}>Краткое описание</p>
                            </div>
                        </div>
                        <div className={s.card}>
                            <img src={strong} alt="" />
                            <div className={s.text__card}>
                                <h6>Сильные преподы</h6>
                                <p className={s.brief__description}>Краткое описание</p>
                            </div>
                        </div>
                        <div className={s.card}>
                            <img src={web_dev_icon} alt="" />
                            <div className={s.text__card}>
                                <h6>95% - практика</h6>
                                <p className={s.brief__description}>Краткое описание</p>
                            </div>
                        </div>
                        <div className={s.card}>
                            <img src={itInBrain} alt="" />
                            <div className={s.text__card}>
                                <h6>Проекты в портфолио</h6>
                                <p className={s.brief__description}>Краткое</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}