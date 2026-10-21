console.log("Welcome Challenge 2 \n");

function maskify(myString) {
    const newString = [];
    if (myString) {
        newString.push(myString);
        // console.log(newString[0]);

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
        } else {
            console.log("String hat weniger als 4 Zeichen.");
        }
    } else {
        console.log("no String");
    }
}
maskify("4556364607935616");
