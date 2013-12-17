chrome.storage.onChanged.addListener(function(changes, namespace){
	chrome.storage.sync.get("status", function(result){
		if (result["status"] == "enabled"){
			replace();
		}
	});
});

chrome.storage.sync.get("status", function(result){
	if (result["status"] == "enabled"){
		replace();
	}
});

function replace() {
  $(function() {
    var regularExpressions = [];
  	chrome.storage.sync.get("words",function(items){
      var words = items.words;
  		convertToRegExp(words, regularExpressions);
  		var iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);
  		while (node = iterator.nextNode()) {
  			for (var expression in regularExpressions){
          node.data = node.data.replace(regularExpressions[expression], 'Ding Dong');
        }
  		}
  	});
  });
}

function convertToRegExp(words, targetArray){
	regExRegExp = new RegExp("\^\/.*\/\$","i");
	for (var word in words){
		if (regExRegExp.test(word)){
			slashes = new RegExp("\/", "g");
			word = word.replace(slashes, "");
			word = new RegExp(word, "i");
			targetArray.push(word);
		}
		else if (targetArray.indexOf(word) == -1){
			targetArray.push(new RegExp(word, "i"));
		}
	}
}