import fs from "fs";
import Megoldas from "../megoldas";

describe("Megoldás osztály unit tesztek", () => {
    const instance: Megoldas = new Megoldas("jarmu.txt");

    it("Megoldás osztálypéldány ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(Megoldas);
    });

    it("Munkaórák száma", async () => {
        expect(instance.MunkaidoOraban()).toBe(6);
    });

    it("Ellenőrzött autók száma", async () => {
        expect(instance.EllenorzottAutok().length).toBe(6);
    });

    it("Ellenőrzőtt autók", async () => {
        expect(instance.EllenorzottAutok()).toStrictEqual(["8 óra: FD-2717", "9 óra: GK-3407", "10 óra: RQ-8890", "11 óra: IN-5066", "12 óra: GC-0459", "13 óra: CH-1893"]);
    });

    it("Elhaladó járművek kategóriái", async () => {
        expect(instance.Kategoriak()).toStrictEqual([317, 10, 12, 15]);
    });

    it("Leghosszabb forgalommentes időszak", async () => {
        expect(instance.LeghosszabbForgalommentes()).toBe("8:57:48 - 9:01:06");
    });

    it("Vizgaltautók száma", async () => {
        expect(instance.VizsgaltAutok().length).toBe(61);
    });
});
