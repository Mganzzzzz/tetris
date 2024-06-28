import {Scene} from "./scene.ts";
import {Color} from "./color.ts";

export interface GameContext {
    canvas: HTMLCanvasElement;
    current: Scene
}

export class GameCanvas implements GameCanvas {
    static instance: GameCanvas

    public canvas: HTMLCanvasElement;
    public context2d: CanvasRenderingContext2D;

    private constructor(canvas: HTMLCanvasElement) {

        this.canvas = canvas
        this.context2d = this.canvas.getContext("2d")!;
        this.setColor(new Color('#fff'))
        GameCanvas.instance = this;
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

    static getInstance() {
        return GameCanvas.instance;
    }

    static new(canvas: HTMLCanvasElement) {
        if (GameCanvas.instance) {
            return GameCanvas.instance
        }
        new GameCanvas(canvas)
    }
}
