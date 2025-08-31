import { useState, useEffect, useContext } from "react";
import { createContext } from "react";

import s from './Notification.module.scss';
import Close from '../../assets/imgs/vector/close.svg?react';
import Warning from '../../assets/imgs/vector/toasts/warning.svg?react';
import Success from '../../assets/imgs/vector/toasts/success.svg?react';
import Info from '../../assets/imgs/vector/toasts/info.svg?react';

export const toastNotificationContext = createContext(null);

export function useToast() {
    const context = useContext(toastNotificationContext);
    if (!context) {
        throw new Error('useToast must be used within ToastNotificationProvider');
    }
    return context;
}

export default function Notification({children}) {

    const [toasts, setToasts] = useState([]);

    const showToast = (type, message) => {
        const id = Math.random() + Date.now();
        const toast = {
            id,
            type,
            message
        };
    
        setToasts([...toasts, toast]);
    
        setTimeout(() => {
            const updatedToasts = toasts.filter((toast) => toast.id !== id);
            setToasts(updatedToasts);
        }, 5000);
    }

    const removeToast = (id) => {
        const updatedToasts = toasts.filter((toast) => toast.id !== id);
        setToasts(updatedToasts);
    }

    return (
        <toastNotificationContext.Provider value={{ showToast }}>
            {children}
            <ToastList toasts={toasts} onRemove={removeToast}/>
        </toastNotificationContext.Provider>
    )

}

function ToastList({toasts, onRemove}) {
    return (
        <div className={s.toasts}>
            <div className={s.notifications__container}>
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onClose={() => onRemove(toast.id)} />
                ))}
            </div>
        </div>
    )
}


function ToastItem({toast, onClose}) {

    const getIcon = (type) => {
        switch (type) {
            case 'warning':
                return <Warning />;
            case 'success':
                return <Success />;
            case 'info':
                return <Info />;
            default:
                return <Info />;
        }
    };

    return (
        <div key={toast.id} className={`${s.Notification} ${s[toast.type] || ""}`}>
            <div className={s.content}>
                <div className={s.icon}>{getIcon(toast.type)}</div>
                <div className={s.text}>{toast.message}</div>
                <div
                    className={s.close}
                    onClick={onClose}
                >
                    <Close />
                </div>
            </div>
            <div className={s.progress_bar}>
                <div className={s.inner}></div>
            </div>
        </div>
    )
}