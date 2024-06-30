import {Mosaic} from "./mosaic.ts";
import {GameObject} from "./game-object.ts";
import {Scene} from "./scene.ts";
import {Tetromino} from "./tetromino.ts";

export class GridMap extends GameObject {
    mosaicMap: Map<string, Mosaic | null> = new Map
    width: number = 0
    height: number = 0

    constructor() {
        super()
        this.init()
        // this.mosaicMap = new Map<string, Mosaic>();
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
