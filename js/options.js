// Saves options to localStorage.
function save_options() {
  var select = document.getElementById("color");
  var color = select.children[select.selectedIndex].value;
  chrome.storage.sync.set({"color" : color}, function() {console.log("Stored color");});
  colorSelection = color;
  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

var specialCharacters = ["*","\\", ".", "+", "^", "$", "?"];

document.addEventListener('DOMContentLoaded', function(){chrome.storage.sync.get('words',function(items){restoreOptions(items);});});

function restoreOptions(items) {
  var words = items.words;
    for (var key in words) {
        console.log('Replacing "' + key + '" with "' + words[key] + '"...'); 
        $("#searchWordSelectMultiple").append($("<option></option>").attr("id", key).text(key));
    }
}

$("#addButton").click(addSearchWord);

function addSearchWord(){
  var $input = $("#searchWordTextInput").val();
  if (typeof $input != "string"){
    alert("input: "+$input+" is not of type string!");
    return;
  }
  $input = $input.toLowerCase();
  var dupeBool = false;
  if (specialCharacters.indexOf($input) != -1){ // If input is special character.
    $input = "\\"+$input;
  }
  $("option").each(function(key,value){
    if ($input == value.text){
      dupeBool = true;
    }
  });
  
  if (!dupeBool){
      $("#searchWordSelectMultiple").append($("<option></option>").attr("id",$input).text($input));
      storeOptions();
    }
}

function storeOptions() {
    var words = {};
    $('option').each(function(idx, element) {
        words[element.id] = element.text;
    });
    chrome.storage.sync.set({ words: words });
}

$("#removeButton").click(removeSearchWord);

function removeSearchWord(){
  $("option:selected").each(function(key,value){
    chrome.storage.sync.remove(value.id, function(items){console.log("removed: "+items);});
  });
  $("option:selected").remove();
  storeOptions();
}