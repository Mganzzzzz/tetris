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
    public _mGridMap: GridMap | null = null
    active = false
    public leftGrids: Mosaic[] = [];
    public toBottom: boolean = false;
    public toLeft: boolean = false;
    public toRight: boolean = false;

    constructor(public indexX: number, public indexY: number, type: TetrominoeType = TetrominoeType.line) {
        super()
        this.type = type
        this.mosaicsIndex = []
        this.init()
    }

    set mGridMap(value: any) {
        this._mGridMap = value;
    }

    getEdge(direction: Direction) {
        const compareMapping = new Map([
            [Direction.left, (a: Mosaic, b: Mosaic) => {
                return a.indexX - b.indexX;
            }],
            [Direction.right, (a: Mosaic, b: Mosaic) => {
                return b.indexX - a.indexX;
            }],
            [Direction.up, (a: Mosaic, b: Mosaic) => {
                return a.indexY - b.indexY;
            }],
            [Direction.down, (a: Mosaic, b: Mosaic) => {
                return b.indexY - a.indexY;
            }]
        ])
        const compareFn = compareMapping.get(direction)!
        const children = [...this.children]
        children.sort(compareFn)
        return children[0]
    }


    get left() {
        return this.getEdge(Direction.left)
    }

    get right() {
        return this.getEdge(Direction.right)
    }

    get bottom() {
        return this.getEdge(Direction.down)
    }


    update() {
        super.update();
        this.detection()
        if (!this.toBottom) {
            this.indexY += 1
        }
    }

    detection() {
        const mGridMap = this._mGridMap!
        this.leftGrids = this.children.map((n => {
            const {indexX, indexY} = n
            const grid = mGridMap.get(indexX, indexY + 1)
            return grid
        })).filter(m => m instanceof Mosaic)
        this.toBottom = (this.bottom.indexY + this.indexY) === mGridMap.height - 1
        this.toLeft = (this.left.indexX + this.indexX) === 0
        this.toRight = (this.right.indexX + this.indexX) === mGridMap.width - 1
    }

    init() {
        const bitMap = bitMapping.get(this.type)!
        bitMap.forEach((bit, index) => {
            if (bit) {
                const x = Math.floor(index / 4)
                const y = index - (x * 4)
                const color = TetrominoeColorMapp.get(this.type)!
                const m = new Mosaic(x, y, color)
                this.addChild(m)
                this.mosaicsIndex.push(index)
            }
        })
        this.bindEvent()
    }

    bindEvent() {
        this.ctx.registerEvent(GameEventType.keyboard, (e) => {
            const source = e.source as KeyboardEvent
            const mapping = new Map([
                ['ArrowUp', Direction.up],
                ['ArrowDown', Direction.down],
                ['ArrowLeft', Direction.left],
                ['ArrowRight', Direction.right],
            ])
            const direction = mapping.get(source.key)
            if (direction) {
                const handlerMapping = new Map([
                    [Direction.up, () => {
                        //
                    }],
                    [Direction.down, () => {
                        //
                    }],
                    [Direction.left, () => {
                        if (!this.toLeft) {
                            this.indexX--
                        }
                    }],
                    [Direction.right, () => {
                        if (!this.toRight) {
                            this.indexX++
                        }
                    }],
                ])
                const handler = handlerMapping.get(direction)!
                handler()
            }
        })
    }
}
