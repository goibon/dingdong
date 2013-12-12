chrome.storage.sync.get("status", function(result){
	console.log("result: "+result["status"]);
	if (result["status"] == "enabled"){
		$(function() {
			var iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);
			while (node = iterator.nextNode()) {
				replace(node);
			}
		});
	}
});

function replace(node) {
	node.data = node.data.replace(/(awesome)/i, 'Ding Dong');
}