class Color {
    static rgb = [1, .5, 0,
                  0, .5, 2,
                  .5, .7, 0 ];

    static asteroid1 = [.25, .43, .6,
                       .85, .63, 0,
                       .08, .08, .08];

    static asteroid2 = [.8, .43, .2,
                        .85, .63, 0,
                        .08, .08, .08];
    
    static asteroid3 = [0, 0, 0,
                        0, 0, 1,
                        0, 0, 0];

    static asteroidColors = [Color.asteroid1, Color.asteroid2, Color.asteroid3];

    static projectile = [0, 0, 0,
                         .192, 1, .192,
                         0, 0, 0]

    static solidColor(r, g, b) {
        return [r, g, b,
                r, g, b,
                r, g, b]
    }

    static buildColors(numTriangles, triColor, alternate = false) {
        let colors = [];
        for (let i = 0; i < numTriangles; i++) {
            if (alternate && (i & 1)) {
                colors = colors.concat(Color.triColorReverse(triColor));
            }
            else{
                colors = colors.concat(triColor);
            }
        }
        return colors;
    }

    static triColorReverse(triColor) {
        return triColor.map((e, i, a) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const i_prime = 3 * (2 - row) + col;
            return a[i_prime];
        })
    }
}

export default Color;