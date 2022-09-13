class RGBAColor {
    r: number;
    g: number;
    b: number;
    a: number;

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

    clone(): RGBAColor {
        return new RGBAColor(this.r, this.g, this.b, this.a);
    }
    copy(origin: RGBAColor): RGBAColor {
        this.set(origin.r, origin.g, origin.b, origin.a);

        return this;
    }

    getSingle(v:number){
        return v * this.a;
    }
}

export default RGBAColor;
