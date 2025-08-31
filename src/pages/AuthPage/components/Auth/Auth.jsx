import warning from "../../../../assets/imgs/vector/warning.svg";
import s from "../Auth/Auth.module.scss";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useApi } from "../../../../hooks/useApi";

export default function Auth() {

    const {makeRequest} = useApi();

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

        // logout
        await makeRequest({
            method: "GET",
            route: api_url + "/api/authentication/logout"
        });
        function deleteCookie(name) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; samesite=lax`;
        }
        deleteCookie("laravel_session");
        deleteCookie("XSRF-TOKEN");

        // authentication

        await makeRequest({
            method: "GET",
            route: api_url + '/sanctum/csrf-cookie'
        })

        // authorization

        await makeRequest({
            method: "POST",
            route: api_url + '/login',
            body: data,
        })
        Navigate("/diploma/profile");
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