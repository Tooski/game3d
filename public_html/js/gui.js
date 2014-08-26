var app = angular.module("editor", ['ui.bootstrap']);
app.directive("nav", function() {
    return {
        restrict: 'E',
        templateUrl: 'partial/navigation.html'
    };
});
app.controller('NavCtrl', function($scope) {
    $scope.radio = {model: 0};
    $scope.navButtons = [
        {name: "drag"},
        {name: "item"}
    ];
    var stats = new Stats();
    stats.setMode(0);
    var nav = document.getElementById('nav');
    nav.appendChild(stats.domElement);
    setInterval(function() {
        stats.begin();
        stats.end();
    }, 1000 / 60);

});


app.directive("hierarchy", function() {
    return {
        restrict: 'E',
        templateUrl: 'partial/hierarchy.html'
    };
});
app.controller('HierarchyCtrl', function($scope) {
    $scope.gameObjects = engine.getGameObjects();
    engine.addCallback({fn: ["addGameObject", "addChild", "removeChild"], callback: function() { 
            $scope.gameObjects = engine.getGameObjects();
            
            $scope.$apply();
        }});
});

