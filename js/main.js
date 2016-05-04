var xml = {};
xml["start"] = "<?xml version=\"1.0\" ?>\n<enemy>\n\t<behaviour>\n\t\t<root x=\"80\" y=\"20\">\n\t\t\t<normal>\n\t\t\t\t<andblock>\n\t\t\t\t\t<normal>\n";
xml["end"] = "\t\t\t\t\t</normal>\n\t\t\t\t\t<or>\n\t\t\t\t\t\t<condition id=\"isInNamedArea\">\n\t\t\t\t\t\t\t<string id=\"area name\">HEALAREA</string>\n\t\t\t\t\t\t\t<string id=\"team\" values=\"ownenemy\">OWN_TEAM</string>\n\t\t\t\t\t\t\t<string id=\"who\" values=\"targetself\">self</string>\n\t\t\t\t\t\t</condition>\n\t\t\t\t\t\t<condition id=\"getBoolEquals\">\n\t\t\t\t\t\t\t<string id=\"id\">CanBuyItems</string>\n\t\t\t\t\t\t\t<string id=\"value\" values=\"yesno\">yes</string>\n\t\t\t\t\t\t</condition>\n\t\t\t\t\t</or>\n\t\t\t\t</andblock>\n\t\t\t</normal>\n\t\t</root>\n\t</behaviour>\n</enemy>\n";
xml["normal"] = "\t\t\t\t\t\t<condition id=\"isUpgradeEnabled\">\n\t\t\t\t\t\t\t<string id=\"condition\" values=\"yesno\">no</string>\n\t\t\t\t\t\t\t<string id=\"upgrade name\">$upgrade</string>\n\t\t\t\t\t\t\t<normal>\n\t\t\t\t\t\t\t\t<condition id=\"canPayUpgrade\">\n\t\t\t\t\t\t\t\t\t<string id=\"upgrade name\">$upgrade</string>\n\t\t\t\t\t\t\t\t\t<normal>\n\t\t\t\t\t\t\t\t\t\t<action id=\"buyUpgrade\">\n\t\t\t\t\t\t\t\t\t\t\t<string id=\"upgrade name\">$upgrade</string>\n\t\t\t\t\t\t\t\t\t\t</action>\n\t\t\t\t\t\t\t\t\t</normal>\n\t\t\t\t\t\t\t\t</condition>\n\t\t\t\t\t\t\t</normal>\n\t\t\t\t\t\t</condition>\n";
xml["ordered-start"] = "\t\t\t\t\t\t<condition id=\"isUpgradeEnabled\">\n\t\t\t\t\t\t\t<string id=\"condition\" values=\"yesno\">no</string>\n\t\t\t\t\t\t\t<string id=\"upgrade name\">$upgrade</string>\n\t\t\t\t\t\t\t<normal>\n\t\t\t\t\t\t\t\t<condition id=\"canPayUpgrade\">\n\t\t\t\t\t\t\t\t\t<string id=\"upgrade name\">$upgrade</string>\n\t\t\t\t\t\t\t\t\t<normal>\n\t\t\t\t\t\t\t\t\t\t<action id=\"buyUpgrade\">\n\t\t\t\t\t\t\t\t\t\t\t<string id=\"upgrade name\">$upgrade</string>\n\t\t\t\t\t\t\t\t\t\t</action>\n\t\t\t\t\t\t\t\t\t</normal>\n\t\t\t\t\t\t\t\t</condition>\n\t\t\t\t\t\t\t</normal>\n\t\t\t\t\t\t\t<else>\n";
xml["ordered-end"] = "\t\t\t\t\t\t\t</else>\n\t\t\t\t\t\t</condition>\n";

var app = angular.module('AI-Build-Generator', []);
app.controller('AI-Build-Controller', function($scope, $http) {
	$scope.build = "";
    $scope.data  = function() {
        return $scope.build.replace(/\[[\/]?build\]/g, "").split("/");
    };
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
                var foo = xml["start"];
                for (var i = 0; i < $scope.items().length; i++) {
                    foo += xml["normal"].replace(/\$upgrade/g, response.data.items[$scope.items()[i]]);
                }
				foo += xml["end"];
                $scope.output = foo;
            }, function(response){throw "shit";}
            );
        }
        catch (err) {
            $scope.output = "Error: " + err;
        }
    };
});
