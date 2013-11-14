chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.insertCSS({file:"css/letemps.css"});
});