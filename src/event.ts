export enum GameEventType {
    keyboard,
    mouse
}
export class GameEvent {

    constructor(public type:GameEventType,public source:Event) {}
}
