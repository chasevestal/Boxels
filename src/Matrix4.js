export class Matrix4 {

    constructor() {
        this.elements = new Float32Array(16);
        this.toBuffer = () => {return this.elements}
    }

    static identity() {
        var m = new Matrix4();
        m.elements[0] = 1;
        m.elements[5] = 1;
        m.elements[10] = 1;
        m.elements[15] = 1;
        return m;
    }

    static scale(x, y, z) {
        var m = new Matrix4();

        m.elements[0] = x;
        m.elements[5] = y;
        m.elements[10] = z;
        m.elements[15] = 1;
        return m;
    }

    static translate(x, y, z) {
        var m = new Matrix4();
        // Setting all the non-zero numbers.
        m.elements[0] = 1;
        m.elements[5] = 1;
        m.elements[10] = 1;
        // Right hand side.
        m.elements[12] = x;
        m.elements[13] = y;
        m.elements[14] = z;
        m.elements[15] = 1;
        return m;
    }

    static rotateZ(degrees) {
        var m = new Matrix4();
        m.elements[0] = Math.cos(degrees);
        m.elements[1] = Math.sin(degrees);
        m.elements[4] = Math.sin(degrees) * -1;
        m.elements[5] = Math.cos(degrees);
        m.elements[10] = 1;
        m.elements[15] = 1;
        return m;
    }

    static rotateY(degrees) {
        var m = new Matrix4();
        m.elements[0] = Math.cos(degrees);
        m.elements[2] = -1 * Math.sin(degrees);
        m.elements[5] = 1;
        m.elements[8] = Math.sin(degrees);
        m.elements[10] = Math.cos(degrees);
        m.elements[15] = 1;
        return m;
    }

    static rotateX(degrees) {
        var m = new Matrix4();
        m.elements[0] = 1;
        m.elements[5] = Math.cos(degrees);
        m.elements[6] = Math.sin(degrees);
        m.elements[9] = -1 * Math.sin(degrees);
        m.elements[10] = Math.cos(degrees);
        m.elements[15] = 1;
        return m;
    }

    static ortho(r, l, t, b, n, f) {
        var m = new Matrix4();
        m.elements[0] = 2 / (r-l);
        m.elements[5] = 2 / (t-b);
        m.elements[10] = 2 / (n-f);
        m.elements[15] = 1;

        m.elements[12] = -1 * (r+l) / (r-l);
        m.elements[13] = -1 * (t+b) / (t-b);
        m.elements[14] = (n+f) / (n-f);
        return m;
    }

    static multiplyVector4(input) {
        let mat = this.identity();
        for(i = 0; i < 4; i++) {
            mat.elements[i] = matrix.elements[i] * vector[0]
            mat.elements[i+4] = matrix.elements[i+4] * vector[1]
            mat.elements[i+8] = matrix.elements[i+8] * vector[2]
            mat.elements[i+12] = matrix.elements[i+12] * vector[3]
        }
        return mat
    }

    static multiplyMatrix4(matrix1, matrix2) {
        
        let j = 0
        let mat = this.identity();
        for(let i = 0; i < 4; i++) {
            j = 0
            mat.elements[i] = matrix1.elements[i] * matrix2.elements[j] + matrix1.elements[i+4] * matrix2.elements[j+1] + matrix1.elements[i+8] * matrix2.elements[j+2]
             + matrix1.elements[i+12] * matrix2.elements[j+3]
            j = 4
            mat.elements[i+4] = matrix1.elements[i] * matrix2.elements[j] + matrix1.elements[i+4] * matrix2.elements[j+1] + matrix1.elements[i+8] * matrix2.elements[j+2]
             + matrix1.elements[i+12] * matrix2.elements[j+3]
            j = 8
            mat.elements[i+8] = matrix1.elements[i] * matrix2.elements[j] + matrix1.elements[i+4] * matrix2.elements[j+1] + matrix1.elements[i+8] * matrix2.elements[j+2]
             + matrix1.elements[i+12] * matrix2.elements[j+3]
            j = 12
            mat.elements[i+12] = matrix1.elements[i] * matrix2.elements[j] + matrix1.elements[i+4] * matrix2.elements[j+1] + matrix1.elements[i+8] * matrix2.elements[j+2]
             + matrix1.elements[i+12] * matrix2.elements[j+3]
        }

        return mat
        
    }

    static arrayXY(x, y) {
        return y * 4 + x;
    }
}
