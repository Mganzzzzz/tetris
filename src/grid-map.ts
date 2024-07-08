import {Mosaic} from "./mosaic.ts";
import {GameObject} from "./game-object.ts";
import {Scene} from "./scene.ts";
import {Tetromino} from "./tetromino.ts";
import {GameEventType} from "./event.ts";

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

    // get rows() {
    //     const ret = []
    //     for (let i = 0; i < this.height; i++) {
    //         let row = []
    //         for (let j = 0; j < this.width; j++) {
    //             row.push(this.get(j,i))
    //         }
    //         ret.push(row)
    //     }
    //     return ret
    // }

    init() {

        const {width, height} = this.ctx.canvas
        const step = Mosaic.size
        this.height = height / step
        this.width = width / step
        console.log('debug this.height, this.width', this.height, this.width)
        for (let y = 0; y < this.height; y++) {
            const row: GridData[] = []
            for (let x = 0; x < this.width; x++) {
                const key = `${x}-${y}`
                const grid = new GridData()
                row.push(grid)
                this.mosaicMap.set(key, grid)
            }
            this.rows.push(row)
        }
        console.log('debug this.rows', this.rows)

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
            this.rows.forEach(row => {
                row.forEach(n => n.data = null)
            })
            // this.mosaicMap.forEach((_, key) => {
            //     const grid = this.mosaicMap.get(key)!
            //     grid.data = null
            //     this.mosaicMap.set(key, grid)
            // })
            this.parent.children.forEach((child) => {
                if (child instanceof Tetromino) {
                    this.updateMap(child)
                }
            })
        }
    }

    updateMap(tetromino: Tetromino) {
        const mosaics = tetromino.children
        mosaics.forEach((mosaic: Mosaic) => {
            const {indexX, indexY} = mosaic
            const grid = this.rows[indexY + tetromino.indexY][indexX + tetromino.indexX]
            // grid.data = mosaic
            grid.data = mosaic
            // this.mosaicMap.set(key, grid)
        })
    }

    get(indexX: number, indexY: number) {
        return this.rows[indexX][indexY].data
        // const key = `${indexX}-${indexY}`
        // const grid = this.mosaicMap.get(key)
        // return grid?.data
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
