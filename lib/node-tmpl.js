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
	var dispNonJs	= function(text){
		//console.log("nonJs(\""+text+"\")")
		return "/*  NonJS */ require('util').print(\""+text.replace(/"/g, "\\\"").replace(/\n/g, "\\n")+"\");\n";
	}
	var dispWithJs	= function(text){
		if( text.charAt(0) !== "=" )	return '/* withJs non echo */ '+ text +"\n";
		return "/* withJS */ require('util').print("+text.substring(1)+");\n";		
	}
	
	while( tmpl != "" ){
		// get begin-token <?
		var indexBeg	= tmpl.search(/<\?/)
		// if <? is found
		if( indexBeg != -1 ){
			jsCode	+= dispNonJs(tmpl.substring(0, indexBeg));
			tmpl	= tmpl.substring(indexBeg+2)
		}else{
			// if there is no <? until the end of the tmpl
			jsCode	+= dispNonJs(tmpl);
			tmpl	= "";
		}
		var indexEnd	= tmpl.search(/\?>/)
		if( indexEnd != -1 ){
			jsCode	+= dispWithJs(tmpl.substring(0, indexEnd));
			tmpl	= tmpl.substring(indexEnd+2)
		}
	}
	//console.log("jsCode");
	console.log(jsCode);
	console.log("**********************************")
	console.log("**********************************")
	console.log("**********************************")
	eval(jsCode)	
}