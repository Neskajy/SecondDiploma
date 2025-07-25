import warning from "../../assets/imgs/vector/warning.svg";
import s from "../Auth/Auth.module.scss";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function ForgetPassword() {
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
            <form className={s.Reg} onSubmit={handleSubmit(mySubmit)}>
                <div className={s.heading}>
                    <h3>Забыли пароль?</h3>
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
                </div>
                <div className={s.do__authentication}>
                    <button className={s.login}>
                        Отправить письмо с паролем
                    </button>
                    <div className={s.or}>
                        <span>Вернуться</span> 
                        <Link to="/auth">к авторизации</Link>
                    </div>
                </div>
            </form>
        </>
    )
}