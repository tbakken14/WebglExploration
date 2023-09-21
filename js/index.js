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


function drawShape(rotation, rotationSpeed, 
                   translation, translationXSpeed, translationYSpeed,
                   scalation, scalationXSpeed, scalationYSpeed,
                   offset, stride, 
                   color) {

    gl.uniformMatrix3fv(rotateLocation, false, rotate(rotation));
    gl.uniformMatrix3fv(translateLocation, false, translate(...translation));
    gl.uniformMatrix3fv(scaleLocation, false, scale(...scalation));
    gl.uniform4f(colorLocation, ...color);

    gl.enable(gl.CULL_FACE);

    gl.drawArrays(gl.TRIANGLES, offset, stride);

    translation[0] += translationXSpeed;
    translation[1] += translationYSpeed;
    rotation += rotationSpeed;
    scalation[0] += scalationXSpeed;
    scalation[1] += scalationYSpeed;
}
/*
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Shapes.Rectangle(10, 10)), gl.STATIC_DRAW);
*/

const resolution1 = 30;
const resolution2 = 8;
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Shapes.Circle(20, resolution1).concat(Shapes.Circle(20, resolution2))), gl.STATIC_DRAW);


const colorLocation = gl.getUniformLocation(shaderProgram, "u_color");
/*
gl.uniform4f(colorLocation, .5, .2, .5, 1);
*/
let translation1XSpeed = .7;
let translation1YSpeed = -1.5;
const translation1 = [150, 100];
let rotation1Speed = .5/100;
let rotation1 = 0;
let scalation1 = [5, 1];
const color1 = [.4, .7, .3, 1];

let translation2XSpeed = .5;
let translation2YSpeed = -1.5;
const translation2 = [250, 350];
let rotation2Speed = .2/100;
let rotation2 = 0;
let scalation2 = [1, 2];
const color2 = [.4, .2, .5, 1];

function drawScene() {
    gl.clearColor(.08, .08, .08, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    rotation1 += rotation1Speed;
    rotation2 += rotation2Speed;
    drawShape(rotation1, rotation1Speed, 
              translation1, translation1XSpeed, translation1YSpeed,
              scalation1, 0, 0,
              0, (resolution1 - 2) * 3, 
              color1);
    if (translation1[1] <= 0 || translation1[1] >= canvas.height) {
        translation1YSpeed *= -1;
        rotation1Speed *= -1;
    }
    if (translation1[0] <= 0 || translation1[0] >= canvas.width) {
        translation1XSpeed *= -1;
        rotation1Speed *= -1;
    }
    
    drawShape(rotation2, rotation2Speed, 
        translation2, translation2XSpeed, translation2YSpeed,
        scalation2, 0, 0,
        (resolution1 - 2) * 3, (resolution2 - 2) * 3,
        color2);
    if (translation2[1] <= 0 || translation2[1] >= canvas.height) {
        translation2YSpeed *= -1;
        rotation2Speed *= -1;
    }
    if (translation2[0] <= 0 || translation2[0] >= canvas.width) {
        translation2XSpeed *= -1;
        rotation2Speed *= -1;
    }
    
    requestAnimationFrame(drawScene);
}

requestAnimationFrame(drawScene);