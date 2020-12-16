
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
            debugger
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