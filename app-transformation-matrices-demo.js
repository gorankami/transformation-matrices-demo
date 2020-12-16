let defRect = [-2, -2, -2, 2, 2, -2, 2, 2]
let activeRect = []
let ghostRect = []

const canvas = document.querySelector("#coord-system")
const ctx = canvas.getContext("2d")

const formula = document.querySelector("#formula")
let {
    width,
    height
} = canvas;
const operations = [getTranslationString, getRotationString, getScaleString]
let operation = operations[0]

let sliderVals = {
    tx: 0,
    ty: 0,
    theta: 0,
    sx: 1,
    sy: 1
}

let activeTab = 0;

reset();
draw();



function onClickTab(tab) {
    activeTab = tab;
    const tabs = document.querySelectorAll(".tab")
    tabs.forEach(t => t.className = "tab")
    tabs[tab].className = "tab active";
    operation = operations[tab]
    document.querySelectorAll(".slide-group").forEach((sg) => sg.className = "slide-group display-none");
    document.querySelector("#slide-group-" + tab).className = "slide-group"
    draw()
}

function draw() {
    resetStyle(ctx);
    ctx.fillRect(0, 0, width, height)

    drawXY(ctx, width, height);
    drawCoordSystem(ctx, width, height)
    drawRects(ctx, activeRect, ghostRect)

    const texString = operation(sliderVals)
    renderTex(texString, formula);
    renderRectCoords()
}

function renderRectCoords(){
    const a = activeRect.map(n=>n.toFixed(2))
    document.querySelector("#rect-coords").innerText = `Rectangle coordinates: 
    
    ${a[0]},${a[1]}   ${a[2]},${a[3]}
    
    ${a[4]},${a[5]}   ${a[6]},${a[7]}`
}


function reset() {
    activeRect = [...defRect];
    ghostRect = undefined
    sliderVals = {
        tx: 0,
        ty: 0,
        theta: 0,
        sx: 1,
        sy: 1
    }
    // document.querySelectorAll(".slider").forEach(s => s.value = 0)
    document.querySelector("#slider-tx").value = 0;
    document.querySelector("#slider-ty").value = 0;
    document.querySelector("#slider-theta").value = 0;
    document.querySelector("#slider-sx").value = 1;
    document.querySelector("#slider-sy").value = 1;
}

function onChangeSlider(name) {
    sliderVals[name] = Number(document.querySelector("#slider-" + name).value);
    operation(sliderVals)
    const mat = getMatriTramsformationByTab(activeTab)
    ghostRect = applyTransformation(mat, activeRect)
    draw();
}

function onClickApply() {
    const mat = getMatriTramsformationByTab(activeTab)
    activeRect = applyTransformation(mat, activeRect)
    ghostRect = undefined
    draw()
}

function onClickReset() {
    reset();
    draw()
}

function getTranslationString({
    tx,
    ty
}) {
    return formulaString(`
    1 & 0 & \\color{blue}{${tx}}  \\\\
    0 & 1 & \\color{red}${ty} \\\\
    0 & 0 & 1`)
}

function getRotationString({
    theta
}) {
    return formulaString(`
      cos(\\color{blue}{${theta}}) & -sin(\\color{blue}{${theta}}) & 0  \\\\
      sin(\\color{blue}{${theta}}) & cos(\\color{blue}{${theta}}) & 0 \\\\
      0 & 0 & 1`)
}

function getScaleString({
    sx,
    sy
}) {
    return formulaString(`
    \\color{blue}{${sx}} & 0 & 0  \\\\
    0 & \\color{red}{${sy}} & 0 \\\\
    0 & 0 & 1`)
}

function formulaString(mat) {
    return `
      \\begin{equation*}
      \\begin{bmatrix}
      x' \\\\
      y' \\\\
      1
      \\end{bmatrix}
      = 
      \\begin{bmatrix}
      ${mat}
      \\end{bmatrix}
      * 
      \\begin{bmatrix}
      x \\\\
      y \\\\
      1
      \\end{bmatrix}
      \\end{equation*}`
}

function renderTex(inputText, outputElement) {
    outputElement.innerHTML = '';
    MathJax.texReset();
    var options = MathJax.getMetricsFor(outputElement);
    options.display = true;
    MathJax.tex2svgPromise(inputText, options).then(function (node) {
        outputElement.appendChild(node);
        MathJax.startup.document.clear();
        MathJax.startup.document.updateDocument();
    }).catch(function (err) {
        outputElement.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err.message));
    })
}


function getMatriTramsformationByTab(activeTab) {
    const mat = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ]

    switch (activeTab) {
        case 0:
            mat[2] = sliderVals.tx;
            mat[5] = sliderVals.ty;
            return mat;
        case 1:
            const cos = Math.cos(sliderVals.theta)
            const sin = Math.sin(sliderVals.theta)
            mat[0] = cos;
            mat[1] = -sin;
            mat[3] = sin;
            mat[4] = cos;
            return mat;
        case 2:
            mat[0] = sliderVals.sx;
            mat[4] = sliderVals.sy;
            return mat;
    }
}

function applyTransformation(mat, rect){
    const newRect = []
    for(let i=0;i<rect.length;i+=2){
        newRect.push(mat[0]*rect[i] + mat[1]*rect[i+1] + mat[2])
        newRect.push(mat[3]*rect[i] + mat[4]*rect[i+1] + mat[5])
    }
    return newRect;
}

function resetStyle(ctx) {
    ctx.strokeStyle = "#999";
    ctx.fillStyle = "#CCC";
    ctx.setLineDash([])
    ctx.lineWidth = 1;
}

function drawXY(ctx, width, height) {
    ctx.beginPath();
    ctx.moveTo(width/2, 10)
    ctx.lineTo(width/2, height - 10)

    ctx.moveTo(10, height/2)
    ctx.lineTo(width - 10, height/2)
    ctx.stroke()
}

function drawCoordSystem(ctx, width, height) {
    ctx.beginPath();
    ctx.setLineDash([5, 3])

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#AAA";
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

function drawRects(ctx, activeRect, ghostRect) {
    ctx.lineWidth = 2;
    const rects = [activeRect, ghostRect] 
    for (let i = 0; i < rects.length; i++) {
        let rect = rects[i]
        if(!rect) continue;
        ctx.beginPath()

        ctx.strokeStyle = i ? "green" : "#333";
        ctx.moveTo(rect[0] * 20  + width/2, rect[1] * 20  + height/2)
        ctx.lineTo(rect[2] * 20  + width/2, rect[3] * 20  + height/2)
        ctx.lineTo(rect[6] * 20  + width/2, rect[7] * 20  + height/2)
        ctx.lineTo(rect[4] * 20  + width/2, rect[5] * 20  + height/2)
        ctx.lineTo(rect[0] * 20  + width/2, rect[1] * 20  + height/2)
        ctx.stroke()
    }
}