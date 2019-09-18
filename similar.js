var stringSimilarity = require('string-similarity');


var similarity = stringSimilarity.compareTwoStrings('healed', 'sealed'); 
var matches = stringSimilarity.findBestMatch('top nav {}', [
    'top nav - a',
    'a - top nav',
     'top a nav',
]);


console.log('similarity', similarity);
console.log('matches', matches);

// LEVEL
// - match
//     - notmatch
// - duplicate
// - not implemented
