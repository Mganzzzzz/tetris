import {GameCanvas} from "./game-canvas.ts";

export class GameObject {
    static id = 0
    public children: GameObject[] = [];
    public parent: GameObject | null = null;
    id: number
    public ctx: GameCanvas
    lastTime = 0

    constructor() {
        this.ctx = GameCanvas.getInstance();
        this.id = GameObject.id;
        GameObject.id++
    }

    addChild(child: GameObject) {
        child.parent = this;
        this.children.push(child);
    }

    destory() {
        if (this.parent) {
            const i = this.parent.children.findIndex(n => n.id === this.id);
            if (i >= 0) {
                this.parent.children.splice(i, 1);
            }
        }
    }

    update() {
        this.children.forEach((child) => {
            child.update()
        })
    }

    draw() {
        this.children.forEach((child) => {
            child.draw()
        })
    }

}
