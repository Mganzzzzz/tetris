export class Color {
    constructor(public r: number | string, public g?: number | string, public b?: number | string, public a?: number | string) {
    }

    static from( r: number | string,  g?: number | string,  b?: number | string,  a?: number | string) {
        return new this(r, g, b, a)
    }

    toValue() {
        const v = [this.r, this.g, this.b, this.a].filter(c => typeof c !== 'undefined');
        if (v.length === 1) {
            return String(v[0]);
        } else if (v.length === 2) {
            return `rgb(${v.toString().replace(/,/g, '')})`
        } else if (v.length === 4) {
            return `rgba(${v.toString().replace(/,/g, '')})`
        } else {
            return String(v[0])
        }
    }
}
