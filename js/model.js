class Model {
    constructor(vertices, color, rotation, translation, scalation, 
                rotationVelocity, translationVelocity, scalationVelocity ) {
        this.vertices = vertices;                       //pixels, number array length (numVertices * 2)
        this.color = color;                             //frac rgba, number arr length 4
        this.rotation = rotation;                       //radians, number
        this.translation = translation;                 //pixels, number arr length 2
        this.scalation = scalation;                     //unitless, number arr length 2
        this.rotationVelocity = rotationVelocity;       //per update, number
        this.translationVelocity = translationVelocity; //per update, number arr length 2
        this.scalationVelocity = scalationVelocity;     //per update, number arr length 2
    }

    numVertices() {
        return this.vertices.length / 2;
    }

    update(bottom, top, left, right) {
        this.rotation += this.rotationVelocity;
        this.translation = this.translation.map((e, i) => e + this.translationVelocity[i]);
        this.scalation = this.scalation.map((e, i) => e + this.scalationVelocity[i]);
        if (this.translation[0] <= left || this.translation[0] >= right) {
            this.translationVelocity[0] *= -1;
            this.rotationVelocity *= -1;
        }
        if (this.translation[1] <= bottom || this.translation[1] >= top) {
            this.translationVelocity[1] *= -1;
            this.rotationVelocity *= -1;
        }
    }
}

export default Model;