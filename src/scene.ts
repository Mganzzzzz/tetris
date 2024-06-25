import {GameObject} from "./game-object.ts";

export class Scene extends GameObject {
    root: GameObject|null = null;
    init() {
        this.root = new GameObject()
    }

    update() {
        this.root?.update()
    }

    draw() {
        this.root?.draw()
    }
}
