"use strict";
//const Synonymator = require("synonymator");
const API_KEY = "9711165e9d159d59f71d4a0c983efe37";

const rp = require ("request-promise");

//
// let syn = new Synonymator(API_KEY);
//
// // in each example, data is an array
// syn.synonyms("time").then((data) => {
//   console.log(data);
// });
//
// syn.synonymsNoun("time").then((data) => {
//   console.log(data);
// });
//
// syn.synonymsVerb("time").then((data) => {
//   console.log(data);
// });

//Thesaurus service provided by words.bighugelabs.com
//input word is the word that the program will search for
function getSynonyms (word) {
  rp ("https://words.bighugelabs.com/api/2/9711165e9d159d59f71d4a0c983efe37/" + word + "/json")
  var synonyms = null;
  .then(function(data){
    var nouns = JSON.parse(data)['noun']['syn'];
    var verbs = JSON.parse(data)['verb']['syn'];
    synonyms = nouns.concat(verbs);
    console.log(synonyms);
  });
  return synonyms;
}

//longestWord in a list
function longestWord (synonyms) {
  var index = 0;
  for (var i = 0; i<synonyms.length; i++) {
    if (synonyms[i].length>synonyms[index].length){
      index = i;
    }
    }
    return synonyms[index];
  }

console.log(getSynonyms("time"));

var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var replacedText = text.replace(/heart/g, 'aortic pump');
            replacedText = replacedText.replace(/Heart/g, 'Aortic pump');
            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}
