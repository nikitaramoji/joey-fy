var elements = document.getElementsByTagName('*');

chrome.browserAction.onClicked.addListener(function(tab) {
   chrome.tabs.executeScript(null, {file: "testScript.js"});
});


