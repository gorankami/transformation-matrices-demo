function resetStyle(ctx) {
    ctx.strokeStyle = "black";
    ctx.fillStyle = "#CCC";
    ctx.setLineDash([])
    ctx.lineWidth = 1;
}

function drawXY(ctx, width, height) {
    ctx.beginPath();
    ctx.moveTo(10, 10)
    ctx.lineTo(10, height - 10)
    ctx.lineTo(width - 10, height - 10)
    ctx.stroke()
}

function drawCoordSystem(ctx, width, height) {
    ctx.beginPath();
    ctx.setLineDash([5, 3])

    ctx.lineWidth = 0.5;
    for (let i = 20; i < height - 20; i += 20) {
        let y = height - 10 - i
        ctx.moveTo(10, y)
        ctx.lineTo(width - 10, y)
    }
    for (let i = 20; i < width - 20; i += 20) {
        let x = width - 10 - i
        ctx.moveTo(x, 10)
        ctx.lineTo(x, height - 10)
    }
    ctx.stroke()

    ctx.setLineDash([])
}

function drawRects(ctx, rects) {
    ctx.lineWidth = 2;
    
    for (let i = 0; i < rects.length; i++) {
        let rect = rects[i]
        ctx.beginPath()

        ctx.strokeStyle = "green";
        ctx.moveTo(rect[0] * 20 + 10, rect[1] * 20 + 10)
        ctx.lineTo(rect[2] * 20 + 10, rect[3] * 20 + 10)
        ctx.lineTo(rect[6] * 20 + 10, rect[7] * 20 + 10)
        ctx.lineTo(rect[4] * 20 + 10, rect[5] * 20 + 10)
        ctx.lineTo(rect[0] * 20 + 10, rect[1] * 20 + 10)
        ctx.stroke()
    }
}