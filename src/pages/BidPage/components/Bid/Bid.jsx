import warning from "../../../../assets/imgs/vector/warning.svg";
import s from "../../../AuthPage/components/Auth/Auth.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { makeRequest } from "../../../../api/apiClient";

export default function Auth() {
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur",
    });

    const api_url = import.meta.env.VITE_BACKEND_URL;

    async function createAppeal(data) {
        makeRequest({
            method: "POST",
            route: api_url + "/api/appeals/create",
            body: data,
        })
        reset();
    }

    return (
        <>
            <form className={s.Bid} onSubmit={handleSubmit(createAppeal)}>
                <div className={s.heading}>
                    <h3>Подать заявку</h3>
                </div>
                <div className={s.input__blocks}>
                    <div className={s.input__block}>
                        {/* <img src={warning} className={`${s.warning__img} ${s.active}`} alt="" /> */}
                        <input 
                            type="text"
                            placeholder="Введите ваше имя"
                            {...register("name", {
                                required: "Поле обязательно к заполнению",
                            })}
                        />
                        <div className={s.message}>{errors?.name && <div className={s.message}><img src={warning}/><p>{errors?.name.message || "Error!"}</p></div>}</div>
                    </div>
                    <div className={s.input__block}>
                        {/* <img src={warning} className={`${s.warning__img} ${s.active}`} alt="" /> */}
                        <input 
                            type="text"
                            placeholder="Введите вашу почту"
                            {...register("email", {
                                required: "Поле обязательно к заполнению",
                                pattern: {
                                    value: /^[\w.][\w]+@[\w]+\.[a-zA-Z]{2,}$/,
                                    message: "Не правильный формат почты"
                                }
                            })}
                        />
                        <div className={s.message}>{errors?.email && <div className={s.message}><img src={warning}/><p>{errors?.email.message || "Error!"}</p></div>}</div>
                    </div>
                    <div className={s.input__block}>
                        {/* <img src={warning} className={`${s.warning__img} ${s.active}`} alt="" /> */}
                        <textarea
                            placeholder="Ваше сообщение"
                            {...register("message", {
                            })}
                        />
                        <div className={s.message}>{errors?.message && <div className={s.message}><img src={warning}/><p>{errors?.message.message || "Error!"}</p></div>}</div>
                    </div>
                </div>
                <div className={s.do__authentication}>
                    <button className={s.login}>
                        Подать
                    </button>
                </div>
            </form>
        </>
    )
}