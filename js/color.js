class Color {
    static rgb = [1, .5, 0,
                  0, .5, 0,
                  .5, .5, 1];

    static buildColors(numTriangles) {
        let colors = [];
        for (let i = 0; i < numTriangles; i++) {
            colors = colors.concat(Color.rgb);
        }
        return colors;
    }
}

export default Color;