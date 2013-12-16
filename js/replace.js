chrome.storage.sync.get("status", function(result){
	if (result["status"] == "enabled"){
		$(function() {
			var regularExpressions = [];
			chrome.storage.sync.get(null,function(items){
				for (var item in items){
					if (regularExpressions.indexOf(item) == -1){
						regularExpressions.push(new RegExp(item, "i"));
					}
					
				}
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