var start = "<?xml version=\"1.0\" ?>\n\t<enemy>\n\t\t<behaviour><root x=\"80\" y=\"20\"><normal><andblock><string id=\"Comment\">Generated with AI Build Generator</string><normal>";
var end = "</normal><or><condition id=\"getBoolEquals\"><string id=\"id\">CanBuyItems</string><string id=\"value\" values=\"yesno\">yes</string><string id=\"Comment\">Is allowed to buy items</string></condition><condition id=\"isInNamedArea\"><string id=\"area name\">HealArea</string><string id=\"team\" values=\"ownenemy\">OWN_TEAM</string><string id=\"who\" values=\"targetself\">self</string><string id=\"Comment\">Is in shop</string></condition></or></andblock></normal></root></behaviour></enemy>";

var app = angular.module('AI-Build-Generator', []);
app.controller('AI-Build-Controller', function($scope, $http) {
	$scope.build = "";
    $scope.data  = function() {
        return $scope.build.replace(/\[[\/]?build\]/g, "").split("/")
    };
    console.log($scope.data);
    $scope.order = false;
    $scope.items = function () {
        if ($scope.order) {
            var foo = $scope.data()[2];
            if (foo) {
                return foo.split("-");
            }
            else {
                return [];
            }
        }
        else {
            var foo = $scope.data()[1];
            var ret = [];
            for (var i = 0; i < foo.length; i++) {
                if (i != 14 && i != 21) {
                    for (var j = 0; j < parseInt(foo[i]); j++) {
                        ret.push(String(i+1));
                    }
                }
            }
            return ret;
        }
    };
    $scope.getXML = function () {
        var name = $scope.data()[0];
        var file = "json/" + name + ".json";
        try {
            $http.get(file).then(function(response) {
                var foo = "";
                for (var i = 0; i < $scope.items().length; i++) {
                    foo += " " + response.data.items[$scope.items()[i]];
                }
                $scope.output = foo;
            }, function(response){throw "shit";}
            );
        }
        catch (err) {
            $scope.output = "Error: " + err;
        }
    };
});
