Array.prototype.contains = function ( needle ) {
   for (i in this) {
       if (this[i] == needle) return true;
   }
   return false;
}

var toggle = false;
var activeTabs = Array();

chrome.browserAction.onClicked.addListener(function(tab) {
  toggle = !toggle;
  if(!activeTabs.contains(tab.id)){
    activeTabs.push(tab.id);
  }
  if(toggle){
    chrome.browserAction.setIcon({path: "on.png", tabId:tab.id});
    cssInject(tab);
  }
  else{
    chrome.browserAction.setIcon({path: "off.png", tabId:tab.id});
    chrome.tabs.reload();
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(toggle && activeTabs.contains(tab.id)){
    chrome.browserAction.setIcon({path: "on.png", tabId:tab.id});
    cssInject(tab);
  }
});

function cssInject(tab){
  chrome.tabs.executeScript(tab.id, {code:"document.getElementsByTagName('head')[0].innerHTML = '';"});
  chrome.tabs.insertCSS(tab.id, {file: "css/fine-reader.css", allFrames: true});
}