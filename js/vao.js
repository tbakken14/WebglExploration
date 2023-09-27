class vao {
    constructor(gl) {
        this.gl = gl;
        this.vao = gl.createVertexArrayObject();
        gl.bindVertexArray(vao);
        gl.vertexAttribPoint(0, 1, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);
        gl.bindVertexArray(null);
    }

    

    bind() {
        gl.bindVertexArray(vao);
    }
    
    unbind()
}