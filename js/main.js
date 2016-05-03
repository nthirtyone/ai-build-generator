var start = "<?xml version=\"1.0\" ?>\n\t<enemy>\n\t\t<behaviour><root x=\"80\" y=\"20\"><normal><andblock><string id=\"Comment\">Generated with AI Build Generator</string><normal>";
var end = "</normal><or><condition id=\"getBoolEquals\"><string id=\"id\">CanBuyItems</string><string id=\"value\" values=\"yesno\">yes</string><string id=\"Comment\">Is allowed to buy items</string></condition><condition id=\"isInNamedArea\"><string id=\"area name\">HealArea</string><string id=\"team\" values=\"ownenemy\">OWN_TEAM</string><string id=\"who\" values=\"targetself\">self</string><string id=\"Comment\">Is in shop</string></condition></or></andblock></normal></root></behaviour></enemy>";
var app = angular.module('AI-Build-Generator', []);
app.controller('AI-Build-Controller', function($scope) {
    $scope.build = "";
    $scope.output = function () {
    	var bstring = $scope.build.replace(/\[[\/]?build\]/g, "");
      var barray  = bstring.split("/");
      if (barray[2]) {
      	var border  = barray[2].split("-");
        for (i = 0; i < border.length; i++) {
        	console.log(border[i]);
        }
      }
    	return start + barray[0] + end;
    }
});