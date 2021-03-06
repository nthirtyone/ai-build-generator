var xml = {};
xml["start"] = "<?xml version=\"1.0\" ?>\n<enemy>\n\t<behaviour>\n\t\t<root x=\"80\" y=\"20\">\n\t\t\t<normal>\n\t\t\t\t<andblock>\n\t\t\t\t\t<normal>\n";
xml["end"] = "\t\t\t\t\t</normal>\n\t\t\t\t\t<or>\n\t\t\t\t\t\t<condition id=\"isInNamedArea\">\n\t\t\t\t\t\t\t<string id=\"area name\">HEALAREA</string>\n\t\t\t\t\t\t\t<string id=\"team\" values=\"ownenemy\">OWN_TEAM</string>\n\t\t\t\t\t\t\t<string id=\"who\" values=\"targetself\">self</string>\n\t\t\t\t\t\t</condition>\n\t\t\t\t\t\t<condition id=\"getBoolEquals\">\n\t\t\t\t\t\t\t<string id=\"id\">CanBuyItems</string>\n\t\t\t\t\t\t\t<string id=\"value\" values=\"yesno\">yes</string>\n\t\t\t\t\t\t</condition>\n\t\t\t\t\t</or>\n\t\t\t\t</andblock>\n\t\t\t</normal>\n\t\t</root>\n\t</behaviour>\n</enemy>\n";
xml["normal"] = "\t\t\t\t\t\t<condition id=\"isUpgradeEnabled\">\n\t\t\t\t\t\t\t<string id=\"condition\" values=\"yesno\">no</string>\n\t\t\t\t\t\t\t<string id=\"upgrade name\">$upgrade</string>\n\t\t\t\t\t\t\t<normal>\n\t\t\t\t\t\t\t\t<condition id=\"canPayUpgrade\">\n\t\t\t\t\t\t\t\t\t<string id=\"upgrade name\">$upgrade</string>\n\t\t\t\t\t\t\t\t\t<normal>\n\t\t\t\t\t\t\t\t\t\t<action id=\"buyUpgrade\">\n\t\t\t\t\t\t\t\t\t\t\t<string id=\"upgrade name\">$upgrade</string>\n\t\t\t\t\t\t\t\t\t\t</action>\n\t\t\t\t\t\t\t\t\t</normal>\n\t\t\t\t\t\t\t\t</condition>\n\t\t\t\t\t\t\t</normal>\n\t\t\t\t\t\t</condition>\n";
xml["ordered-start"] = "\t\t\t\t\t\t<condition id=\"isUpgradeEnabled\">\n\t\t\t\t\t\t\t<string id=\"condition\" values=\"yesno\">no</string>\n\t\t\t\t\t\t\t<string id=\"upgrade name\">$upgrade</string>\n\t\t\t\t\t\t\t<normal>\n\t\t\t\t\t\t\t\t<condition id=\"canPayUpgrade\">\n\t\t\t\t\t\t\t\t\t<string id=\"upgrade name\">$upgrade</string>\n\t\t\t\t\t\t\t\t\t<normal>\n\t\t\t\t\t\t\t\t\t\t<action id=\"buyUpgrade\">\n\t\t\t\t\t\t\t\t\t\t\t<string id=\"upgrade name\">$upgrade</string>\n\t\t\t\t\t\t\t\t\t\t</action>\n\t\t\t\t\t\t\t\t\t</normal>\n\t\t\t\t\t\t\t\t</condition>\n\t\t\t\t\t\t\t</normal>\n\t\t\t\t\t\t\t<else>\n";
xml["ordered-end"] = "\t\t\t\t\t\t\t</else>\n\t\t\t\t\t\t</condition>\n";

/*
 *
 * We are generating XMLs here.
 * And we are doing it the most barbaric way, because they are just a text after all.
 *
 */

var app = angular.module('AI-Build-Generator', []);
app.controller('AI-Build-Controller', function($scope, $http) {
	$scope.supported = [{name: "Chucho Krokk", filename: "Chucho_Krokk"}, 
						{name: "Jimmy and LUX-5000", filename: "Jimmy_and_the_LUX5000"}, 
						{name: "Professor Milton Yoolip", filename: "Professor_Milton_Yoolip"},
						{name: "Ksenia", filename: "Ksenia"},
						{name: "Rocco", filename: "Rocco"},
						{name: "Nibbs", filename: "Nibbs"},
						{name: "Ted McPain", filename: "Ted_McPain"},
						{name: "Penny Fox", filename: "Penny_Fox"},
						{name: "Genji the Pollen Prophet", filename: "Genji_the_Pollen_Prophet"},
						{name: "Scoop of Justice", filename: "Scoop_of_Justice"},
						{name: "Skree", filename: "Skree"},
						{name: "Sentry X-58", filename: "Sentry_X-58"},
						{name: "Admiral Swiggins", filename: "Admiral_Swiggins"},
						{name: "Derpl Zork", filename: "Derpl_Zork"},
						{name: "Yuri", filename: "Yuri"},
						{name: "Skølldir", filename: "Skolldir"},
						{name: "Coco Nebulon", filename: "Coco_Nebulon"},
						{name: "Clunk", filename: "Clunk"},
						{name: "Ayla", filename: "Ayla"},
						{name: "Raelynn", filename: "Raelynn"},
						{name: "Gnaw", filename: "Gnaw"},
						{name: "Leon Chameleon", filename: "Leon_Chameleon"},
						{name: "Sheriff Lonestar", filename: "Sheriff_Lonestar"},
						{name: "Froggy G", filename: "Froggy_G"},
						{name: "Voltar the Omniscient", filename: "Voltar_the_Omniscient"},
						{name: "Vinnie & Spike", filename: "Vinnie_&_Spike"},
						{name: "Ix the Interloper", filename: "IX_the_Interloper"},
						{name: "Max Focus", filename: "Max_Focus"},
						{name: "Deadlift", filename: "Deadlift"}
					   ];
	$scope.build = "";
    $scope.data  = function() {
        return $scope.build.replace(/\[[\/]?build\]/g, "").replace(/https?:\/\/nautsbuilder.com\/#/g, "").split("/");
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
		var sup  = false;
        var name = $scope.data()[0];
		for (var i = 0; i < $scope.supported.length; i++) {
			if ($scope.supported[i].filename == name) {
				sup = true;
				break;
			}
		}
		if (sup) {
			var file = "json/" + name + ".json";
			$http.get(file).then(function SUCCESS(response) {
				var foo = "";
				for (var i = 0; i < $scope.items().length; i++) {
					// $scope.items()[i] - current item number
					// response.data.items - buyable items array
					var a = response.data.items[$scope.items()[i]].classname;
					// if labeled (not notlabeled flagged)
					if (!response.data.items[$scope.items()[i]].notlabeled) {
						// if first appearance
						if (!response.data.items[$scope.items()[i]].label) {
							// check if has fixed first
							if (!response.data.items[$scope.items()[i]].first) {
								// set to one if not
								response.data.items[$scope.items()[i]].label = 1;
							}
							else {
								// set to fixed if yes
								response.data.items[$scope.items()[i]].label = response.data.items[$scope.items()[i]].first;
							}
						}
						else {
							// else add 1 to label
							response.data.items[$scope.items()[i]].label++;
						}
						//  ignore-first flag not raised OR not first label
						if (!response.data.items[$scope.items()[i]].ignorefirst || response.data.items[$scope.items()[i]].label > 1) {
							// finally write label (that number on the end of upgrade classname)
							a += response.data.items[$scope.items()[i]].label;
						}
					}
					if ($scope.order) {
						foo += xml["ordered-start"].replace(/\$upgrade/g, a);
					}
					else {
						foo += xml["normal"].replace(/\$upgrade/g, a);
					}
				}
				if ($scope.order) { 
					for (var i = 0; i < $scope.items().length; i++) {
						foo += xml["ordered-end"];
					}
				}
				$scope.output = xml["start"] + foo + xml["end"];
			}, 
			function FAILED(response) {
				$scope.output = "An error occured when trying to get items data of selected naut.";
			});
		}
		else { $scope.output = "Unsupported naut name."; }
    };
	$scope.download = function () {
		window.open("data:text/xml;charset=UTF-8," + $scope.output);	
	};
});
