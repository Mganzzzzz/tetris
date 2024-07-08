import {Mosaic} from "./mosaic.ts";
import {GameObject} from "./game-object.ts";
import {Scene} from "./scene.ts";
import {Tetromino} from "./tetromino.ts";
import {GameEventType} from "./event.ts";

export class GridMap extends GameObject {
    mosaicMap: Map<string, Mosaic | null> = new Map
    width: number = 0
    height: number = 0

    constructor() {
        super()
        this.init()
        // this.mosaicMap = new Map<string, Mosaic>();
    }

    get rows() {
        const ret = []
        for (let i = 0; i < this.height; i++) {
            let row = []
            for (let j = 0; j < this.width; j++) {
                row.push(this.get(j,i))
            }
            ret.push(row)
        }
        return ret
    }

    init() {

        const {width, height} = this.ctx.canvas
        const step = Mosaic.size
        this.height = height / step
        this.width = width / step
        for (let i = 0; i < width; i += step) {
            for (let j = 0; j < height; j += step) {
                const key = `${i}-${j}`
                this.mosaicMap.set(key, null)
            }
        }

        this.ctx.registerEvent(GameEventType.mouse, (e) => {
            const evt = e.source as PointerEvent
            const {offsetX, offsetY} = evt
            const {x, y} = this.getcoordinateByOffset(offsetX, offsetY)
            const mosaic = this.mosaicMap.get(`${x}-${y}`)
            // if (mosaic) {
            //     console.log('debug mosaic', mosaic)
            // }
        })
    }

    getcoordinateByOffset(offsetX: number, offsetY: number) {
        let x = Math.floor(offsetX / Mosaic.size)
        let y = Math.floor(offsetY / Mosaic.size)
        return {x, y}
    }

    update() {

        if (this.parent instanceof Scene) {
            this.mosaicMap.forEach((_, key) => {
                this.mosaicMap.set(key, null)
            })
            this.parent.children.forEach((child) => {
                if (child instanceof Tetromino) {
                    this.updateMap(child.children)
                }
            })
        }
    }

    updateMap(mosaics: Mosaic[]) {

        mosaics.forEach((mosaic: Mosaic) => {
            const {indexX, indexY} = mosaic
            const key = `${indexX}-${indexY}`
            this.mosaicMap.set(key, mosaic)
        })
    }

    get(indexX: number, indexY: number) {
        const key = `${indexX}-${indexY}`
        return this.mosaicMap.get(key)
    }

    // onGround(mosaic: Mosaic) {
    //     const {indexX, indexY} = mosaic
    //     if (indexY === this.height - 1) {
    //         return true
    //     } else if (this.get(indexX, indexY+1)) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }

}
