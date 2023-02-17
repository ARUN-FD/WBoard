import React, { useRef, useState } from "react";
import Canvas from "./canvas";
import image from "../Images/codiis.png"
import "./DrawingCanvas.css";
import { AiOutlineLine } from "react-icons/ai";
import { TbRectangle } from "react-icons/tb";
import { BsCircle } from "react-icons/bs";
import { FiTriangle } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";
import { BsEraser } from "react-icons/bs";
import { BiUndo } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";
import { FaMinus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
// import { BiSelection } from "react-icons/bi";
import { BiRedo} from "react-icons/bi";


const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const OPTIONS = {
    PENCIL: "PENCIL",
    RECTANGLE: "RECTANGLE",
    CIRCLE: "CIRCLE",
    TRIANGLE: "TRIANGLE",
    LINE: "LINE",
    ERASER: "ERASER"
  };
  const [color, setColor] = useState("#000000");
  const [penWidth, setPenWidth] = useState(2)
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [tool, setTool] = useState(OPTIONS.PENCIL);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    setElements([]);
  };

  const undo = () => {
    if (elements.length > 0) {
      let lElement = elements;
      let last = lElement.pop();
      setHistory([...history, last]);
      setElements(lElement);
    }
  };
  const redo = () => {
    if (history.length > 0) {
      let lElement = history;
      let last = lElement.pop();
      setHistory(lElement);
      setElements([...elements, last]);
    }
  };


  return (
    <div className="whiteboard-body">
      <div className="buttons-body-one">

        <div className='buttons-parent'><abbr title="Pencil"
          type="radio"
          name="tools"
          id="pencil"
          checked={tool === OPTIONS.PENCIL}
          onClick={(e) => setTool(OPTIONS.PENCIL)}
          readOnly={true}
        ><FaPencilAlt /></abbr></div>


        {/* <div className='buttons-parent' ><abbr title="Brush"><FaPaintBrush /></abbr></div> */}
        <div className='buttons-parent' onClick={() => setTool(OPTIONS.ERASER)} ><abbr title="Eraser"><BsEraser /></abbr></div>


        <div className='buttons-parent'
          disabled={elements.length === 0}
          onClick={() => undo()}
        ><abbr title="Undo"><BiUndo size={21}/></abbr></div>


        <div className='buttons-parent'
          disabled={history.length < 1}
          onClick={() => redo()}
        ><abbr title="redo"><BiRedo  size={21}/></abbr></div>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <div className="buttons-parent"
          value="clear canvas"
          onClick={clearCanvas}
        >
          <abbr title="Delete">
            <MdDeleteForever />
          </abbr>
        </div>
      </div>
      <div className="whiteboard-headings">
        <div className="headingss">
          <img src={image} />
        </div>
        <Canvas
          canvasRef={canvasRef}
          ctx={ctx}
          OPTIONS={OPTIONS}
          color={color}
          penWidth={penWidth}
          setElements={setElements}
          elements={elements}
          tool={tool}

        />
        {/* <div className="footer"></div> */}
      </div>
      <div className="buttons-body-two">
        <div className="buttons-parent"
          type="radio"
          name="tools"
          id="line"
          checked={tool === OPTIONS.LINE}
          onClick={() => setTool(OPTIONS.LINE)}
          readOnly={true}
        >
          <abbr title="Line">
            <AiOutlineLine />
          </abbr>
        </div>
        <div className="buttons-parent"
          type="radio"
          name="tools"
          id="rect"
          checked={tool === OPTIONS.RECTANGLE}
          onClick={() => setTool(OPTIONS.RECTANGLE)}
          readOnly={true}
        >
          <abbr title="Rectangle">
            <TbRectangle />
          </abbr>
        </div>
        <div className="buttons-parent"
          type="radio"
          name="tools"
          id="circle"
          checked={tool === OPTIONS.CIRCLE}
          onClick={() => setTool(OPTIONS.CIRCLE)}
          readOnly={true}
        >
          <abbr title="Circle">
            <BsCircle />
          </abbr>
        </div>
        <div className="buttons-parent"
          type="radio"
          name="tools"
          id="triangle"
          checked={tool === OPTIONS.TRIANGLE}
          onClick={() => setTool(OPTIONS.TRIANGLE)}
          readOnly={true}
        >
          <abbr title="Triangle">
            <FiTriangle />
          </abbr>
        </div>
        {/* <div className="buttons-parent">
          <abbr title="Triangle">
            <BiSelection />
          </abbr>
        </div> */}
        <div className="buttons-plus">
          <abbr title="Line Width">
            <FiEdit3/>
          </abbr>
          <div className="buttons-range">
            <input type={"range"} value={penWidth} onChange={(e)=>setPenWidth(e.target.value)} min={1} max={30}/>
          </div>
        </div>

        {/* <div className="buttons-parent">
          <abbr title="Zoom Out">
            <FaMinus />
          </abbr>
        </div> */}
      </div>
    </div>
  );
};


export default DrawingCanvas;
