import {GameObject} from "./game-object.ts";
import {Shape} from "./shape.ts";

export class Scene extends GameObject {
    root: GameObject|null = null;
    init() {
        this.root = new GameObject()
        const s = new Shape(10, 10, 20, 20)
        this.root.addChild(s)
    }

    update() {
        this.root?.update()
    }

    draw() {
        this.root?.draw()
    }
}
