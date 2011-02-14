/**
 * * TODO the escaping is no good
 * * support longtag <?node console.log("wow") ?>
 * * support for external variables
 * * i dont like processTmpl ...
 *   * too serial
 *   * port it on top of higher level regexp
*/

exports.processFile	= function(filename){
	var tmpl	= require('fs').readFileSync(filename).toString()
	//var tmpl	= "wow \" <? console.log('super') ?> <?= \"captain\" ?> <?= 2+3 ?> prout";
	//var tmpl	= "wow \" <?= require('fs').readFileSync('test.html') ?> prout"
	return exports.processTmpl(tmpl);
}

exports.processTmpl	= function(tmpl){
	var jsCode	= "";
	var dispFctText	= "require('util').print"
	
	while( tmpl != "" ){
		var indexBeg	= tmpl.search(/<\?/)
		if( indexBeg != -1 ){
			jsCode	+= dispFctText+"(\""+tmpl.substring(0, indexBeg).replace("\"", "\\\"")+"\");\n"
			tmpl	= tmpl.substring(indexBeg+2)
		}else{
			// if there is no <? until the end of the tmpl
			jsCode	+= dispFctText+"(\""+tmpl.replace("\n","\\n")+"\");\n"
			tmpl	= "";
		}
		var indexEnd	= tmpl.search(/\?>/)
		if( indexEnd != -1 ){
			if( tmpl.charAt(0) === "=" ){
				jsCode	+= dispFctText+"("+tmpl.substring(1, indexEnd)+");\n"
			}else{
				jsCode	+= tmpl.substring(0, indexEnd)+"\n";
			}
			tmpl	= tmpl.substring(indexEnd+2)
		}
	}
	//console.log("jsCode", jsCode)
	eval(jsCode)	
}