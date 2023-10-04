class Model {
    constructor(vertices, colors, rotation, translation, scalation, 
                rotationVelocity, translationVelocity, scalationVelocity,
                vao) {
        this.vertices = vertices;                       //pixels, array length numVertices * 2
        this.colors = colors;                           //rgb, array length numVertices * 3
        this.rotation = rotation;                       //radians, number
        this.translation = translation;                 //pixels, number arr length 2
        this.scalation = scalation;                     //unitless, number arr length 2
        this.rotationVelocity = rotationVelocity;       //per update, number
        this.translationVelocity = translationVelocity; //per update, number arr length 2
        this.scalationVelocity = scalationVelocity;     //per update, number arr length 2
        this.vao = vao;
    }

    numVertices() {
        return this.vertices.length / 2;
    }

    update(bottom, top, left, right) {
        this.rotation += this.rotationVelocity;
        this.translation = this.translation.map((e, i) => e + this.translationVelocity[i]);
        this.scalation = this.scalation.map((e, i) => e + this.scalationVelocity[i]);
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
}

export default Model;