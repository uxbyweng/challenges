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

// const givenLetters = ["O", "Q", "R", "S"];
const givenLetters = ["a", "b", "c", "d", "f"];
const lowerLetters = givenLetters.map((letter) => letter.toLowerCase());
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const istGross = givenLetters.every((l) => l === l.toUpperCase());
let startingPoint = 0;
let count = 0;
let missingLetter = "";

// Startpunkt des Arrays finden
function findStartingpoint() {
    for (letter in alphabet) {
        if (alphabet[letter] === lowerLetters[0]) {
            startingPoint = letter;
            // console.log(letter);
        }
    }
    console.log(`Das Array beginnt bei Buchstabe: ${alphabet[startingPoint]} \n`);
}

function findMissingLetter(givenLetters) {
    findStartingpoint();

    for (let i = startingPoint; i < givenLetters.length + startingPoint; i++) {
        // console.log(alphabet[i]);
        // console.log(lowerLetters[count]);
        if (alphabet[i] !== lowerLetters[count]) {
            // console.log(alphabet[i]);
            missingLetter = alphabet[i];
            break;
        }
        count = count + 1;
    }

    if (istGross) {
        missingLetter = missingLetter.toUpperCase();
        console.log("The missing letter is:", missingLetter);
    } else {
        console.log("The missing letter is:", missingLetter);
    }
}

findMissingLetter(givenLetters);
