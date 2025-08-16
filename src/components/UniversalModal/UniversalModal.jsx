import s from "./UniversalModal.module.scss";
import Close from "../../assets/imgs/vector/close.svg?react";
import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function UniversalModal({
    isOpen,
    onClose,
    content,
    title,
    applyText = "Сохранить",
    closeText = "Закрыть",
}) {

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = 'visible';
            document.body.style.marginRight = '0px';
        }

        return () => {
            document.body.style.overflow = 'visible';
            document.body.style.marginRight = '0px';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className={s.Modal} onClick={onClose}>
            <div className={s.container} onClick={(e) => e.stopPropagation()}>
                {title && <h5>{title}</h5>}

                <div className={s.inner}>
                    {content}
                    <div className={s.close__cross} onClick={onClose}>
                        <Close />
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}