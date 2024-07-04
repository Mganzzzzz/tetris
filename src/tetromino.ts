import {GameObject} from "./game-object.ts";
import {Mosaic} from "./mosaic.ts";
import {Direction, TetrominoeType} from "./enums.ts";
import {Color} from "./color.ts";
import {GridMap} from "./grid-map.ts";
import {GameEventType} from "./event.ts";

const bitMapping: Map<TetrominoeType, number[]> = new Map([
    [TetrominoeType.line, [
        1, 0, 0, 0,
        1, 0, 0, 0,
        1, 0, 0, 0,
        1, 0, 0, 0,
    ]],
    [TetrominoeType.square, [
        1, 1, 0, 0,
        1, 1, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ]],
    [TetrominoeType.leftL, [
        0, 1, 0, 0,
        0, 1, 0, 0,
        1, 1, 0, 0,
        0, 0, 0, 0,
    ]],
    [TetrominoeType.rightL, [
        0, 1, 0, 0,
        0, 1, 0, 0,
        1, 1, 0, 0,
        0, 0, 0, 0,
    ]],
    [TetrominoeType.leftZ, [
        0, 1, 1, 0,
        1, 1, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ]],
    [TetrominoeType.rightZ, [
        1, 1, 0, 0,
        0, 1, 1, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ]],
    [TetrominoeType.soil, [
        1, 1, 1, 0,
        0, 1, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ]],
])


const TetrominoeColorMapp: Map<TetrominoeType, Color> = new Map([
    [TetrominoeType.line, Color.from('aqua')],
    [TetrominoeType.square, Color.from('yellow')],
    [TetrominoeType.leftL, Color.from('navy')],
    [TetrominoeType.rightL, Color.from('darkgoldenrod')],
    [TetrominoeType.leftZ, Color.from('lime')],
    [TetrominoeType.rightZ, Color.from('red')],
    [TetrominoeType.soil, Color.from('purple')],
])

export class Tetromino extends GameObject {

    mosaicsIndex: number[]
    type: TetrominoeType
    direction: Direction = Direction.up
    children: Mosaic[] = []
    onGround = false
    private _mGridMap: GridMap | null = null

    constructor(public indexX: number, public indexY: number, type: TetrominoeType = TetrominoeType.line) {
        super()
        this.type = type
        this.mosaicsIndex = []
        this.init()
    }

    set mGridMap(value: any) {
        this._mGridMap = value;
    }

    get bottom() {
        this.children.sort((a, b) => {

            if (a.indexY > b.indexY) {
                return 1
            } else if (a.indexY > b.indexY) {
                return -1
            } else {
                return 0
            }
        })
        return this.children[0]
    }


    update() {
        super.update();
        this.detection()
        if (this.onGround) {
            return
        }
        this.indexY += 1
        this.children.forEach((child) => {
            child.indexY++
        })
    }

    detection() {
        if (this.children.some(n => {
            const _mGridMap = this._mGridMap!
            const {indexX, indexY} = n
            if (indexY + 1 === _mGridMap.height) {
                return true
            }
            const nextGrid = _mGridMap.get(indexX, indexY + 1)
            if (nextGrid && nextGrid.parent !== this) {
                return true
            }

            return false
        })) {
            this.onGround = true
        }

    }

    init() {
        const bitMap = bitMapping.get(this.type)!
        this.ctx.registerEvent(GameEventType.keyboard, (e) => {
            // console.log('debug e', e)
        })
        bitMap.forEach((bit, index) => {
            if (bit) {
                const x = Math.floor(index / 4)
                const y = index - (x * 4)
                const color = TetrominoeColorMapp.get(this.type)!
                const m = new Mosaic(x + this.indexX, y + this.indexY, color)
                this.addChild(m)
                this.mosaicsIndex.push(index)
            }
        })
    }
}
