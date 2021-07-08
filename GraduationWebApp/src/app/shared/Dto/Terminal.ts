export class terminal{
    public id: number

    // a serial is a guid generate first time at the client
    public  serial : string

    public state : number

    public table : number

    public posSerial: string

    public terminalState: string //got from state table

    constructor( Id: number,  Serial : string, state : number,  Table : number, PosSerial: string, TerminalState: string )
    {
        this.id = Id;
        this.serial = Serial;
        this.state = state;
        this.table = Table;
        this.posSerial = PosSerial;
        this.terminalState = TerminalState;
    }
}