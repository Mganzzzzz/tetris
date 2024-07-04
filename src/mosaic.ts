import {Shape} from "./shape.ts";
import {Color} from "./color.ts";

export class Mosaic extends Shape {

    static size: number = 20
    _lastColor: Color | undefined

    constructor(public indexX: number = 0, public indexY: number = 0, public color?: Color) {
        super();
        const size = Mosaic.size
        this.height = size
        this.width = size
        this.x = this.indexX * size
        this.y = this.indexY * size

    }

    update() {
        super.update();
        this.x = this.indexX * Mosaic.size
        this.y = this.indexY * Mosaic.size
    }

    changeColor(color: Color) {
        this._lastColor = this.color
        this.color = color = color
    }

    revertColor() {
        if (this._lastColor) {

            this.color = this._lastColor
        }
    }

    draw() {
        this.ctx.drawRect(this.x, this.y, this.width, this.height, this.color);
        this.ctx.drawBorder(this.x, this.y, this.width, this.height, this.color);
        // this.ctx.drawText( this.x + this.width/2, this.y+this.height/2,`${this.indexX}-${this.indexY}`);
    }
}
