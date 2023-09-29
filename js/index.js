import Shape from "./shape.js";
import Model from "./model.js";
import Transform from "./transform.js";

//Create geometry models
let model1 = new Model(Shape.Circle(30, 20), [.8, .8, .3, .1], 
                                      0, [150, 100], [5, 2], 
                                      .0, [.2, .3], [0, 0]);
let model2 = new Model(Shape.Circle(20, 8), [.4, .2, .5, 1], 
                                      0, [250, 350], [1, 2], 
                                      0, [.5, -.4], [0, 0]);
/*
let model3 = new Model(Shape.Rectangle(10, 10), [.2, .9, .2, 1], 
                                      0, [200, 200], [3, 25],
                                      -.03, [.1, .5], [0, 0]);
                                      */
const models = [model1, model2/*, model3*/];


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
    uniform vec4 u_color;
    out vec4 outputColor;
    void main() {
        outputColor = vec4(fragmentColor, 1);
    }`;
    return sourceCode;
}

//Paint Shape to Canvas
function drawShape(model, first, count) {
    const transformationMatrix = Transform.transformationMatrix(...model.translation,
                                                                model.rotation,
                                                                ...model.scalation);
    gl.uniformMatrix3fv(transformationLocation, false, transformationMatrix);
    gl.uniform4f(colorLocation, ...model.color);

    gl.drawArrays(gl.TRIANGLES, first, count);
}

//Animation Loop
function drawScene(models) {
    gl.clearColor(.08, .08, .08, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);

    let first = 0;
    models.forEach((model) => {
        const count = model.numVertices();
        drawShape(model, first, count);
        model.update(100, 900, 100, 900);
        first += count;
    });

    requestAnimationFrame(() => drawScene(models));
}

function createStaticDrawBuffer(gl, data) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return buffer;
}

const canvas = document.getElementById("demo");
canvas.width = 1000;
canvas.height = 1000;
const gl = getContext(canvas);

const sourceCode = getSourceCode();

//create shaders
const vertexShader = createShader(gl, sourceCode.vertexShader, gl.VERTEX_SHADER);
const fragmentShader = createShader(gl, sourceCode.fragmentShader, gl.FRAGMENT_SHADER);
//Set GPU program
const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
gl.useProgram(shaderProgram);

//input assembler
//Create data buffers
const vertexData = new Float32Array(model1.vertices.concat(model2.vertices)/*.concat(model3.vertices)*/);
const colorData = new Float32Array([.8, .4, .6,
                                    .8, .4, .6,
                                    .8, .4, .6,
                                    .8, .4, .6,
                                    .8, .4, .6,
                                    .8, .4, .6,
                                  ]);
const geometryBuffer = createStaticDrawBuffer(gl, vertexData);
const rgbTriangleBuffer = createStaticDrawBuffer(gl, colorData);

const vertexPositionAttributeLoc = gl.getAttribLocation(shaderProgram, 'pos');
gl.bindBuffer(gl.ARRAY_BUFFER, geometryBuffer);
gl.vertexAttribPointer(vertexPositionAttributeLoc, 
    2, 
    gl.FLOAT, 
    false, 
    2 * Float32Array.BYTES_PER_ELEMENT, 
    0);

const vertexColorAttributeLoc = gl.getAttribLocation(shaderProgram, 'vertexColor');
gl.bindBuffer(gl.ARRAY_BUFFER, rgbTriangleBuffer);
gl.vertexAttribPointer(vertexColorAttributeLoc, 
3, 
gl.FLOAT, 
false, 
0, 
0);

const resolutionUniformLocation = gl.getUniformLocation(shaderProgram, "u_res");
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

//rasterizer 
gl.viewport(0, 0, canvas.width, canvas.height);


const transformationLocation = gl.getUniformLocation(shaderProgram, "u_transform");
const colorLocation = gl.getUniformLocation(shaderProgram, "u_color");
gl.uniform4f(colorLocation, ...[0, 0, 0, 0]);

gl.enableVertexAttribArray(vertexPositionAttributeLoc);
gl.enableVertexAttribArray(vertexColorAttributeLoc);


//Start loop
requestAnimationFrame(() => drawScene(models));