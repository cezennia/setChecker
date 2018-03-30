/**
 * Import file dependencies
 */
var fs = require('fs');


/**
 * Initialization of global variables
 */
var setArray = [];
var sizeOfSetArray = 10;


/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Return random number of a particular length of digits
 */
function getRandomDigits (length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}


/**
 * Return a set of set random size range
 */
function getNewSet() {
    var tempSet = new Set();

    for (var i=0; i < getRandomInt(4, 12); i++) {
        tempSet.add(getRandomDigits(2)); //Add randomly generated 15-digit number
    }

    return {set: Array.from(tempSet), size: tempSet.size};
}

function createNewArrayOfSets() {
    var tempArray = [];
    
    for (var j=0; j < sizeOfSetArray; j++) {
        tempArray.push(getNewSet());
    }

    return tempArray;
}

fs.writeFileSync('./randomSet.json', JSON.stringify(createNewArrayOfSets(), null, 2), 'utf-8');
console.log("Generated sets can be found in randomSet.json");