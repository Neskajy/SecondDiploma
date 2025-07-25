import warning from "../../assets/imgs/vector/warning.svg";
import s from "./Auth.module.scss";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

import { useForm } from "react-hook-form";

import validator from "validator";

export default function Auth() {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);
    }


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

    const mySubmit = (data) => {
        alert(JSON.stringify(data));
        reset();
    };
    

    // console.log(register());

    return (
        <>
            <form className={s.Auth} onSubmit={handleSubmit(mySubmit)}>
                <div className={s.heading}>
                    <h3>Войти</h3>
                    <p>C возвращением!</p>
                </div>
                <div className={s.input__blocks}>
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
                    <div className={s.or}>
                        <span>Нет аккаунта?</span> 
                        <Link to="/reg">Зарегистрироваться</Link>
                    </div>
                </div>
            </form>
        </>
    )
}