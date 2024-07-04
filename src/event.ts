export enum GameEventType {
    keyboard,
    mouse
}
export class GameEvent {

    constructor(public type:GameEventType,public source:Event) {}
}

export class ClickEvent extends GameEvent {
    public indexX : number
    public indexY : number
    constructor(public source:Event) {
        super(GameEventType.mouse, source);
    }

    public setIndex(indexX: number, indexY: number) {
        this.indexX = indexX;
        this.indexY = indexY;
    }

}
