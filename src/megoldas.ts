import fs from "fs";
import Jarmu from "./jarmu";
import { strict } from "assert";

export default class Megoldas {
    private _jarmuvek: Jarmu[] = [];

    public MunkaidoOraban(): number {
        const kezdes: number = this._jarmuvek[0].Idopont.getHours();
        let vege: number = this._jarmuvek[0].Idopont.getHours();

        for (const i of this._jarmuvek) {
            if (i.Idopont.getHours() > vege) {
                vege = i.Idopont.getHours();
            }
        }
        return vege - kezdes + 1;
    }

    public EllenorzottAutok(): Array<string> {
        let ora = 0;
        const vizsgaltAutok: string[] = [];
        for (const i of this._jarmuvek) {
            if (i.Idopont.getHours() != ora) {
                ora = i.Idopont.getHours();
                vizsgaltAutok.push(ora + " óra: " + i.Rendszam);
            }
        }
        return vizsgaltAutok;
    }

    public Kategoriak(): Array<number> {
        const rendszamKategoriak: number[] = [0, 0, 0, 0]; //0- személy, 1- B, 2- K, 3- M
        for (const i of this._jarmuvek) {
            if (i.Rendszam[0] == "B") {
                rendszamKategoriak[1]++;
            } else if (i.Rendszam[0] == "K") {
                rendszamKategoriak[2]++;
            } else if (i.Rendszam[0] == "M") {
                rendszamKategoriak[3]++;
            } else {
                rendszamKategoriak[0]++;
            }
        }
        return rendszamKategoriak;
    }

    public LeghosszabbForgalommentes(): string {
        let max = this._jarmuvek[1].Idopont.getTime() - this._jarmuvek[0].Idopont.getTime();
        let maxindex = 0;
        for (let i = 1; i < this._jarmuvek.length; i++) {
            if (this._jarmuvek[i].Idopont.getTime() - this._jarmuvek[i - 1].Idopont.getTime() > max) {
                max = this._jarmuvek[i].Idopont.getTime() - this._jarmuvek[i - 1].Idopont.getTime();
                maxindex = i;
            }
        }
        return this._jarmuvek[maxindex - 1].IdopontString + " - " + this._jarmuvek[maxindex].IdopontString;
    }

    public KeresettRendszam(input: string): Array<string> {
        const rendszamok: string[] = [];
        for (const item of this._jarmuvek) {
            let hasonlo = true;
            for (let i = 0; i < item.Rendszam.length; i++) {
                if (item.Rendszam[i] != input[i] && input[i] != "*") {
                    hasonlo = false;
                }
            }
            if (hasonlo) {
                rendszamok.push(item.Rendszam);
            }
        }
        return rendszamok;
    }

    public VizsgaltAutok(): Array<string> {
        const vizsgalt: string[] = [];
        vizsgalt.push(this._jarmuvek[0].EredetiFormatum);

        let elteltido = 0;
        for (let i = 1; i < this._jarmuvek.length; i++) {
            elteltido += this._jarmuvek[i].Idopont.getTime() - this._jarmuvek[i - 1].Idopont.getTime();
            if (elteltido >= 300000) {
                vizsgalt.push(this._jarmuvek[i].EredetiFormatum);
                elteltido -= 300000;
            }
        }
        return vizsgalt;
    }

    public AllomanybaIr(fajlNev: string, kiirando: Array<string>): void {
        fs.writeFileSync(fajlNev, kiirando.join("\r\n") + "\r\n");
    }

    constructor(file: string) {
        fs.readFileSync(file)
            .toString()
            .split("\n")
            .forEach((i) => {
                const aktSor = i.trim();
                if (aktSor.length > 0) this._jarmuvek.push(new Jarmu(aktSor));
            });
    }
}
