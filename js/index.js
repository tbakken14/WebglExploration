const canvas = document.getElementById("demo");
const gl = canvas.getContext("webgl2");
if (!gl) {
    alert("Webgl is not supported on this browser.");
}

console.log("hey");
gl.clearColor(.5, .5, .5, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

const vertices = [
    0 , .5,
    -.5, -.5,
    .5, -.5
];

const cpuBuffer = new Float32Array(vertices);
const geoBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, geoBuffer);
gl.bufferData(gl.ARRAY_BUFFER, cpuBuffer, gl.STATIC_DRAW);

const shaderSourceCode = `#version 300 es
precision mediump float;
in vec2 pos;
void main() {
    gl_Position = vec4(pos, 0.0, 1.0);
}`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, shaderSourceCode);
gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(vertexShader));
}

const fragmentShaderSourceCode = `#version 300 es
precision mediump float;
out vec4 outputColor;
void main() {
    outputColor = vec4(.2, 0.0, .2, 1.0);
}`;

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSourceCode);
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(fragmentShader));
}

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(gl.getProgramInfoLog(shaderProgram));
}

const vertexPositionAttributeLoc = gl.getAttribLocation(shaderProgram, 'pos');

//input assembler
gl.bindBuffer(gl.ARRAY_BUFFER, geoBuffer);
//vertex shader
//fragment shader
gl.useProgram(shaderProgram);
gl.enableVertexAttribArray(vertexPositionAttributeLoc);
//rasterizer 
gl.viewport(0, 0, canvas.width, canvas.height);
gl.vertexAttribPointer(vertexPositionAttributeLoc, 
                       2, 
                       gl.FLOAT, 
                       false, 
                       2 * Float32Array.BYTES_PER_ELEMENT, 
                       0);

//primitive assembly
gl.drawArrays(gl.TRIANGLES, 0, 3);
//output merger


