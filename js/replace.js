chrome.storage.sync.get("status", function(result){
	if (result["status"] == "enabled"){
		$(function() {
			var regularExpressions = [];
			chrome.storage.sync.get(null,function(items){
				convertToRegExp(items, regularExpressions);
				var iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);
				while (node = iterator.nextNode()) {
					replace(node, regularExpressions);
				}
			});

			
		});
	}
});

function replace(node, regularExpressions) {
	for (var expression in regularExpressions){
		node.data = node.data.replace(regularExpressions[expression], 'Ding Dong');
	}
}

function convertToRegExp(items, targetArray){
	for (var item in items){
		if (targetArray.indexOf(item) == -1){
			targetArray.push(new RegExp(item, "i"));
		}
	}
}