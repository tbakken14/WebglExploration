function createShader(gl, sourceCode, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, sourceCode);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader);
        throw `Could not compile WebGL program. \n\n${info}`;
    }
    return shader;
}

function createShaderProgram(gl, vertexShader, fragmentShader) {
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        const info = gl.getProgramInfoLog(shaderProgram);
        throw `Could not compile WebGL program. \n\n${info}`;
    }
    return shaderProgram;
}

function getContext(canvas) {
    const gl = canvas.getContext("webgl2");
    if (!gl) {
        throw "Webgl is not supported on this browser.";
    }
    return gl;
}

function getSourceCode() {
    let sourceCode = {};
    sourceCode.vertexShader = `#version 300 es
    precision highp float;
    in vec2 pos;
    void main() {
        gl_Position = vec4(pos, 0.0, 1.0);
    }`;

    sourceCode.fragmentShader = `#version 300 es
    precision highp float;
    out vec4 outputColor;
    void main() {
    outputColor = vec4(.2, 0.0, .2, 1.0);
    }`;
    return sourceCode;
}

const canvas = document.getElementById("demo");
canvas.width = 500;
canvas.height = 500;
const gl = getContext(canvas);

const vertices = [
    0 , .5,
    -.5, -.5,
    .5, -.5,
    .5, -.5,
    0, .5,
    .5, .5
];

const sourceCode = getSourceCode();

//create shaders
const vertexShader = createShader(gl, sourceCode.vertexShader, gl.VERTEX_SHADER);
const fragmentShader = createShader(gl, sourceCode.fragmentShader, gl.FRAGMENT_SHADER);
//create program
const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
gl.useProgram(shaderProgram);
const vertexPositionAttributeLoc = gl.getAttribLocation(shaderProgram, 'pos');
gl.enableVertexAttribArray(vertexPositionAttributeLoc);

//input assembler
const geoBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, geoBuffer);
const cpuBuffer = new Float32Array(vertices);
gl.bufferData(gl.ARRAY_BUFFER, cpuBuffer, gl.STATIC_DRAW);
//vertex shader
//fragment shader
//rasterizer 
gl.viewport(0, 0, canvas.width, canvas.height);
gl.vertexAttribPointer(vertexPositionAttributeLoc, 
                       2, 
                       gl.FLOAT, 
                       false, 
                       2 * Float32Array.BYTES_PER_ELEMENT, 
                       0);


gl.drawArrays(gl.TRIANGLES, 0, 6);
//gl.drawArrays(gl.TRIANGLES, 3, 3);



