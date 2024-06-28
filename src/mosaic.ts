import {Shape} from "./shape.ts";
import {Color} from "./color.ts";

export class Mosaic extends Shape {

    size: number = 10

    constructor(public indexX: number = 0, public indexY: number = 0, public color?: Color) {
        super();
        this.height = this.size
        this.width = this.size
        this.x = this.indexX * this.size
        this.y = this.indexY * this.size
    }

    draw() {
        this.ctx.drawRect(this.x, this.y, this.width, this.height, this.color);
        this.ctx.drawBorder(this.x, this.y, this.width , this.height, this.color);
    }
}
