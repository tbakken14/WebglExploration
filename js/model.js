import VertexArrayObject from "./vertexArrayObject.js";

class Model {
    static models = {};
    static key = 0;

    constructor(vertices, colors, rotation, translation, scalation, 
                rotationVelocity, translationVelocity, scalationVelocity,
                isBound) {
        this.vertices = vertices;                       //pixels, array length numVertices * 2
        this.colors = colors;                           //rgb, array length numVertices * 3
        this.rotation = rotation;                       //radians, number
        this.translation = translation;                 //pixels, number arr length 2
        this.scalation = scalation;                     //unitless, number arr length 2
        this.rotationVelocity = rotationVelocity;       //per update, number
        this.translationVelocity = translationVelocity; //per update, number arr length 2
        this.scalationVelocity = scalationVelocity;     //per update, number arr length 2
        this.isBound = isBound;
        this.key = Model.key++;
        Model.models[this.key] = this;
        this.createVao();
    }

    numVertices() {
        return this.vertices.length / 2;
    }

    update(bottom, top, left, right) {
        this.rotation += this.rotationVelocity;
        this.translation = this.translation.map((e, i) => e + this.translationVelocity[i]);
        this.scalation = this.scalation.map((e, i) => e + this.scalationVelocity[i]);
        if (!this.isInBounds(bottom, top, left, right)) {
            if (!this.isBound) {
                delete Model.models[this.key];
            }
        }
        if (this.translation[0] <= left) {
            this.translationVelocity[0] *= -0.4;
            this.translation[0] = left;
        }
        else if (this.translation[0] >= right) {
            this.translationVelocity[0] *= -0.4;
            this.translation[0] = right;
        }
        if (this.translation[1] <= bottom) {
            this.translationVelocity[1] *= -0.4;
            this.translation[1] = bottom;
        }
        else if (this.translation[1] >= top) {
            this.translationVelocity[1] *= -0.4;
            this.translation[1] = top;
        }
    }

    isInBounds(bottom, top, left, right) {
        if (this.translation[0] <= left ||
                this.translation[0] >= right ||
                this.translation[1] <= bottom ||
                this.translation[1] >= top) {
            return false;
        }
        return true;
    }

    createVao() {
        const vao = new VertexArrayObject();
        vao.bindBuffer(new Float32Array(this.vertices), 0, 2);
        vao.bindBuffer(new Float32Array(this.colors), 1, 3);
        this.vao = vao.vao;
    }
}

export default Model;