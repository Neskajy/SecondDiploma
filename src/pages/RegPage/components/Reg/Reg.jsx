import warning from "../../assets/imgs/vector/warning.svg";
import s from "../Auth/Auth.module.scss";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

import { useForm } from "react-hook-form";

export default function Reg() {
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
            <form className={s.Reg} onSubmit={handleSubmit(mySubmit)}>
                <div className={s.heading}>
                    <h3>Регистрация</h3>
                </div>
                <div className={s.input__blocks}>
                    <div className={s.input__block}>
                        
                        <input 
                            type="text"
                            placeholder="Введите ваше имя"
                            {...register("name", {
                                required: "Поле обязательно к заполнению",
                                minLength: {
                                    value: 3,
                                    message: "Минимум 3 символа"
                                }
                            })}
                        />
                        <div className={s.message}>{errors?.name && <div className={s.message}><img src={warning}/><p>{errors?.name.message || "Error!"}</p></div>}</div>
                    </div>
                    <div className={s.input__block}>
                        
                        <input 
                            type="text"
                            placeholder="Введите вашу фамилию"
                            {...register("surname", {
                                required: "Поле обязательно к заполнению",
                                minLength: {
                                    value: 3,
                                    message: "Минимум 3 символа"
                                }
                            })}
                        />
                        <div className={s.message}>{errors?.name && <div className={s.message}><img src={warning}/><p>{errors?.name.message || "Error!"}</p></div>}</div>
                    </div>
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
                            placeholder="Придумайте пароль"
                            {...register("password", {
                                required: "Поле обязательно к заполнению",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]){8,255}/,
                                    message: "Используйте не менее 8 символов, включая заглавную и строчную букву, а также цифру."
                                }
                            })}
                        />
                        <div className={s.message}>{errors?.password && <div className={s.message}><img src={warning}/><p>{errors?.password.message || "Error!"}</p></div>}</div>
                    </div>
                </div>
                <div className={s.do__authentication}>
                    <button className={s.login}>
                        Зарегистрироваться
                    </button>
                    <div className={s.or}>
                        <span>Уже есть аккаунт?</span> 
                        <Link to="/auth">Войти</Link>
                    </div>
                </div>
            </form>
        </>
    )
}