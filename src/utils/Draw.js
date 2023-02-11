export const initialDraw = (ref,) => {
    const canvas = ref.current;
    canvas.width = 1950;
    canvas.height = 2000;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 2;

    return context

}