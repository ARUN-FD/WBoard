import './DrawingCanvas.css';
import React, { useEffect, useRef, useState } from 'react';
import DrawingCanvas from './DrawingCanvas';
import { initialDraw } from '../utils/Draw';

const Draw = (props) => {
    const [pencil, setPencil] = useState()
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        contextRef.current = initialDraw(canvasRef);
    }, []);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        setIsDrawing(true);
        nativeEvent.preventDefault();
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }

        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        nativeEvent.preventDefault();
    };

    const stopDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };
    // const [setting, setSetting] = useState("sathish name")
    const setToDraw = () => {
        contextRef.current.globalCompositeOperation = 'source-over';
    };

    const setToErase = () => {
        contextRef.current.globalCompositeOperation = 'destination-out';
    };

    const saveImageToLocal = (event) => {
        let link = event.currentTarget;
        link.setAttribute('download', 'canvas.png');
        let image = canvasRef.current.toDataURL('image/png');
        link.setAttribute('href', image);
    };

    return (
        <div>

            {/* <DrawingCanvas name={setting}/> */}
            <canvas className="canvas-container"
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}>
            </canvas>
            <div>
                <button onClick={""}>
                    Draw
                </button>
                <button onClick={setToErase}>
                    Erase
                </button>
                <button onClick={saveImageToLocal}>
                    <label htmlFor="download_iage_link">download</label>
                    <a id="download_iage_link" href="download_link" style={{ display: "none" }} onClick={saveImageToLocal}></a>
                </button>

            </div>
        </div>
    )
}

export default Draw;