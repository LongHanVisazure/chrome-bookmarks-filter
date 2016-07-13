const fs = require('fs')
if(process.argv.length < 3) {
	console.log('please provide filenames')
	process.exit(0)
}
const inf = process.argv[2]
const outf = process.argv[3]
console.log(process.argv)

function filterEmpty(bmo){
	var itemCount = bmo.children.length
	console.log(itemCount + ' items in the bookmark')
	
	var items = []
	var idx = 0
	var item
					
	for(idx = 0; idx < itemCount; idx++) {		
		item = bmo.children[idx]
		
		if(item.children && item.children.length == 0) {
			continue
		}
		items.push(item)		
	}
	console.log(items.length + ' items left after filtering')	
	bmo.children = items;
}
function filterDup(bmo){
	console.log('filter dup')
	var itemCount = bmo.children.length	
	
	var items = {}
	var idx = 0
	var item
					
	for(idx = 0; idx < itemCount; idx++) {		
		item = bmo.children[idx]
		if(!items[item.name]){
			items[item.name] = item
		}else if(items[item.name] && item.children){
			var old = items[item.name]
			if(old.children.length < item.children.length){
				items[item.name] = item
			}
		}
	}
		
	var itemArr = []
	for (var key in items){
		itemArr.push(items[key])
	}
	console.log(itemArr.length + ' items left after filtering')
	
	bmo.children = itemArr;
}
function recursiveFilter (bmo){
	filterEmpty(bmo)
	filterDup(bmo)
	
	bmo.children.forEach(function(item) {
		if(item.children) {
			recursiveFilter(item)
		}
	})
}
fs.readFile(inf, {encoding:'utf8', flag: 'r'}, function(err, bm){
	if (err) throw err;
	
	var bmo = JSON.parse(bm)
	// first round, filter out empty children
	//filterEmpty(bmo.roots.other)	
	// second round, filter out duplicate item	
	//filterDup(bmo.roots.other)
	recursiveFilter(bmo.roots.other)
	var outs = JSON.stringify(bmo, null, '\t')
	
	fs.writeFile(outf, outs, {encoding:'utf8'}, function(err, data) {
		if (err) throw err;  
	})
})