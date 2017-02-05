"use strict";
//const Synonymator = require("synonymator");
const API_KEY = "b2d9866341889e35dd2256ad22d5e345";

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
function getSynonyms (word, callback) {
  rp ("https://words.bighugelabs.com/api/2/b2d9866341889e35dd2256ad22d5e345/" + word + "/json")
  .then(function(data){
    var nouns = JSON.parse(data)['noun']['syn'];
    var verbs = JSON.parse(data)['verb']['syn'];
    var synonyms = nouns.concat(verbs);
    console.log(longestWord(synonyms));
    console.log(synonyms);
    callback(longestWord(synonyms));
  });

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

//console.log(getSynonyms("time"));

var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var res = text.split(" ");
            var replacedText = text.substring(0,text.length);
            for(var k = 0; k < res.length; k++) {
              console.log(res[k]);
              var syn = getSynonyms(res[k], function (longestWord){
                  replacedText = replacedText.replace(res[k], syn);
                  if (replacedText !== text) {
                      element.replaceChild(document.createTextNode(replacedText), node);
                  }
              });
            }
        }
    }
}
