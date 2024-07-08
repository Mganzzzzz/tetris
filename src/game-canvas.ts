import {Scene} from "./scene.ts";
import {Color} from "./color.ts";
import {ClickEvent, GameEvent, GameEventType} from "./event.ts";
import {Mosaic} from "./mosaic.ts";

export interface GameContext {
    canvas: HTMLCanvasElement;
    current: Scene
}

export class GameCanvas implements GameCanvas {
    static instance: GameCanvas

    public canvas: HTMLCanvasElement;
    public context2d: CanvasRenderingContext2D;
    public eventsMap = new Map<GameEventType, ((e: GameEvent) => void)[]>()

    private constructor(canvas: HTMLCanvasElement) {

        this.canvas = canvas
        this.context2d = this.canvas.getContext("2d")!;
        this.setColor(new Color('#fff'))
        GameCanvas.instance = this;
        this.bindEvent()

    }

    clean() {
        this.context2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setColor(color: Color): void {
        this.context2d.fillStyle = color.toValue()
    }

    drawRect(x: number, y: number, width: number, height: number, color?: Color) {
        if (this.context2d) {
            const t = this.context2d.fillStyle
            if (color) {
                this.setColor(color)
            }
            this.context2d.fillRect(x, y, width, height);
            this.context2d.fillStyle = t
        }
    }

    drawBorder(x: number, y: number, width: number, height: number, color?: Color) {
        if (this.context2d) {
            const t = this.context2d.fillStyle
            if (color) {
                this.setColor(color)
            }
            this.context2d.strokeRect(x, y, width, height);
            this.context2d.fillStyle = t
        }
    }

    drawText(x: number, y: number, text: string, color?: Color) {
        this.context2d.font = `10px ${color?.toValue() || ''}`;
        this.context2d.fillText(text, x, y);
    }

    static getInstance() {
        return GameCanvas.instance;
    }

    static new(canvas: HTMLCanvasElement) {
        if (GameCanvas.instance) {
            return GameCanvas.instance
        }
        return new GameCanvas(canvas)
    }

    bindEvent() {
        let isKeyPressed = false;
        window.addEventListener('keydown', () => {
            isKeyPressed = true;
        })
        window.addEventListener('keyup', (e) => {
            if (isKeyPressed) {
                this.triggerEvent(new GameEvent(GameEventType.keyboard, e))

                isKeyPressed = false;
            }
        })

        if (this.canvas) {
            this.canvas.addEventListener('click', (e) => {
                this.triggerEvent(new GameEvent(GameEventType.mouse, e))
            })
            this.canvas.addEventListener('mousedown', (e) => {
                this.triggerEvent(new GameEvent(GameEventType.mouse, e))
            })
            this.canvas.addEventListener('mouseup', (e) => {
                this.triggerEvent(new GameEvent(GameEventType.mouse, e))
            })
            this.canvas.addEventListener('mouseleave', (e) => {
                this.triggerEvent(new GameEvent(GameEventType.mouse, e))
            })
        }
    }

    private triggerEvent(event: GameEvent) {
        const cbs = this.eventsMap.get(event.type)
        if (Array.isArray(cbs)) {
            cbs.forEach(n => n(event))
        }
    }

    registerEvent(type: GameEventType, cb: (e: GameEvent) => void) {
        if (!this.eventsMap.get(type)) {
            this.eventsMap.set(type, [])
        }
        const queue = this.eventsMap.get(type)!
        queue.push(cb)
    }
}
