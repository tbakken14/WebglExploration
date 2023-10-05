class VertexArrayObject {
    static gl;
    constructor() {
        this.vao = VertexArrayObject.gl.createVertexArray();
    }

    bindBuffer(data, location, size) {
        const buffer = this.createStaticDrawBuffer(data);
        VertexArrayObject.gl.bindVertexArray(this.vao);
        VertexArrayObject.gl.enableVertexAttribArray(location);
        VertexArrayObject.gl.bindBuffer(VertexArrayObject.gl.ARRAY_BUFFER, buffer);
        VertexArrayObject.gl.vertexAttribPointer(location, size, VertexArrayObject.gl.FLOAT, false, 0, 0);
        VertexArrayObject.gl.bindBuffer(VertexArrayObject.gl.ARRAY_BUFFER, null);
        VertexArrayObject.gl.bindVertexArray(null);
    }

    createStaticDrawBuffer(data) {
        const buffer = VertexArrayObject.gl.createBuffer();
        VertexArrayObject.gl.bindBuffer(VertexArrayObject.gl.ARRAY_BUFFER, buffer);
        VertexArrayObject.gl.bufferData(VertexArrayObject.gl.ARRAY_BUFFER, data, VertexArrayObject.gl.STATIC_DRAW);
        VertexArrayObject.gl.bindBuffer(VertexArrayObject.gl.ARRAY_BUFFER, null);
        return buffer;
    }
}

export default VertexArrayObject;