import warning from "../../../../assets/imgs/vector/warning.svg";
import s from "../../../AuthPage/components/Auth/Auth.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

import { useForm } from "react-hook-form";

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
    
    return (
        <>
            <form className={s.Bid} onSubmit={handleSubmit(mySubmit)}>
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
                        <input 
                            type="text"
                            placeholder="Введите ваш телефон"
                            {...register("phone", {
                                required: "Поле обязательно к заполнению",
                                pattern: {
                                    value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
                                    message: "Не правильный формат телефона"
                                },
                            })}
                        />
                        <div className={s.message}>{errors?.phone && <div className={s.message}><img src={warning}/><p>{errors?.phone.message || "Error!"}</p></div>}</div>
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