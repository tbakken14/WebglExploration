import Shapes from "./shapes.js";

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
    uniform vec2 u_res;
    uniform mat3 u_translate;
    uniform mat3 u_rotate;
    uniform mat3 u_scale;
    void main() {
        vec2 pos = (u_translate * u_rotate * u_scale  * vec3(pos, 1)).xy;
        vec2 zeroToOne = pos / u_res;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - 1.0;
        gl_Position = vec4(clipSpace, 0, 1);
    }`;

    sourceCode.fragmentShader = `#version 300 es
    precision highp float;
    uniform vec4 u_color;
    out vec4 outputColor;
    void main() {
        outputColor = u_color;
    }`;
    return sourceCode;
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function translate(x, y) {
    return [
        1, 0, 0,
        0, 1, 0,
        x, y, 1
    ];
}

function rotate(radians) {
    const c = Math.cos(radians);
    const s = Math.sin(radians);
    return [
        c, -s, 0,
        s, c, 0,
        0, 0, 1
    ];
}

function scale(mx, my) {
    return [
        mx, 0, 0,
        0, my, 0,
        0, 0, 1
    ];
}

const canvas = document.getElementById("demo");
canvas.width = 500;
canvas.height = 500;
const gl = getContext(canvas);

const vertices = [
    50, 0,
    0, 50,
    50, 50,
    100, 100,
    200,200,
    200,100
];

const sourceCode = getSourceCode();

//create shaders
const vertexShader = createShader(gl, sourceCode.vertexShader, gl.VERTEX_SHADER);
const fragmentShader = createShader(gl, sourceCode.fragmentShader, gl.FRAGMENT_SHADER);
//Set GPU program
const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
gl.useProgram(shaderProgram);

//input assembler
const vertexPositionAttributeLoc = gl.getAttribLocation(shaderProgram, 'pos');
gl.enableVertexAttribArray(vertexPositionAttributeLoc);
const resolutionUniformLocation = gl.getUniformLocation(shaderProgram, "u_res");
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);


const translateLocation = gl.getUniformLocation(shaderProgram, "u_translate");
const rotateLocation = gl.getUniformLocation(shaderProgram, "u_rotate");
const scaleLocation = gl.getUniformLocation(shaderProgram, "u_scale");
gl.uniformMatrix3fv(translateLocation, false, translate(250, 350));
gl.uniformMatrix3fv(rotateLocation, false, rotate(0));
gl.uniformMatrix3fv(scaleLocation, false, scale(1, 2));

const geoBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, geoBuffer);

//rasterizer 
gl.viewport(0, 0, canvas.width, canvas.height);

gl.vertexAttribPointer(vertexPositionAttributeLoc, 
                       2, 
                       gl.FLOAT, 
                       false, 
                       2 * Float32Array.BYTES_PER_ELEMENT, 
                       0);


const resolution = 30;
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Shapes.Circle(20, resolution)), gl.STATIC_DRAW);

/*
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Shapes.Rectangle(10, 10)), gl.STATIC_DRAW);
*/
const colorLocation = gl.getUniformLocation(shaderProgram, "u_color");
gl.uniform4f(colorLocation, .5, .2, .5, 1);

const rotationSpeed = 3/100;
let translationXSpeed = 2;
let translationYSpeed = -1.5;
const translation = [250, 350];
let rotation = 0;
function drawScene() {
    rotation += rotationSpeed;
    gl.uniformMatrix3fv(rotateLocation, false, rotate(rotation));
    translation[0] += translationXSpeed;
    translation[1] += translationYSpeed;
    if (translation[1] <= 0 || translation[1] >= canvas.height) {
        translationYSpeed *= -1;
    }
    if (translation[0] <= 0 || translation[0] >= canvas.width) {
        translationXSpeed *= -1;
    }
    gl.uniformMatrix3fv(translateLocation, false, translate(...translation));
    gl.enable(gl.CULL_FACE);

    gl.clearColor(.08, .08, .08, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, (resolution - 2) * 3);
    requestAnimationFrame(drawScene);
}

requestAnimationFrame(drawScene);