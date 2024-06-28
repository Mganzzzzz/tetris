import {GameObject} from "./game-object.ts";
import {Color} from "./color.ts";

export class Shape extends GameObject {

    constructor(public x: number = 0, public y: number = 0, public width: number = 0, public height: number = 0) {
        super();
    }

    draw() {
        this.ctx.drawRect(this.x, this.y, this.width, this.height, );
    }
}
