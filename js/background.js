// Extension is enabled by default when installed
chrome.runtime.onInstalled.addListener(function(){
  chrome.storage.sync.set({"status":"enabled"});
  chrome.browserAction.setIcon({"path": "images/dingdong-128.png"})
});

// If status isn't stored, set it to enabled
chrome.runtime.onStartup.addListener(function(){
  chrome.storage.sync.get("status", function(result){
    if (result["status"] == null) {
      chrome.storage.sync.set({"status":"enabled"});
      chrome.browserAction.setIcon({"path": "images/dingdong-128.png"});
    }
  });
});

// Enable or disable the extension.
chrome.browserAction.onClicked.addListener(function () {
  chrome.storage.sync.get('status', function (result){
    if(result["status"] == null){
        status = "enabled";
    } else {
        status = result["status"];    
    }
    if(status === "enabled"){
        icon  =  {"path": "images/dingdong-disabled-128.png"};        
        message = {"title": "click to enable Ding Dong substitutions"};
        status = "disabled";
    }else if (status === "disabled"){
        icon = {"path": "images/dingdong-128.png"};    
        message = {"title": "click to disable Ding Dong substitutions"};
        status = "enabled";
    }
    chrome.browserAction.setIcon(icon);
    chrome.browserAction.setTitle(message);
    chrome.storage.sync.set({"status":status});
  });
});