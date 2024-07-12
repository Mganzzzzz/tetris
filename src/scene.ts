import {GameObject} from "./game-object.ts";
import {Tetromino} from "./tetromino.ts";
import {TetrominoeType} from "./enums.ts";
import {GridMap} from "./grid-map.ts";
import {GameCanvas} from "./game-canvas.ts";
import {GameEventType} from "./event.ts";
import {Mosaic} from "./mosaic.ts";

export class Scene extends GameObject {
    root: GameObject | null = null;
    pause = false

    init() {
        const m = new GridMap()
        this.addChild(m)
        const objs = [
            new Tetromino(0, m.height - 1, TetrominoeType.line),
            new Tetromino(4, m.height - 1, TetrominoeType.line),
            new Tetromino(7, 10, TetrominoeType.square),
            // new Tetromino(0, 23, TetrominoeType.leftZ),
            // new Tetromino(2, 5, TetrominoeType.rightZ),
            // new Tetromino(0, 9, TetrominoeType.leftL),
            // new Tetromino(10, 11, TetrominoeType.rightL),
            // new Tetromino(0, 14, TetrominoeType.soil),
        ]
        objs.forEach(n => {
            n.mGridMap = m
            this.addChild(n)
        })
        const gameCanvas = GameCanvas.getInstance()
        gameCanvas.registerEvent(GameEventType.keyboard, e => {
            const source = e.source as KeyboardEvent
            if (source.code === 'Space') {
                this.pause = !this.pause
            }
        })
    }

    update() {
        const now = new Date().getTime()
        if (this.lastTime === 0) {
            this.lastTime = now
        }
        const timeDelta = now - this.lastTime;
        if(this.pause) {
            return
        }
        if (timeDelta >= 200) {
            this.lastTime = now
            let tetrominos = this.children.filter(n => n instanceof Tetromino)
            tetrominos = tetrominos.sort((a, b) => {
                return a.bottom.indexY - b.bottom.indexY
            })

            tetrominos.forEach(n => {
                n.update()
            })
            const map = this.children.find(n => n instanceof GridMap)
            map?.update()
            if (map) {

                const rows = map.rows
                rows.forEach(row => {
                    if (row.every(n => n.data)) {
                        row.forEach(n => {
                            const m = n.data as Mosaic
                            const tetromino = m.parent!
                            tetromino.eliminateMosaic(m)
                        })
                    }
                })
            }
        }
    }
}
