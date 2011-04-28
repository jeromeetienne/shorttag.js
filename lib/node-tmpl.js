/**
 * process a template using shorttag (ala php)
 * - '<?= 3 + 4 ?>' will be the same as '5'
 * - '<?= require('fs').readFileSync('README.md') ?>' will be the same as '5'
 * - '<? if(true){ ?>super blablabla<? } ?>
*/
exports.processTmpl	= function(tmpl){
	var jsCode	= "";
	while( tmpl != "" ){
		// find begin-token <?
		var indexBeg	= tmpl.search(/<\?/)
		// handle non-js code up to begin-token or end of tmpl
		jsCode	+= "require('util').print(\""+tmpl.substring(0, indexBeg != -1 ? indexBeg : tmpl.length)
				.replace(/"/g, "\\\"").replace(/\n/g, "\\n")+"\");"+(indexBeg?'\n':'');
		tmpl	= tmpl.substring( indexBeg != -1 ? indexBeg+2 : tmpl.length );
		// find end-token ?>
		var indexEnd	= tmpl.search(/\?>/);
		// if end-token isnt found
		if( indexEnd === -1 )	continue;
		// honor <?= tag to echo automatically the value
		if( tmpl.charAt(0) !== "=" )	jsCode	+= tmpl.substring(0, indexEnd) +"\n";
		else	jsCode	+= "require('util').print("+tmpl.substring(1, indexEnd)+");\n";		
		tmpl	= tmpl.substring(indexEnd+2)
	}
	// build the output
	eval(jsCode)	
}