import {Mosaic} from "./mosaic.ts";
import {GameObject} from "./game-object.ts";
import {Scene} from "./scene.ts";
import {Tetromino} from "./tetromino.ts";
import {GameEventType} from "./event.ts";
import {Color} from "./color.ts";

export class GridData {
    public data: any = null
    public offsetX = 0
    public offsetY = 0
}

export class GridMap extends GameObject {
    mosaicMap: Map<string, GridData | null> = new Map
    width: number = 0
    height: number = 0
    rows: Array<Array<GridData>> = []

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
        for (let i = 0; i < width; i ++) {
            const row:GridData[]  = []
            for (let j = 0; j < height; j += step) {
                const key = `${i}-${j}`
                const grid = new GridData()
                row.push(grid)
                this.mosaicMap.set(key, grid)
            }
            this.rows.push(row)
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
                const grid = this.mosaicMap.get(key)!
                grid.data = null
                this.mosaicMap.set(key, grid)
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
            const grid = this.mosaicMap.get(key)!
            grid.data = mosaic
            this.mosaicMap.set(key, grid)
        })
    }

    get(indexX: number, indexY: number) {
        const key = `${indexX}-${indexY}`
        const grid = this.mosaicMap.get(key)
        return grid?.data
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
