class Color {
    static rgb = [1, .5, 0,
                  0, .5, 0,
                  .5, .5, 1];

    static solidColor(r, g, b) {
        return [r, g, b,
                r, g, b,
                r, g, b]
    }

    static buildColors(numTriangles, triColor) {
        let colors = [];
        for (let i = 0; i < numTriangles; i++) {
            colors = colors.concat(triColor);
        }
        return colors;
    }
}

export default Color;