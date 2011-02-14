basic templating system in node.js

* This is based on php shorttag/longtag
* *super simple* and *immediatly understandable*

### To install

npm install node-tmpl

### example

Suppose you get the template being

> Let do an addition <?= 1+5 ?>
> isnt that <? console.log("super") ?>?

The result gonna be

> Let do an addition 6
> isnt that super?

### TODO

* TODO support longtag <?node console.log("wow") ?>
* support for external variables