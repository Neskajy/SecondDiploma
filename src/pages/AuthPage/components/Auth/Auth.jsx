import warning from "../../../../assets/imgs/vector/warning.svg";
import s from "../Auth/Auth.module.scss";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

export default function Auth() {

    const Navigate = useNavigate();

    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);
    }

    const api_url = import.meta.env.VITE_BACKEND_URL;

    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
        reset,
    } = useForm({
        mode: "onBlur",
    });


    async function AuthenticateAndAuthorize(data) {
        const csrfResponse = await fetch(api_url + '/sanctum/csrf-cookie', {
            credentials: "include"
        });

        if (!csrfResponse.ok) {
            console.error('CSRF не получен');
            return;
        }

        const xsrfToken = document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN"))?.split("=")[1];
        
        if (!xsrfToken) {
            alert("токен не найден на стороне клиента");
        }

        const response = await fetch(api_url + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "X-XSRF-TOKEN": decodeURIComponent(xsrfToken)
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });
        if (response.ok) {
            alert('Успешно');
            Navigate("/diploma/profile");
        } else {
            console.error('Ошибка:', await response.json());
        }
    }

    return (
        <>
            <form className={s.Auth} onSubmit={handleSubmit(AuthenticateAndAuthorize)}>
                <div className={s.heading}>
                    <h3>Войти</h3>
                    <p>C возвращением!</p>
                </div>
                <div className={s.input__blocks}>
                    <div className={s.input__block}>
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
                        <input 
                            type="text"
                            placeholder="Введите ваш пароль"
                            {...register("password", {
                                required: "Поле обязательно к заполнению",
                            })}
                        />
                        <div className={s.message}>{errors?.password && <div className={s.message}><img src={warning}/><p>{errors?.password.message || "Error!"}</p></div>}</div>
                    </div>
                </div>
                <div className={s.useful__actions}>
                    <div className={s.remember__me} onClick={handleChange}>
                        <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleChange}
                        />
                        <p>Запомнить меня</p>
                    </div>
                    <Link to="/forgetPassword">
                        <p className={s.forget__password}>
                            Забыли пароль?
                        </p>
                    </Link>
                </div>
                <div className={s.do__authentication}>
                    <button className={s.login}>
                        Войти
                    </button>
                </div>
            </form>
        </>
    )
}