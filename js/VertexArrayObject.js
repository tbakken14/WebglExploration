class VertexArrayObject {
    constructor(gl, model) {
        this.gl = gl;
        this.vao = gl.createVertexArray();
    }

    bindBuffer(data, location, size) {
        const buffer = this.createStaticDrawBuffer(data);
        this.gl.bindVertexArray(this.vao);
        this.gl.enableVertexAttribArray(location);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.vertexAttribPointer(location, size, this.gl.FLOAT, false, 0, 0);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindVertexArray(null);
    }

    createStaticDrawBuffer(data) {
        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        return buffer;
    }
}

export default VertexArrayObject;