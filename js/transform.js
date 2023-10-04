class Transform {
    static translationMatrix(translateX, translateY) {
        return [
            1, 0, 0,
            0, 1, 0,
            translateX, translateY, 1
        ];
    }
    
    static rotationMatrix(radians) {
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        return [
            cos, sin, 0,
            -sin, cos, 0,
            0, 0, 1
        ];
    }
    
    static scalationMatrix(scaleX, scaleY) {
        return [
            scaleX, 0, 0,
            0, scaleY, 0,
            0, 0, 1
        ];
    }

    static transformationMatrix(tx, ty, radians, sx, sy) {
        return this.dot(this.dot(this.scalationMatrix(sx, sy), this.rotationMatrix(radians)), this.translationMatrix(tx, ty));
    }

    static dot(l3x3, r3x3) {
        return l3x3.map((e, i, a) => { 
            const r = Math.floor(i / 3);
            const c = i % 3;
            return a[r * 3] * r3x3[c] + a[r * 3 + 1] * r3x3[c + 3] + a[r * 3 + 2] * r3x3[c + 6];
        });
    }
}

export default Transform;