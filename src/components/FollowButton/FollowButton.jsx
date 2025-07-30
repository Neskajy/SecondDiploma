// src/components/FollowButton/FollowButton.jsx
import React, { useState, useEffect } from 'react';

function FollowButton({ children, onClick, offset = { x: 12, y: -25 } }) {
    const [isHovered, setIsHovered] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [timeoutId, setTimeoutId] = useState(null);

    const updatePosition = (e) => {
        setPosition({
            x: e.clientX + offset.x,
            y: e.clientY + offset.y,
        });
    };

    const handleMouseEnter = (e) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        setIsHovered(true);
        updatePosition(e);
    };

    const handleMouseMove = (e) => {
        updatePosition(e);
    };

    const handleMouseLeave = () => {
        const id = setTimeout(() => {
            setIsHovered(false);
        }, 150);
        setTimeoutId(id);
    };

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'inline-block', position: 'relative', width: "100%" }}
        >
            {/* Проброс children — ваша таблица или контейнер */}
            {
                children
            }

            {/* Плавающая кнопка */}
            {isHovered && (
                <button
                    className="follow-button"
                    style={{
                        position: 'fixed',
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        transform: 'translate(0, -50%)',
                        pointerEvents: 'auto',
                        zIndex: 1000,
                        background: "#8D79F3",
                        color: 'white',
                        border: 'none',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        border: 'none',
                        fontSize: '18px',
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick?.(e);
                    }}
                    onMouseEnter={(e) => e.stopPropagation()}
                    onMouseMove={(e) => e.stopPropagation()}
                    onMouseLeave={(e) => e.stopPropagation()}
                >
                    ✏️
                </button>
            )}
        </div>
    );
}

export default FollowButton;