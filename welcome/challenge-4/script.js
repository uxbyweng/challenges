// Find the missing letter
// Write a method that takes an array of consecutive (increasing) letters as input and that returns the missing letter in the array.

// You will always get an valid array.
// And it will be always exactly one letter be missing.
// The length of the array will always be at least 2.
// The array will always contain letters in only one case.

// Example:
// ['a','b','c','d','f'] -> 'e'
// ['O','Q','R','S'] -> 'P'
// (Use the English alphabet with 26 letters!)

const givenLetters = ["O", "Q", "R", "S"];
const lowerLetters = givenLetters.map((letter) => letter.toLowerCase());
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let istGross = false;
let startingPoint = 0;

// Gross und Kleinschreibung checken
// function checkGrossKleinSchreibung(givenLetters) {
//     if ((givenLetters = (s) => s === s.toUpperCase())) {
//         istGross = true;
//     } else {
//         istGross = false;
//     }
//     console.log(`Großschreibung: ${istGross}`);
// }

// Startpunkt des Arrays finden
function findStartingpoint() {
    for (letter in alphabet) {
        if (alphabet[letter] === lowerLetters[0]) {
            console.log(letter);
            //startingPoint = lowerLetters[letter];
        }
    }
    console.log(`Array beginnt mit: ${startingPoint}`);
}
function findMissingLetter(givenLetters) {
    // checkGrossKleinSchreibung(givenLetters);
    findStartingpoint();
    // for (letter in givenLetters) {
    //     if (givenLetters[letter] !== alphabet[letter]) {
    //         console.log(alphabet[letter]);
    //     }
    // }
}

findMissingLetter(givenLetters);
