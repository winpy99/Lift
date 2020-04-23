/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from "fs";
import http from "http";
import url from "url";
import Megoldás from "./megoldas";

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
        res.write("<title>LiftIgények</title>");
        res.write("</head>");
        res.write("<body><form><pre>");

        // Kezd a kódolást innen -->
        const megoldás = new Megoldás("igeny.txt");

        res.write("2. feladat.: Hányadik emeleten található a lift?<input type='number' name='emelet' value=${emelet} style='max-width:100px;' onChange='this.form.submit();'>\n");

        res.write("3. feladat.: A lift a " + megoldás.UtolsóSzint + ". szinten áll az utolsó igény teljesítése után\n");

        res.write("4. feladat.: Legalacsonyabb szint: " + megoldás.LegalacsonyabbSzint + ". szint" + " Legmagasabb szint: " + megoldás.LegmagasabbSzint);
        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
