import { parse } from "querystring";

export default class Jarmu {
    private _idopontString: string;
    private _rendszam: string;
    private _idopont: Date;
    private _EredetiFormatum: string;

    public get Rendszam(): string {
        return this._rendszam;
    }

    public get Idopont(): Date {
        return this._idopont;
    }

    public get IdopontString(): string {
        return this._idopontString;
    }

    public get EredetiFormatum(): string {
        return this._EredetiFormatum;
    }

    constructor(sor: string) {
        const seged: string[] = sor.split(" ");
        this._idopontString = parseInt(seged[0]) + ":" + seged[1] + ":" + seged[2];
        this._idopont = new Date(0, 0, 0, parseInt(seged[0]), parseInt(seged[1]), parseInt(seged[2]));
        this._rendszam = seged[3];
        this._EredetiFormatum = sor;
    }
}
