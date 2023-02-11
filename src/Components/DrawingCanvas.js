import React, { useEffect, useRef, useState } from "react";
import image from "../Images/codiis.png"
import "./DrawingCanvas.css";
import Draw from "./Draw";
import { AiOutlineLine } from "react-icons/ai";
import { TbRectangle } from "react-icons/tb";
import { BsCircle } from "react-icons/bs";
import { FiTriangle } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";
import { BsEraser } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { BiSelection } from "react-icons/bi";
import { GoTextSize } from "react-icons/go";


const DrawingCanvas = () => {

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [colour,setColour]= useState('#000000')
console.log(colour,"hai")

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 1950;
    canvas.height = 2000;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = `${colour}`;
    context.lineWidth = 2;
    contextRef.current = context
  }, []);

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
        return;
    }

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
};

  const startDrawing = ({ nativeEvent }) => {
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      contextRef.current.lineTo(offsetX, offsetY);
      // contextRef.strokeStyle = "green";
      // contextRef.strokeRect(20, 10, 160, 100);
      contextRef.current.stroke();
      setIsDrawing(true);
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
    <div className="whiteboard-body">
      <div className="buttons-body-one">
        {/* <div className="buttons-parent">
          <abbr title="Line">
            <AiOutlineLine />
          </abbr>
        </div>
        <div className="buttons-parent">
          <abbr title="Rectangle">
            <TbRectangle />
          </abbr>
        </div>
        <div className="buttons-parent">
          <abbr title="Circle">
            <BsCircle />
          </abbr>
        </div>
        <div className="buttons-parent">
          <abbr title="Triangle">
            <FiTriangle />
          </abbr>
        </div> */}
    
    <div className='buttons-parent' onClick={setToDraw}><abbr title="Pencil"><FaPencilAlt/></abbr></div>
    <div className='buttons-parent'><abbr title="Brush"><FaPaintBrush/></abbr></div>
    <div className='buttons-parent'><abbr title="Eraser" onClick={setToErase} ><BsEraser/></abbr></div>
    <div className='buttons-parent'><abbr title="Undo"><GrPowerReset/></abbr></div>
    <div className='buttons-parent'><abbr title="Undo"><GoTextSize/></abbr></div>
        <div className="buttons-parent">

          <input
            type="color"
            id="favcolor"
            name="favcolor"
            value={colour}
            onChange={(e)=> {
              setColour(e.target.value);
              contextRef.current.strokeStyle = e.target.value;
            }}
            className="color-picker"
          />
        </div>
        <div className="buttons-parent">
          <abbr title="Delete">
            <MdDeleteForever />
          </abbr>
        </div>
      </div>
      <div className="whiteboard-headings">
        <div className="headingss">
          <img src={image}/>
        </div>
        <canvas className="canvass"
             ref={canvasRef}
             onMouseDown={startDrawing}
             onMouseMove={draw}
             onMouseUp={stopDrawing}
             onMouseLeave={stopDrawing}>
               </canvas>
        <div className="footer"></div>
      </div>
      <div className="buttons-body-two">
      <div className="buttons-parent">
          <abbr title="Line">
            <AiOutlineLine />
          </abbr>
        </div>
        <div className="buttons-parent">
          <abbr title="Rectangle">
            <TbRectangle />
          </abbr>
        </div>
        <div className="buttons-parent">
          <abbr title="Circle">
            <BsCircle />
          </abbr>
        </div>
        <div className="buttons-parent">
          <abbr title="Triangle">
            <FiTriangle />
          </abbr>
        </div>
        <div className="buttons-parent">
          <abbr title="Triangle">
            <BiSelection />
          </abbr>
        </div>
        <div className="buttons-parent">
          <abbr title="Zoom In">
            <BsPlusLg />
          </abbr>
        </div>
        <div className="buttons-parent">
          <abbr title="Zoom Out">
            <FaMinus />
          </abbr>
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;
