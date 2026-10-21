function sort(characterString) {
    const woerter = characterString.split(" ");
    // console.log(woerter);

    // finde Zahl im Wort
    function getNumber(wort) {
        for (let i = 0; i < wort.length; i++) {
            // console.log(wort[1]);
            if (wort[i] >= "0" && wort[i] <= "9") {
                // console.log(wort[innerHeight]);
                return Number(wort[i]);
            }
        }
    }

    // sortier funktion
    woerter.sort(function (a, b) {
        // sortiere mit Hilfe von getNumber
        return getNumber(a) - getNumber(b);
    });

    // füge einzelne Wörter wieder zu String zusammen
    woerter.join(" ");

    // gebe wörter aus
    console.log(woerter);
}

sort("is2 Thi1s T4est 3a");
