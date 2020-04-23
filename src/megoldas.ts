import fs from "fs";
import LiftIgény from "./Liftigény";

export default class Megoldas {
    private _liftIgények: LiftIgény[] = [];
    private _szintekSzáma = 0;
    private _csapatokSzáma = 0;
    private _igényekSzáma = 0;

    public get LiftIgények(): LiftIgény[] {
        return this._liftIgények;
    }
    public set SzintekSzáma(p: number) {
        this._szintekSzáma = p;
    }
    public set CsapatokSzáma(p: number) {
        this._csapatokSzáma = p;
    }
    public set IgényekSzáma(p: number) {
        this._igényekSzáma = p;
    }
    constructor(file: string) {
        fs.readFileSync(file)
            .toString()
            .split("\n")
            .forEach((i) => {
                const aktSor = i.trim();
                if (aktSor.length < 2) {
                    let index = 0;
                    if (index === 0) {
                        this.SzintekSzáma = parseInt(aktSor);
                    } else if (index === 1) {
                        this.CsapatokSzáma = parseInt(aktSor);
                    } else if (index === 2) {
                        this.IgényekSzáma = parseInt(aktSor);
                    }
                    index = index + 1;
                } else {
                    if (aktSor.length > 0) this._liftIgények.push(new LiftIgény(aktSor));
                }
            });
    }
    public get UtolsóSzint(): number {
        return this._liftIgények[this._liftIgények.length - 1].CélSzint;
    }
    private get LegalacsonyabbIndulóSzint(): number {
        let minimumInduló = 100;
        this.LiftIgények.forEach((igény) => {
            if (igény.IndulóSzint < minimumInduló) {
                minimumInduló = igény.IndulóSzint;
            }
        });
        return minimumInduló;
    }
    private get LegalacsonyabbCélSzint(): number {
        let minimumCél = 100;
        this.LiftIgények.forEach((igény) => {
            if (igény.CélSzint < minimumCél) {
                minimumCél = igény.CélSzint;
            }
        });
        return minimumCél;
    }

    private get LegmagasabbIndulóSzint(): number {
        let maximum = 0;
        this.LiftIgények.forEach((igény) => {
            if (igény.IndulóSzint > maximum) {
                maximum = igény.IndulóSzint;
            }
            if (igény.CélSzint > maximum) {
                maximum = igény.CélSzint;
            }
        });
        return maximum;
    }
    private get LegmagasabbCélSzint(): number {
        let maximum = 0;
        this.LiftIgények.forEach((igény) => {
            if (igény.IndulóSzint > maximum) {
                maximum = igény.IndulóSzint;
            }
            if (igény.CélSzint > maximum) {
                maximum = igény.CélSzint;
            }
        });
        return maximum;
    }
    public get LegmagasabbSzint(): number {
        let maximum = 0;
        if (this.LegmagasabbCélSzint > this.LegmagasabbIndulóSzint) {
            maximum = this.LegmagasabbCélSzint;
        } else {
            maximum = this.LegmagasabbIndulóSzint;
        }
        return maximum;
    }
    public get LegalacsonyabbSzint(): number {
        let minimum = 0;
        if (this.LegalacsonyabbIndulóSzint > this.LegalacsonyabbCélSzint) {
            minimum = this.LegalacsonyabbCélSzint;
        } else {
            minimum = this.LegalacsonyabbIndulóSzint;
        }
        return minimum;
    }
}
