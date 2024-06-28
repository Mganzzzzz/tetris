import {GameObject} from "./game-object.ts";
import {Mosaic} from "./mosaic.ts";
import {Direction, TetrominoeType} from "./enums.ts";
import {Color} from "./color.ts";

const bitMapping: Map<TetrominoeType, number[]> = new Map([
    [TetrominoeType.line, [
        1, 0, 0, 0,
        1, 0, 0, 0,
        1, 0, 0, 0,
        1, 0, 0, 0,
    ]],
    [TetrominoeType.square,  [
            1, 1, 0, 0,
            1, 1, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ]],
     [TetrominoeType.leftL,  [
            0, 1, 0, 0,
            0, 1, 0, 0,
            1, 1, 0, 0,
            0, 0, 0, 0,
        ]],
      [TetrominoeType.rightL,  [
            0, 1, 0, 0,
            0, 1, 0, 0,
            1, 1, 0, 0,
            0, 0, 0, 0,
        ]],
     [TetrominoeType.leftZ,  [
            0, 1, 1, 0,
            1, 1, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ]],
     [TetrominoeType.rightZ,  [
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


const TetrominoeColorMapp =  Map<TetrominoeType, Color> = new Map([
    [TetrominoeType.line, Color.from('aqua')],
    [TetrominoeType.square,  Color.from('yellow')],
     [TetrominoeType.leftL,  Color.from('navy')],
      [TetrominoeType.rightL,  Color.from('darkgoldenrod')],
     [TetrominoeType.leftZ,  Color.from('lime')],
     [TetrominoeType.rightZ,  Color.from('chartreuse')],
     [TetrominoeType.soil, Color.from('purple')],
])

export class Tetromino extends GameObject {
    mosaicsIndex: number[]
    type: TetrominoeType
    direction: Direction = Direction.up

    constructor(public indexX: number, public indexY: number, type: TetrominoeType = TetrominoeType.line) {
        super()
        this.type = type
        this.mosaicsIndex = []
        this.init()
    }

    init() {
        const bitMap = bitMapping.get(this.type)!
        bitMap.forEach((bit, index) => {
            if (bit) {
                const x = Math.floor(index / 4)
                const y = index - (x * 4)
                const color = TetrominoeColorMapp.get(this.type)!
                const m = new Mosaic(x + this.indexX, y + this.indexY, color)
                this.children.push(m)
                this.mosaicsIndex.push(index)
            }
        })
    }
}
