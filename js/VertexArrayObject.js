class VertexArrayObject {
    constructor(gl) {
        this.gl = gl;
        this.vao = gl.createVertexArrayObject();
    }

    bindBuffer(buffer, index, size) {
        gl.bindVertexArray(this.vao);
        gl.enableVertexAttribArray(location);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPoint(index, size, gl.FLOAT, false, 0, 0);
        gl.bindVertexArray(null);
    }
}

export default VertexArrayObject;