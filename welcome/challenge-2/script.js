console.log("Welcome Challenge 2 \n");

function maskify(myString) {
    // leeres Array anlegen
    const newString = [];

    // wenn String vorhanden
    if (myString) {
        // übergebenen String ins Array schreiben
        newString.push(myString);
        // console.log(newString[0]);

        // wenn übergebener String mindesten 4 Zeichen enthält:
        if (myString.length > 3) {
            // console.log("Der String hat mindestens 4 Zeichen");

            let letzte4 = newString[0].slice(-4);
            // console.log(letzte4);

            let mask = "";

            for (let i = 0; i < myString.length - 4; i++) {
                mask += "#";
                // console.log(mask);
            }

            console.log(mask + letzte4);

            // wenn übergebener String weniger als 4 Zeichen enthält:
        } else {
            //console.log("String hat weniger als 4 Zeichen ");
            console.log(myString);
        }
        // wenn kein String vorhanden
    } else {
        console.log("no String");
    }
}

maskify("45551");
