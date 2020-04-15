import fs from "fs";
import http from "http";
import url from "url";
import Megoldas from "./megoldas";

interface InputInterface {
    name: string;
    age: number;
    male: boolean;
}

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Közuti Ellenőrzés</title>");
        res.write("</head>");
        res.write("<body><form><pre>");

        // Kezd a kódolást innen -->
        const megoldas = new Megoldas("jarmu.txt");
        res.write(`2.feladat: ${megoldas.MunkaidoOraban()} órát dolgoztak a rendőrök\n`);

        res.write("3.feladat: Műszakilag ellenőrzött járművek:\n");
        megoldas.EllenorzottAutok().forEach((i) => res.write("\t" + i + "\n"));

        res.write("4.feladat: Elhaladó járművek kategóriánként:\n");
        res.write(`\tSzemélyautó: ${megoldas.Kategoriak()[0]}\n`);
        res.write(`\tAutóbusz: ${megoldas.Kategoriak()[1]}\n`);
        res.write(`\tKamion: ${megoldas.Kategoriak()[2]}\n`);
        res.write(`\tMotor: ${megoldas.Kategoriak()[3]}\n`);

        res.write(`5.feladat: A leghosszabb forgalommentes időszak: ${megoldas.LeghosszabbForgalommentes()} \n`);

        const u = url.parse(req.url as string, true).query;
        let rendszamInput: string = u.rendszamInput as string;
        if (!rendszamInput || rendszamInput.length != 7) rendszamInput = "";
        res.write("6.feladat: Adja meg a keresendő rendszámot (az ismeretlen karakterek helyére írjon *-ot): <input type='text' name='rendszamInput' style='width: 6em'>\n");
        megoldas.KeresettRendszam(rendszamInput).forEach((rendszam) => res.write(`\t${rendszam}\n`));

        megoldas.AllomanybaIr("vizsgalt.txt", megoldas.VizsgaltAutok());

        res.write("\n\n<u>GitHub repository:</u> ");
        res.write("<a href='https://github.com/BotiD3/Erettsegi_KozutiEllenorzes/' target='_blank'>GitHub</a><br>");

        res.write("\n\n<u>A vizsgalt.txt fájl:</u>\n");
        try {
            fs.readFileSync("vizsgalt.txt")
                .toString()
                .split("\n")
                .forEach((i) => res.write(`${i.trim()}<br>`));
        } catch (error) {
            res.write("Hiba: " + (error as Error).message + "\n");
        }

        res.write("\n\n<u>A forrás jarmu.txt fájl:</u>\n");
        fs.readFileSync("jarmu.txt")
            .toString()
            .split("\n")
            .forEach((i) => res.write(`${i.trim()}<br>`));

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
