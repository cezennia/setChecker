/**
 * Import file dependencies
 */
var fs = require('fs');
var jaccard = require('jaccard');
var jaccard2 = require("jaccard-index");

/**
 * Initialization of global vatiables
 */
var verifiedSetArray = [];
var desertedSetArray = [];
var initialVerifiedSet = [1, 2, 3, 8];

try {
    var verifiedSetFromFile = JSON.parse(fs.readFileSync('./verifiedSet.json', 'utf8'))
} catch (e) {
    console.error(e.message);
}

//set verified set using previously verified sets
verifiedSetArray = verifiedSetFromFile ? ( (verifiedSetFromFile.length !== 0 ) ? verifiedSetFromFile : [{uuid: 1, set: initialVerifiedSet}]) : [{uuid: 1, set: initialVerifiedSet}];


/**
 * Check the similarity of two sets
 * setA is the verified set
 * setB is the new set checking for similarity
 * if sets are more than 50% similar, then they are similar 
 */
function areSetsSimilar (setA, setB) {

    // return Math.round(Math.random()) === 1 ? true : false ;

    let newSet = new Set(setB);

    let intersection = setA.filter(element => newSet.has(element)); 
    // let union = new Set([...setA, ...setB]);
    let percentSimilarity1 = intersection.length / setA.length; //calculating the jaccord distance1
    let percentSimilarity2 = intersection.length / setB.length; //calculating the jaccord distance2

    return (0.5 < percentSimilarity1 || 0.5 < percentSimilarity2);

    // return 0.5 < jaccard2().index(setA, setB);
}

/**
 * Check a particular set across the verified sets
 */
function isSimilarToVerified (_set) {

    for (var i = 0; i < verifiedSetArray.length; i++) {
        if (areSetsSimilar(verifiedSetArray[i].set, _set)) return true; //leave the loop on finding one similar set
    }

    return false;
}

/**
 * verify sets of array
 */

function verifyArrays (someRandomSets) {
    var tempArray = [];
    // verifiedSetArray = (verifiedSetArray.length === 0) ? [{uuid: 1, set: initialVerifiedSet}] : verifiedSetArray;

    for (var i = 0; i < someRandomSets.length; i++) {
        //if they aren't similar, add new set to set of verified numbers
        if (!isSimilarToVerified(someRandomSets[i].set)) {
            verifiedSetArray.push({uuid: verifiedSetArray.length + 1, set: someRandomSets[i].set});
        } else {
            desertedSetArray.push({uuid: desertedSetArray.length + 1, set: someRandomSets[i].set});
        }
            
    }
}
console.time("verify-test");
// console.log(isSetsSimilar([1,2, 5, 4],[2,4,5,7]));
verifyArrays(JSON.parse(fs.readFileSync('./randomSet.json', 'utf8')));
// console.log("Verified set", verifiedSetArray);
// console.log("Deserted set", desertedSetArray);
fs.writeFileSync('./verifiedSet.json', JSON.stringify(verifiedSetArray, null, 2), 'utf-8');
fs.writeFileSync('./desertedSet.json', JSON.stringify(desertedSetArray, null, 2), 'utf-8');
console.log("Verified and deserted sets can be found in verifiedSet.json and desertedSet.json");
console.timeEnd("verify-test");
