import Shape from "./shape.js";
import Model from "./model.js";
import Transform from "./transform.js";

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
    uniform vec2 u_res;
    uniform mat3 u_transform;
    void main() {
        vec2 pos = (u_transform * vec3(pos, 1)).xy;
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

//Paint Shape to Canvas
function drawShape(model, offset, stride) {
    const transformationMatrix = Transform.transformationMatrix(...model.translation,
                                                                model.rotation,
                                                                ...model.scalation);
    gl.uniformMatrix3fv(transformationLocation, false, transformationMatrix);
    gl.uniform4f(colorLocation, ...model.color);

    gl.drawArrays(gl.TRIANGLES, offset, stride);
}

//Animation Loop
function drawScene(models) {
    gl.clearColor(.08, .08, .08, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);

    let offset = 0;
    models.forEach((model) => {
        const stride = model.numVertices();
        drawShape(model, offset, stride);
        model.update(100, 400, 100, 400);
        offset += stride;
    });

    requestAnimationFrame(() => drawScene(models));
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
const vertexPositionAttributeLoc = gl.getAttribLocation(shaderProgram, 'pos');
gl.enableVertexAttribArray(vertexPositionAttributeLoc);
const resolutionUniformLocation = gl.getUniformLocation(shaderProgram, "u_res");
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

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

let model1 = new Model(Shape.Circle(30, 20), [.8, .8, .3, .1], 
                                      0, [150, 100], [5, 2], 
                                      .01, [.2, .3], [0, 0]);
let model2 = new Model(Shape.Circle(20, 8), [.4, .2, .5, 1], 
                                      0, [250, 350], [1, 2], 
                                      0, [.5, -.4], [0, 0]);
const models = [model1, model2];
gl.bufferData(gl.ARRAY_BUFFER, 
              new Float32Array(model1.vertices.concat(model2.vertices)), 
              gl.STATIC_DRAW);
const transformationLocation = gl.getUniformLocation(shaderProgram, "u_transform");
const colorLocation = gl.getUniformLocation(shaderProgram, "u_color");

//Start loop
requestAnimationFrame(() => drawScene(models));