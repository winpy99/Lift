import fs from "fs";
import LiftIgény from "./Liftigény";

export default class Megoldas {
    private _liftIgények: LiftIgény[] = [];

    constructor(file: string) {
        fs.readFileSync(file)
            .toString()
            .split("\n")
            .forEach((i) => {
                const aktSor = i.trim();
                if (aktSor.length > 0) this._liftIgények.push(new LiftIgény(aktSor));
            });
    }
}
