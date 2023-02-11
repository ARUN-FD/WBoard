import React, { useState } from "react";
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
        

        <div className='buttons-parent' ><abbr title="Pencil"><FaPencilAlt /></abbr></div>
        <div className='buttons-parent'><abbr title="Brush"><FaPaintBrush /></abbr></div>
        <div className='buttons-parent'><abbr title="Eraser"><BsEraser /></abbr></div>
        <div className='buttons-parent'><abbr title="Undo"><GrPowerReset /></abbr></div>
        <div className='buttons-parent'><abbr title="Undo"><GoTextSize /></abbr></div>

        <div className="buttons-parent">

          <input
            type="color"
            id="favcolor"
            name="favcolor"
            value="#ff0000"
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
          <img src={image} />
        </div>
        <canvas className="canvass"></canvas>
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
