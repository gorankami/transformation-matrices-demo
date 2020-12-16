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