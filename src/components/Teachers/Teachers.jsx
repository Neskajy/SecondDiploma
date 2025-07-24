import s from "./Teachers.module.scss";
import user404 from "../../assets/imgs/vector/user.svg";
import { useRef } from "react";

export default function Teachers() {
    const teacher__card = useRef();

    return (
        <>
            <section className={s.Teachers}>
                <div className={s.container}>
                    <h3>Наши преподаватели</h3>
                    <div className={s.grid}>
                        
                        <div className={`${s.teacher__card} ${s.active}`} ref={teacher__card}>
                            <div className={s.img}>
                                <img src={user404} alt="" />
                            </div>
                            <div className={s.text}>
                                <h6>Имя</h6>
                                <p>senior backend developer</p>
                            </div>
                        </div>
                        <div className={s.teacher__card}>
                            <div className={s.img}>
                                <img src={user404} alt="" />
                            </div>
                            <div className={s.text}>
                                <h6>Имя</h6>
                                <p>senior backend developer</p>
                            </div>
                        </div>
                        <div className={s.teacher__card}>
                            <div className={s.img}>
                                <img src={user404} alt="" />
                            </div>
                            <div className={s.text}>
                                <h6>Имя</h6>
                                <p>senior backend developer</p>
                            </div>
                        </div>
                        <div className={s.teacher__card}>
                            <div className={s.img}>
                                <img src={user404} alt="" />
                            </div>
                            <div className={s.text}>
                                <h6>Имя</h6>
                                <p>senior backend developer</p>
                            </div>
                        </div>
                        <div className={s.teacher__card}>
                            <div className={s.img}>
                                <img src={user404} alt="" />
                            </div>
                            <div className={s.text}>
                                <h6>Имя</h6>
                                <p>senior backend developer</p>
                            </div>
                        </div>
                        <div className={s.teacher__card}>
                            <div className={s.img}>
                                <img src={user404} alt="" />
                            </div>
                            <div className={s.text}>
                                <h6>Имя</h6>
                                <p>senior backend developer</p>
                            </div>
                        </div>
                        <div className={s.teacher__card}>
                            <div className={s.img}>
                                <img src={user404} alt="" />
                            </div>
                            <div className={s.text}>
                                <h6>Имя</h6>
                                <p>senior backend developer</p>
                            </div>
                        </div>
                        <div className={s.teacher__card}>
                            <div className={s.img}>
                                <img src={user404} alt="" />
                            </div>
                            <div className={s.text}>
                                <h6>Имя</h6>
                                <p>senior backend developer</p>
                            </div>
                        </div>
                        <div className={s.teacher__card}>
                            <div className={s.img}>
                                <img src={user404} alt="" />
                            </div>
                            <div className={s.text}>
                                <h6>Имя</h6>
                                <p>senior backend developer</p>
                            </div>
                        </div>
                        <div className={s.teacher__card}>
                            <div className={s.img}>
                                <img src={user404} alt="" />
                            </div>
                            <div className={s.text}>
                                <h6>Имя</h6>
                                <p>senior backend developer</p>
                            </div>
                        </div>
                        <div className={s.teacher__card}>
                            <div className={s.img}>
                                <img src={user404} alt="" />
                            </div>
                            <div className={s.text}>
                                <h6>Имя</h6>
                                <p>senior backend developer</p>
                            </div>
                        </div>
                        <div className={s.teacher__card}>
                            <div className={s.img}>
                                <img src={user404} alt="" />
                            </div>
                            <div className={s.text}>
                                <h6>Имя</h6>
                                <p>senior backend developer</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
        </>
    )
}