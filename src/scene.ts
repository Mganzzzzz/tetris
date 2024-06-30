import {GameObject} from "./game-object.ts";
import {Tetromino} from "./tetromino.ts";
import {TetrominoeType} from "./enums.ts";
import {GridMap} from "./grid-map.ts";

export class Scene extends GameObject {
    root: GameObject | null = null;

    init() {
        const m = new GridMap()
        this.addChild(m)
        const objs = [
            new Tetromino(0, 0, TetrominoeType.line),
            new Tetromino(0, 20, TetrominoeType.square),
            new Tetromino(0, 23, TetrominoeType.leftZ),
            new Tetromino(2, 5, TetrominoeType.rightZ),
            new Tetromino(0, 9, TetrominoeType.leftL),
            new Tetromino(10, 11, TetrominoeType.rightL),
            new Tetromino(0, 14, TetrominoeType.soil),
        ]
        objs.forEach(n => {
            n.mGridMap = m
            this.addChild(n)
        })
    }

    update() {
        const now = new Date().getTime()
        if (this.lastTime === 0) {
            this.lastTime = now
        }
        const timeDelta = now - this.lastTime;
        if (timeDelta >= 500) {
            this.lastTime = now
            let tetrominos = this.children.filter(n => n instanceof Tetromino)
            tetrominos= tetrominos.sort((a, b) => {
                if(a.bottom.indexY > b.bottom.indexY) {
                    return 1
                } else if(a.bottom.indexY > b.bottom.indexY) {
                    return -1
                } else {
                    return 0
                }
            })

            tetrominos.forEach(n => {
                n.update()
            })
            const map = this.children.find(n => n instanceof GridMap)
            map?.update()
        }
    }
}
