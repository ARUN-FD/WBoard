import React, { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";

const generator = rough.generator();
const Canvas = ({
  canvasRef,
  ctx,
  color,
  setElements,
  elements,
  tool,
  penWidth,
  OPTIONS
//   socket,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const context = canvas.getContext("2d");

    context.strokeWidth = 5;
    context.scale(2, 2);
    context.lineCap = "round";
    // context.strokeStyle = color;
    // context.lineWidth = 5;
    ctx.current = context;
  }, []);

  // useEffect(() => {
  //   ctx.current.strokeStyle = color;
  // }, [color]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === OPTIONS.PENCIL || tool === OPTIONS.ERASER) {
      setElements((prevElements) => [
        ...prevElements,
        {
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: tool === OPTIONS.ERASER?'#FFFFFF':color,
          element: tool,
          strokeWidth :penWidth
        },
      ]);
    } else {
      setElements((prevElements) => [
        ...prevElements,
        { offsetX, offsetY, stroke: color, element: tool ,strokeWidth:penWidth },
      ]);
    }

    setIsDrawing(true);
  };

  console.log(tool === OPTIONS.PENCIL)

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);
    if (elements.length > 0) {
      ctx.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
    elements.forEach((ele, i) => {
      if (ele.element === OPTIONS.RECTANGLE) {
        roughCanvas.draw(
          generator.rectangle(ele.offsetX,ele.offsetY, ele.width,ele.height,{
            stroke:ele.stroke,
            roughness: 0,
            strokeWidth: ele.strokeWidth,
          })
        )
      } else if(ele.element === OPTIONS.CIRCLE) {
        roughCanvas.draw(
          generator.ellipse(ele.offsetX,ele.offsetY, ele.width,ele.height,{
            stroke:ele.stroke,
            roughness: 0,
            strokeWidth: ele.strokeWidth,
          })
        )
      } else if (ele.element === OPTIONS.LINE) {
        roughCanvas.draw(
          generator.line(ele.offsetX, ele.offsetY, ele.width, ele.height, {
            stroke: ele.stroke,
            roughness: 0,
            strokeWidth: ele.strokeWidth,
          })
        );
      } else if (ele.element === OPTIONS.PENCIL) {
        roughCanvas.linearPath(ele.path, {
          stroke: ele.stroke,
          roughness: 0,
          strokeWidth: ele.strokeWidth,
        });
      } else if (ele.element === OPTIONS.ERASER) {
        roughCanvas.linearPath(ele.path, {
          stroke: '#FFFFFF',
          roughness: 0,
          strokeWidth: ele.strokeWidth,
        });
      } else if (ele.element === `OPTIONS.CIRCLE`) {
        roughCanvas.draw(
          generator.circle(ele.offsetX, ele.offsetY, ele.width, ele.height, {
            stroke: ele.stroke,
            roughness: 0,
            strokeWidth:ele.strokeWidth,
          })
        );
      }else if(ele.element === OPTIONS.TRIANGLE) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.strokeStyle = ele.stroke;
        ctx.lineWidth = ele.strokeWidth
        ctx.moveTo(ele.offsetX, ele.offsetY);
        ctx.lineTo(ele.offsetX-(ele.width/2), ele.offsetY+ele.height);
        ctx.lineTo(ele.offsetX+(ele.width/2), ele.offsetY+ele.height);
        ctx.closePath();
        ctx.stroke();
      }
    });
    // const canvasImage = canvasRef.current.toDataURL();
    // socket.emit("drawing", canvasImage);
  });

  const handleMouseMove = (e) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === OPTIONS.RECTANGLE) {
      setElements((prevElements) =>
        prevElements.map((ele, index) =>
          index === elements.length - 1
            ? {
                offsetX: ele.offsetX,
                offsetY: ele.offsetY,
                width: offsetX - ele.offsetX,
                height: offsetY - ele.offsetY,
                stroke: ele.stroke,
                element: ele.element,
                strokeWidth:ele.strokeWidth
              }
            : ele
        )
      );
    } else if (tool === OPTIONS.LINE) {
      setElements((prevElements) =>
        prevElements.map((ele, index) =>
          index === elements.length - 1
            ? {
                offsetX: ele.offsetX,
                offsetY: ele.offsetY,
                width: offsetX,
                height: offsetY,
                stroke: ele.stroke,
                element: ele.element,
                strokeWidth: ele.strokeWidth
              }
            : ele
        )
      );
    } else if (tool === OPTIONS.PENCIL) {
      setElements((prevElements) =>
        prevElements.map((ele, index) =>
          index === elements.length - 1
            ? {
                offsetX: ele.offsetX,
                offsetY: ele.offsetY,
                path: [...ele.path, [offsetX, offsetY]],
                stroke: ele.stroke,
                element: ele.element,
                strokeWidth:ele.strokeWidth
              }
            : ele
        )
      );
    } else if (tool === OPTIONS.ERASER) {
      setElements((prevElements) =>
        prevElements.map((ele, index) =>
          index === elements.length - 1
            ? {
                offsetX: ele.offsetX,
                offsetY: ele.offsetY,
                path: [...ele.path, [offsetX, offsetY]],
                stroke: ele.stroke,
                element: ele.element,
                strokeWidth:ele.strokeWidth
              }
            : ele
        )
      );
    } else if (tool === OPTIONS.TRIANGLE) {
      setElements((prevElements) =>
        prevElements.map((ele, index) =>
          index === elements.length - 1
            ? {
              offsetX: ele.offsetX,
              offsetY: ele.offsetY,
              width: offsetX - ele.offsetX,
              height: offsetY - ele.offsetY,
              stroke: ele.stroke,
              element: ele.element,
              strokeWidth:ele.strokeWidth
              }
            : ele
        )
      );
  }
  else if (tool === OPTIONS.CIRCLE) {
    setElements((prevElements) =>
      prevElements.map((ele, index) =>
        index === elements.length - 1
          ? {
            offsetX: ele.offsetX,
            offsetY: ele.offsetY,
            width: offsetX - ele.offsetX,
            height: offsetY - ele.offsetY,
            stroke: ele.stroke,
            element: ele.element,
            strokeWidth:ele.strokeWidth
            }
          : ele
      )
    );
}
}
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div
      className="col-md-8 overflow-hidden border border-dark px-0 mx-auto mt-3"
      style={{ height: "500px" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
