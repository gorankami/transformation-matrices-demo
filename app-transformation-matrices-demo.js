let defRect = [5, 5, 5, 10, 10, 5, 10, 10]
let rects = []

const canvas = document.querySelector("canvas")
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
    sx: 0,
    sy: 0
}

let activeTab = 0;

reset();
draw();
// switchTab(0);

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
    drawRects(ctx, rects)

    const texString = operation(sliderVals)
    renderTex(texString, formula);
}


function reset() {
    rects = [defRect];
    sliderVals = {
        tx: 0,
        ty: 0,
        theta: 0,
        sx: 1,
        sy: 1
    }
    document.querySelectorAll(".slider").forEach(s => s.value = 0)
}

function onChangeSlider(name) {
    sliderVals[name] = Number(document.querySelector("#slider-" + name).value);
    operation(sliderVals)
    draw();
}

function onClickApply(){
    const mat = getMatriTramsformationByTab(activeTab)
    rects.push(applyTransformation(mat, rects[rects.length-1]))
    draw()
}

function onClickReset(){
    reset();
    draw()
}