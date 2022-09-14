class RGBAColor {
    r: number;
    g: number;
    b: number;
    a: number;

    /**
     * Made a RGBAColor set
     * @param r Red 0 ~ 255
     * @param g Green 0 ~ 255
     * @param b Blue 0 ~ 255
     * @param a A 0 ~ 1
     */
    constructor(r: number, g: number, b: number, a: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    set(r: number, g: number, b: number, a: number): RGBAColor {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;

        return this;
    }

    setR(v: number): RGBAColor {
        this.r = v;

        return this;
    }
    setG(v: number): RGBAColor {
        this.g = v;

        return this;
    }
    setB(v: number): RGBAColor {
        this.b = v;

        return this;
    }
    setA(v: number): RGBAColor {
        this.a = v;

        return this;
    }

    /**
     * Clone itself
     * @returns Resault
     */
    clone(): RGBAColor {
        return new RGBAColor(this.r, this.g, this.b, this.a);
    }
    /**
     * The RGBA will be as same as the source color
     * @param origin Source color
     * @returns {RGBAColor} For linking actoins
     */
    copy(origin: RGBAColor): RGBAColor {
        this.set(origin.r, origin.g, origin.b, origin.a);

        return this;
    }

    /**
     * Generate a value without a ( use in RGBA to RGB )
     * @param v A value in RGB
     * @returns Resault
     */
    getSingle(v:number){
        return v * this.a;
    }
}

export default RGBAColor;
