import { terminal } from "./Terminal"

export class pos{
    id : number

    name : string

    serial : string

    state : number

    posState : string

    terminals: terminal[]
    constructor(id: number,Name: string,serial: string,state: number,posstate: string){
        this.id = id;
        this.name = Name;
        this.serial = serial;
        this.state = state;
        this.posState = posstate;
        this.terminals = []
    }
}