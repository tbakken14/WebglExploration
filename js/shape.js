class Shape {
    static Triangle(vertex1, vertex2, vertex3) {
        return [
            ...vertex1,
            ...vertex2,
            ...vertex3
        ];
    }

    static Rectangle(length, width) {
        const x = .5 * length;
        const y = .5 * width;
        return [
            -x, y,
            -x, -y,
            x, y,
            x, y,
            -x, -y,
            x, -y
        ];
    }

    static Circle(radius, resolution) {
        resolution = (resolution < 3) ? 3 : resolution;
        const d_radians = 2 * Math.PI / resolution;
        let radians = 3 * d_radians;
        let vertices = [
            radius, 0,
            ...this.#getXY(radius, radians - 2 * d_radians),
            ...this.#getXY(radius, radians - d_radians)
        ];

        for (let i = 3; i < resolution; i++) {
            const vertex = this.#getXY(radius, radians);
            const last_vertex = vertices.slice(-2);
            vertices.push(radius, 0);
            vertices.push(...last_vertex);
            vertices.push(...vertex);
            radians += d_radians;
        }
        return vertices;
    }

    static #getXY(magnitude, radians) {
        return [magnitude * Math.cos(radians), magnitude * Math.sin(radians)];
    }
}

export default Shape;