import {GameObject} from "./game-object.ts";
import {Tetromino} from "./tetromino.ts";
import {TetrominoeType} from "./enums.ts";

export class Scene extends GameObject {
    root: GameObject | null = null;

    init() {
        this.root = new GameObject()
        // const s = new Mosaic(10, 10)
        const objs = [
            new Tetromino(0, 0, TetrominoeType.line),
            new Tetromino(0, 1, TetrominoeType.square),
            new Tetromino(0, 3, TetrominoeType.leftZ),
            new Tetromino(0, 5, TetrominoeType.rightZ),
            new Tetromino(0, 9, TetrominoeType.leftL),
            new Tetromino(0, 11, TetrominoeType.rightL),
            new Tetromino(0, 14, TetrominoeType.soil),
        ]
        objs.forEach(n => this.root?.addChild(n))
    }

    update() {
        this.root?.update()
    }

    draw() {
        this.root?.draw()
    }
}
