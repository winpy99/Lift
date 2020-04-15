import Jarmu from "../jarmu";

describe("Jármű osztály unit tesztek", () => {
    const instance: Jarmu = new Jarmu("08 56 03 DE-4490");
    const instance2: Jarmu = new Jarmu("09 28 00 RA-9598");
    const instance3: Jarmu = new Jarmu("11 27 12 OY-5158");
    const instance4: Jarmu = new Jarmu("13 33 42 SO-2595");

    it("Jármű osztálypéldányok ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(Jarmu);
        expect(instance2).toBeInstanceOf(Jarmu);
        expect(instance3).toBeInstanceOf(Jarmu);
        expect(instance4).toBeInstanceOf(Jarmu);
    });

    it("Jármű rendszáma", async () => {
        expect(instance.Rendszam).toBe("DE-4490");
        expect(instance2.Rendszam).toBe("RA-9598");
        expect(instance3.Rendszam).toBe("OY-5158");
        expect(instance4.Rendszam).toBe("SO-2595");
    });

    it("Jármű áthaladási ideje stringben", async () => {
        expect(instance.IdopontString).toBe("8:56:03");
        expect(instance2.IdopontString).toBe("9:28:00");
        expect(instance3.IdopontString).toBe("11:27:12");
        expect(instance4.IdopontString).toBe("13:33:42");
    });

    it("Jármű bejegyzés eredeti formátuma", async () => {
        expect(instance.EredetiFormatum).toBe("08 56 03 DE-4490");
        expect(instance2.EredetiFormatum).toBe("09 28 00 RA-9598");
        expect(instance3.EredetiFormatum).toBe("11 27 12 OY-5158");
        expect(instance4.EredetiFormatum).toBe("13 33 42 SO-2595");
    });

    it("Jármű áthaladási ideje", async () => {
        expect(instance.Idopont.getHours()).toBe(8);
        expect(instance.Idopont.getMinutes()).toBe(56);
        expect(instance.Idopont.getSeconds()).toBe(3);
        expect(instance2.Idopont.getHours()).toBe(9);
        expect(instance2.Idopont.getMinutes()).toBe(28);
        expect(instance2.Idopont.getSeconds()).toBe(0);
    });
});
