import {Scene} from "./scene.ts";

export interface GameContext {
    canvas: HTMLCanvasElement;
    current: Scene
}

export class GameContext implements GameContext {
    constructor(public canvas: HTMLCanvasElement) {

    }
}
let ctx: GameContext = null;
export const getGameContext = () => {
    if(!ctx ) {
        ctx = new GameContext()
    }
    return ctx

}
