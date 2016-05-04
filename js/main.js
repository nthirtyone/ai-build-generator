var start = "<?xml version=\"1.0\" ?>\n\t<enemy>\n\t\t<behaviour><root x=\"80\" y=\"20\"><normal><andblock><string id=\"Comment\">Generated with AI Build Generator</string><normal>";
var end = "</normal><or><condition id=\"getBoolEquals\"><string id=\"id\">CanBuyItems</string><string id=\"value\" values=\"yesno\">yes</string><string id=\"Comment\">Is allowed to buy items</string></condition><condition id=\"isInNamedArea\"><string id=\"area name\">HealArea</string><string id=\"team\" values=\"ownenemy\">OWN_TEAM</string><string id=\"who\" values=\"targetself\">self</string><string id=\"Comment\">Is in shop</string></condition></or></andblock></normal></root></behaviour></enemy>";



var app = angular.module('AI-Build-Generator', []);
app.controller('AI-Build-Controller', function($scope, $http) {
	$scope.build = "[build]Professor_Milton_Yoolip/0000000110010010100001000000/8-12-9-17[/build]";
    $scope.filename = function () {
        return "json/" + $scope.build.replace(/\[[\/]?build\]/g, "").split("/")[0] + ".json";
    };
    $scope.order = function () {
        var foo = $scope.build.replace(/\[[\/]?build\]/g, "").split("/")[2];
        if (foo) {
            return foo.split("-");
        }
        else {
            return [];
        }
    };
    $scope.getXML = function () {
        $http.get($scope.filename()).then(function(response) {
            var foo = "";
            for (i = 0; i < $scope.order().length; i++) {
                foo += " " + response.data.items[$scope.order()[i]];
            }
            $scope.output = foo;
        });
    };
});