import Shape from "./shape.js";
import Color from "./color.js";
import Model from "./model.js";
import Transform from "./transform.js";
import VertexArrayObject from "./vertexarrayobject.js";
import Input from "./input.js";
import Spawn from "./spawn.js";
import Game from "./game.js";

//Create shader
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

//Create program of vertex and fragment shader
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

//Get the canvas context
function getContext(canvas) {
    const gl = canvas.getContext("webgl2");
    if (!gl) {
        throw "Webgl is not supported on this browser.";
    }
    return gl;
}

// 
//Get source code for shader files
function getSourceCode() {
    let sourceCode = {};
    sourceCode.vertexShader = `#version 300 es
    precision highp float;
    in vec2 pos;
    in vec3 vertexColor;
    out vec3 fragmentColor;
    uniform vec2 u_res;
    uniform mat3 u_transform;
    void main() {
        fragmentColor = vertexColor;
        vec2 pos = (u_transform * vec3(pos, 1)).xy;
        vec2 zeroToOne = pos / u_res;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - 1.0;
        gl_Position = vec4(clipSpace, 0, 1);
    }`;

    sourceCode.fragmentShader = `#version 300 es
    precision highp float;
    in vec3 fragmentColor;
    out vec4 outputColor;
    void main() {
        outputColor = vec4(fragmentColor, 1);
    }`;
    return sourceCode;
}

function clearCanvas() {
    gl.clearColor(.08, .08, .08, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

//Paint Shape to Canvas
function drawShape(model) {
    const transformationMatrix = Transform.transformationMatrix(...model.translation,
                                                                model.rotation,
                                                                ...model.scalation);
    gl.uniformMatrix3fv(transformationLocation, false, transformationMatrix);
    gl.bindVertexArray(model.vao);
    gl.drawArrays(gl.TRIANGLES, 0, model.numVertices());
    gl.bindVertexArray(null);
}

//Animation Loop
function drawScene() {
    clearCanvas();
    gl.enable(gl.CULL_FACE);

    Object.values(Model.models).forEach ((model) => {
        drawShape(model);
        model.update(0, canvas.height, 0, canvas.width);
    });

    Spawn.spawnHandler();
    if (!Game.isEndGame) {
        requestAnimationFrame(() => drawScene());
    }
    else {
        clearCanvas();
    }
}

Game.startGame = function () {
    Game.resetGame();
    requestAnimationFrame(() => drawScene());
}


const canvas = document.getElementById("game");
canvas.width = 1400;
canvas.height = 800;
const gl = getContext(canvas);
VertexArrayObject.gl = gl;

const sourceCode = getSourceCode();

//create shaders
const vertexShader = createShader(gl, sourceCode.vertexShader, gl.VERTEX_SHADER);
const fragmentShader = createShader(gl, sourceCode.fragmentShader, gl.FRAGMENT_SHADER);
//Set GPU program
const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
gl.useProgram(shaderProgram);

//input assembler


Input.addKeyboardInputListeners();

const transformationLocation = gl.getUniformLocation(shaderProgram, "u_transform");
const resolutionUniformLocation = gl.getUniformLocation(shaderProgram, "u_res");
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

//rasterizer 
gl.viewport(0, 0, canvas.width, canvas.height);

Game.startGame();