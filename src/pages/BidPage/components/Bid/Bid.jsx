import warning from "../../../../assets/imgs/vector/warning.svg";
import s from "../../../AuthPage/components/Auth/Auth.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

import { useForm } from "react-hook-form";

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

        const xsrfToken = document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN"))?.split("=")[1];

        if (!xsrfToken) {
            const getToken = await fetch(api_url + "/sanctum/csrf-cookie", {
                credentials: "include"
            });
            if (!getToken.ok) {
                alert("CSRF не получен");
            }
            xsrfToken = document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN"))?.split("=")[1];
        }

        try {

            const request = await fetch(api_url + `/api/appeals/create`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-XSRF-TOKEN": decodeURIComponent(xsrfToken)
                },
                body: JSON.stringify(data)
            });

            const response = await request.json();

            reset();
            alert("Успешно");

        } catch (error) {
            console.error("Ошибка: ", error);
        }
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