export default class LiftIgény {
    private _óra: number;
    private _perc: number;
    private _másodperc: number;
    private _csapatSorszáma: number;
    private _indulószint: number;
    private _célszint: number;

    public get Óra(): number {
        return this._óra;
    }

    public get Perc(): number {
        return this._perc;
    }

    public get Másodperc(): number {
        return this._másodperc;
    }

    public get Csapat(): number {
        return this._csapatSorszáma;
    }
    public get IndulóSzint(): number {
        return this._indulószint;
    }
    public get CélSint(): number {
        return this._célszint;
    }

    constructor(sor: string) {
        const seged: string[] = sor.split(" ");
        this._óra = parseInt(seged[0]);
        this._perc = parseInt(seged[1]);
        this._másodperc = parseInt(seged[2]);
        this._csapatSorszáma = parseInt(seged[3]);
        this._indulószint = parseInt(seged[4]);
        this._célszint = parseInt(seged[5]);
    }
}
