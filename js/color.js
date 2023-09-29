class Color {
    static rgb = [1, 0, 0,
                  0, 1, 0,
                  0, 0, 1];

    static buildColors(numTriangles) {
        let colors = [];
        for (let i = 0; i < numTriangles; i++) {
            colors.concat(Color.rgb);
        }
        return colors;
    }
}

export default Color;