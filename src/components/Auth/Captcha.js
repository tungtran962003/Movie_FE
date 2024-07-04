import React, { useState, useEffect, useRef } from 'react';
import './Captcha.scss';
import { FiRefreshCcw } from "react-icons/fi";

const Captcha = () => {
    const [captcha, setCaptcha] = useState('');
    const canvasRef = useRef(null);

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captchaText = '';
        for (let i = 0; i < 6; i++) {
            captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCaptcha(captchaText);
        drawCaptcha(captchaText);
        // setCaptchaValue(captchaText);
    };

    const drawCaptcha = (text) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '25px Arial';
        ctx.fillStyle = '#000';

        // Vẽ mã CAPTCHA
        ctx.fillText(text, 10, 30);

        // Thêm các đường gạch ngang ngẫu nhiên
        for (let i = 0; i < 5; i++) {
            drawRandomLine(ctx, canvas.width, canvas.height);
        }
    };

    const drawRandomLine = (ctx, width, height) => {
        const x1 = Math.floor(Math.random() * width);
        const y1 = Math.floor(Math.random() * height);
        const x2 = Math.floor(Math.random() * width);
        const y2 = Math.floor(Math.random() * height);
        ctx.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    };

    return (
        <div className="captcha-container">
            <canvas ref={canvasRef} width="150" height="50" className="captcha-canvas" />
            <div className="captcha-refresh-button" onClick={generateCaptcha}><FiRefreshCcw /></div>
        </div>
    );
};

export default Captcha;